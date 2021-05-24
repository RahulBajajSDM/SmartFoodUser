/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import CreditCardHolder from 'components/Common/creditCardHolder';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
const {height} = Dimensions.get('window');

function Payment(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [password, setPassword] = useState('');
  const authReducer = useSelector((state) => state.authReducer);
  const {methodSelected} = props;
  const themeReducer = useSelector((state) => state.themeReducer.theme);
  const {colorBackground, blackTextColor} = getStyles(themeReducer);
  return (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: RFValue(20),
        },
        colorBackground,
      ]}>
      <View style={{flex: 0.5}}>
        <Text
          style={[
            {
              fontSize: RFValue(17),
              fontFamily: Fonts.Medium,
              color: colors.Grey,
            },
            blackTextColor,
          ]}>
          Payment Method
        </Text>
        <CreditCardHolder
          paypalEnabled={true}
          stripeEnabled={true}
          methodSelected={methodSelected}
        />
      </View>
    </View>
  );
}
export default Order = React.memo(Payment);
