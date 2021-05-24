/* eslint-disable module-resolver/use-alias */
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'constants';
import _ from 'lodash';
import ItemDetailsComponent from 'components/Dashboard/Home/ItemDetails';
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {
  getMerchantListing,
  getMerchantBanners,
  addToCart,
  getAddOns,
} from 'actions/dashboardActions';

import idx from 'idx';
class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, manualTab: null};
    this.initialApiCalls();
  }

  initialApiCalls = () => {};
  goBack = _.debounce(() => {
    const {pop, componentId} = this.props;
    pop(componentId);
  }, 500);

  information = _.debounce(() => {
    const {pushToParticularScreen, componentId, faq, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'HelpComponent', {faq: faq});
  }, 500);

  itemPressed = _.debounce((value) => {
    const {pushToParticularScreen, componentId, getAddOns, theme} = this.props;
    getAddOns(value._id);

    pushToParticularScreen(theme, componentId, 'ItemInfoContainer', {
      selectedItem: value,
    });
  }, 500);

  tabSelected = _.debounce((item, index) => {
    const {getMerchantListing, merchantDetails} = this.props;
    console.log(item, 'itemitemitemitem');
    this.setState({
      manualTab: item._id,
    });
    getMerchantListing({
      merchantId:
        idx(merchantDetails, (_) => _._id) ||
        idx(merchantDetails, (_) => _.merchantId._id),
      subcategoryID: item._id,
      page_no: 1,
    });
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

  getMoreData = () => {
    const {
      getMerchantListing,
      merchantDetails,
      merchantListingPage,
      mearchantItems,
    } = this.props;
    const {manualTab} = this.state;
    getMerchantListing({
      merchantId: idx(merchantDetails, (_) => _._id),
      subcategoryID: manualTab || idx(mearchantItems, (_) => _._id),
      page_no: 1 + merchantListingPage,
    });
  };

  render() {
    const {
      componentId,
      selectedItem,
      merchantDetails,
      merchantItemLoader,
      mearchantItems,
      merchantLoader,
      allMerchantListing,
      merchantBannerLoader,
      merchantBanner,
      cartLoader,
      allCartItems,
      cartTotal,
      theme,
    } = this.props;
    return (
      <ItemDetailsComponent
        componentId={componentId}
        goBack={this.goBack}
        information={this.information}
        itemPressed={this.itemPressed}
        tabSelected={this.tabSelected}
        selectedItem={selectedItem}
        goToCart={this.goToCart}
        merchantDetails={merchantDetails}
        merchantItemLoader={merchantItemLoader}
        mearchantItems={mearchantItems}
        merchantLoader={merchantLoader}
        allMerchantListing={allMerchantListing}
        merchantBannerLoader={merchantBannerLoader}
        merchantBanner={merchantBanner}
        getMoreData={this.getMoreData}
        allCartItems={allCartItems}
        cartTotal={cartTotal}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    merchantItemLoader: state.dashboardReducer.merchantItemLoader,
    mearchantItems: state.dashboardReducer.mearchantItems,
    merchantLoader: state.dashboardReducer.merchantLoader,
    allMerchantListing: state.dashboardReducer.allMerchantListing,
    merchantBannerLoader: state.dashboardReducer.merchantBannerLoader,
    merchantBanner: state.dashboardReducer.merchantBanner,
    merchantListingPage: state.dashboardReducer.merchantListingPage,
    cartLoader: state.dashboardReducer.cartLoader,
    allCartItems: state.dashboardReducer.allCartItems,
    cartTotal: state.dashboardReducer.cartTotal,
    loadngFaq: state.dashboardReducer.loadngFaq,
    faq: state.dashboardReducer.faq,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  pop,
  pushToParticularScreen,
  getMerchantListing,
  getMerchantBanners,
  addToCart,
  getAddOns,
})(ItemDetails);

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
