/* eslint-disable module-resolver/use-alias */
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {addToCart, clearCart, likeItem} from 'actions/dashboardActions';
import ConfirmationModal from 'components/Common/confirmationModal';
import Constants from 'constants';
import idx from 'helpers/Idx';
import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ItemInfoComponent from '../../../../components/Dashboard/Home/ItemInfo';

class ItemInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      clearCartModal: false,
      selectedPrice: 0,
      selectedAddOnPrice: 0,
      addOnIdList: null,
    };
  }

  goBack = _.debounce(() => {
    const {pop, componentId} = this.props;
    pop(componentId);
  }, 500);

  information = _.debounce(() => {
    const {pushToParticularScreen, componentId, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'ItemInfoContainer', {
      selectedItem: value,
    });
  }, 500);

  addMore = _.debounce((item) => {
    alert('ADD MORE UNDER DEV');
  }, 500);

  goToCart = _.debounce((item) => {
    const {
      pushToParticularScreen,
      componentId,
      merchantDetails,
      theme,
    } = this.props;
    pushToParticularScreen(theme, componentId, 'CartContainer', {
      headerAdded: true,
      merchantDetails: merchantDetails,
    });
  }, 500);

  likeItem = _.debounce(() => {
    const {selectedItem, likeItem, subCategories} = this.props;
    let likeBody = {
      merchantID: idx(selectedItem, (_) => _.merchantID._id),
      productID: idx(selectedItem, (_) => _._id),
      subcategoryID: idx(selectedItem, (_) => _.subcategoryID),
      status: !idx(selectedItem, (_) => _.isFav), // true for fav / false for unfav
    };
    // let categoryId = idx(subCategories && subCategories, (_) => _[0]._id);
    likeItem(likeBody);
  }, 500);

  addtoCart = _.debounce((item, variationType) => {
    const {allCartItems, selectedItem} = this.props;
    this.setState({selectedPrice: item});
    this.checkItemValidity(selectedItem, allCartItems, item, variationType);
  }, 500);

  checkItemValidity = (selectedItem, allCartItems, item, variationType) => {
    let merchantId = idx(selectedItem, (_) => _.merchantID._id);
    let merchantCartItems = idx(
      allCartItems,
      (_) => _.result[0].product.merchantID,
    );

    if (merchantCartItems && merchantId != merchantCartItems) {
      this.setState({clearCartModal: true});
    } else {
      this.addItems(item, variationType);
    }
  };

  addItems = (item, variationType) => {
    const {
      addToCart,
      allCartItems,
      selectedItem,
      addedAddresses,
      signatureDetails,
    } = this.props;
    const {selectedAddOnPrice, addOnIdList} = this.state;
    let alreadyAddedItems = idx(allCartItems, (_) =>
      _.result.find((o) => o.product._id == selectedItem._id),
    );
    let customDropPoint = [];

    let filtersStops =
      addedAddresses && addedAddresses.filter((o) => o.formattedAddress);
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

    if (alreadyAddedItems) {
      let cartBody = {
        productID: selectedItem._id,
        quantity: idx(alreadyAddedItems, (_) => _.cartItems.quantity) + 1,
        price: item,
        signatureImage: signatureDetails && signatureDetails.userIdImage,
        dropPoints: customDropPoint,
        variation: variationType,
        addons: addOnIdList,
      };

      addToCart(cartBody);
      console.log(cartBody, 'cartBodycartBody1');
    } else {
      let cartBody = {
        productID: selectedItem._id,
        quantity: 1,
        price: item,
        signatureImage: signatureDetails && signatureDetails.userIdImage,
        dropPoints: customDropPoint,
        variation: variationType,
        addons: addOnIdList,
      };
      addToCart(cartBody);
      console.log(cartBody, 'cartBodycartBody2');
    }
  };
  _confirm = () => {
    const {clearCart} = this.props;
    const {selectedPrice} = this.state;
    clearCart((cb) => {
      this.addItems(selectedPrice); //Add after confirm
    });
    this._cancel();
  };

  _cancel = () => {
    this.setState({clearCartModal: false});
  };

  selectedAddOns = (addons) => {
    let selectedAddons = [];
    addons.map((o) =>
      o.item.map((t) => (t.selected ? selectedAddons.push(t) : null)),
    );
    let addOnTotalCost =
      selectedAddons && selectedAddons.length > 0
        ? selectedAddons
            .map((o) => o.price)
            .reduce((prev, next) =>
              prev && next ? parseFloat(prev) + parseFloat(next) : 0,
            )
        : 0; //Total cost of all

    let addOnIdList = addons.map((x) => {
      let name = x.name._id;
      let item = x.item.filter((c) => c.selected).map((d) => d._id);
      let obj = {
        name,
        item,
      };
      return obj;
    });
    let filteredAddons = addOnIdList.filter((c) => c.item.length > 0);
    this.setState({
      selectedAddOnPrice: addOnTotalCost,
      addOnIdList: filteredAddons,
    });
  };

  render() {
    const {
      componentId,
      selectedItem,
      cartLoader,
      allCartItems,
      cartTotal,
      gettingAddon,
      allAddons,
      theme,
    } = this.props;
    const {clearCartModal} = this.state;
    return (
      <>
        <ItemInfoComponent
          componentId={componentId}
          goBack={this.goBack}
          information={this.information}
          addMore={this.addMore}
          goToCart={this.goToCart}
          likeItem={this.likeItem}
          addtoCart={this.addtoCart}
          checkItem={this.checkItem}
          selectedItem={selectedItem}
          cartLoader={cartLoader}
          allCartItems={allCartItems}
          cartTotal={cartTotal}
          selectedAddOns={this.selectedAddOns}
          allAddons={allAddons}
          gettingAddon={gettingAddon}
          theme={theme}
        />
        <ConfirmationModal
          visibility={clearCartModal}
          confirm={() => this._confirm()}
          cancel={() => this._cancel()}
          yesButton={'Confirm'}
          title={
            'You have items already present from another merchant. Select Confirm to clear old items.'
          }
          theme={theme}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    subCategories: state.dashboardReducer.subCategories,
    allCartItems: state.dashboardReducer.allCartItems,
    cartLoader: state.dashboardReducer.cartLoader,
    cartTotal: state.dashboardReducer.cartTotal,
    addedAddresses: state.dashboardReducer.addedAddresses,
    signatureDetails: state.dashboardReducer.signatureDetails,
    gettingAddon: state.dashboardReducer.gettingAddon,
    allAddons: state.dashboardReducer.allAddons,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  pop,
  likeItem,
  pushToParticularScreen,
  addToCart,
  clearCart,
})(ItemInfo);

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
