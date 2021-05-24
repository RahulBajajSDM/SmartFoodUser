import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import Colors from 'constants/colors';

const EmptyComponent = ({title, icon, color, iconSize, fontStyle}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconsFa
        name={icon}
        size={iconSize ? iconSize : RFValue(25)}
        color={color ? color : Colors.Primary}
      />
      <Text
        style={[
          {
            fontSize: RFValue(18),
            paddingTop: RFValue(10),
            color: color ? color : Colors.Primary,
          },
          fontStyle,
        ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default memo(EmptyComponent);
