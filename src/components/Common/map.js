// import SpinnerLoader from 'components/common/spinnerLoader';
import * as Images from 'assets';
import Button from 'components/Common/buttonComponent';
import GoogleSearch from 'components/Common/googlePlacesSearch';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {mapStyleDark} from 'constants/customMap';
const MapComponent = (props) => {
  const [location, setLocation] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const {
    formattedAddress,
    latitude,
    longitude,
    setAddress,
    visible,
    closeModal,
    goBack,
    setDescription,
    description,
    setStore,
    store,
    selectedAddess,
    mapPressed,
    theme,
  } = props;
  const childRef = useRef();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  const onKeyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  console.log(keyboardHeight, 'keyboardHeightkeyboardHeight');

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={{flex: 1}}>
        <MapView
          customMapStyle={theme == 'dark' ? mapStyleDark : []}
          provider={'google'}
          style={{flex: 1}}
          showUserLocation
          followUserLocation
          loadingEnabled
          onPress={(e) => {
            mapPressed(e.nativeEvent.coordinate);
          }}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}>
          {/* <Image source={Images.Pin} resizeMode="contain" /> */}

          <MapView.Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}>
            <Image
              source={Images.Pin}
              resizeMode="contain"
              style={{height: RFValue(20), width: RFValue(20)}}
            />
          </MapView.Marker>
        </MapView>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            top: RFValue(35),
            flexDirection: 'row',
            paddingHorizontal: RFValue(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              closeModal();
            }}
            style={{paddingTop: RFValue(20)}}>
            <IconsFa
              name={'chevron-left'}
              size={RFValue(15)}
              color={colors.Primary}
            />
          </TouchableOpacity>

          <GoogleSearch
            searchedLocation={(data) => {
              setAddress({
                formatted_address: data.formatted_address,
                coordinates: data.geometry,
              });
            }}
            formattedAddress={formattedAddress}
            ref={childRef}
            theme={theme}
          />
        </View>
        <View
          style={{
            height: RFValue(80),
            width: '80%',
            alignSelf: 'center',
            bottom: RFValue(10),
            position: 'absolute',
          }}>
          <Button
            title={'Set Location'}
            onPress={() => {
              selectedAddess == 'current' ? goBack() : setLocation(true);
            }}
            containerHeight={RFValue(80)}
            justifyContent={'flex-end'}
          />
        </View>
        {location ? (
          <View
            style={{
              height: RFPercentage(50),
              width: '100%',
              backgroundColor: '#0009',
              position: 'absolute',
              bottom:
                Platform.OS == 'ios'
                  ? keyboardHeight > 0
                    ? keyboardHeight
                    : 0
                  : 0,
            }}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: RFValue(50),
                  width: '80%',
                  borderRadius: RFValue(5),
                  backgroundColor:
                    theme == 'dark' ? colors.Black : colors.White,
                }}>
                <TextInput
                  style={{
                    flex: 1,
                    paddingHorizontal: RFValue(10),
                    forntSize: RFValue(10),
                    fontFamily: Fonts.Regular,
                    color: theme == 'dark' ? colors.White : colors.Black,
                  }}
                  placeholder={'Store Name'}
                  onChangeText={(text) => setStore(text)}
                  value={store}
                  placeholderTextColor={
                    theme == 'dark' ? colors.White : colors.Grey
                  }
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.7,
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: RFValue(130),
                  width: '80%',
                  borderRadius: RFValue(5),
                  backgroundColor: colors.White,
                  overflow: 'hidden',
                  backgroundColor:
                    theme == 'dark' ? colors.Black : colors.White,
                }}>
                <TextInput
                  style={{
                    flex: 1,
                    paddingHorizontal: RFValue(10),
                    forntSize: RFValue(10),
                    fontFamily: Fonts.Regular,
                    color: theme == 'dark' ? colors.White : colors.Black,
                  }}
                  multiline={true}
                  placeholder={'Pickup Details'}
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  placeholderTextColor={
                    theme == 'dark' ? colors.White : colors.Grey
                  }
                  onSubmitEditing={() => Keyboard.dismiss()}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (!store || !description) {
                      Toast.show('Please enter your pickup details.');
                    } else {
                      setLocation(false);
                      goBack();
                    }
                  }}
                  style={{
                    backgroundColor: '#00A74D',
                    height: RFValue(40),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: RFValue(12), color: colors.White}}>
                    Set Details
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  // goBack();
                  setLocation(false);
                }}>
                <Image source={Images.Cross} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
};
export default MapComponent;
