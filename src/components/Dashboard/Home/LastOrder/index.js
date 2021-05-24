/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import EmptyComponent from 'components/Common/emptyComponent';
import ImageComponent from 'components/Common/imageComponent';
import {default as Colors, default as colors} from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import moment from 'moment';
import IconsFa from 'react-native-vector-icons/FontAwesome';

function LastOrder(props) {
  const {
    allLastorders,
    lastLoader,
    itemPressed,
    getMoreData,
    blackTextColor,
    theme,
  } = props;
  const [momentum, setMomentum] = useState(false);

  return lastLoader ? (
    <View
      style={{
        height: RFPercentage(40),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator />
    </View>
  ) : (
    <FlatList
      data={allLastorders || []}
      onMomentumScrollBegin={() => {
        setMomentum(false);
      }}
      contentContainerStyle={{flexGrow: 1}}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!momentum && allLastorders && allLastorders.length > 5) {
          getMoreData(1);
        }
      }}
      ListEmptyComponent={() => (
        <EmptyComponent
          title={'You have not placed an order yet.'}
          icon={'shopping-cart'}
          color={Colors.Primary}
        />
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              itemPressed(item, 1);
            }}
            style={{
              flexDirection: 'row',
              height: RFValue(71),
              paddingHorizontal: RFValue(5),
              width: '90%',
              alignSelf: 'center',
              borderRadius: RFValue(5),
              backgroundColor: theme == 'dark' ? Colors.DarkGray : Colors.White,
              shadowColor: theme == 'dark' ? Colors.White : Colors.Black,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2.22,
              elevation: 1,
              marginVertical: RFValue(10),
            }}>
            <View
              style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: RFValue(45),
                  width: RFValue(45),
                  borderRadius: RFValue(5),
                  backgroundColor:
                    theme == 'dark' ? Colors.White : Colors.Background,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item.merchantId && item.merchantId.merchant_image ? (
                  <ImageComponent
                    styles={{height: RFValue(40), width: RFValue(40)}}
                    resizeMode={'contain'}
                    uri={item.merchantId && item.merchantId.merchant_image}
                  />
                ) : (
                  <IconsFa
                    name={'archive'}
                    size={RFValue(25)}
                    color={colors.Primary}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                paddingLeft: RFValue(10),
              }}>
              {(item.bookedItems &&
                item.bookedItems.map((val, i) => {
                  return (
                    <Text
                      key={i}
                      style={[
                        {
                          fontSize: RFValue(13),
                          fontFamily: Fonts.Medium,
                          color: colors.Black,
                        },
                        blackTextColor,
                      ]}>
                      {val.productName || 'Custom Delivery'}
                    </Text>
                  );
                })) || (
                <Text
                  style={[
                    {
                      fontSize: RFValue(13),
                      fontFamily: Fonts.Medium,
                      color: colors.Black,
                    },
                    blackTextColor,
                  ]}>
                  {'Custom Delivery'}
                </Text>
              )}

              {item.bookedItems && item.bookedItems.length > 0 ? (
                <Text
                  style={{
                    fontSize: RFValue(12),
                    fontFamily: Fonts.Regular,
                    color: colors.Lgrey,
                  }}>
                  {item.bookedItems && item.bookedItems.length} Items{' '}
                </Text>
              ) : null}
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={[
                  {
                    fontSize: RFValue(12),
                    fontFamily: Fonts.Regular,
                    color: colors.Lgrey,
                  },
                  blackTextColor,
                ]}>
                {moment.utc(item.bookingDateTime).local().format('DD/MM/YYYY')}
              </Text>
              <Text
                style={{
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Regular,
                  color: colors.Green,
                }}>
                ${item.totalAmount}{' '}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
export default LastOrder;
