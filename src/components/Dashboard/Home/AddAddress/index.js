/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import Button from 'components/Common/buttonComponent';
import ImageComponent from 'components/Common/imageComponent';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import GetPolyline from 'utils/polyline';
import {mapStyleDark} from 'constants/customMap';

const {height} = Dimensions.get('window');

function AddAddress(props) {
  const {
    proceed,
    formattedAddress,
    changeAdderss,
    formattedAddressStopOne,
    formattedAddressStopTwo,
    descriptionOne,
    descriptionTwo,
    latitude,
    longitude,
    stopOneLatitude,
    stopOneLongitude,
    stopTwoLatitude,
    stopTwoLongitude,
    merchantDetails,
    userData,
    theme,
    stop1Price,
    stop2Price,
    deliveryIs,
  } = props;
  const [stopStep, setStopStep] = useState(1);
  const [polylineOne, setPolyLineOne] = useState([]);
  const [polylineTwo, setPolyLineTwo] = useState([]);
  const {colorBackground, blackTextColor} = getStyles(theme);

  const _getPolyline = async (firstPoly) => {
    if (firstPoly) {
      let items = await GetPolyline(
        latitude,
        longitude,
        stopOneLatitude,
        stopOneLongitude,
      );

      setPolyLineOne(items);
    } else {
      let items = await GetPolyline(
        stopTwoLatitude,
        stopTwoLongitude,
        stopOneLatitude,
        stopOneLongitude,
      );
      setPolyLineTwo(items);
    }
  };

  useEffect(() => {
    _getPolyline(true);
  }, [stopOneLatitude, stopOneLongitude]);

  return (
    <View
      style={[
        {
          flexGrow: 1,
          paddingHorizontal: RFValue(20),
        },
        colorBackground,
      ]}
      keyboardShouldPersistTaps="handled">
      <View style={{height: RFValue(30)}}>
        <Text
          style={[
            {fontSize: RFValue(18), fontFamily: Fonts.Medium},
            blackTextColor,
          ]}>
          Add Drop Locations and Stops
        </Text>
      </View>

      {!deliveryIs && (
        <View
          style={{
            height: RFValue(55),
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View style={{flex: 0.9}}>
            <View style={{flex: 0.4}}>
              <Text
                style={[
                  {fontSize: RFValue(15), fontFamily: Fonts.Medium},
                  blackTextColor,
                ]}>
                {(merchantDetails && merchantDetails.name) ||
                  idx(merchantDetails, (_) => _.merchantId.name)}
              </Text>
            </View>
            <View style={{flex: 0.6, justifyContent: 'flex-start'}}>
              <Text
                numberOfLines={2}
                style={[
                  {
                    fontSize: RFValue(13),
                    fontFamily: Fonts.Medium,
                    color: colors.Lgrey,
                  },
                  blackTextColor,
                ]}>
                {(merchantDetails && merchantDetails.address) ||
                  idx(merchantDetails, (_) => _.merchantId.address)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* {(stopStep == 2 || stopStep == 3) && (
        <TouchableOpacity
          onPress={() => {
            changeAdderss('stop1');
          }}
          style={{
            height: RFValue(55),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View style={{flex: 0.7}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={[
                  {
                    fontSize: RFValue(15),
                    fontFamily: Fonts.Medium,
                  },
                  blackTextColor,
                ]}>
                {formattedAddressStopOne || 'Press to change'}
              </Text>
              {descriptionOne ? (
                <Text
                  style={[
                    {
                      fontSize: RFValue(13),
                      fontFamily: Fonts.Medium,
                      color: colors.Grey,
                    },
                    blackTextColor,
                  ]}>
                  Pickup: {descriptionOne}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{flex: 0.2, justifyContent: 'center'}}>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Medium,
                  color: colors.Lgrey,
                },
                // blackTextColor,
              ]}>
              ${stop1Price}
            </Text>
          </View>
        </TouchableOpacity>
      )} */}
      {/* {stopStep == 3 && (
        <TouchableOpacity
          onPress={() => {
            changeAdderss('stop2');
          }}
          style={{height: RFValue(55), flexDirection: 'row'}}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View style={{flex: 0.7}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={[
                  {
                    fontSize: RFValue(15),
                    fontFamily: Fonts.Medium,
                  },
                  blackTextColor,
                ]}>
                {formattedAddressStopTwo || 'Press to change'}
              </Text>
              {descriptionTwo ? (
                <Text
                  numberOfLines={2}
                  style={[
                    {
                      fontSize: RFValue(13),
                      fontFamily: Fonts.Medium,
                      color: colors.Grey,
                    },
                    blackTextColor,
                  ]}>
                  Pickup: {descriptionTwo}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{flex: 0.2, justifyContent: 'center'}}>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Medium,
                  color: colors.Lgrey,
                },
                // blackTextColor,
              ]}>
              ${stop2Price}
            </Text>
          </View>
        </TouchableOpacity>
      )} */}
      {!formattedAddressStopOne ? (
        <TouchableOpacity
          onPress={() => {
            // if (stopStep == 1) {
            //   setStopStep(2);
            // } else if (stopStep == 2) {
            //   setStopStep(3);
            // }
            changeAdderss('stop1');

            // if (!formattedAddressStopOne) {
            //   changeAdderss('stop1');
            // } else if (formattedAddressStopOne && !formattedAddressStopTwo) {
            //   changeAdderss('stop2');
            // }
          }}
          style={{
            height: RFValue(40),
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View
            style={{
              flex: 0.9,
              // justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image source={Images.AddMore} resizeMode="contain" />
            <Text
              numberOfLines={2}
              style={{
                fontSize: RFValue(13),
                fontFamily: Fonts.Medium,
                color: colors.Lgrey,
                paddingLeft: RFValue(10),
              }}>
              Add more{' '}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            changeAdderss('stop1');
          }}
          style={{
            height: RFValue(55),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View style={{flex: 0.7}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={[
                  {
                    fontSize: RFValue(15),
                    fontFamily: Fonts.Medium,
                  },
                  blackTextColor,
                ]}>
                {formattedAddressStopOne}
              </Text>
              {descriptionOne ? (
                <Text
                  style={[
                    {
                      fontSize: RFValue(13),
                      fontFamily: Fonts.Medium,
                      color: colors.Grey,
                    },
                    blackTextColor,
                  ]}>
                  Pickup: {descriptionOne}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{flex: 0.2, justifyContent: 'center'}}>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Medium,
                  color: colors.Lgrey,
                },
                // blackTextColor,
              ]}>
              ${stop1Price}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {formattedAddressStopOne && !formattedAddressStopTwo ? (
        <TouchableOpacity
          onPress={() => {
            changeAdderss('stop2');
          }}
          style={{
            height: RFValue(40),
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View
            style={{
              flex: 0.9,
              // justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image source={Images.AddMore} resizeMode="contain" />
            <Text
              numberOfLines={2}
              style={{
                fontSize: RFValue(13),
                fontFamily: Fonts.Medium,
                color: colors.Lgrey,
                paddingLeft: RFValue(10),
              }}>
              Add more{' '}
            </Text>
          </View>
        </TouchableOpacity>
      ) : formattedAddressStopTwo ? (
        <TouchableOpacity
          onPress={() => {
            changeAdderss('stop1');
          }}
          style={{
            height: RFValue(55),
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 0.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View style={{flex: 0.7}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                numberOfLines={2}
                style={[
                  {
                    fontSize: RFValue(15),
                    fontFamily: Fonts.Medium,
                  },
                  blackTextColor,
                ]}>
                {formattedAddressStopTwo}
              </Text>
              {descriptionOne ? (
                <Text
                  style={[
                    {
                      fontSize: RFValue(13),
                      fontFamily: Fonts.Medium,
                      color: colors.Grey,
                    },
                    blackTextColor,
                  ]}>
                  Pickup: {descriptionTwo}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{flex: 0.2, justifyContent: 'center'}}>
            <Text
              style={[
                {
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Medium,
                  color: colors.Lgrey,
                },
                // blackTextColor,
              ]}>
              ${stop2Price}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}

      {/* {(stopStep == 1 || stopStep == 2) && (
        <TouchableOpacity
          onPress={() => {
            if (stopStep == 1) {
              setStopStep(2);
            } else if (stopStep == 2) {
              setStopStep(3);
            }
          }}
          style={{
            height: RFValue(40),
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(15), width: RFValue(15)}}
            />
          </View>
          <View
            style={{
              flex: 0.9,
              // justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image source={Images.AddMore} resizeMode="contain" />
            <Text
              numberOfLines={2}
              style={{
                fontSize: RFValue(13),
                fontFamily: Fonts.Medium,
                color: colors.Lgrey,
                paddingLeft: RFValue(10),
              }}>
              Add more{' '}
            </Text>
          </View>
        </TouchableOpacity>
      )} */}

      <TouchableOpacity
        onPress={() => {
          changeAdderss('current');
        }}
        style={{height: RFValue(55), flexDirection: 'row'}}>
        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: RFValue(10),
              width: RFValue(10),
              borderRadius: RFValue(100),
              backgroundColor: colors.Green,
            }}></View>
        </View>
        <View style={{flex: 0.9, flexDirection: 'row'}}>
          <View style={{flex: 0.9, justifyContent: 'center'}}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: RFValue(13),
                fontFamily: Fonts.Medium,
                color: colors.Green,
              }}>
              <Text>{idx(userData, (_) => _.data.firstname)}:</Text>{' '}
              {formattedAddress}
            </Text>
          </View>
          <View
            style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
            <IconsFa
              name={'chevron-right'}
              size={RFValue(15)}
              color={colors.Green}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View
        style={{
          height: RFPercentage(45),
          borderRadius: RFValue(5),
          overflow: 'hidden',
        }}>
        <MapView
          customMapStyle={theme == 'dark' ? mapStyleDark : []}
          provider={'google'}
          style={{flex: 1}}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}>
          {/* <Image source={Images.Pin} resizeMode="contain" /> */}

          {/* {polylineOne && polylineOne.length > 0 ? (
            <Polyline
              coordinates={[
                ...polylineOne, // optional
              ]}
              strokeWidth={3}
              strokeColor={'#686868'}
            />
          ) : null}
          {polylineTwo && polylineTwo.length > 0 ? (
            <Polyline
              coordinates={[
                ...polylineTwo, // optional
              ]}
              strokeWidth={3}
              strokeColor={'#686868'}
            />
          ) : null} */}

          {idx(merchantDetails, (_) => _.location[1]) && (
            <MapView.Marker
              coordinate={{
                latitude:
                  idx(merchantDetails, (_) => _.location[1]) ||
                  idx(merchantDetails, (_) => _.dropPoints[0].location[1]),

                longitude:
                  idx(merchantDetails, (_) => _.location[0]) ||
                  idx(merchantDetails, (_) => _.dropPoints[0].location[0]),

                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}>
              <View
                style={{
                  height: RFValue(40),
                  width: RFValue(40),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: RFValue(5),
                  borderWidth: 0.7,
                  borderColor: colors.Primary,
                  backgroundColor: colors.Background,
                }}>
                <ImageComponent
                  styles={{height: RFValue(25), width: RFValue(25)}}
                  resizeMode={'contain'}
                  uri={
                    idx(merchantDetails, (_) => _.merchant_image) ||
                    idx(merchantDetails, (_) => _.merchantId.merchant_image)
                  }
                />
              </View>
            </MapView.Marker>
          )}

          <MapView.Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(20), width: RFValue(20)}}
            />
          </MapView.Marker>
          {formattedAddressStopOne && (
            <MapView.Marker
              coordinate={{
                latitude: stopOneLatitude,
                longitude: stopOneLongitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}>
              <Image
                source={Images.Pin}
                resizeMode="contain"
                style={{height: RFValue(20), width: RFValue(20)}}
              />
            </MapView.Marker>
          )}
          {formattedAddressStopTwo && (
            <MapView.Marker
              coordinate={{
                latitude: stopTwoLatitude,
                longitude: stopTwoLongitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }}>
              <Image
                source={Images.Pin}
                resizeMode="contain"
                style={{height: RFValue(20), width: RFValue(20)}}
              />
            </MapView.Marker>
          )}
        </MapView>
      </View>
      <View
        style={{
          height: RFPercentage(10),
          // paddingTop: RFValue(10),
        }}>
        <Button
          title={'Next'}
          //   loading={loading}
          //   disabled={loading}
          onPress={() => {
            proceed();
          }}
          containerHeight={RFValue(80)}
          justifyContent={'center'}
        />
      </View>
    </View>
  );
}

export default AddAddress;
