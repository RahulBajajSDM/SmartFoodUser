import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import {
  View,
  NativeModules,
  LayoutAnimation,
  Image,
  TouchableOpacity,
} from 'react-native';
import Validator from 'helpers/validationChecker';
import Colors from 'constants/colors';
import Fonts from 'constants/fonts';
import colors from 'constants/colors';
import {useSelector} from 'react-redux';
const {UIManager} = NativeModules;
const CustomLayoutAnimation = {
  duration: 500,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
};
const TextInputField = (props) => {
  const {
    placeholder,
    keyboardType,
    secureTextEntry,
    onChangeText,
    value,
    validationType,
    buttonStatus,
    maxLength,
    disabled,
    autoCapitalize,
    autoFocus,
    editable,
    label,
    icon,
    rightIcon,
    toggleSecure,
    inputPressed,
    blackTextColor,
  } = props;
  const [validation, setValidation] = useState(null);
  const [labelVisible, setLabelVisible] = useState(true);
  const themeReducer = useSelector((state) => state.themeReducer.theme);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);
  const changingText = (text) => {
    onChangeText(text);
    let validationCheck = Validator(
      text,
      validationType ? validationType : 'none',
    );
    setValidation(!validationCheck);
    buttonStatus(!validationCheck);
  };

  return (
    <View style={{height: RFValue(80)}}>
      <Input
        label={labelVisible ? placeholder : ''}
        placeholder={label || placeholder}
        placeholderTextColor={
          themeReducer == 'dark' ? colors.White : colors.Lgrey
        }
        leftIcon={
          !rightIcon ? (
            <View
              style={{
                height: RFValue(30),
                width: RFValue(30),
                borderRadius: RFValue(100),
                backgroundColor: colors.White,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={icon} resizeMode="contain" />
            </View>
          ) : null
        }
        rightIcon={
          rightIcon ? (
            <TouchableOpacity onPress={() => toggleSecure()}>
              <Image
                source={icon}
                resizeMode="contain"
                style={{tintColor: 'red'}}
              />
            </TouchableOpacity>
          ) : null
        }
        inputStyle={[
          {
            height: RFValue(50),
            paddingHorizontal: RFValue(10),
            fontSize: RFValue(14),
            fontFamily: Fonts.Regular,
          },
          blackTextColor,
        ]}
        inputContainerStyle={[
          {
            borderBottomColor: validation ? Colors.Red : Colors.Yellow,
            height: RFValue(50),
            fontFamily: Fonts.Regular,
          },
        ]}
        labelStyle={{
          fontSize: RFValue(14),
          color: validation ? Colors.Red : Colors.Yellow,
          fontFamily: Fonts.Regular,
        }}
        // placeholderTextColor={{
        //   color: Colors.Lgrey,
        // }}
        onFocus={() => {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          setLabelVisible(false);
        }}
        onBlur={() => {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
          setLabelVisible(true);
        }}
        // containerStyle={{height: RFValue(50)}}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        autoFocus={autoFocus}
        editable={editable}
        maxLength={maxLength}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => {
          changingText(text);
        }}
      />
    </View>
  );
};
export default TextInputField;
