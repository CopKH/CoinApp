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
import {Dimensions} from 'react-native';

const CardAds = ({data}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <Pressable onPress={onOpen}>
      <HStack
        h="20"
        alignSelf="center"
        space={2}
        px="10"
        p="2"
        my="2"
        alignItems="center"
        w={['90%', windowWidth * 0.3]}
        bg="blue.200"
        shadow={2}
        rounded="lg">
        <Text bold fontSize={['16', '12']}>
          you can earn $10 when you invite a friend to buy crypto.{' '}
          <Text bold fontSize={['16', '12']} color="blue.400">
            invite your friend
          </Text>
        </Text>
      </HStack>
    </Pressable>
  );
};

export default CardAds;
