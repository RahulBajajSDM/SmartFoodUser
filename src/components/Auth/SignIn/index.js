/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import Button from 'components/Common/buttonComponent';
import ImageHeader from 'components/Common/imageHeader';
import TextInputComponent from 'components/Common/textInput';
import Colors from 'constants/colors';
import React, {useState} from 'react';
import {Dimensions, Text, View, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import * as Images from 'assets';
import Fonts from 'constants/fonts';
import colors from 'constants/colors';
import {getStyles} from 'helpers/themeStyles';

const {height} = Dimensions.get('window');

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonStatus, setButtonStatus] = useState('');
  const {loading, goToSignUp, signIn, goToForgotPass, theme} = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <>
      <ImageHeader colorBackground={colorBackground} />
      <KeyboardAwareScrollView
        style={[{flexGrow: 1, paddingHorizontal: RFValue(20)}, colorBackground]}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: RFPercentage(20),
            justifyContent: 'center',
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(14),
                color: Colors.TextGrey,
                paddingBottom: RFValue(5),
                fontFamily: Fonts.Regular,
              },
              blackTextColor,
            ]}>
            Welcome
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(24),
                color: Colors.TextGrey,
                fontFamily: Fonts.Regular,
              },
              blackTextColor,
            ]}>
            Sign In
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
          icon={Images.Mail}
          blackTextColor={blackTextColor}
        />
        <TextInputComponent
          placeholder={'Password'}
          onChangeText={setPassword}
          value={password}
          validationType={'password'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          disabled={loading}
          icon={Images.Pass}
          secureTextEntry={true}
          blackTextColor={blackTextColor}
        />
        <TouchableOpacity onPress={() => goToForgotPass()} disabled={loading}>
          <Text
            style={[
              {
                fontSize: RFValue(14),
                paddingBottom: RFValue(5),
                textAlign: 'right',
                paddingVertical: RFValue(15),
                color: Colors.DarkGray,
                fontFamily: Fonts.Light,
              },
              blackTextColor,
            ]}>
            Forgot your password?
          </Text>
        </TouchableOpacity>
        <Button
          title={'Sign in'}
          loading={loading}
          disabled={loading}
          onPress={() => {
            signIn({email, password});
          }}
          containerHeight={RFValue(80)}
          justifyContent={'flex-end'}
        />
        <TouchableOpacity onPress={() => goToSignUp()} disabled={loading}>
          <Text
            style={[
              {
                alignSelf: 'center',
                paddingTop: RFValue(30),
                fontFamily: Fonts.Regular,
                color: colors.Grey,
              },
              blackTextColor,
            ]}>
            Don't have an account?
            <Text style={{color: Colors.Primary, alignSelf: 'center'}}>
              {' '}
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </>
  );
}
export default SignIn = React.memo(SignIn);
