/* eslint-disable module-resolver/use-alias */
import {pushToParticularScreen, pop} from 'actions/appActions/AppActions';
import _ from 'lodash';
import React, {Component, lazy} from 'react';
import {connect} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import idx from 'idx';
import FormattedLocation from 'utils/FormatAddressUtils';
import MapModal from 'components/Common/map';
import AgeVerificationModal from 'components/Common/ageVarification';
import {
  addDropAddress,
  uploadIdImage,
  saveSignature,
  checkZone,
  fetchZone,
  addToCart,
  saveManualAddress,
} from 'actions/dashboardActions';
import Toast from 'react-native-simple-toast';
const AddAddressComponent = lazy(() =>
  import('components/Dashboard/Home/AddAddress'),
);

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedAddress: null,
      latitude: 41.575645,
      longitude: -93.478117,
      formattedAddressStopOne: idx(
        this.props,
        (_) => _.addedAddresses.find((o) => o.type == 'stop1').formattedAddress,
      ),
      stopOneLatitude:
        idx(
          this.props,
          (_) => _.addedAddresses.find((o) => o.type == 'stop1').latitude,
        ) || 41.575645,
      stopOneLongitude:
        idx(
          this.props,
          (_) => _.addedAddresses.find((o) => o.type == 'stop1').longitude,
        ) || -93.478117,
      formattedAddressStopTwo: idx(
        this.props,
        (_) => _.addedAddresses.find((o) => o.type == 'stop2').formattedAddress,
      ),
      stopTwoLatitude:
        idx(
          this.props,
          (_) => _.addedAddresses.find((o) => o.type == 'stop2').latitude,
        ) || 41.575645,
      stopTwoLongitude:
        idx(
          this.props,
          (_) => _.addedAddresses.find((o) => o.type == 'stop2').longitude,
        ) || -93.478117,
      mapModal: false,
      selectedAddess: 'current',
      descriptionStop1: '',
      descriptionStop2: '',
      store1: '',
      store2: '',
      ageModal: false,
      idImage: null,
      stop1Price:
        idx(
          this.props,
          (_) => _.addedAddresses.find((o) => o.type == 'stop1').price,
        ) || 0,
      stop2Price:
        idx(
          this.props,
          (_) => _.addedAddresses.find((o) => o.type == 'stop2').price,
        ) || 0,
    };
    this.getLocation();
    console.log(
      idx(this.props, (_) => _.addedAddresses.find((o) => o.type == 'stop1')),
      'addedAddressesaddedAddresses',
    );
  }
  getLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        let sourceLatitude = idx(info, (_) => _.coords.latitude);
        let sourceLongitude = idx(info, (_) => _.coords.longitude);
        this.setState({
          latitude: sourceLatitude,
          longitude: sourceLongitude,
          stopOneLatitude: sourceLatitude,
          stopOneLongitude: sourceLongitude,
          stopTwoLatitude: sourceLatitude,
          stopTwoLongitude: sourceLongitude,
        });
        this._getFormattedAddress(sourceLatitude, sourceLongitude);
      },
      (error) => {},
      {
        enableHighAccuracy: false,
      },
    );
  };

  _getFormattedAddress = async (sourceLatitude, sourceLongitude) => {
    let formattedAddress = await FormattedLocation(
      sourceLatitude,
      sourceLongitude,
      true,
    );
    this.setState({
      formattedAddress: formattedAddress && formattedAddress.formattedAddress,
    });
  };

  proceed = _.debounce(() => {
    const {
      merchantDetails,
      pushToParticularScreen,
      componentId,
      selectedItem,
      theme,
      addDropAddress,
      deliveryIs,
      addToCart,
      fromCart,
      pop,
      allCartItems,
    } = this.props;
    const {
      formattedAddress,
      latitude,
      longitude,
      formattedAddressStopOne,
      stopOneLatitude,
      stopOneLongitude,
      formattedAddressStopTwo,
      stopTwoLatitude,
      stopTwoLongitude,
      descriptionStop1,
      store1,
      descriptionStop2,
      store2,
      idImage,
      stop1Price,
      stop2Price,
    } = this.state;

    let addressArray = [
      {
        type: 'merchant',
        latitude: idx(merchantDetails, (_) => _.location[1]),
        longitude: idx(merchantDetails, (_) => _.location[0]),
        formattedAddress: idx(merchantDetails, (_) => _.address),
      },
      {
        type: 'initial',
        latitude: latitude,
        longitude: longitude,
        formattedAddress: formattedAddress,
      },
      {
        type: 'stop1',
        latitude: stopOneLatitude,
        longitude: stopOneLongitude,
        formattedAddress: formattedAddressStopOne,
        description: descriptionStop1,
        storeName: store1,
        price: stop1Price,
      },

      {
        type: 'stop2',
        latitude: stopTwoLatitude,
        longitude: stopTwoLongitude,
        formattedAddress: formattedAddressStopTwo,
        description: descriptionStop2,
        storeName: store2,
        price: stop2Price,
      },
    ];
    let filtersStops = addressArray.filter((o) => o.formattedAddress);
    console.log(filtersStops, 'filtersStopsfiltersStopsfiltersStops');

    let customDropPoint = [];

    filtersStops &&
      filtersStops.map((item, index) => {
        let x = {
          location: [item.longitude, item.latitude],
          address: item.formattedAddress,
          type: item.type,
          price: item.price || 0,
          description: item.description || '',
          status: true,
        };
        customDropPoint.push(x);
      });

    addDropAddress(addressArray);
    if (idx(merchantDetails, (_) => _.isAgeRequired)) {
      this.setState({
        ageModal: true,
      });
    } else {
      if (deliveryIs) {
        //For custom delivery
        if (formattedAddressStopOne) {
          let cartBody = {
            type: 'custom',
            // dropPoints: filtersStops,
            dropPoints: customDropPoint,
          };
          addToCart(cartBody, false, true);
          pushToParticularScreen(theme, componentId, 'CartContainer', {
            headerAdded: true,
            merchantDetails: null,
          });
        } else {
          Toast.show('Please enter atleast 1 drop point');
        }
      } else {
        console.log('REACHED 3');

        //For regular order
        if (fromCart) {
          // In case user changes adress after comming to cart
          let cartBody = {
            productID: idx(allCartItems, (_) => _.result[0].product._id),
            quantity: idx(allCartItems, (_) => _.result[0].cartItems.quantity),
            price: idx(allCartItems, (_) =>
              _.result[0].cartItems.price.toString(),
            ),
            signatureImage: idx(
              allCartItems,
              (_) => _.result[0].signatureImage,
            ),
            dropPoints: customDropPoint,
            variation: idx(
              allCartItems,
              (_) => _.result[0].cartItems.variation || [],
            ),
            addons: idx(allCartItems, (_) => _.result[0].cartItems.addons),
          };
          console.log(cartBody, 'cartBodycartBodycartBody', allCartItems);
          pop(componentId);
          addToCart(cartBody, false, true);
        } else {
          console.log('REACHED 4');

          pushToParticularScreen(
            theme,
            componentId,
            'ItemDetailsContainer',
            {
              merchantDetails: merchantDetails,
              selectedItem: selectedItem,
            },
            true,
          );
        }
      }
    }
  }, 500);

  changeAdderss = (value) => {
    this.setState({mapModal: true, selectedAddess: value});
  };

  setAddress = (value) => {
    console.log('CALLEDCALLED', value);
    const {selectedAddess} = this.state;
    const {checkZone, merchantDetails, zoneId, saveManualAddress} = this.props;
    let latitude = idx(value, (_) => _.coordinates.location.lat);
    let longitude = idx(value, (_) => _.coordinates.location.lng);

    if (selectedAddess == 'current') {
      let data = {
        formattedAddress: value.formatted_address,
        latitude: latitude,
        longitude: longitude,
      };
      saveManualAddress(data);

      this.setState({
        formattedAddress: value.formatted_address,
        latitude: latitude,
        longitude: longitude,
      });
    } else if (selectedAddess == 'stop1') {
      let zoneData = {
        zoneId:
          idx(merchantDetails, (_) => _.zone._id) || (zoneId && zoneId.zoneId),
        location: [longitude, latitude],

        isFirst: true,
        isSecond: false,
      };
      checkZone(zoneData, (response) => {
        if (idx(response, (_) => _.data.price) > 0) {
          this.setState({
            formattedAddressStopOne: value.formatted_address,
            stopOneLatitude: latitude,
            stopOneLongitude: longitude,
            stop1Price: idx(response, (_) => _.data.price),
          });
        } else {
          Toast.show(
            'Merchant does not provide services at selected location.',
          );
        }
      });
    } else if (selectedAddess == 'stop2') {
      fetchZone({location: [longitude, latitude]});

      let zoneData = {
        zoneId:
          idx(merchantDetails, (_) => _.zone._id) || (zoneId && zoneId.zoneId),
        location: [longitude, latitude],

        isFirst: false,
        isSecond: true,
      };
      checkZone(zoneData, (response) => {
        if (idx(response, (_) => _.data.price) > 0) {
          this.setState({
            formattedAddressStopTwo: value.formatted_address,
            stopTwoLatitude: latitude,
            stopTwoLongitude: longitude,
            stop2Price: idx(response, (_) => _.data.price),
          });
        } else {
          Toast.show(
            'Merchant does not provide services at selected location.',
          );
        }
      });
    }
  };

  getZoneId = async (data) => {
    const {fetchZone} = this.props;
    await fetchZone(data);
  };
  setDescription = (value) => {
    const {selectedAddess} = this.state;

    if (selectedAddess == 'stop1') {
      this.setState({
        descriptionStop1: value,
      });
    } else if (selectedAddess == 'stop2') {
      this.setState({
        descriptionStop2: value,
      });
    }
  };

  setStore = (value) => {
    const {selectedAddess} = this.state;

    if (selectedAddess == 'stop1') {
      this.setState({
        store1: value,
      });
    } else if (selectedAddess == 'stop2') {
      this.setState({
        store2: value,
      });
    }
  };

  closeModal = () => {
    this.setState({mapModal: false});
  };

  signaturePadChange = (value) => {};

  setPhoto = (imageData) => {
    const {uploadIdImage} = this.props;
    let idImage = {
      uri: imageData.uri,
      type: imageData.type,
      name: 'images.jpg',
    };
    let image = new FormData();
    image.append('image', idImage);
    uploadIdImage(image, (response) => {
      this.setState({idImage: response.data});
    });
  };

  vertifyUser = () => {
    const {userData, saveSignature} = this.props;
    const {idImage} = this.state;
    let userVerification = {
      userSignature: idx(userData, (_) => _.data.firstname),
      userIdImage: idImage,
    };
    this.setState({ageModal: false});
    saveSignature(userVerification);
  };

  selectedLatitude = (value) => {
    const {
      latitude,
      longitude,
      stopOneLatitude,
      stopOneLongitude,
      selectedAddess,
      stopTwoLatitude,
      stopTwoLongitude,
    } = this.state;
    if (selectedAddess == 'current') {
      return {latitude: latitude, longitude: longitude};
    } else if (selectedAddess == 'stop1') {
      return {latitude: stopOneLatitude, longitude: stopOneLongitude};
    } else if (selectedAddess == 'stop2') {
      return {latitude: stopTwoLatitude, longitude: stopTwoLongitude};
    }
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

  render() {
    const {
      formattedAddress,
      formattedAddressStopOne,
      formattedAddressStopTwo,
      mapModal,
      latitude,
      longitude,
      selectedAddess,
      descriptionStop1,
      descriptionStop2,
      store1,
      store2,
      stopOneLatitude,
      stopOneLongitude,
      stopTwoLatitude,
      stopTwoLongitude,
      ageModal,
      idImage,
      stop1Price,
      stop2Price,
    } = this.state;
    const {
      merchantDetails,
      userData,
      allAddresses,
      uploadingID,
      theme,
      deliveryIs,
    } = this.props;
    let selectedLatitude = this.selectedLatitude();
    console.log(this.props, 'asdasdasdas');
    return (
      <>
        <AddAddressComponent
          proceed={this.proceed}
          formattedAddress={formattedAddress}
          formattedAddressStopOne={formattedAddressStopOne}
          formattedAddressStopTwo={formattedAddressStopTwo}
          changeAdderss={this.changeAdderss}
          descriptionOne={descriptionStop1}
          descriptionTwo={descriptionStop2}
          latitude={latitude}
          longitude={longitude}
          stopOneLatitude={stopOneLatitude}
          stopOneLongitude={stopOneLongitude}
          stopTwoLatitude={stopTwoLatitude}
          stopTwoLongitude={stopTwoLongitude}
          merchantDetails={merchantDetails}
          userData={userData}
          allAddresses={allAddresses}
          theme={theme}
          stop1Price={stop1Price}
          stop2Price={stop2Price}
          deliveryIs={deliveryIs}
        />

        <MapModal
          visible={mapModal}
          setAddress={this.setAddress}
          latitude={selectedLatitude.latitude}
          longitude={selectedLatitude.longitude}
          closeModal={this.closeModal}
          formattedAddress={formattedAddress}
          goBack={this.closeModal}
          setDescription={this.setDescription}
          description={
            selectedAddess == 'stop1' ? descriptionStop1 : descriptionStop2
          }
          store={selectedAddess == 'stop1' ? store1 : store2}
          setStore={this.setStore}
          selectedAddess={selectedAddess}
          mapPressed={this.mapPressed}
          theme={theme}
        />
        <AgeVerificationModal
          visible={ageModal}
          signaturePadChange={this.signaturePadChange}
          userData={userData}
          setPhoto={this.setPhoto}
          uploadingID={uploadingID}
          idImage={idImage}
          vertifyUser={this.vertifyUser}
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
    uploadingID: state.dashboardReducer.uploadingID,
    theme: state.themeReducer.theme,
    zoneId: state.dashboardReducer.zoneId,
    merchantDetails: idx(
      state,
      (_) => _.authReducer.selectedDetails.merchantDetails,
    ),
    selectedItem: idx(state, (_) => _.authReducer.selectedDetails.selectedItem),
    allCartItems: state.dashboardReducer.allCartItems,
    addedAddresses: state.dashboardReducer.addedAddresses,
  };
}

export default connect(mapStateToProps, {
  pushToParticularScreen,
  addDropAddress,
  uploadIdImage,
  saveSignature,
  checkZone,
  fetchZone,
  addToCart,
  pop,
  saveManualAddress,
})(AddAddress);
