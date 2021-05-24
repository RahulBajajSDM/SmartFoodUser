/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import History from 'components/Dashboard/Order/History';
import MyOrders from 'components/Dashboard/Order/MyOrders';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {StatusBarHeight} from 'helpers/statusBarHeight';
import {getStyles} from 'helpers/themeStyles';
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

function Order(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [password, setPassword] = useState('');
  const {
    trackOrder,
    allLastorders,
    lastLoader,
    activeLastorders,
    activeLoader,
    getMoreData,
    getMoreHistory,
    goToHelp,
    rateDriver,
    reorder,
    cartLoader,
    theme,
  } = props;
  const {colorBackground, blackTextColor} = getStyles(theme);

  const renderTabs = () => {
    if (selectedTab == 0) {
      return (
        <MyOrders
          trackOrder={trackOrder}
          allLastorders={activeLastorders}
          lastLoader={activeLoader}
          getMoreData={getMoreData}
          goToHelp={goToHelp}
          theme={theme}
        />
      );
    } else {
      return (
        <History
          allLastorders={allLastorders}
          lastLoader={lastLoader}
          getMoreHistory={getMoreHistory}
          getMoreData={getMoreData}
          rateDriver={rateDriver}
          reorder={reorder}
          cartLoader={cartLoader}
          theme={theme}
        />
      );
    }
  };

  return (
    <View
      style={[
        {
          flex: 1,
          paddingHorizontal: RFValue(20),
          paddingTop: StatusBarHeight,
        },
        colorBackground,
      ]}>
      <View style={{height: RFValue(40), flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
          }}
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: selectedTab == 0 ? 0.5 : 0,
            borderBottomColor: colors.Primary,
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              fontFamily: Fonts.Medium,
              color: selectedTab == 0 ? colors.Primary : colors.Lgrey,
            }}>
            My Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
          }}
          style={{
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: selectedTab == 1 ? 0.5 : 0,
            borderBottomColor: colors.Primary,
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              fontFamily: Fonts.Medium,
              color: selectedTab == 1 ? colors.Primary : colors.Lgrey,
            }}>
            History
          </Text>
        </TouchableOpacity>
      </View>
      {renderTabs()}
    </View>
  );
}
export default Order = React.memo(Order);
