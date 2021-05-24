/* eslint-disable module-resolver/use-alias */
import {pushToParticularScreen} from 'actions/appActions/AppActions';
import {logout} from 'actions/authActions';
import {
  createChatRoom,
  deleteChat,
  getInbox,
  muteFriend,
} from 'actions/chatActions';
import {
  deleteAddress,
  getMerchantBanners,
  getMerchantItems,
  getTerms,
  giveRating,
  saveSelected,addDropAddress
} from 'actions/dashboardActions';
import {paymentTypeSeelcted} from 'actions/paymentAction';
import ConfirmationModal from 'components/Common/confirmationModal';
import LogoutModal from 'components/Common/logoutModal';
import RatingModal from 'components/Common/ratingModal';
import Constants from 'constants';
import idx from 'idx';
import _ from 'lodash';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';

const ProfileComponent = lazy(() => import('components/Dashboard/Profile'));

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      deleteModal: false,
      selectedId: null,
      logoutModal: false,
      ratingModal: false,
      selectedOrder: null,
    };
  }

  addAddress = _.debounce(() => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'AddNewAddress');
  }, 500);

  goToAbout = _.debounce(() => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'AboutContainer');
  }, 500);

  goToSettings = _.debounce(() => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'GeneralSettingsContainer', {});
  }, 500);

  goToHelp = _.debounce(() => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'HelpContainer');
  }, 500);

  gotToTerms = _.debounce((value) => {
    const {getTerms} = this.props;
    let slug =
      value == 0
        ? 'legal'
        : value == 1
        ? 'term-and-condition'
        : ' privacy-policy';
    getTerms(slug);
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'Terms', {pageType: value});
  }, 500);

  updateAddress = _.debounce((item) => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'AddNewAddress', {
      updateTrue: true,
      oldAddress: item,
    });
  }, 500);

  deleteAddress = _.debounce((item) => {
    this.setState({selectedId: item._id, deleteModal: true});
  }, 500);

  _confirm = (item) => {
    const {deleteAddress} = this.props;
    const {selectedId} = this.state;
    deleteAddress(selectedId);
    this._cancel();
  };

  _cancel = () => {
    this.setState({deleteModal: false});
  };

  logout = () => {
    this.setState({logoutModal: true});
  };

  _confirmLogout = () => {
    const {logout} = this.props;
    logout();
    this._cancelLogout();
  };

  _cancelLogout = () => {
    this.setState({logoutModal: false});
  };

  editProfile = _.debounce(() => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'Register', {
      fromProfile: true,
    });
  }, 500);

  goToMyChat = _.debounce((data) => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'ChatContainer', {
      chatData: data && data.item,
    });
  }, 500);

  methodSelected = _.debounce((method) => {
    const {
      pushToParticularScreen,
      componentId,
      paymentTypeSeelcted,
      pop,
      theme,
    } = this.props;
    paymentTypeSeelcted(method);
    // 0 for COD
    // 1 Paypal
    // 2 Stripe
    // 3 Debit
    if (method == 1) {
      alert('Under Dev');
    } else if (method == 2) {
      pushToParticularScreen(theme, componentId, 'AddCard', {method: method});
    }
  });
  renderChatList = (value) => {
    const {getInbox, createChatRoom, adminChatId} = this.props;
    createChatRoom(
      {
        messageByType: 'userToAdmin', // userToDriver, userToAdmin , driverToAdmin
        receiverId: adminChatId,
      },
      value,
    );
    // getInbox(value == 0 ? 'userToDriver' : 'userToAdmin');
  };

  deleteChat = (value) => {
    const {deleteChat} = this.props;
    deleteChat({
      roomId: idx(value, (_) => _.item._id),
    });
  };

  seeAllFav = () => {};
  seeAllLastOrder = () => {
    Navigation.mergeOptions('ORDER_TAB', {
      bottomTabs: {
        currentTabIndex: 2,
      },
    });
  };
  lastPressed = (item) => {
    this.setState({
      ratingModal: true,
      selectedOrder: item,
    });
  };
  favPressed = (item) => {
    const {
      componentId,
      pushToParticularScreen,
      theme,
      saveSelected,
      getMerchantBanners,
      getMerchantItems,manualAddress,addDropAddress
    } = this.props;
    let selectedDetails = {
      merchantDetails: item && item.merchantData,
      selectedItem: item,
    };

    let data = {
      categoryId: idx(item, (_) => _.merchantData.categoryID),
      merchantId: idx(item, (_) => _.merchantData._id),
    };

    getMerchantBanners(data);
    getMerchantItems(data);

    saveSelected(selectedDetails);
    console.log("PRESSSSSSS",item)

    let addressArray = [
      {
        type: 'merchant',
        latitude: idx(item, (_) => _.merchantData.location[1]),
        longitude: idx(item, (_) => _.merchantData.location[0]),
        formattedAddress: idx(item, (_) => _.merchantData.address),
      },
      {
        type: 'initial',
        latitude: manualAddress && manualAddress.latitude,
        longitude: manualAddress && manualAddress.longitude,
        formattedAddress:manualAddress&&manualAddress.formattedAddress,
      },
    ];
console.log("PRESSSSSSS",addressArray)
    addDropAddress(addressArray)


    pushToParticularScreen(theme, componentId, 'AddAddressContainer', {
      // merchantDetails: item && item.merchantData,
    });

    // pushToParticularScreen(theme, componentId, 'ItemDetailsContainer', {
    //   merchantDetails: item && item.merchantData,
    //   selectedItem: item,
    // },true);
  };

  giveRating = (rating, description) => {
    const {userData, giveRating} = this.props;
    const {selectedOrder} = this.state;
    let data = {
      userId: idx(userData, (_) => _.data._id),
      rating: rating,
      comment: description,
      orderId: idx(selectedOrder, (_) => _._id),
    };
    giveRating(data);
  };

  closeModal = () => {
    this.setState({ratingModal: false});
  };

  report = () => {
    alert('Under Dev');
  };

  muteUser = (data) => {
    const {muteFriend, userData} = this.props;
    let myUserId = idx(userData, (_) => _.data._id);
    let anotherUser = idx(data, (_) =>
      _.item.members.find((o) => o.userId != myUserId),
    );
    let value = {
      roomId: idx(data, (_) => _.item._id),
      isMute: !(anotherUser && anotherUser.isMute),
    };
    muteFriend(value);
  };
  refresher = () => {};
  refreshed = () => {
    const {getInbox} = this.props;

    getInbox('userToDriver');
  };
  render() {
    const {
      componentId,
      userData,
      allAddresses,
      loadingChats,
      allInbox,
      allLastorders,
      allFavourite,
      allMerchantBanners,
      theme,
    } = this.props;
    const {deleteModal, logoutModal, ratingModal, selectedOrder} = this.state;
    return (
      <>
        <ProfileComponent
          componentId={componentId}
          userData={userData}
          addAddress={this.addAddress}
          goToAbout={this.goToAbout}
          goToSettings={this.goToSettings}
          goToHelp={this.goToHelp}
          gotToTerms={this.gotToTerms}
          allAddresses={allAddresses}
          updateAddress={this.updateAddress}
          deleteAddress={this.deleteAddress}
          logout={this.logout}
          editProfile={this.editProfile}
          methodSelected={this.methodSelected}
          goToMyChat={this.goToMyChat}
          loadingChats={loadingChats}
          allInbox={allInbox}
          deleteChat={this.deleteChat}
          allLastorders={allLastorders}
          allFavourite={allFavourite}
          allMerchantBanners={allMerchantBanners}
          renderChatList={this.renderChatList}
          seeAllFav={this.seeAllFav}
          seeAllLastOrder={this.seeAllLastOrder}
          lastPressed={this.lastPressed}
          favPressed={this.favPressed}
          theme={theme}
          muteUser={this.muteUser}
          refreshed={this.refreshed}
        />
        <ConfirmationModal
          visibility={deleteModal}
          confirm={() => this._confirm()}
          cancel={() => this._cancel()}
          yesButton={'Confirm'}
          title={'Are you sure you want to delete this address?'}
          theme={theme}
        />
        <LogoutModal
          visibility={logoutModal}
          confirm={() => this._confirmLogout()}
          cancel={() => this._cancelLogout()}
          yesButton={'Confirm'}
          title={'Are you sure you want to logout?'}
          theme={theme}
        />
        <RatingModal
          visibility={ratingModal}
          giveRating={this.giveRating}
          closeModal={this.closeModal}
          currentActiveJob={selectedOrder}
          report={this.report}
          theme={theme}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    allAddresses: state.dashboardReducer.allAddresses,
    loadingChats: state.chatReducer.gettingInbox,
    allInbox: state.chatReducer.allInbox,
    allLastorders: state.dashboardReducer.allLastorders,
    allFavourite: state.dashboardReducer.allFavourite,
    allMerchantBanners: state.dashboardReducer.allBanners,
    theme: state.themeReducer.theme,
    adminChatId: state.dashboardReducer.adminChatId,
    manualAddress: state.dashboardReducer.manualAddress,

  };
}

export default connect(mapStateToProps, {
  logout,
  pushToParticularScreen,
  deleteAddress,
  paymentTypeSeelcted,
  deleteChat,
  getInbox,
  giveRating,
  getTerms,
  createChatRoom,
  saveSelected,
  getMerchantBanners,
  getMerchantItems,
  muteFriend,addDropAddress
})(Profile);

const Styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  homeView: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
  headerTitleContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleTxt: {
    color: Constants.Colors.White,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
