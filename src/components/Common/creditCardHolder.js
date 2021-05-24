import React, {memo, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import Colors from 'constants/colors';
import {CheckBox} from 'react-native-elements';
import colors from 'constants/colors';
import * as Images from 'assets';
import TextInputComponent from 'components/Common/textInput';
import {getStyles} from 'helpers/themeStyles';
import {useSelector} from 'react-redux';

const CreditCardComponent = (props) => {
  const {paypalEnabled, stripeEnabled, methodSelected} = props;
  const [selectedOption, setSelectedOption] = useState(0);
  const [name, setName] = useState(0);
  const [buttonStatus, setButtonStatus] = useState('');
  const [cardnum, setCard] = useState('');
  const [cvv, setCvv] = useState('');
  const themeReducer = useSelector((state) => state.themeReducer.theme);
  const {colorBackground, blackTextColor} = getStyles(themeReducer);

  return (
    <View style={colorBackground}>
      <TouchableOpacity
        onPress={() => {
          setSelectedOption(0);
          methodSelected(0);
        }}
        style={{
          height: RFValue(50),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
          }}>
          <CheckBox
            onPress={() => {
              setSelectedOption(0);
              methodSelected(0);
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedOption == 0 ? true : false}
            right={true}
            size={RFValue(15)}
            checkedColor={Colors.Primary}
            uncheckedColor={Colors.Lgrey}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{fontSize: RFValue(13), color: colors.Lgrey}}>
            Cash on delivery
          </Text>
        </View>
        <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={Images.Money} resizeMode="contain" />
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          setSelectedOption(1);
          methodSelected(1);
        }}
        style={{
          height: RFValue(50),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
          }}>
          <CheckBox
            onPress={() => {
              setSelectedOption(1);
              methodSelected(1);
            }}
            d
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedOption == 1 ? true : false}
            right={true}
            size={RFValue(15)}
            checkedColor={Colors.Primary}
            uncheckedColor={Colors.Lgrey}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{fontSize: RFValue(13), color: colors.Lgrey}}>
            PayPal
          </Text>
        </View>
        <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={Images.Paypal}
            resizeMode="contain"
            style={{height: RFValue(25), width: RFValue(80)}}
          />
        </View>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => {
          setSelectedOption(2);
          methodSelected(2);
        }}
        style={{
          height: RFValue(50),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'center',
          }}>
          <CheckBox
            onPress={() => {
              setSelectedOption(2);
              methodSelected(2);
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedOption == 2 ? true : false}
            right={true}
            size={RFValue(15)}
            checkedColor={Colors.Primary}
            uncheckedColor={Colors.Lgrey}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{fontSize: RFValue(13), color: colors.Lgrey}}>
            Stripe
          </Text>
        </View>
        <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={Images.Stripe}
            resizeMode="contain"
            style={{height: RFValue(25), width: RFValue(80)}}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setSelectedOption(3);
          methodSelected(3);
        }}
        style={{
          height: RFValue(50),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.15, justifyContent: 'center'}}>
          <CheckBox
            onPress={() => {
              setSelectedOption(3);
              methodSelected(3);
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedOption == 3 ? true : false}
            right={true}
            size={RFValue(15)}
            checkedColor={Colors.Primary}
            uncheckedColor={Colors.Lgrey}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{fontSize: RFValue(13), color: colors.Lgrey}}>
            Debit at the door
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.CardEx}
            resizeMode="contain"
            style={{height: RFValue(25), width: RFValue(80)}}
          />
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          setSelectedOption(2);
        }}
        style={{
          height: RFValue(50),
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.15, justifyContent: 'center'}}>
          <CheckBox
            onPress={() => {
              setSelectedOption(2);
            }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={selectedOption == 2 ? true : false}
            right={true}
            size={RFValue(15)}
            checkedColor={Colors.Primary}
            uncheckedColor={Colors.Lgrey}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{fontSize: RFValue(13), color: colors.Lgrey}}>
            Credit or debit card
          </Text>
        </View>
        <View
          style={{flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={Images.CardEx} resizeMode="contain" />
        </View>
      </TouchableOpacity> */}

      {/* {selectedOption == 2 && (
        <>
          <TextInputComponent
            placeholder={'Name on Card'}
            onChangeText={setName}
            value={name}
            validationType={'name'}
            buttonStatus={setButtonStatus}
            autoCapitalize={'none'}
            //  disabled={loading}
            icon={Images.Luser}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.6}}>
              <TextInputComponent
                placeholder={'Card Number'}
                onChangeText={setCard}
                value={cardnum}
                validationType={'card'}
                buttonStatus={setButtonStatus}
                autoCapitalize={'none'}
                //  disabled={loading}
                icon={Images.Envelope}
              />
            </View>
            <View style={{flex: 0.4}}>
              <TextInputComponent
                placeholder={'Cvv'}
                onChangeText={setCvv}
                value={cvv}
                validationType={'cvv'}
                buttonStatus={setButtonStatus}
                autoCapitalize={'none'}
                //  disabled={loading}
                icon={Images.Envelope}
              />
            </View>
          </View>
        </>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CreditCardComponent;
