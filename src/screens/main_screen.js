import {Formik} from 'formik';
import {
  Box,
  Button,
  Divider,
  FlatList,
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
import React, {useEffect, useState} from 'react';
import {Image, RefreshControl, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Store} from './src/util/store';
import {useDispatch, useSelector} from 'react-redux';
import {DataAPI, DataSearchAPI} from '../util/api/data_api';
import CardRank from '../components/card/card_rank';
import CardCrypto from '../components/card/card_crypto';
import CardAds from '../components/card/card_ads';
import {isLandscape, isPortrait} from '../function/checkLandscape';
import {FlatGrid} from 'react-native-super-grid';

const MainScreen = () => {
  const dispatch = useDispatch();
  const DataStore = useSelector(state => state?.DataStore?.data);
  const newData = DataStore?.filter(data => data.rank > 3);
  const value = 'addAds';
  for (let index = 0; index < newData.length + 1; index++) {
    if ((index + 1) % 5 === 0) {
      newData.splice(index, 0, value);
    }
  }
  console.log('newData', newData);
  console.log('newData', newData.length);
  const [limit, setLimit] = useState(15);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(false);

    setTimeout(async () => {
      setLimit(limit + 10);
      dispatch(await DataAPI(limit));
      setRefreshing(false);
    }, 1000);
  };
  useEffect(() => {
    console.log('Fetching DATA');
    const FetchData = async () => {
      dispatch(await DataAPI(limit));
    };
    FetchData();
  }, [dispatch, limit]);
  return (
    <View flex={1} bg="gray.100">
      <Formik
        initialValues={{text: ''}}
        onSubmit={values => {
          const searchData = async () => {
            if (values.text === '') {
              dispatch(await DataAPI(limit));
            } else {
              dispatch(await DataSearchAPI(values.text));
            }
          };
          searchData();
          console.log(values);
        }}>
        {({handleSubmit, values, setFieldValue, resetForm}) => (
          <>
            <HStack
              alignItems="center"
              bg="gray.200"
              w="90%"
              alignSelf="center"
              rounded="md"
              px="5%"
              mt="5">
              <Icon as={Ionicons} name="search" size="5" color="gray.700" />
              <View w="90%" px="2.5%">
                <TextInput
                  value={values.text}
                  onChangeText={nextValue => {
                    setFieldValue('text', nextValue);
                    handleSubmit();
                  }}
                />
              </View>
              <Pressable
                onPress={() => {
                  console.log('Close');
                  resetForm({
                    values: {
                      text: '',
                    },
                  });
                  const refeshData = async () => {
                    dispatch(await DataAPI(limit));
                  };
                  refeshData();
                }}>
                <Icon as={Ionicons} name="close" size="5" color="gray.700" />
              </Pressable>
            </HStack>
            {DataStore?.length > 0 ? (
              <ScrollView
                nestedScrollEnabled={false}
                showsVerticalScrollIndicator={false}>
                {values.text === '' && (
                  <View>
                    <Divider mt="5" />
                    <Text
                      bold
                      fontSize="16"
                      p="5"
                      textAlign={['left', 'center']}>
                      Top{' '}
                      <Text bold fontSize="18" p="5" color="red.700">
                        3
                      </Text>{' '}
                      rank crypto
                    </Text>
                    <HStack
                      w="90%"
                      alignSelf="center"
                      alignItems="center"
                      space={[2, 4]}
                      justifyContent={['space-between', 'center']}>
                      {DataStore?.map((data, index) => {
                        return <CardRank data={data} key={index} />;
                      }).slice(0, 3)}
                    </HStack>
                  </View>
                )}

                <Text bold fontSize="16" p="5" textAlign={['left', 'center']}>
                  Buy, sell and hold crypto
                </Text>
                {isPortrait() ? (
                  <FlatList
                    nestedScrollEnabled={true}
                    contentContainerStyle={{paddingBottom: '10%'}}
                    enableEmptySections={true}
                    refreshControl={
                      <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    data={newData}
                    renderItem={({item, index}) => (
                      <View>
                        {item === 'addAds' ? (
                          <CardAds data={item} />
                        ) : (
                          <CardCrypto data={item} />
                        )}
                      </View>
                    )}
                    keyExtractor={(item, index) => index}
                  />
                ) : (
                  <FlatGrid
                    maxItemsPerRow={3}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{paddingBottom: '10%'}}
                    // enableEmptySections={true}
                    // refreshControl={
                    //   <RefreshControl
                    //     //refresh control used for the Pull to Refresh
                    //     refreshing={refreshing}
                    //     onRefresh={onRefresh}
                    //   />
                    // }
                    data={newData}
                    renderItem={({item, index}) => (
                      <HStack
                        flexDirection="column"
                        flex={1}
                        alignItems="center">
                        {/* <CardCrypto
                          data={item}
                          // addAds={(index + 1) % 4 === 0}
                        /> */}
                        {item === 'addAds' ? (
                          <CardAds data={item} />
                        ) : (
                          <CardCrypto data={item} />
                        )}
                      </HStack>
                    )}
                    keyExtractor={(item, index) => index}
                  />
                )}

                {/* <ScrollView>
                  {newData
                    ?.map((data, index) => {
                      const newindex = index + 1;
                      const condition = newindex % 4 === 0;
                      return (
                        <View key={index}>
                          <CardCrypto data={data} />
                          {condition && <CardAds data={data} />}
                        </View>
                      );
                    })
                    .slice(0, 5)}
                </ScrollView> */}
              </ScrollView>
            ) : (
              <View justifyContent="center" alignItems="center" flex={1}>
                <Text>Sorry</Text>
                <Text>No result match this keyword</Text>
              </View>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default MainScreen;
