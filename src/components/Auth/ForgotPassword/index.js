/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import Button from 'components/Common/buttonComponent';
import ImageHeader from 'components/Common/imageHeader';
import TextInputComponent from 'components/Common/textInput';
import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Fonts from 'constants/fonts';
import * as Images from 'assets';
import {getStyles} from 'helpers/themeStyles';

import Colors from 'constants/colors';
function ForgotPassword(props) {
  const [email, setEmail] = useState('');
  const [buttonStatus, setButtonStatus] = useState('');
  const {loading, goToNext, componentId, theme} = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <>
      <ImageHeader
        enableBack={true}
        componentId={componentId}
        colorBackground={colorBackground}
      />
      <KeyboardAwareScrollView
        style={[
          {
            flexGrow: 1,
            paddingHorizontal: RFValue(20),
          },
          colorBackground,
        ]}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: RFPercentage(20),
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(24),
                color: Colors.TextGrey,
              },
              blackTextColor,
            ]}>
            Forgot Password?
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(18),
                color: Colors.TextGrey,
              },
              blackTextColor,
            ]}>
            Enter Email
          </Text>
        </View>
        <TextInputComponent
          placeholder={'Email'}
          onChangeText={setEmail}
          value={email}
          validationType={'email'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          disabled={loading}
          keyboardType={'email-address'}
          label={'Enter your registered email id'}
          icon={Images.Mail}
          blackTextColor={blackTextColor}
        />

        <Button
          title={'Next'}
          loading={loading}
          disabled={loading}
          onPress={() => {
            goToNext({email});
          }}
          containerHeight={RFValue(80)}
          justifyContent={'flex-end'}
        />
      </KeyboardAwareScrollView>
    </>
  );
}
export default ForgotPassword = React.memo(ForgotPassword);
