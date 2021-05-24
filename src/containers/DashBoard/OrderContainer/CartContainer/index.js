/* eslint-disable module-resolver/use-alias */
import { pop } from "actions/appActions/AppActions";
import {
  addToCart,
  removeProduct,
  makeOrderRequest,
  setCartTotal,
  clearCart,
  makeCustomOrderRequest,
  addDropAddress,
} from "actions/dashboardActions";
import idx from "idx";
import React, { Component, lazy } from "react";
import { connect } from "react-redux";
import { pushToParticularScreen } from "actions/appActions/AppActions";
import _ from "lodash";
import { manageComponentStats } from "actions/componentStats";
import Toast from "react-native-simple-toast";
const CartComponent = lazy(() => import("components/Dashboard/Order/Cart"));

class Cart extends Component {
  constructor(props) {
    super(props);
    this.props.manageComponentStats(
      this.props.componentId,
      "CartContainer",
      this.props.componentStats
    );
  }
  increase = (value) => {
    const {
      addedAddresses,
      signatureDetails,
      addToCart,
      cartItems,
    } = this.props;
    let filteredStops =
      addedAddresses && addedAddresses.filter((o) => o.formattedAddress);
    let cartDropPoint = [];

    idx(cartItems, (_) =>
      _.result[0].dropPoints.map((item, index) => {
        let x = {
          location: [item.location[0], item.location[1]],
          address: item.address,
          type: item.type,
          price: item.price || 0,
          description: item.description || "",
          status: true,
        };
        cartDropPoint.push(x);
      })
    );

    let cartBody = {
      productID: idx(value, (_) => _.cartItems.productID),
      quantity: idx(value, (_) => _.cartItems.quantity) + 1,
      price: idx(value, (_) => _.cartItems.price),
      signatureImage:
        (signatureDetails && signatureDetails.userIdImage) ||
        idx(cartItems, (_) => _.result[0].signatureImage),
      dropPoints:
        filteredStops && filteredStops.length > 0
          ? filteredStops
          : cartDropPoint,
      variation: idx(value, (_) => _.product.variation[0]._id),
      addons: idx(value, (_) => _.cartItems.addons),
    };
    addToCart(cartBody);
    console.log("VALUE INCREASE", cartBody);
  };

  decrease = (value) => {
    const {
      addToCart,
      removeProduct,
      addedAddresses,
      signatureDetails,
      selectedCard,
      cartItems,
      setCartTotal,
      clearCart,
    } = this.props;
    let filteredStops =
      addedAddresses && addedAddresses.filter((o) => o.formattedAddress);
    let cartDropPoint = [];

    idx(cartItems, (_) =>
      _.result[0].dropPoints.map((item, index) => {
        let x = {
          location: [item.location[0], item.location[1]],
          address: item.address,
          type: item.type,
          price: item.price || 0,
          description: item.description || "",
          status: true,
        };
        cartDropPoint.push(x);
      })
    );
    let cartBody = {
      productID: idx(value, (_) => _.cartItems.productID),
      quantity: idx(value, (_) => _.cartItems.quantity) - 1,
      price: idx(value, (_) => _.cartItems.price),
      signatureImage:
        (signatureDetails && signatureDetails.userIdImage) ||
        idx(cartItems, (_) => _.result[0].signatureImage),
      dropPoints:
        filteredStops && filteredStops.length > 0
          ? filteredStops
          : cartDropPoint,
      variation: idx(value, (_) => _.product.variation[0]._id),
      addons: idx(value, (_) => _.cartItems.addons),
    };

    if (idx(value, (_) => _.cartItems.quantity) == 1) {
      // removeProduct(idx(value, (_) => _.cartItems._id));
      clearCart(() => {});
      setCartTotal(0);
    } else {
      addToCart(cartBody, true);
    }
    console.log(cartItems, "VALUE DECREASE", cartBody);
  };

