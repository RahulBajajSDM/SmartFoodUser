/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import ImageComponent from 'components/Common/imageComponent';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import GetPolyline from 'utils/polyline';
import {mapStyleDark} from 'constants/customMap';

const {height} = Dimensions.get('window');

function TrackingModal(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [polylineToMerchant, setPolyLineToMerchant] = useState([]);
  const [polylineToStop1, setPolyLineToStop1] = useState([]);
  const [polylineToStop2, setPolyLineToStop2] = useState([]);
  const [polylineToUser, setPolyLineToUser] = useState([]);
  const [polylineMerchantToUser, setPolyLineMerchantToUser] = useState([]);
  const [polylineStop1ToUser, setPolyLineStop1ToUser] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [merchantCoordinates, setMerchantCoodinates] = useState([]);
  const [stop1Coordinates, setStop1Coordinates] = useState([]);
  const [stop2Coordinates, setStop2Coordinates] = useState([]);
  const [polyLineDriverToStop1, setpolyLineDriverToStop1] = useState([]);

  const [status, selectedStatus] = useState('Approved');
  const {
    visible,
    latitude,
    longitude,
    closeModal,
    selectedOrder,
    theme,
  } = props;

  const allActiveOrders = useSelector(
    (state) => state.dashboardReducer.activeLastorders,
  );
  const themeReducer = useSelector((state) => state.themeReducer.theme);
  const {colorBackground, blackTextColor, container} = getStyles(themeReducer);

  useEffect(() => {
    let merchantCoordinates = idx(
      selectedOrder,
      (_) => _.dropPoints.find((o) => o.type == 'merchant').location,
    );

    let stop1Coordinates = idx(
      selectedOrder,
      (_) => _.dropPoints.find((o) => o.type == 'stop1').location,
    );

    let stop2Coordinates = idx(
      selectedOrder,
      (_) => _.dropPoints.find((o) => o.type == 'stop2').location,
    );

    let userCoordinates = idx(
      selectedOrder,
      (_) =>
        _.dropPoints.find((o) => o.type == 'user' || o.type == 'initial')
          .location,
    );

    setMerchantCoodinates(merchantCoordinates);
    setStop1Coordinates(stop1Coordinates);
    setStop2Coordinates(stop2Coordinates);
    setUserCoordinates(userCoordinates);

    getPolyline(
      latitude,
      longitude,
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      'merchant',
    ); // ployline of driver to merchant

    getPolyline(
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'stop1',
    ); // ployline of merchant to stop1
    getPolyline(
      stop2Coordinates && stop2Coordinates[1],
      stop2Coordinates && stop2Coordinates[0],
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'stop2',
    ); // ployline of stop1 to stop2
    getPolyline(
      stop2Coordinates && stop2Coordinates[1],
      stop2Coordinates && stop2Coordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'user',
    ); // ployline of stop2 to user
    getPolyline(
      merchantCoordinates && merchantCoordinates[1],
      merchantCoordinates && merchantCoordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'merchantToUser',
    ); // ployline of merchant to user
    getPolyline(
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      userCoordinates && userCoordinates[1],
      userCoordinates && userCoordinates[0],
      'stop1ToUser',
    ); // ployline of stop1 to user
    getPolyline(
      latitude,
      longitude,
      stop1Coordinates && stop1Coordinates[1],
      stop1Coordinates && stop1Coordinates[0],
      'driverToStop1',
    ); // ployline of driver to merchant
  }, [latitude, longitude]);

  useEffect(() => {
    let orderStatus = allActiveOrders.find(
      (o) => o._id == (selectedOrder && selectedOrder._id),
    );

    selectedStatus(
      (orderStatus && orderStatus.driverStatus) ||
        (orderStatus && orderStatus.status),
    );
  }, [allActiveOrders]);

  const getPolyline = async (
    sourceLat,
    sourceLng,
    destinationLat,
    destinationLng,
    type,
  ) => {
    let items = await GetPolyline(
      sourceLat,
      sourceLng,
      destinationLat,
      destinationLng,
    );

    if (type == 'merchant') {
      setPolyLineToMerchant(items);
    } else if (type == 'stop1') {
      setPolyLineToStop1(items);
    } else if (type == 'stop2') {
      setPolyLineToStop2(items);
    } else if (type == 'user') {
      setPolyLineToUser(items);
    } else if (type == 'merchantToUser') {
      setPolyLineMerchantToUser(items);
    } else if (type == 'stop1ToUser') {
      setPolyLineStop1ToUser(items);
    } else if (type == 'driverToStop1') {
      setpolyLineDriverToStop1(items);
    }
  };

  let estimatedTime = idx(selectedOrder, (_) => _.estimatedTime);
  let convertedTime = moment.utc(estimatedTime * 1000).format('HH:mm:ss');

  const getPolyLinePath = () => {
    console.log(props, 'POLLINEEEEE');
    let isCustom = idx(selectedOrder, (_) => _.currentLocation);
    let normalPath =
      userCoordinates &&
      merchantCoordinates &&
      !stop1Coordinates &&
      !stop2Coordinates; // Merchant>>Destination

    let stop1Path =
      userCoordinates &&
      merchantCoordinates &&
      stop1Coordinates &&
      !stop2Coordinates; // Merchant>>Stop1>>Destination

    let stop2Path =
      userCoordinates &&
      merchantCoordinates &&
      stop1Coordinates &&
      stop2Coordinates; // Merchant>>Stop1>>Stop2>>Destination

    let customPathOne = stop1Coordinates && userCoordinates; //Driver>>Stop1>>>User

    let customPathTwo = stop1Coordinates && stop2Coordinates && userCoordinates; //Driver>>Stop1>>>Stop2>>>User

    if (idx(props, (_) => _.selectedOrder.merchantId)) {
      if (normalPath) {
        return (
          <>
            {polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={3}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineMerchantToUser && (
              <Polyline
                coordinates={[...polylineMerchantToUser]}
                strokeWidth={3}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      } else if (stop1Path) {
        return (
          <>
            {polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={3}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToStop1 && (
              <Polyline
                coordinates={[...polylineToStop1]}
                strokeWidth={3}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineStop1ToUser && (
              <Polyline
                coordinates={[...polylineStop1ToUser]}
                strokeWidth={3}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      } else if (stop2Path) {
        return (
          <>
            {polylineToMerchant && (
              <Polyline
                coordinates={[...polylineToMerchant]}
                strokeWidth={3}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToStop1 && (
              <Polyline
                coordinates={[...polylineToStop1]}
                strokeWidth={3}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToStop2 && (
              <Polyline
                coordinates={[...polylineToStop2]}
                strokeWidth={3}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToUser && (
              <Polyline
                coordinates={[...polylineToUser]}
                strokeWidth={3}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      }
    } else {
      if (customPathOne) {
        return (
          <>
            {polyLineDriverToStop1 && (
              <Polyline
                coordinates={[...polyLineDriverToStop1]}
                strokeWidth={5}
                strokeColor={colors.Red}
              />
            )}
            {polylineStop1ToUser && (
              <Polyline
                coordinates={[...polylineStop1ToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      } else {
        return (
          <>
            {polyLineDriverToStop1 && (
              <Polyline
                coordinates={[...polyLineDriverToStop1]}
                strokeWidth={5}
                strokeColor={colors.Red}
              />
            )}
            {polylineStop1ToUser && (
              <Polyline
                coordinates={[...polylineStop1ToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
            {polylineToStop2 && (
              <Polyline
                coordinates={[...polylineToStop2]}
                strokeWidth={5}
                strokeColor={'#F017165A'}
              />
            )}
            {polylineToUser && (
              <Polyline
                coordinates={[...polylineToUser]}
                strokeWidth={5}
                strokeColor={colors.LGreen}
              />
            )}
          </>
        );
      }
    }
  };

  const renderCustomStatus = () => {
    let orderStatus = allActiveOrders.find((o) => o._id == selectedOrder._id);
    let isCustom = orderStatus && orderStatus.merchantId;

    let customStat = orderStatus && orderStatus.currentLocation;
    if (!isCustom) {
      if (customStat == 'initial') {
        return 'On the Way To Stop 1';
      } else if (customStat == 'stop2') {
        return 'On the Way To Stop 2';
      } else if (customStat == 'completed') {
        return 'Completed';
      }
    } else {
      if (status == 'Reached') {
        return 'Driver arrived at merchant';
      } else if (status == 'Pickedup') {
        return 'Driver has picked up your order';
      } else {
        return status;
      }
    }
  };
  const getMarkers = () => {
    return (
      <>
        {/* Driver Marker */}
        {markerBody(latitude, longitude, Images.TrackTruck)}
        {/* User Marker */}
        {markerBody(
          userCoordinates && userCoordinates[1],
          userCoordinates && userCoordinates[0],
          Images.Man,
        )}
        {/* MerchantMarker */}
        {markerBody(
          merchantCoordinates && merchantCoordinates[1],
          merchantCoordinates && merchantCoordinates[0],
          {
            uri: idx(selectedOrder, (_) => _.merchantId.merchant_image),
          },
        )}
        {/* Stop 1 Marker */}
        {markerBody(
          stop1Coordinates && stop1Coordinates[1],
          stop1Coordinates && stop1Coordinates[0],
          Images.Pin,
        )}
        {/* Stop 2 Marker */}
        {markerBody(
          stop2Coordinates && stop2Coordinates[1],
          stop2Coordinates && stop2Coordinates[0],
          Images.Pin,
        )}
      </>
    );
  };

  const markerBody = (latitude, longitude, icon) => {
    return (
      <Marker
        coordinate={{
          latitude: latitude || 37.78825,
          longitude: longitude || -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <View
          style={{
            height: RFValue(35),
            width: RFValue(35),
            borderRadius: RFValue(5),
            borderColor: colors.Primary,
            backgroundColor: colors.White,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: RFValue(20), width: RFValue(20)}}
            resizeMode={'contain'}
            source={icon} //TODO UPDATE WITH YOUR CHECK IMGAE
          />
        </View>
      </Marker>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => null}>
      <SafeAreaView
        style={[
          {
            flex: 1,
          },
          colorBackground,
        ]}>
        <View
          style={{
            flex: 0.07,
            flexDirection: 'row',
            paddingHorizontal: RFValue(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              closeModal();
            }}
            style={{flex: 0.2, justifyContent: 'center'}}>
            <IconsFa
              name={'arrow-left'}
              size={RFValue(20)}
              color={colors.Primary}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.13,
            flexDirection: 'row',
            paddingHorizontal: RFValue(20),
          }}>
          <View
            style={{
              flex: 0.2,
              paddingTop: RFValue(5),
              alignItems: 'center',
            }}>
            <View
              style={{
                height: RFValue(55),
                width: RFValue(55),
                borderRadius: RFValue(5),
                backgroundColor:
                  themeReducer == 'dark' ? colors.Black : colors.Background,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: themeReducer == 'dark' ? 1.5 : 0,
                borderColor:
                  themeReducer == 'dark' ? colors.Primary : colors.White,
              }}>
              {idx(selectedOrder, (_) => _.merchantId.merchant_image) ? (
                <ImageComponent
                  styles={{height: RFValue(40), width: RFValue(40)}}
                  resizeMode={'contain'}
                  uri={idx(selectedOrder, (_) => _.merchantId.merchant_image)}
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
              flex: 0.2,
              // alignItems: 'flex-start',
              // backgroundColor: 'red',
            }}>
            {idx(selectedOrder, (_) => _.merchantId.name) ? (
              <Text
                style={[
                  {
                    fontSize: RFValue(17),
                    fontFamily: Fonts.Medium,
                    color: colors.Primary,
                    paddingTop: RFValue(8),
                    paddingLeft: RFValue(10),
                  },
                ]}>
                {idx(selectedOrder, (_) => _.merchantId.name)}
              </Text>
            ) : (
              <>
                <Text
                  style={[
                    {
                      fontSize: RFValue(15),
                      fontFamily: Fonts.Medium,
                    },
                    blackTextColor,
                  ]}>
                  {idx(
                    selectedOrder,
                    (_) =>
                      _.dropPoints.find((o) => o.type == 'stop1').description,
                  ) &&
                    `Stop1: ${idx(
                      selectedOrder,
                      (_) =>
                        _.dropPoints.find((o) => o.type == 'stop1').description,
                    )}`}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: RFValue(15),
                      fontFamily: Fonts.Medium,
                    },
                    blackTextColor,
                  ]}>
                  {idx(
                    selectedOrder,
                    (_) =>
                      _.dropPoints.find((o) => o.type == 'stop2').description,
                  ) &&
                    `Stop2: ${idx(
                      selectedOrder,
                      (_) =>
                        _.dropPoints.find((o) => o.type == 'stop2').description,
                    )}`}
                </Text>
              </>
            )}
          </View>
          <View
            style={{
              flex: 0.6,
              alignItems: 'flex-end',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                fontSize: RFValue(16),
                fontFamily: Fonts.Medium,
                color: colors.Primary,
              }}>
              Order Ready in:{' '}
              <Text
                style={[
                  {
                    fontSize: RFValue(17),
                    fontFamily: Fonts.Bold,
                    color: colors.Black,
                  },
                  blackTextColor,
                ]}>
                {convertedTime}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: RFValue(16),
                fontFamily: Fonts.Medium,
                color: colors.Primary,
              }}>
              Order Id{' '}
              <Text
                style={[
                  {
                    fontSize: RFValue(17),
                    fontFamily: Fonts.Bold,
                    color: colors.Black,
                  },
                  blackTextColor,
                ]}>
                #{idx(selectedOrder, (_) => _.receiptId)}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: RFValue(13),
                fontFamily: Fonts.Medium,
                color: colors.Lgrey,
              }}>
              {idx(selectedOrder, (_) => _.bookedItems.length) > 1
                ? 'Multiple Orders'
                : idx(selectedOrder, (_) => _.bookedItems.length == 0)
                ? 'Single Order'
                : !idx(selectedOrder, (_) => _.bookedItems)
                ? 'Custom Order'
                : ''}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.05,
            alignItems: 'flex-end',
            paddingHorizontal: RFValue(20),
          }}>
          <Text
            numberOfLines={2}
            style={[
              {
                fontSize: RFValue(13),
                fontFamily: Fonts.Medium,
                color: colors.Lgrey,
                textAlign: 'right',
              },
              blackTextColor,
            ]}>
            {idx(
              selectedOrder,
              (_) =>
                _.dropPoints.find(
                  (o) => o.type == 'user' || o.type == 'initial',
                ).address,
            )}
          </Text>
        </View>
        <View style={{flex: 0.75}}>
          <MapView
            customMapStyle={themeReducer == 'dark' ? mapStyleDark : []}
            provider={'google'}
            region={{
              latitude: latitude || 37.78825,
              longitude: longitude || -122.4324,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            style={{height: '100%', width: '100%'}}>
            {getPolyLinePath()}
            {getMarkers()}
          </MapView>
        </View>
        <View
          style={{
            height: RFValue(40),
            borderRadius: RFValue(5),
            position: 'absolute',
            bottom: RFValue(30),
            backgroundColor: colors.LGreen,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.8,
            paddingHorizontal: RFValue(10),
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: colors.White,
              fontFamily: Fonts.Bold,
            }}>
            {renderCustomStatus()}
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
export default TrackingModal;
