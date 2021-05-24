/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStyles} from 'helpers/themeStyles';
import moment from 'moment';
import _ from 'lodash';
function About(props) {
  const {updateApp, theme} = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <View style={[{flex: 1, paddingHorizontal: RFValue(20)}, colorBackground]}>
      <View
        style={{
          flex: 0.1,
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
          Software Version
        </Text>
        <Text
          style={[
            {
              fontSize: RFValue(12),
              fontFamily: Fonts.Regular,
              color: colors.Lgrey,
            },
            blackTextColor,
          ]}>
          1.03
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
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
          Last Updated
        </Text>
        <Text
          style={[
            {
              fontSize: RFValue(12),
              fontFamily: Fonts.Regular,
              color: colors.Lgrey,
            },
            blackTextColor,
          ]}>
          {moment().format('MMM DD, YYYY')}
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
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
          Device Type{' '}
        </Text>
        <Text
          style={[
            {
              fontSize: RFValue(12),
              fontFamily: Fonts.Regular,
              color: colors.Lgrey,
            },
            blackTextColor,
          ]}>
          {_.startCase(Platform.OS)}
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <Image
            resizeMode={'contain'}
            source={Images.Rocket}
            style={{flex: 1}}
          />
        </View>
        <View style={{flex: 0.4, justifyContent: 'center'}}>
          <Text
            style={[
              {
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}>
            Version 1.03
          </Text>
        </View>

        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <TouchableOpacity
            onpress={() => updateApp()}
            style={{
              height: RFValue(40),
              width: '90%',
              borderRadius: RFValue(5),
              backgroundColor: colors.Blue,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: RFValue(12),
                fontFamily: Fonts.Regular,
                color: colors.White,
              }}>
              Check for update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default About;
