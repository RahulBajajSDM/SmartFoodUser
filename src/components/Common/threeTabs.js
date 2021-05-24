// import SpinnerLoader from 'components/common/spinnerLoader';
import Colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const {width} = Dimensions.get('window');
const ThreeTabs = (props) => {
  const {selectedItem, setSelectedItem, titles, theme} = props;
  return (
    <View
      style={{
        height: RFValue(40),
        flexDirection: 'row',
        paddingBottom: RFValue(10),
      }}>
      <TouchableOpacity
        onPress={() => setSelectedItem(0)}
        style={{
          flex: 0.333,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: selectedItem == 0 ? Colors.Primary : Colors.Lgrey,
        }}>
        <Text
          style={{
            fontSize: RFValue(14),
            color:
              selectedItem == 0
                ? Colors.Primary
                : theme == 'dark'
                ? Colors.White
                : Colors.Lgrey,
            fontFamily: Fonts.Medium,
          }}>
          {titles[0].title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedItem(1)}
        style={{
          flex: 0.333,
          justifyContent: 'center',
          alignItems: 'center',

          borderBottomWidth: 1,
          borderBottomColor: selectedItem == 1 ? Colors.Primary : Colors.Lgrey,
        }}>
        <Text
          style={{
            fontSize: RFValue(14),
            fontFamily: Fonts.Medium,

            color:
              selectedItem == 1
                ? Colors.Primary
                : theme == 'dark'
                ? Colors.White
                : Colors.Lgrey,
          }}>
          {titles[1].title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSelectedItem(2)}
        style={{
          flex: 0.333,
          justifyContent: 'center',
          alignItems: 'center',

          borderBottomWidth: 1,
          borderBottomColor: selectedItem == 2 ? Colors.Primary : Colors.Lgrey,
        }}>
        <Text
          style={{
            fontSize: RFValue(14),
            fontFamily: Fonts.Medium,
            color:
              selectedItem == 2
                ? Colors.Primary
                : theme == 'dark'
                ? Colors.White
                : Colors.Lgrey,
          }}>
          {titles[2].title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ThreeTabs;
