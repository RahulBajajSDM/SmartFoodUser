/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import CreditCardHolder from 'components/Common/creditCardHolder';
import TextInputComponent from 'components/Common/textInput';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import EmptyComponent from 'components/Common/emptyComponent';
import IconsFa from 'react-native-vector-icons/FontAwesome';

const {height} = Dimensions.get('window');

function Info(props) {
  const {
    addAddress,
    allAddresses,
    updateAddress,
    deleteAddress,
    methodSelected,
    colorBackground,
    blackTextColor,
  } = props;
  const [buttonStatus, setButtonStatus] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAwareScrollView
      style={{
        flexGrow: 1,
        paddingHorizontal: RFValue(20),
        paddingTop: RFValue(20),
      }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <FlatList
        data={allAddresses && allAddresses.data}
        contentContainerStyle={{width: '100%'}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: '90%',
                  height: RFValue(100),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    updateAddress(item);
                  }}
                  style={{height: RFValue(100), flexDirection: 'row'}}>
                  <View
                    style={{
                      flex: 0.15,

                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Images.Address}
                      resizeMode="contain"
                      style={{tintColor: blackTextColor.color}}
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.55,
                      justifyContent: 'center',
                      paddingLeft: RFValue(5),
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts.Regular,
                        fontSize: RFValue(15),
                        color: colors.Primary,
                      }}>
                      Location
                    </Text>
                    <Text
                      style={[
                        {
                          fontFamily: Fonts.Medium,
                          fontSize: RFValue(14),
                        },
                        blackTextColor,
                      ]}>
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={2}
                      style={[
                        {
                          fontFamily: Fonts.Regular,
                          fontSize: RFValue(14),
                        },
                        blackTextColor,
                      ]}>
                      {item.formattedAddress}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Images.MapScreen}
                      resizeMode="cover"
                      style={{
                        height: '75%',
                        width: '75%',
                        borderRadius: RFValue(10),
                        overflow: 'hidden',
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: '40%',
                      }}>
                      <Image
                        source={Images.Pin}
                        resizeMode="contain"
                        style={{flex: 1}}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  deleteAddress(item);
                }}
                style={{
                  width: '10%',
                  height: RFValue(100),
                  justifyContent: 'center',
                  paddingBottom: RFValue(10),
                  alignItems: 'center',
                }}>
                <IconsFa name={'trash'} size={RFValue(20)} color={colors.Red} />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <View
        style={{
          height: RFValue(40),
          flexDirection: 'row',
          paddingHorizontal: RFValue(10),
          paddingTop: RFValue(10),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            addAddress();
          }}>
          <Image source={Images.Gadd} resizeMode="contain" />
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            Add New Address
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 0.15,
            alignItems: 'center',
            paddingTop: RFValue(10),
            justifyContent: 'flex-start',
          }}>
          <Image
            source={Images.Cod}
            resizeMode="contain"
            style={{tintColor: blackTextColor.color}}
          />
        </View>
        <View style={{flex: 0.85}}>
          <CreditCardHolder
            paypalEnabled={true}
            stripeEnabled={true}
            methodSelected={methodSelected}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', height: RFValue(50)}}>
        {/*  <View
          style={{
            flex: 0.2,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={Images.Key} resizeMode="contain" />
        </View>
         <View style={{flex: 0.8}}>
          <TextInputComponent
            placeholder={'Password'}
            onChangeText={setPassword}
            value={password}
            validationType={'password'}
            buttonStatus={setButtonStatus}
            autoCapitalize={'none'}
            //  disabled={loading}
            icon={Images.Pass}
          />
        </View>
      </View>
      <View
        style={{
          height: RFValue(80),
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: RFValue(30),
            width: RFValue(80),
            borderRadius: RFValue(5),
            backgroundColor: colors.LGreen,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Medium,
              color: colors.White,
              fontSize: RFValue(14),
            }}>
            Save
          </Text>
        </View> */}
      </View>
    </KeyboardAwareScrollView>
  );
}
export default Info;
