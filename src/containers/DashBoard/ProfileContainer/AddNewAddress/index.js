/* eslint-disable module-resolver/use-alias */
import Geolocation from 'react-native-geolocation-service';
import MapModal from 'components/Common/map';
import Constants from 'constants';
import idx from 'idx';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import FormattedLocation from 'utils/FormatAddressUtils';
import {addNewAddress, updateAddress} from 'actions/dashboardActions';
const AddNewAddComponent = lazy(() =>
  import('../../../../components/Dashboard/Profile/AddNewAddress'),
);

class AddNewAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapModal: false,
      formattedAddress: null,
      latitude: 41.575645,
      longitude: -93.478117,
    };
  }

  componentDidMount = () => {
    const {updateTrue, oldAddress} = this.props;
    if (updateTrue) {
      this.setState({
        formattedAddress: oldAddress.formattedAddress,
        latitude: Number(oldAddress.latitude),
        longitude: Number(oldAddress.longitude),
      });
    } else {
      this.getLocation();
    }
  };
  getLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        let sourceLatitude = idx(info, (_) => _.coords.latitude);
        let sourceLongitude = idx(info, (_) => _.coords.longitude);
        this.setState({
          latitude: sourceLatitude,
          longitude: sourceLongitude,
        });
        this._getFormattedAddress(sourceLatitude, sourceLongitude);
      },
      (error) => {},
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

  openMap = () => {
    this.setState({
      mapModal: true,
    });
  };

  setAddress = (value) => {
    this.setState({
      formattedAddress: idx(value, (_) => _.formatted_address),
      latitude: idx(value, (_) => _.coordinates.location.lat),
      longitude: idx(value, (_) => _.coordinates.location.lng),
    });
  };

  closeModal = () => {
    this.setState({mapModal: false});
  };

  saveAddress = (name) => {
    if (!name) {
      Toast.show('Please input name of your location.');
    } else {
      this.addOrUpdate(name);
    }
  };

  addOrUpdate = (name) => {
    const {latitude, longitude, formattedAddress} = this.state;
    const {
      addNewAddress,
      componentId,
      updateTrue,
      oldAddress,
      updateAddress,
    } = this.props;

    if (updateTrue) {
      let address = {
        id: oldAddress._id, // id of address
        formattedAddress: formattedAddress,
        latitude: latitude,
        longitude: longitude,
        name: name,
      };
      updateAddress(address, componentId);
    } else {
      let address = {
        formattedAddress: formattedAddress,
        latitude: latitude,
        longitude: longitude,
        name: name,
      };
      addNewAddress(address, componentId);
    }
  };

  render() {
    const {
      componentId,
      addingAddress,
      updateTrue,
      oldAddress,
      theme,
    } = this.props;
    const {mapModal, latitude, longitude, formattedAddress} = this.state;
    return (
      <>
        <AddNewAddComponent
          componentId={componentId}
          openMap={this.openMap}
          formattedAddress={formattedAddress}
          saveAddress={this.saveAddress}
          addingAddress={addingAddress}
          updateTrue={updateTrue}
          oldAddress={oldAddress}
          theme={theme}
        />
        <MapModal
          visible={mapModal}
          setAddress={this.setAddress}
          latitude={latitude}
          longitude={longitude}
          closeModal={this.closeModal}
          formattedAddress={formattedAddress}
          goBack={this.closeModal}
          selectedAddess={'current'}
          theme={theme}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    addingAddress:
      state.dashboardReducer.addingAddress ||
      state.dashboardReducer.updatingAddress,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  addNewAddress,
  updateAddress,
})(AddNewAddress);

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
