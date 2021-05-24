// import SpinnerLoader from 'components/common/spinnerLoader';
import * as Images from 'assets';
import colors from 'constants/colors';
import {StatusBarHeight} from 'helpers/statusBarHeight';
import React, {memo} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';

const HomeHeader = (props) => {
  const {
    changingText,
    formattedAddress,
    clearText,
    searchText,
    changeManualLoc,
    colorBackground,
    blackTextColor,
    theme,
  } = props;
  return (
    <>
      <View
        style={{
          flex: 0.9,
          borderBottomLeftRadius: RFValue(10),
          borderBottomRightRadius: RFValue(10),
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ImageBackground
          source={Images.Header}
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              flex: 0.35,
              justifyContent: 'center',
              paddingLeft: RFValue(20),
              paddingTop: StatusBarHeight,
            }}>
            <TouchableOpacity
              onPress={() => {
                changeManualLoc();
              }}
              style={[
                {
                  height: RFValue(30),
                  width: RFValue(180),
                  borderRadius: RFValue(200),

                  flexDirection: 'row',
                },
                colorBackground,
              ]}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={Images.Pin} resizeMode="contain" />
              </View>
              <View
                style={{
                  flex: 0.65,
                  justifyContent: 'center',
                }}>
                <Text numberOfLines={1} style={blackTextColor}>
                  {formattedAddress || 'Unable to find location'}
                </Text>
              </View>

              <View
                style={{
                  flex: 0.15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Images.Down}
                  resizeMode="contain"
                  style={{height: RFValue(10), width: RFValue(10)}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.65, flexDirection: 'row'}}>
            <View
              style={{
                flex: 0.6,
                paddingTop: RFValue(20),
                paddingRight: RFValue(10),
              }}>
              <Text
                style={{
                  color: colors.DYellow,
                  fontSize: RFValue(17),
                  textAlign: 'right',
                  fontWeight: 'bold',
                }}>
                Free Home{'\n'} Delivery
              </Text>
            </View>
            <View style={{flex: 0.4, paddingTop: RFValue(20)}}>
              {/* <Image source={Images.Truck} resizeMode="contain" /> */}
            </View>
          </View>
          <View style={{position: 'absolute', right: 0, bottom: RFValue(30)}}>
            <Image
              source={Images.Truck}
              resizeMode="stretch"
              style={{height: RFValue(90), width: RFValue(180)}}
            />
          </View>
        </ImageBackground>
        {/* <Image
            source={Images.Header}
            resizeMode="stretch"
            style={{width: '100%'}}
          />
          <View
            style={{
              height: RFValue(50),
              width: '100%',
              backgroundColor: 'red',
              position: 'absolute',
              bottom: 0,
            }}></View> */}
      </View>
      <View
        style={{
          height: RFValue(40),
          width: '90%',
          position: 'absolute',
          bottom: -2,
          alignSelf: 'center',
          flexDirection: 'row',
          borderRadius: RFValue(10),
          borderWidth: 0.5,
          borderColor: colors.Background,
          overflow: 'hidden',
          backgroundColor: theme == 'dark' ? colors.Black : colors.White,
        }}>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.Search}
            resizeMode="contain"
            style={{
              tintColor: theme == 'dark' ? colors.White : colors.DarkGray,
            }}
          />
        </View>
        <View style={{flex: 0.7}}>
          <TextInput
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(text) => {
              changingText(text);
            }}
            value={searchText}
            style={{
              flex: 1,
              fontSize: RFValue(14),
              color: theme == 'dark' ? colors.White : colors.Lgrey,
            }}
            placeholder={'Type keywords to find'}
            placeholderTextColor={theme == 'dark' ? colors.White : colors.Lgrey}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            clearText();
          }}
          style={{
            flex: 0.15,
            borderTopRightRadius: RFValue(10),
            borderBottomRightRadius: RFValue(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconsFa name={'times'} size={RFValue(15)} color={colors.Lgrey} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default memo(HomeHeader);
