import React, {useEffect} from 'react';
import {
  Actionsheet,
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base';
import {SvgUri} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import commify from '../../function/commaNumber';
import {DataDetailAPI} from '../../util/api/data_api';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator, Linking} from 'react-native';
const ModalSheet = ({isOpen, onClose, data}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const FetchData = async () => {
      isOpen && dispatch(await DataDetailAPI(data.uuid));
    };
    FetchData();
  }, [data.uuid, dispatch, isOpen]);

  const toNum = +data.price;
  const convertToInternationalCurrencySystem = labelValue => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e12
      ? (Math.abs(Number(labelValue)) / 1.0e12).toFixed(2) + 'T'
      : Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
      : Math.abs(Number(labelValue));
  };
  const DataDetail = useSelector(state => state?.DataStoreDetail?.data);
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      {DataDetail ? (
        <Actionsheet.Content alignSelf="flex-end" minH={200}>
          <HStack
            alignSelf="center"
            space={2}
            p="2"
            my="2"
            alignItems="center"
            w="90%"
            rounded="lg">
            <SvgUri width="50" height="40" uri={data.iconUrl} />
            <HStack
              alignSelf="center"
              alignItems="center"
              pt="2"
              justifyContent="space-between"
              w="80%">
              <VStack>
                <HStack space={1}>
                  <Text bold fontSize="15" color={data.color}>
                    {data.symbol}
                  </Text>
                  <Text bold fontSize="15">
                    ({data.name})
                  </Text>
                </HStack>
                <HStack space={2} alignItems="center">
                  <Text fontSize="14" color="black" bold>
                    PRICE
                  </Text>
                  <Text fontSize="14" color="gray.800">
                    ${commify(toNum.toFixed(2))}
                  </Text>
                </HStack>
                <HStack space={2} alignItems="center">
                  <Text fontSize="14" color="black" bold>
                    MARKET CAP
                  </Text>
                  <Text fontSize="14" color="gray.800">
                    ${convertToInternationalCurrencySystem(data.marketCap)}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </HStack>
          <View justifyContent="flex-start" w="90%">
            <Text bold fontSize="12" color="gray.400">
              {DataDetail?.description}
            </Text>
          </View>
          <Divider my="2" />
          <Pressable
            onPress={() => {
              // console.log(
              //   'DataDetail?.coinrankingUrl',
              //   DataDetail?.coinrankingUrl,
              // );
              Linking.openURL(DataDetail?.coinrankingUrl);
            }}
            justifyContent="flex-start"
            w="90%"
            alignItems="center"
            my="3">
            <Text bold fontSize="16" color="blue.400">
              GO TO WEBSITE
            </Text>
          </Pressable>
        </Actionsheet.Content>
      ) : (
        <ActivityIndicator />
      )}
    </Actionsheet>
  );
};

export default ModalSheet;
