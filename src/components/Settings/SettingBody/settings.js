/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'components/Settings/SettingBody/assets';
import colors from 'constants/colors';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height} = Dimensions.get('window');

function Settings(props) {
  const {
    goToAbout,
    goToSettings,
    goToHelp,
    gotToTerms,
    logout,
    colorBackground,
    blackTextColor,
    theme,
    refresher,
  } = props;
  const Cards = (value) => {
    return (
      <TouchableOpacity
        onPress={() => value.onPress()}
        style={{
          height: RFValue(60),
          flexDirection: 'row',
          paddingVertical: RFValue(5),
        }}>
        <View
          style={{
            flex: 0.15,
            alignItems: 'center',
            paddingVertical: RFValue(5),
          }}>
          <Image
            source={value.icon}
            resizeMode="contain"
            style={{tintColor: theme == 'dark' && 'white'}}
          />
        </View>
        <View style={{flex: 0.8}}>
          <Text
            style={[
              {fontSize: RFValue(17), color: colors.Setting},
              blackTextColor,
            ]}>
            {value.title}
          </Text>
          <Text
            style={[
              {fontSize: RFValue(12), color: colors.Grey},
              blackTextColor,
            ]}>
            {value.subtitile}
          </Text>
        </View>
        <View style={{flex: 0.05, justifyContent: 'center'}}>
          <Icon
            name={'chevron-right'}
            size={RFValue(15)}
            color={colors.Primary}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const Header = (value) => {
    return (
      <View style={{height: RFValue(45)}}>
        <Text
          style={[
            {fontSize: RFValue(17), color: colors.Setting},
            blackTextColor,
          ]}>
          {value.title}
        </Text>
        <Text
          style={[{fontSize: RFValue(12), color: colors.Grey}, blackTextColor]}>
          {value.subtitile}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: RFValue(20),
        flexGrow: 1,
        paddingTop: RFValue(25),
      }}>
      <Header
        title={'Account Settings'}
        subtitile={'Manage general settings, and payout options.'}
      />
      <Cards
        title={'About'}
        subtitile={
          'Information about the application version, and available updates.'
        }
        icon={Images.Info}
        onPress={goToAbout}
      />
      <Cards
        title={'General Settings'}
        subtitile={'General Notification settings & Appearance settings.'}
        icon={Images.Settings}
        onPress={goToSettings}
      />
      <Header
        title={'Help'}
        subtitile={'Get help, with a current order or past order.'}
      />
      <Cards
        title={'Find ways to get help.'}
        subtitile={'See Frequent ways to get help.'}
        icon={Images.Help}
        // onPress={goToHelp}
        onPress={() => gotToTerms(0)}
      />
      <Header
        title={'Legal Documents'}
        subtitile={'General Legal Documentation.'}
      />
      <Cards
        title={'Legal'}
        subtitile={'Legal Information.'}
        icon={Images.Board}
        onPress={() => gotToTerms(0)}
      />
      <Cards
        title={'Terms of use'}
        subtitile={'General Terms of use for the application(s).'}
        icon={Images.Accept}
        onPress={() => gotToTerms(1)}
      />
      <Cards
        title={'Privacy Policy'}
        subtitile={'Application(s) Privacy Policy for Turbo2go.'}
        icon={Images.Terms}
        onPress={() => gotToTerms(2)}
      />

      <TouchableOpacity
        style={{alignItems: 'flex-end', paddingBottom: 10}}
        onPress={logout}>
        <Image source={Images.Logout} resizeMode="contain" />
      </TouchableOpacity>
    </ScrollView>
  );
}
export default Settings;
