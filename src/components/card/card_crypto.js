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
import commify from '../../function/commaNumber';
import {useDispatch} from 'react-redux';
import {addDataStoreDetail} from '../../store/dataStoreDetail';
import {Alert} from 'react-native';

const CardCrypto = ({data}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const dispatch = useDispatch();
  const oncloseRestate = () => {
    onClose();
    dispatch(addDataStoreDetail({}));
  };
  const toNum = +data?.price;
  return (
    <Pressable onPress={onOpen}>
      <HStack
        h="20"
        alignSelf="center"
        space={2}
        p="2"
        my="2"
        alignItems="center"
        w="90%"
        bg="gray.200"
        shadow={2}
        rounded="lg">
        <SvgUri
          width="50"
          height="40"
          uri={data.iconUrl}
          // onError={() => Alert.alert('error')}
        />
        <HStack
          alignSelf="center"
          alignItems="center"
          pt="2"
          justifyContent="space-between"
          w="80%">
          <VStack>
            <Text bold fontSize="15">
              {data?.symbol}
            </Text>
            <Text fontSize="14" color="gray.500">
              {data?.name}
            </Text>
          </VStack>
          <VStack justifyContent="flex-end" alignItems="flex-end">
            <Text fontSize="14" color="black">
              ${commify(toNum.toFixed(5))}
            </Text>
            <HStack justifyContent="center" alignItems="center" space={1}>
              <Icon
                as={Ionicons}
                name={
                  data?.change?.slice(0, 1) === '-' ? 'arrow-down' : 'arrow-up'
                }
                size="3"
                color={
                  data?.change?.slice(0, 1) === '-' ? 'red.600' : 'green.600'
                }
              />
              {data?.change !== null && (
                <Text
                  color={
                    data?.change?.slice(0, 1) === '-' ? 'red.600' : 'green.600'
                  }>
                  {data?.change?.slice(0, 1) === '-'
                    ? data?.change?.slice(1, data?.change?.length)
                    : data?.change}
                </Text>
              )}
            </HStack>
          </VStack>
        </HStack>
        <ModalSheet isOpen={isOpen} onClose={oncloseRestate} data={data} />
      </HStack>
    </Pressable>
  );
};

export default CardCrypto;
