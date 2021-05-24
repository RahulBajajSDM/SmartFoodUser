// import SpinnerLoader from 'components/common/spinnerLoader';
import * as Images from 'components/Settings/SettingTabs/assets';
import colors from 'constants/colors';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const SettingTabs = (props) => {
  const {selectedOption, setSelectedOption, theme} = props;
  return (
    <View
      style={{
        // flex: 1,
        flexDirection: 'row',
        paddingHorizontal: RFValue(40),
        position: 'absolute',
        width: '100%',
      }}>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedOption(1);
          }}
          style={{
            borderRadius: RFPercentage(100),

            backgroundColor: selectedOption == 1 ? colors.Red : colors.White,
            height: RFValue(40),
            width: RFValue(40),
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: RFValue(5),
            shadowColor: theme == 'dark' ? colors.White : colors.Black,

            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          }}>
          <Image
            source={Images.Meter}
            resizeMode="contain"
            style={{tintColor: selectedOption == 1 ? 'white' : colors.Grey}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: theme == 'dark' ? colors.White : colors.Black,

          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedOption(2);
          }}
          style={{
            borderRadius: RFPercentage(100),
            backgroundColor: selectedOption == 2 ? colors.Red : colors.White,
            height: RFValue(40),
            width: RFValue(40),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.Sim}
            resizeMode="contain"
            style={{tintColor: selectedOption == 2 ? 'white' : colors.Grey}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: theme == 'dark' ? colors.White : colors.Black,

          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedOption(3);
          }}
          style={{
            borderRadius: RFPercentage(100),
            backgroundColor: selectedOption == 3 ? colors.Red : colors.White,
            height: RFValue(40),
            width: RFValue(40),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.Chat}
            resizeMode="contain"
            style={{tintColor: selectedOption == 3 ? 'white' : colors.Grey}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: theme == 'dark' ? colors.White : colors.Black,

          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedOption(4);
          }}
          style={{
            borderRadius: RFPercentage(100),
            backgroundColor: selectedOption == 4 ? colors.Red : colors.White,
            height: RFValue(40),
            width: RFValue(40),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.Setting}
            resizeMode="contain"
            style={{tintColor: selectedOption == 4 ? 'white' : colors.Grey}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingTabs;
