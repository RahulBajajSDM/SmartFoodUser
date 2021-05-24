// import SpinnerLoader from 'components/common/spinnerLoader';
import * as Images from 'assets';
import React, {memo} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Colors from 'constants/colors';
import {Navigation} from 'react-native-navigation';

const ImageHeader = (props) => {
  const {enableBack, componentId, disabled, colorBackground} = props;
  return (
    <View
      style={[
        {
          height: RFPercentage(20),
          flexDirection: 'row',
        },
        colorBackground,
      ]}>
      <View
        style={{
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* {enableBack ? (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              Navigation.pop(componentId);
            }}
            style={{
              height: RFValue(35),
              width: RFValue(35),
              borderRadius: RFPercentage(100),
              backgroundColor: Colors.Primary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name={'chevron-left'}
              size={RFValue(15)}
              color={Colors.White}
            />
          </TouchableOpacity>
        ) : null} */}
      </View>
      <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode={'contain'}
          source={Images.Logo}
          style={{flex: 1}}

          // style={{height:RFValue()}}
        />
      </View>
      <View style={{flex: 0.15}}></View>
    </View>
  );
};

export default memo(ImageHeader);
