/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import Button from 'components/Common/buttonComponent';
import TextInputComponent from 'components/Common/textInput';
import Fonts from 'constants/fonts';
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStyles} from 'helpers/themeStyles';

function AddNewAddress(props) {
  const [name, setName] = useState('');
  const [buttonStatus, setButtonStatus] = useState('');

  const {
    openMap,
    formattedAddress,
    saveAddress,
    addingAddress,
    updateTrue,
    oldAddress,
    theme,
  } = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  useEffect(() => {
    if (updateTrue) {
      setName(oldAddress && oldAddress.name);
    }
  }, []);
  return (
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
          height: RFValue(40),
          justifyContent: 'center',
        }}>
        <Text
          style={[
            {fontSize: RFValue(17), fontFamily: Fonts.Medium},
            blackTextColor,
          ]}>
          Add New Address
        </Text>
      </View>
      <TextInputComponent
        placeholder={'Name e.g Home,Work'}
        onChangeText={setName}
        value={name}
        validationType={'name'}
        buttonStatus={setButtonStatus}
        autoCapitalize={'none'}
        // disabled={loading}
        icon={Images.Home2}
        blackTextColor={blackTextColor}
      />
      <View style={{height: RFValue(80)}}>
        <TextInputComponent
          placeholder={'Address'}
          onChangeText={() => {}}
          value={formattedAddress}
          validationType={'name'}
          buttonStatus={setButtonStatus}
          autoCapitalize={'none'}
          editable={false}
          disabled={true}
          icon={Images.Home2}
          blackTextColor={blackTextColor}
        />
        <TouchableOpacity
          onPress={() => {
            openMap();
          }}
          style={{
            height: RFValue(70),
            width: '100%',
            position: 'absolute',
          }}></TouchableOpacity>
      </View>
      <Button
        title={updateTrue ? 'Update Address' : 'Save Address'}
        loading={addingAddress}
        disabled={addingAddress}
        onPress={() => {
          saveAddress(name);
        }}
        containerHeight={RFValue(80)}
        justifyContent={'flex-end'}
      />
    </KeyboardAwareScrollView>
  );
}
export default AddNewAddress;
