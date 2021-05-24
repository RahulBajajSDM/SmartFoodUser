/* eslint-disable module-resolver/use-alias */
import {pushToParticularScreen} from 'actions/appActions/AppActions';
import {geUserDetails, logout, socketRegister} from 'actions/authActions';
import {createChatRoom, getInbox} from 'actions/chatActions';
import {
  getActiveLastOrder,
  getAllAddress,
  getCart,
  getCategories,
  getFaq,
  getFavourites,
  getFeatured,
  getLastOrder,
  getMerchantBanners,
  getMerchantItems,
  getNotificationStatus,
  getSubCategory,
  saveManualAddress,
  giveRating,
  fetchZone,
  getAdminId,
  saveSelected,
  addDropAddress,
} from 'actions/dashboardActions';
import {getAllCards, getTax} from 'actions/paymentAction';
import MapModal from 'components/Common/map';
import Constants from 'constants';
import idx from 'idx';
import _ from 'lodash';
import React, {Component, lazy} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';
import FormattedLocation from 'utils/FormatAddressUtils';
import {listeners, onTapped} from 'utils/Notification';
import socket from 'utils/Socket';
import RatingModal from 'components/Common/ratingModal';

const HomeComponent = lazy(() => import('components/Dashboard/Home'));
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchText: '',
      mapModal: false,
      formattedAddress: null,
      latitude: 41.575645,
      longitude: -93.478117,
      deliveryModal: false,
      ratingModal: false,
      selectedOrder: null,
    };
    this.initialApiCalls();
  }

  initialApiCalls = () => {
    const {
      getCategories,
      getFeatured,
      getLastOrder,
      getFavourites,
      getCart,
      getAllAddress,
      getAllCards,
      getTax,
      geUserDetails,
      getActiveLastOrder,
      getFaq,
      getNotificationStatus,
      socketRegister,
      getInbox,
      getAdminId,
    } = this.props;
    const {latitude, longitude} = this.state;
    socketRegister();
    getCategories('');
    getFeatured({page_no: 1, latitude: latitude, longitude: longitude});
    getLastOrder({page_no: 1});
    getFavourites({page_no: 1, subCatId: ''});
    getCart();
    getAllAddress();
    getAllCards();
    getTax();
    geUserDetails();
    getActiveLastOrder({page_no: 1});
    getFaq();
    getNotificationStatus();
    getInbox('userToDriver');
    getAdminId();
  };

  componentDidMount = () => {
    this.getLocation();
    const {getActiveLastOrder, getLastOrder, userData} = this.props;
    listeners((response) => {
      this.notificationReceived(response);
    });

    socket.on('orderStatusUpdate', (data) => {
      getActiveLastOrder({page_no: 1});
      getLastOrder({page_no: 1});
    });

    socket.on('testMessage', (data) => {});
  };

  notificationReceived = (response) => {
    const {getActiveLastOrder, getLastOrder, createChatRoom} = this.props;
    let item = JSON.parse(idx(response, (_) => _._data.data));

    let refreshOrders =
      item.type == 'newRequest' ||
      item.type == 'cancelRequest' ||
      item.type == 'orderReject' ||
      item.type == 'orderPreaparing' ||
      item.type == 'orderDeliver' ||
      item.type == 'driverOnWayToMerchant' ||
      item.type == 'driverReached' ||
      item.type == 'orderPickedup' ||
      item.type == 'ontheWayOrder' ||
      item.type == 'orderDelivered' ||
      item.type == 'driverAccept';
    console.log(item.type, 'SATT=========2');
    if (refreshOrders) {
      getActiveLastOrder({page_no: 1});
      getLastOrder({page_no: 1});
      createChatRoom({
        messageByType: 'userToDriver', // userToDriver, userToAdmin , driverToAdmin
        receiverId: idx(item, (_) => _.data.driverId),
        orderId: idx(item, (_) => _.data.orderID),
      });
    }
  };

  hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    const {getFeatured, fetchZone} = this.props;
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (info) => {
        let sourceLatitude = idx(info, (_) => _.coords.latitude);
        let sourceLongitude = idx(info, (_) => _.coords.longitude);

        this._getFormattedAddress(sourceLatitude, sourceLongitude);
        getFeatured({
          page_no: 1,
          latitude: sourceLatitude,
          longitude: sourceLongitude,
        });
        fetchZone({location: [sourceLongitude, sourceLatitude]});
      },
      (error) => {},
    );
  };

  _getFormattedAddress = async (sourceLatitude, sourceLongitude) => {
    const {saveManualAddress} = this.props;
    let formattedAddress = await FormattedLocation(
      sourceLatitude,
      sourceLongitude,
      true,
    );
    let data = {
      formattedAddress: formattedAddress && formattedAddress.formattedAddress,
      latitude: sourceLatitude,
      longitude: sourceLongitude,
    };

    saveManualAddress(data);

    this.setState({
      formattedAddress: formattedAddress && formattedAddress.formattedAddress,
      latitude: sourceLatitude,
      longitude: sourceLongitude,
    });
  };

  logout = () => {
    const {} = this.props;
    logout();
  };

  itemPressed = _.debounce((value, tabType) => {
    const {
      componentId,
      pushToParticularScreen,
      getMerchantItems,
      getMerchantBanners,
      theme,
      saveSelected,
      addDropAddress,
      manualAddress,
    } = this.props;
    let data = {
      categoryId: value && value.categoryID,
      merchantId: value && value._id,
    };
    getMerchantBanners(data);
    getMerchantItems(data);

    let selectedDetails = {
      merchantDetails: value,
      selectedItem: null,
    };

    let addressArray = [
      {
        type: 'merchant',
        latitude: idx(value, (_) => _.location[1]),
        longitude: idx(value, (_) => _.location[0]),
        formattedAddress: idx(value, (_) => _.address),
      },
      {
        type: 'initial',
        latitude: manualAddress && manualAddress.latitude,
        longitude: manualAddress && manualAddress.longitude,
        formattedAddress: manualAddress && manualAddress.formattedAddress,
      },
    ];
    console.log('PRESSSSSSS', addressArray);
    addDropAddress(addressArray);

    saveSelected(selectedDetails);

    if (tabType == 1) {
      this.setState({ratingModal: true, selectedOrder: value});
    } else {
      //DIRECT FLOWW
      // pushToParticularScreen(theme, componentId, 'AddAddressContainer', {
      //   // merchantDetails: value,
      // });
      pushToParticularScreen(
        theme,
        componentId,
        'ItemDetailsContainer',
        {
          merchantDetails: value,
          selectedItem: null,
        },
        true,
      );
    }
  }, 500);

  categoryPressed = _.debounce((item) => {
    const {
      componentId,
      pushToParticularScreen,
      getSubCategory,
      theme,
      saveSelected,
    } = this.props;
    let selectedDetails = {
      merchantDetails: null,
      selectedItem: item,
    };
    saveSelected(selectedDetails);
    console.log(item, 'itemitemitemitemitem');
    if (idx(item, (_) => _.description) != 'Custom Delievry') {
      pushToParticularScreen(
        theme,
        componentId,
        'CategoryDetailsContainer',
        {
          selectedItem: item,
        },
        true,
      );
    } else {
      pushToParticularScreen(theme, componentId, 'AddAddressContainer', {
        // merchantDetails: null,
        deliveryIs: true,
      });
    }
    // pushToParticularScreen(theme, componentId, 'AddAddressContainer', {
    //   merchantDetails: null,
    //   deliveryIs: true,
    // });

    getSubCategory(item._id);
  }, 500);

  tabSelected = _.debounce((item, index) => {
    //API CALL
  }, 500);

  changingText = (value) => {
    const {getCategories} = this.props;
    getCategories(value);
    this.setState({searchText: value});
  };

  clearText = () => {
    const {getCategories} = this.props;
    this.setState({searchText: ''});
    getCategories('');
  };

  getMoreData = (value) => {
    const {
      getFeatured,
      getLastOrder,
      getFavourites,
      allFavPage,
      allLastOrderPage,
      allFeaturePage,
    } = this.props;
    const {latitude, longitude} = this.state;
    if (value == 0) {
      getFeatured({page_no: allFeaturePage + 1});
    } else if (value == 1) {
      getLastOrder({page_no: allLastOrderPage + 1});
    } else if (value == 2) {
      getFavourites({page_no: allFavPage + 1, subCatId: ''});
    }
  };

  changeManualLoc = () => {
    this.setState({mapModal: true});
  };
  setAddress = (value) => {
    console.log(value, 'valuevaluevalue');
    const {saveManualAddress} = this.props;
    let data = {
      formattedAddress: value.formatted_address,
      latitude: idx(value, (_) => _.coordinates.location.lat),
      longitude: idx(value, (_) => _.coordinates.location.lng),
    };
    this.setState(
      {
        formattedAddress: value.formatted_address,
        latitude: idx(value, (_) => _.coordinates.location.lat),
        longitude: idx(value, (_) => _.coordinates.location.lng),
      },
      () => {
        getFeatured({
          page_no: 1,
          latitude: idx(value, (_) => _.coordinates.location.lat),
          longitude: idx(value, (_) => _.coordinates.location.lng),
        });
      },
    );
    saveManualAddress(data);
  };
  closeModal = () => {
    this.setState({mapModal: false});
  };

  mapPressed = async (coords) => {
    let formattedAddress = await FormattedLocation(
      coords.latitude,
      coords.longitude,
      true,
    );

    let value = {
      formatted_address: idx(formattedAddress, (_) => _.formattedAddress),
      coordinates: {location: {lat: coords.latitude, lng: coords.longitude}},
    };
    this.setAddress(value);
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
    this.setState({ratingModal: false, mapModal: false});
  };

  report = () => {
    alert('Under Dev');
  };

  render() {
    const {
      componentId,
      allCategories,
      loading,
      allFavourite,
      favLoader,
      allLastorders,
      lastLoader,
      allFeatured,
      featureLoader,
      manualAddress,
      theme,
      fetchingZone,
    } = this.props;
    const {
      formattedAddress,
      searchText,
      mapModal,
      latitude,
      longitude,
      ratingModal,
      selectedOrder,
    } = this.state;
    console.log(fetchingZone, 'fetchingZone');
    return (
      <>
        <HomeComponent
          componentId={componentId}
          itemPressed={this.itemPressed}
          logout={this.logout}
          changingText={this.changingText}
          categoryPressed={this.categoryPressed}
          tabSelected={this.tabSelected}
          allCategories={allCategories && allCategories.data}
          loading={loading}
          formattedAddress={formattedAddress}
          allFavourite={allFavourite}
          favLoader={favLoader}
          allLastorders={allLastorders}
          lastLoader={lastLoader}
          allFeatured={allFeatured}
          featureLoader={featureLoader || fetchingZone}
          clearText={this.clearText}
          searchText={searchText}
          getMoreData={this.getMoreData}
          changeManualLoc={this.changeManualLoc}
          theme={theme}
        />
        <MapModal
          visible={mapModal}
          setAddress={this.setAddress}
          latitude={latitude}
          longitude={longitude}
          closeModal={this.closeModal}
          formattedAddress={formattedAddress || manualAddress.formattedAddress}
          goBack={this.closeModal}
          selectedAddess={'current'}
          mapPressed={this.mapPressed}
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
    allCategories: state.dashboardReducer.allCategories,
    loading: state.dashboardReducer.loader,
    allFavourite: state.dashboardReducer.allFavourite,
    favLoader: state.dashboardReducer.favLoader,
    allLastorders: state.dashboardReducer.allLastorders,
    lastLoader: state.dashboardReducer.lastLoader,
    allFeatured: state.dashboardReducer.allFeatured,
    featureLoader: state.dashboardReducer.featureLoader,
    allFavPage: state.dashboardReducer.allFavPage,
    allLastOrderPage: state.dashboardReducer.allLastOrderPage,
    allFeaturePage: state.dashboardReducer.allFeaturePage,
    manualAddress: state.dashboardReducer.manualAddress,
    userData: state.authReducer.loginData,
    theme: state.themeReducer.theme,
    fetchingZone: state.dashboardReducer.fetchingZone,
  };
}

export default connect(mapStateToProps, {
  logout,
  pushToParticularScreen,
  getCategories,
  getFeatured,
  getLastOrder,
  getFavourites,
  getSubCategory,
  getMerchantItems,
  getCart,
  getAllAddress,
  saveManualAddress,
  getMerchantBanners,
  getAllCards,
  getTax,
  geUserDetails,
  getActiveLastOrder,
  getFaq,
  getNotificationStatus,
  socketRegister,
  getInbox,
  createChatRoom,
  giveRating,
  fetchZone,
  getAdminId,
  saveSelected,
  addDropAddress,
})(DashBoard);

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
