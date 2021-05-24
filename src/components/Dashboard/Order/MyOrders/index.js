/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import EmptyComponent from 'components/Common/emptyComponent';
import ImageComponent from 'components/Common/imageComponent';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';

function MyOrders(props) {
  const [momentum, setMomentum] = useState(false);

  const {
    trackOrder,

    allLastorders,
    lastLoader,
    getMoreData,
    goToHelp,
    theme,
  } = props;
  const {colorBackground, blackTextColor} = getStyles(theme);
  const calculateEstimated = (value) => {
    var num = value;

    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours > 0
      ? rhours + ' hour(s) and ' + rminutes + ' minute(s)'
      : +rminutes + ' minute(s)';
  };
  const renderStatusText = (merchantStatus, driverStatus) => {
    console.log(merchantStatus, 'STSTUSSSSSS', driverStatus);
    if (driverStatus == 'On the Way to merchant') {
      return 'Driver on the way to merchant';
    } else if (driverStatus == 'Reached') {
      return `${"Driver has reached merchant's location"}`;
    } else if (driverStatus == 'Pickedup') {
      return 'Driver has picked up your package';
    } else if (driverStatus == 'On the Way to Customer') {
      return 'Driver is on his way to you';
    } else if (driverStatus == 'Completed') {
      return 'Order delivered';
    }

    if (merchantStatus == 'Pending') {
      return 'Waiting for driver to accept your order.';
    } else if (merchantStatus == 'Approved') {
      return 'Driver found for your order';
    } else if (merchantStatus == 'Canceled') {
      return 'Order has been cancelled';
    } else if (merchantStatus == 'Order is preparing/packing') {
      return 'Order is being prepared';
    } else if (merchantStatus == 'Ready to Deliver') {
      return 'Order is ready to be delivered';
    } else if (merchantStatus == 'Refunded') {
      return 'Refund Initiated';
    }
  };

  const renderCustomStatus = (status) => {
    if (status == 'initial' || !status) {
      return 'On the way to stop 1';
    } else if (status == 'stop1') {
      return 'Reached stop 1';
    } else if (status == 'stop2') {
      return 'Reached stop 2';
    } else if (status == 'Canceled') {
      return 'Order has been cancelled';
    } else if (status == 'Refunded') {
      return 'Refund Initiated';
    }
  };
  return (
    <FlatList
      data={allLastorders}
      contentContainerStyle={[{flexGrow: 1}, colorBackground]}
      ListEmptyComponent={() => (
        <EmptyComponent
          title={'No History available.'}
          icon={'times'}
          color={colors.Primary}
        />
      )}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!momentum && allLastorders && allLastorders.length > 5) {
          getMoreData();
        }
      }}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              // height: RFValue(240),
              borderBottomWidth: 0.5,
              borderBottomColor: colors.Background,
            }}>
            <View
              style={{
                height: RFPercentage(15),
                flexDirection: 'row',
                // backgroundColor: 'pink',
              }}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    height: RFValue(50),
                    width: RFValue(50),
                    borderRadius: RFValue(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  {idx(item, (_) => _.merchantId.merchant_image) ? (
                    <ImageComponent
                      styles={{height: RFValue(50), width: RFValue(50)}}
                      resizeMode={'contain'}
                      uri={idx(item, (_) => _.merchantId.merchant_image)}
                    />
                  ) : (
                    <IconsFa
                      name={'archive'}
                      size={RFValue(30)}
                      color={colors.Primary}
                    />
                  )}
                </View>
              </View>

              <View
                style={{
                  flex: 0.55,
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    {
                      fontSize: RFValue(15),
                      fontFamily: Fonts.Regular,
                      paddingBottom: RFValue(5),
                    },
                    blackTextColor,
                  ]}>
                  {item.merchantName || 'Custom Order'}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: RFValue(14),
                      fontFamily: Fonts.Regular,
                      color: colors.Lgrey,
                    },
                    blackTextColor,
                  ]}>
                  Estimated Time
                </Text>
                <Text
                  style={[
                    {
                      fontSize: RFValue(12),
                      fontFamily: Fonts.Bold,
                    },
                    blackTextColor,
                  ]}>
                  {calculateEstimated(item.estimatedTimeValue)}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: RFValue(14),
                      fontFamily: Fonts.Bold,
                      color: colors.Red,
                    },
                  ]}>
                  OTP: {idx(item, (_) => _.otp)}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.25,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => goToHelp()}
                  style={{
                    height: RFValue(25),
                    width: RFValue(65),
                    backgroundColor: colors.Red,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: RFValue(5),
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontFamily: Fonts.Regular,
                      color: colors.White,
                    }}>
                    Get Help
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    {
                      fontSize: RFValue(14),
                      paddingTop: RFValue(10),
                      fontFamily: Fonts.Bold,
                    },
                    blackTextColor,
                  ]}>
                  ID #{item.receiptId}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: RFPercentage(8),

                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'green',
              }}>
              <View
                style={{
                  flex: 0.65,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconsFa
                  name={'circle'}
                  size={RFValue(15)}
                  color={colors.Green}
                />
                <Text
                  style={[
                    {
                      fontSize: RFValue(16),
                      fontFamily: Fonts.Medium,
                      color: colors.Black,
                      paddingLeft: RFValue(10),
                    },
                    blackTextColor,
                  ]}>
                  {item.currentLocation
                    ? renderCustomStatus(item.currentLocation)
                    : renderStatusText(item.status, item.driverStatus)}
                </Text>
              </View>
              <View style={{flex: 0.35, alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => {
                    trackOrder(item);
                  }}
                  style={{
                    height: RFValue(25),
                    width: RFValue(80),
                    backgroundColor: colors.Green,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: RFValue(5),
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      fontFamily: Fonts.Regular,
                      color: colors.White,
                    }}>
                    Track Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{flex: 0.28}}>
              {item.bookedItems &&
                item.bookedItems.map((val, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: RFValue(35),
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            height: RFValue(20),
                            width: RFValue(20),
                            backgroundColor: colors.Background,
                            alignItems: 'center',
                            borderRadius: RFValue(5),
                            justifyContent: 'center',
                            borderWidth: 1.5,
                            borderColor:
                              theme == 'dark' ? colors.Primary : colors.White,
                          }}>
                          <Text
                            style={[
                              {
                                fontSize: RFValue(13),
                                fontFamily: Fonts.Medium,
                                color: colors.Primary,
                                backgroundColor: colors.Background,
                              },
                            ]}>
                            {val.quantity}
                          </Text>
                        </View>

                        <Text
                          style={[
                            {
                              fontSize: RFValue(14),
                              fontFamily: Fonts.Medium,
                              color: colors.Lgrey,
                              paddingLeft: RFValue(10),
                            },
                            blackTextColor,
                          ]}>
                          {val.productName}
                        </Text>
                      </View>
                      <Text
                        style={[
                          {
                            fontSize: RFValue(16),
                            fontFamily: Fonts.Medium,
                            color: colors.Lgrey,
                          },
                          blackTextColor,
                        ]}>
                        ${val.productPrice}
                      </Text>
                    </View>
                  );
                })}

              {/* <View style={{flex: 0.7}}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    fontFamily: Fonts.Medium,
                    color: colors.Lgrey,
                    paddingLeft: RFValue(17.5),
                  }}>
                  Spicy please
                </Text>
              </View> */}
            </View>
            <View
              style={{
                height: RFPercentage(5),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  {
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  },
                  blackTextColor,
                ]}>
                Total{}
              </Text>
              <Text
                style={{
                  fontSize: RFValue(19),
                  fontFamily: Fonts.Medium,
                  color: colors.Red,
                }}>
                ${item.totalAmount && item.totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default MyOrders;
