/* eslint-disable module-resolver/use-alias */
import {logout} from 'actions/authActions';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'constants';
import _ from 'lodash';
import idx from 'idx';
const OrderComponent = lazy(() => import('components/Dashboard/Order'));
import {pushToParticularScreen} from 'actions/appActions/AppActions';

import {
  getActiveLastOrder,
  getLastOrder,
  giveRating,
  addToCart,
  selectedForCompletion,
} from 'actions/dashboardActions';
import RatingModal from 'components/Common/ratingModal';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, ratingModal: false, selectedOrder: null};
  }

  logout = () => {
    const {logout} = this.props;
    logout();
  };

  trackOrder = _.debounce((item) => {
    const {
      pushToParticularScreen,
      componentId,
      theme,
      selectedForCompletion,
    } = this.props;
    pushToParticularScreen(theme, componentId, 'TrackOrderContainer', {
      selectedOrder: item,
    });
    selectedForCompletion(item);
  });
  getMoreData = () => {
    const {activeLastOrderPage, getActiveLastOrder} = this.props;
    getActiveLastOrder({
      page_no: 1 + activeLastOrderPage,
    });
  };

  getMoreHistory = () => {
    const {getLastOrder, allLastOrderPage} = this.props;
    getLastOrder({page_no: allLastOrderPage + 1});
  };

  goToHelp = _.debounce(() => {
    const {
      pushToParticularScreen,
      componentId,
      faq,
      loadngFaq,
      theme,
    } = this.props;
    pushToParticularScreen(theme, componentId, 'HelpComponent', {faq: faq});
  }, 500);

  rateDriver = (item) => {
    this.setState({selectedOrder: item, ratingModal: true});
  };

  giveRating = (rating, description) => {
    const {userData, giveRating} = this.props;
    const {selectedOrder} = this.state;
    let data = {
      userId: idx(userData, (_) => _.data._id),
      rating: rating,
      comment: description,
      orderId: idx(selectedOrder, (_) => _._id),
      merchantId: idx(selectedOrder, (_) => _.merchantId._id),
    };

    // console.log(data, 'selectedOrderselectedOrder');
    giveRating(data);
  };

  closeModal = () => {
    this.setState({ratingModal: false});
  };

  report = () => {
    alert('Under Dev');
  };

  reorder = (item) => {
    const {allCartItems, addToCart} = this.props;
    this.setState({selectedOrder: item}, () => {
      let selectedItem = idx(item, (_) =>
        _.bookedItems.find((o) => o.productId),
      );
      let itemAvailability = idx(allCartItems, (_) =>
        _.result.find(
          (o) => o.product._id == (selectedItem && selectedItem.productId),
        ),
      );

      if (itemAvailability) {
        let cartBody = {
          productID: selectedItem.productId,
          quantity: idx(itemAvailability, (_) => _.cartItems.quantity) + 1,
          price: idx(itemAvailability, (_) => _.cartItems.price),
          signatureImage: idx(itemAvailability, (_) => _.signatureImage),
          dropPoints: idx(itemAvailability, (_) => _.dropPoints),
          variation: idx(itemAvailability, (_) => _.cartItems.variation),
          addons: idx(itemAvailability, (_) => _.cartItems.addons),
        };
        addToCart(cartBody);
      } else {
        let cartBody = {
          productID: selectedItem.productId,
          quantity: 1,
          price: idx(itemAvailability, (_) => _.cartItems.price),
          signatureImage: idx(itemAvailability, (_) => _.signatureImage),
          dropPoints: idx(itemAvailability, (_) => _.dropPoints),
          variation: idx(itemAvailability, (_) => _.cartItems.variation),
          addons: idx(itemAvailability, (_) => _.cartItems.addons),
        };
        addToCart(cartBody);
      }
    });
  };
  render() {
    const {
      componentId,
      allLastorders,
      lastLoader,
      activeLastorders,
      activeLastOrderPage,
      activeLoader,
      cartLoader,
      theme,
    } = this.props;
    const {ratingModal, selectedOrder} = this.state;
    return (
      <>
        <OrderComponent
          componentId={componentId}
          logout={this.logout}
          trackOrder={this.trackOrder}
          allLastorders={allLastorders}
          lastLoader={lastLoader}
          activeLastOrderPage={activeLastOrderPage}
          activeLastorders={activeLastorders}
          activeLoader={activeLoader}
          getMoreData={this.getMoreData}
          getMoreHistory={this.getMoreHistory}
          goToHelp={this.goToHelp}
          rateDriver={this.rateDriver}
          reorder={this.reorder}
          cartLoader={cartLoader}
          theme={theme}
        />
        <RatingModal
          visibility={ratingModal}
          giveRating={this.giveRating}
          closeModal={this.closeModal}
          currentActiveJob={selectedOrder}
          report={this.report}
          theme={theme}
          refresh={Math.random()}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    allLastorders: state.dashboardReducer.allLastorders,
    lastLoader: state.dashboardReducer.lastLoader,

    activeLastorders: state.dashboardReducer.activeLastorders,
    activeLastOrderPage: state.dashboardReducer.activeLastOrderPage,
    activeLoader: state.dashboardReducer.activeLoader,
    allLastOrderPage: state.dashboardReducer.allLastOrderPage,
    loadngFaq: state.dashboardReducer.loadngFaq,
    faq: state.dashboardReducer.faq,
    userData: state.authReducer.loginData,
    allCartItems: state.dashboardReducer.allCartItems,
    cartLoader: state.dashboardReducer.cartLoader,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  pushToParticularScreen,
  getActiveLastOrder,
  getLastOrder,
  giveRating,
  addToCart,
  selectedForCompletion,
})(Order);

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
