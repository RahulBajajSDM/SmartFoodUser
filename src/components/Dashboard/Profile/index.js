/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import SettingHeader from "components/Common/settingHeader";
import Chat from "components/Settings/SettingBody/chat";
import Info from "components/Settings/SettingBody/info";
import Meter from "components/Settings/SettingBody/meter";
import Settings from "components/Settings/SettingBody/settings";
import SettingTabs from "components/Settings/SettingTabs";
import { getStyles } from "helpers/themeStyles";
import React, { useState } from "react";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { StatusBarHeight } from "helpers/statusBarHeight";
import colors from "constants/colors";

function Profile(props) {
  const [selectedOption, setSelectedOption] = useState(1);
  const {
    logout,
    userData,
    addAddress,
    goToAbout,
    goToSettings,
    goToHelp,
    gotToTerms,
    allAddresses,
    updateAddress,
    deleteAddress,
    editProfile,
    methodSelected,
    goToMyChat,
    loadingChats,
    allInbox,
    deleteChat,
    allLastorders,
    allFavourite,
    allMerchantBanners,
    renderChatList,
    seeAllFav,
    seeAllLastOrder,
    lastPressed,
    favPressed,
    theme,
    refresher,
    muteUser,
    refreshed,
  } = props;
  const { colorBackground, blackTextColor } = getStyles(theme);

  const renderBody = () => {
    if (selectedOption == 1) {
      return (
        <Meter
          allLastorders={allLastorders}
          allFavourite={allFavourite}
          allMerchantBanners={allMerchantBanners}
          seeAllFav={seeAllFav}
          seeAllLastOrder={seeAllLastOrder}
          lastPressed={lastPressed}
          favPressed={favPressed}
          colorBackground={colorBackground}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      );
    }
    if (selectedOption == 2) {
      return (
        <Info
          addAddress={addAddress}
          allAddresses={allAddresses}
          updateAddress={updateAddress}
          deleteAddress={deleteAddress}
          methodSelected={methodSelected}
          colorBackground={colorBackground}
          blackTextColor={blackTextColor}
        />
      );
    }
    if (selectedOption == 3) {
      return (
        <Chat
          goToMyChat={goToMyChat}
          loadingChats={loadingChats}
          allInbox={allInbox}
          deleteChat={deleteChat}
          userData={userData}
          renderChatList={renderChatList}
          colorBackground={colorBackground}
          blackTextColor={blackTextColor}
          theme={theme}
          muteUser={muteUser}
          refreshed={refreshed}
        />
      );
    }
    if (selectedOption == 4) {
      return (
        <Settings
          goToAbout={goToAbout}
          goToSettings={goToSettings}
          goToHelp={goToHelp}
          gotToTerms={gotToTerms}
          logout={logout}
          colorBackground={colorBackground}
          blackTextColor={blackTextColor}
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
          paddingTop: StatusBarHeight,
        },
        colorBackground,
      ]}
    >
      <SettingHeader
        userData={userData}
        editProfile={editProfile}
        allLastorders={allLastorders}
      />
      <View style={{ flex: 0.85 }}>
        {/* <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: '60%',
              width: '100%',
              alignSelf: 'flex-end',
              backgroundColor: theme == 'dark' ? colors.Black : colors.White,
              shadowColor: theme == 'dark' ? colors.White : colors.Black,

              borderTopLeftRadius: RFValue(10),
              borderTopRightRadius: RFValue(10),
              shadowOffset: {
                width: 0,
                height: -8,
              },
              shadowOpacity: 0.18,
              shadowRadius: 4.65,
              elevation: 7,
            }}></View>
          <SettingTabs
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            theme={theme}
          />
        </View> */}
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingTop: RFValue(20) }}>
            {renderBody()}
          </View>

          <SettingTabs
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            theme={theme}
          />
        </View>
      </View>
    </View>
  );
}
export default Profile = React.memo(Profile);