  orderNow = (cartTotal, deliveryFees, gstFees, tip) => {
    const {
      cartItems,
      merchantDetails,
      signatureDetails,
      addedAddresses,
      makeOrderRequest,
      selectedCard,
      makeCustomOrderRequest,
      manualAddress,
    } = this.props;
    let isCustomDelivery = idx(cartItems, (_) => _.result[0].type == "custom");
    let availableDrops =
      (addedAddresses && addedAddresses.filter((o) => o.formattedAddress)) ||
      idx(cartItems, (_) =>
        _.result[0].dropPoints.filter((o) => o.formattedAddress)
      );
    let customDropPoint = [];
    let cartDropPoint = [];

    availableDrops &&
      availableDrops.map((item, index) => {
        let x = {
          location: [item.longitude, item.latitude],
          address: item.formattedAddress,
          type: item.type,
          price: item.price || 0,
          description: item.description || "",
          status: true,
        };
        customDropPoint.push(x);
      });

    idx(cartItems, (_) =>
      _.result[0].dropPoints.map((item, index) => {
        let x = {
          location: [item.longitude, item.latitude],
          address: item.formattedAddress,
          type: item.type,
          price: item.price || 0,
          description: item.description || "",
          status: true,
        };
        cartDropPoint.push(x);
      })
    );

    let orderDetails = {
      merchantId:
        idx(merchantDetails, (_) => _._id) ||
        idx(cartItems, (_) => _.result[0].product.merchantID),
      bookedItems: idx(cartItems, (_) => _.result),
      totalAmount: Number(
        (cartTotal + deliveryFees + gstFees + tip).toFixed(2)
      ),
      deleiveryFee: deliveryFees || 0,
      riderTip: tip || 0,
      taxFee: gstFees || 0,
      signatureImage:
        (signatureDetails && signatureDetails.userIdImage) ||
        idx(cartItems, (_) => _.result[0].signatureImage),

      dropPoints:
        availableDrops && availableDrops.length > 0
          ? customDropPoint
          : cartDropPoint,
      paymentType: this.paymentType(),
      cardId: idx(selectedCard, (_) => _.id),
      firstStop:
        idx(
          availableDrops,
          (_) => _.find((o) => o.type == "stop1").stop1Price
        ) ||
        idx(availableDrops, (_) => _.find((o) => o.type == "stop1").price) ||
        0,
      secondStop:
        idx(
          availableDrops,
          (_) => _.find((o) => o.type == "stop2").stop2Price
        ) ||
        idx(availableDrops, (_) => _.find((o) => o.type == "stop2").price) ||
        0,
    };

    let customOrderDetails = {
      totalAmount: Number(
        (cartTotal + deliveryFees + gstFees + tip).toFixed(2)
      ),
      deleiveryFee: deliveryFees || 0,
      riderTip: tip || 0,
      taxFee: gstFees || 0,
      signatureImage: "",

      dropPoints:
        availableDrops && availableDrops.length > 0
          ? customDropPoint
          : cartDropPoint,
      paymentType: this.paymentType(),
      cardId: idx(selectedCard, (_) => _.id),
      firstStop:
        idx(
          availableDrops,
          (_) => _.find((o) => o.type == "stop1").stop1Price
        ) ||
        idx(availableDrops, (_) => _.find((o) => o.type == "stop1").price) ||
        0,
      secondStop:
        idx(
          availableDrops,
          (_) => _.find((o) => o.type == "stop2").stop2Price
        ) ||
        idx(availableDrops, (_) => _.find((o) => o.type == "stop2").price) ||
        0,
      location: [
        idx(manualAddress, (_) => _.longitude),
        idx(manualAddress, (_) => _.latitude),
      ],

      cartId: idx(cartItems, (_) => _.result[0]._id),
    };
    console.log("ORDER BODY*************", orderDetails);
    console.log("ORDER BODY2*************", customDropPoint);
    console.log(availableDrops, "ORDER BODY3*************", cartDropPoint);

    if (isCustomDelivery) {
      makeCustomOrderRequest(customOrderDetails);
    } else {
      makeOrderRequest(orderDetails);
    }
  };

  paymentType = () => {
    const { paymentType } = this.props;
    if (paymentType == 0) {
      return "cod";
    } else if (paymentType == 1) {
      return "paypal";
    } else if (paymentType == 2) {
      return "stripe";
    } else if (paymentType == 3) {
      return "atdoor";
    }
  };

  cancel = () => {
    const { pop, setCartTotal, clearCart } = this.props;
    // pop(componentId);
    clearCart(() => {});
    setCartTotal(0);
  };

  paymentMethod = _.debounce(() => {
    const { componentId, pushToParticularScreen, theme } = this.props;
    pushToParticularScreen(theme, componentId, "PaymentContainer");
  }, 500);

  changeLocation = () => {
    const {
      componentId,
      pushToParticularScreen,
      theme,
      selectedDetails,
    } = this.props;
    pushToParticularScreen(theme, componentId, "AddAddressContainer", {
      ...selectedDetails,
      fromCart: true,
    });
  };

  render() {
    const {
      cartItems,
      cartLoader,
      headerAdded,
      cartTotal,
      addedAddresses,
      signatureDetails,
      creatingOrder,
      paymentType,
      taxRates,
      theme,
    } = this.props;
    console.log("JSON>Stringfy", JSON.stringify(this.props));
    return (
      <CartComponent
        increase={this.increase}
        decrease={this.decrease}
        orderNow={this.orderNow}
        cancel={this.cancel}
        cartItems={cartItems}
        cartLoader={cartLoader}
        headerAdded={headerAdded}
        cartTotal={cartTotal}
        addedAddresses={addedAddresses}
        signatureDetails={signatureDetails}
        creatingOrder={creatingOrder}
        paymentMethod={this.paymentMethod}
        paymentType={paymentType}
        taxRates={taxRates}
        theme={theme}
        changeLocation={this.changeLocation}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.dashboardReducer.allCartItems,
    cartLoader: state.dashboardReducer.cartLoader,
    cartTotal: state.dashboardReducer.cartTotal,
    addedAddresses: state.dashboardReducer.addedAddresses,
    signatureDetails: state.dashboardReducer.signatureDetails,
    creatingOrder: state.dashboardReducer.creatingOrder,
    paymentType: state.paymentReducer.paymentType,
    taxRates: state.paymentReducer.taxRates,
    selectedCard: state.paymentReducer.selectedCard,
    theme: state.themeReducer.theme,
    manualAddress: state.dashboardReducer.manualAddress,
    selectedDetails: state.dashboardReducer.selectedDetails,
  };
}

export default connect(mapStateToProps, {
  pop,
  addToCart,
  removeProduct,
  makeOrderRequest,
  pushToParticularScreen,
  manageComponentStats,
  setCartTotal,
  clearCart,
  makeCustomOrderRequest,
  addDropAddress,
})(Cart);
