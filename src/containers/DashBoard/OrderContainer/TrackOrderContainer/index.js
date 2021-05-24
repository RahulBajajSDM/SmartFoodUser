/* eslint-disable module-resolver/use-alias */
import TrackingModal from 'components/Common/trackingModal';
import Constants from 'constants';
import idx from 'idx';
import _ from 'lodash';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import socket from 'utils/Socket';

const TrackOrderComponent = lazy(() =>
  import('components/Dashboard/Order/TrackOrder'),
);

class TrackOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      trackingModal: false,
      latitude: 30.729704,
      longitude: 76.763805,
    };
  }

  componentDidMount = () => {
    const {selectedOrder} = this.props;
    // this.getLocation();

    socket.on('updateLocation', (data) => {
      this.setState({
        latitude: idx(data, (_) => _.coords.latitude),
        longitude: idx(data, (_) => _.coords.longitude),
      });
    });
  };

  liveTracking = _.debounce(() => {
    this.setState({
      trackingModal: true,
    });
  }, 100);

  closeModal = () => {
    this.setState({
      trackingModal: false,
    });
  };

  render() {
    const {componentId, selectedOrder, theme} = this.props;
    const {trackingModal, latitude, longitude} = this.state;

    return (
      <>
        <TrackOrderComponent
          componentId={componentId}
          liveTracking={this.liveTracking}
          selectedOrder={selectedOrder}
          theme={theme}
          latitude={latitude}
          longitude={longitude}
        />
        <TrackingModal
          visible={trackingModal}
          closeModal={this.closeModal}
          selectedOrder={selectedOrder}
          latitude={latitude}
          longitude={longitude}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {})(TrackOrder);

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
