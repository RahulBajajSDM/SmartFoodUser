/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import {confirmDelivery} from 'actions/dashboardActions';
import {pop} from 'actions/appActions/AppActions';

import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
const {height} = Dimensions.get('window');

function TrackOrder(props) {
  const dispatch = useDispatch();

  const [status, selectedStatus] = useState('Pending');

  const {liveTracking, selectedOrder, theme, componentId} = props;
  let estimatedTime = idx(selectedOrder, (_) => _.estimatedTime);
  const allActiveOrders = useSelector(
    (state) => state.dashboardReducer.activeLastorders,
  );
  const themeReducer = useSelector((state) => state.themeReducer.theme);

  useEffect(() => {
    let orderStatus = allActiveOrders.find((o) => o._id == selectedOrder._id);
    selectedStatus(orderStatus && orderStatus.driverStatus);
    if (orderStatus == undefined) dispatch(pop(componentId));
  }, [allActiveOrders]);

  const calculateEstimated = () => {
    var num = idx(selectedOrder, (_) => _.estimatedTimeValue);

    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours > 0
      ? rhours + ' hour(s) and ' + rminutes + ' minute(s).'
      : +rminutes + ' minute(s).';
  };
  let firstStop = idx(selectedOrder, (_) => _.firstStop);
  let secondStop = idx(selectedOrder, (_) => _.secondStop);
  let allProductBasePrice = idx(selectedOrder, (_) =>
    _.bookedItems
      .map((o) => o.productPrice)
      .reduce((prev, next) =>
        prev && next ? parseFloat(prev) + parseFloat(next) : 0,
      ),
  );
  let totalAddonsPrice = idx(
    selectedOrder,
    (_) =>
      _.bookedItems.map(
        (o) =>
          o.addOns &&
          o.addOns.map((x) =>
            x.item
              .map((y) => y.price)
              .reduce((prev, next) =>
                prev && next ? parseFloat(prev) + parseFloat(next) : 0,
              ),
          )[0],
      )[0],
  );
  let finalAddonPrice = totalAddonsPrice ? totalAddonsPrice : 0;
  let taxFee = idx(selectedOrder, (_) => _.taxFee);
  console.log(
    firstStop,
    secondStop,
    idx(selectedOrder, (_) => _.deleiveryFee),
    idx(selectedOrder, (_) => _.riderTip),
    totalAddonsPrice,
    allProductBasePrice,
    taxFee,
    'calculateEstimated',
    allProductBasePrice,
  );

  const {colorBackground, blackTextColor, container} = getStyles(themeReducer);
  const itemBody = (title, cost, quantity) => {
    return (
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 0.1,
          }}>
          <View
            style={{
              backgroundColor: colors.Yellow,
              width: RFValue(15),
              borderRadius: RFValue(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  fontSize: RFValue(13),
                  fontFamily: Fonts.Regular,
                  color: colors.Lgrey,
                  paddingHorizontal: RFValue(3),
                },
              ]}>
              {quantity}
            </Text>
          </View>
        </View>
        <View style={{flex: 0.7}}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}>
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            alignItems: 'flex-end',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Medium,
                color: colors.Green,
              },
            ]}>
            ${cost}
          </Text>
        </View>
      </View>
    );
  };
  let initialStatus =
    status == '' ||
    status == 'On the Way to merchant' ||
    status == 'Reached' ||
    status == 'Pickedup' ||
    status == 'On the Way to Customer' ||
    status == 'Completed' ||
    status == 'Finalized';

  let secondaryStatus =
    status == 'On the Way to merchant' ||
    status == 'Reached' ||
    status == 'Pickedup' ||
    status == 'On the Way to Customer' ||
    status == 'Completed' ||
    status == 'Finalized';

  let thirdStatus =
    status == 'Pickedup' ||
    status == 'On the Way to Customer' ||
    status == 'Completed' ||
    status == 'Finalized';

  let finalStatus = status == 'Completed' || status == 'Finalized';
  const normalOrder = () => {
    console.log(
      allActiveOrders.find((o) => o._id == selectedOrder._id),
      'STATUS==========>',
      status,
    );

    return (
      <>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={initialStatus ? 'check' : 'circle'}
            size={RFValue(15)}
            color={initialStatus ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: initialStatus ? Fonts.Medium : Fonts.Regular,
                color: initialStatus ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Your Order has been received
          </Text>
        </View>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={secondaryStatus ? 'check' : 'circle'}
            size={RFValue(15)}
            color={secondaryStatus ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: secondaryStatus ? Fonts.Medium : Fonts.Regular,
                color: secondaryStatus ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Your order is being prepared
          </Text>
        </View>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={thirdStatus ? 'check' : 'circle'}
            size={RFValue(15)}
            color={thirdStatus ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: thirdStatus ? Fonts.Medium : Fonts.Regular,
                color: thirdStatus ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Your order is pickedup by driver
          </Text>
        </View>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={finalStatus ? 'check' : 'circle'}
            size={RFValue(15)}
            color={finalStatus ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: finalStatus ? Fonts.Medium : Fonts.Regular,
                color: finalStatus ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Order delivered
          </Text>
        </View>
      </>
    );
  };

  const customOrder = () => {
    let customOrderStatusFour = idx(
      selectedOrder,
      (_) => _.status == 'Completed',
    );
    let customOrderStatusThree =
      idx(selectedOrder, (_) => _.currentLocation == 'stop2') ||
      customOrderStatusFour;
    let customOrderStatusTwo =
      idx(selectedOrder, (_) => _.currentLocation == 'stop1') ||
      customOrderStatusThree;

    let customOrderStatusOne =
      idx(selectedOrder, (_) => _.currentLocation == 'initial') ||
      customOrderStatusTwo ||
      customOrderStatusThree ||
      customOrderStatusFour;
    return (
      <>
        <View
          style={{
            flex: 0.06,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={customOrderStatusOne ? 'check' : 'circle'}
            size={RFValue(15)}
            color={customOrderStatusOne ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: customOrderStatusOne ? Fonts.Medium : Fonts.Regular,
                color: customOrderStatusOne ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Driver is on it's way{' '}
          </Text>
        </View>
        <View
          style={{
            flex: 0.06,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={customOrderStatusTwo ? 'check' : 'circle'}
            size={RFValue(15)}
            color={customOrderStatusTwo ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: customOrderStatusTwo ? Fonts.Medium : Fonts.Regular,
                color: customOrderStatusTwo ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Driver has picked up your item from stop one
          </Text>
        </View>
        <View
          style={{
            flex: 0.06,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={customOrderStatusThree ? 'check' : 'circle'}
            size={RFValue(15)}
            color={customOrderStatusThree ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: customOrderStatusThree
                  ? Fonts.Medium
                  : Fonts.Regular,
                color: customOrderStatusThree ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Driver has picked up your item from stop two
          </Text>
        </View>
        <View
          style={{
            flex: 0.06,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconsFa
            name={customOrderStatusFour ? 'check' : 'circle'}
            size={RFValue(15)}
            color={customOrderStatusFour ? colors.Green : colors.Red}
          />
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: customOrderStatusFour
                  ? Fonts.Medium
                  : Fonts.Regular,
                color: customOrderStatusFour ? colors.Black : colors.Lgrey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Completed{' '}
          </Text>
        </View>
      </>
    );
  };
  return (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: RFValue(20),
        },
        colorBackground,
      ]}>
      <View style={{flex: 0.05}}>
        <Text
          style={[
            {
              fontFamily: Fonts.Regular,
              fontSize: RFValue(17),
              color: colors.Lgrey,
            },
            blackTextColor,
          ]}>
          Track Order
        </Text>
      </View>
      <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
        <Text
          style={[
            {
              fontFamily: Fonts.Regular,
              fontSize: RFValue(23),
            },
            blackTextColor,
          ]}>
          Thank You!
        </Text>
      </View>
      <View style={{flex: 0.05, justifyContent: 'flex-end'}}>
        <Text
          style={[
            {
              fontFamily: Fonts.Regular,
              fontSize: RFValue(14),
              color: colors.Lgrey,
            },
            blackTextColor,
          ]}>
          Our rider will be at your place around
        </Text>
      </View>
      <View
        style={{
          flex: 0.08,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: Fonts.Regular,
            fontSize: RFValue(35),
            color: colors.Red,
          }}>
          {/* 2:15 PM
           */}
          {/* {moment().add(estimatedTime, 'ms').format('hh:mm a')}
           */}
          {moment(estimatedTime).format('hh:mm a')}
        </Text>
        {status == 'Completed' ? null : (
          <TouchableOpacity
            onPress={() => {
              liveTracking();
            }}
            style={{
              height: RFValue(25),
              width: RFValue(90),
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
              Live Tracking{' '}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 0.08,
          justifyContent: 'space-evenly',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Regular,
              fontSize: RFValue(13),
              color: theme == 'dark' ? colors.White : colors.Lgrey,
            }}>
            Estimated Time
          </Text>
          <Text
            style={{
              color: theme == 'dark' ? colors.White : colors.Lgrey,
              fontFamily: Fonts.Regular,
              fontSize: RFValue(13),
            }}>
            Order ID
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Medium,
              fontSize: RFValue(13),
              color: theme == 'dark' ? colors.White : colors.Lgrey,
            }}>
            {calculateEstimated()}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Medium,
              fontSize: RFValue(13),
              color: theme == 'dark' ? colors.White : colors.Lgrey,
            }}>
            #{idx(selectedOrder, (_) => _.receiptId)}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: Fonts.Bold,
          fontSize: RFValue(15),
          color: colors.Red,
        }}>
        OTP {idx(props, (_) => _.selectedOrder.otp)}
      </Text>
      {idx(selectedOrder, (_) => _.merchantName)
        ? normalOrder()
        : customOrder()}

      {/* {status == 'Completed' ? null : (
        <TouchableOpacity
          onPress={() => {
            dispatch(confirmDelivery(true));
          }}
          style={{
            height: RFValue(50),
            borderRadius: RFValue(5),
            backgroundColor: colors.Primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Medium,
                color: colors.White,
              },
            ]}>
            Confirm Order Delivery
          </Text>
        </TouchableOpacity>
      )} */}
      <View
        style={{
          flex: 0.05,
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
        <Text
          style={[
            {
              fontSize: RFValue(23),
              fontFamily: Fonts.Regular,
              color: colors.Lgrey,
            },
            blackTextColor,
          ]}>
          Order Detail
        </Text>
      </View>
      <View style={{flex: 0.27}}>
        {firstStop ? (
          <View
            style={{
              height: RFValue(25),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Regular,
                  color: colors.Lgrey,
                },
                blackTextColor,
              ]}>
              Stop 1 Fees
            </Text>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Regular,
                  color: colors.Green,
                },
              ]}>
              ${firstStop}
            </Text>
          </View>
        ) : null}
        {secondStop ? (
          <View
            style={{
              height: RFValue(25),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Regular,
                  color: colors.Lgrey,
                },
                blackTextColor,
              ]}>
              Stop 2 Fees
            </Text>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Regular,
                  color: colors.Green,
                },
              ]}>
              ${secondStop}
            </Text>
          </View>
        ) : null}
        <View
          style={{
            height: RFValue(25),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}>
            Tax{' '}
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Green,
              },
            ]}>
            ${idx(selectedOrder, (_) => _.taxFee)}
          </Text>
        </View>
        <View
          style={{
            height: RFValue(25),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}>
            Delivery Fees
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Green,
              },
            ]}>
            ${idx(selectedOrder, (_) => _.deleiveryFee.toFixed(2))}
          </Text>
        </View>
        <View
          style={{
            height: RFValue(25),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}>
            Driver Tip
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
            ]}>
            ${idx(selectedOrder, (_) => _.riderTip)}
          </Text>
        </View>
        <View style={{height: RFPercentage(12)}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {idx(selectedOrder, (_) =>
              _.bookedItems.map((item, index) => {
                return (
                  <>
                    {itemBody(
                      item.productName,
                      item.productPrice,
                      item.quantity,
                    )}
                    {item.addOns.map((val, valIn) => {
                      return val.item.map((x, xin) => {
                        return (
                          <View
                            style={{
                              height: RFValue(25),
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={[
                                {
                                  fontSize: RFValue(15),
                                  fontFamily: Fonts.Regular,
                                  color: colors.Lgrey,
                                },
                                blackTextColor,
                              ]}>
                              {x.name}
                            </Text>
                            <Text
                              style={[
                                {
                                  fontSize: RFValue(15),
                                  fontFamily: Fonts.Regular,
                                  color: colors.Green,
                                },
                              ]}>
                              ${x.price}
                            </Text>
                          </View>
                        );
                      });
                    })}
                  </>
                );
              }),
            )}
          </ScrollView>
        </View>

        <View
          style={{
            height: RFPercentage(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopColor: colors.Primary,
            borderTopWidth: 0.5,
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(18),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}>
            Total{' '}
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(18),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}>
            $
            {(
              firstStop +
              secondStop +
              idx(selectedOrder, (_) => _.deleiveryFee) +
              idx(selectedOrder, (_) => _.riderTip) +
              finalAddonPrice +
              allProductBasePrice +
              taxFee
            ).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
export default TrackOrder;
