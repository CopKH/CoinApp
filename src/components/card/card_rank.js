import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
  useDisclose,
} from 'native-base';
import {SvgUri} from 'react-native-svg';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalSheet from '../sheet/modal_sheet';
import {addDataStoreDetail} from '../../store/dataStoreDetail';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
const CardRank = ({data}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const dispatch = useDispatch();
  const oncloseRestate = () => {
    onClose();
    dispatch(addDataStoreDetail({}));
  };
  return (
    // <Pressable onPress={onOpen}></Pressable>
    <Pressable
      onPress={onOpen}
      alignItems="center"
      w="31%"
      bg="gray.200"
      shadow={7}
      rounded="xl"
      py="5">
      <SvgUri
        width="50"
        height="40"
        uri={data.iconUrl}
        // onError={() => Alert.alert('error')}
      />
      <VStack alignItems="center" pt="2">
        <Text bold fontSize="15">
          {data.symbol}
        </Text>
        <Text fontSize="14" color="gray.500">
          {data.name}
        </Text>
        <HStack justifyContent="center" alignItems="center" space={1}>
          <Icon
            as={Ionicons}
            name={data.change.slice(0, 1) === '-' ? 'arrow-down' : 'arrow-up'}
            size="3"
            color={data.change.slice(0, 1) === '-' ? 'red.600' : 'green.600'}
          />
          <Text
            color={data.change.slice(0, 1) === '-' ? 'red.600' : 'green.600'}>
            {data.change.slice(0, 1) === '-'
              ? data.change.slice(1, data.change.length)
              : data.change}
          </Text>
        </HStack>
      </VStack>
      <ModalSheet isOpen={isOpen} onClose={oncloseRestate} data={data} />
    </Pressable>
  );
};

export default CardRank;
