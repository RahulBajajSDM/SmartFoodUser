/* eslint-disable module-resolver/use-alias */
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'constants';
import _ from 'lodash';
import CategoryDetailsComponent from 'components/Dashboard/Home/CategoryDetails';
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {
  getAllListing,
  getSpecificFeatured,
  getMerchantItems,
  getSpecificFavourites,
  getBanners,
  saveSelected,
  getMerchantBanners,
  addDropAddress,
} from 'actions/dashboardActions';
import idx from 'idx';
class CategoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedCategoryId: null,
      searchedText: '',
    };
    this.initailApiCall();
  }
  initailApiCall = () => {
    const {getBanners} = this.props;
    let bannerId = idx(this.props, (_) => _.selectedItem._id);
    getBanners(bannerId);
  };
  goBack = _.debounce(() => {
    const {pop, componentId} = this.props;
    pop(componentId);
  }, 500);

  categoryPressed = _.debounce((value) => {
    const {
      getAllListing,
      getSpecificFeatured,
      getSpecificFavourites,
      manualAddress,
    } = this.props;
    this.setState({
      selectedCategoryId: value._id,
    });
    console.log(this.props, 'PPPPPPP');
    getSpecificFeatured({
      page_no: 1,
      id: value._id,
      latitude: manualAddress && manualAddress.latitude,
      longitude: manualAddress && manualAddress.longitude,
    });
    getAllListing({
      page_no: 1,
      id: value._id,
      latitude: manualAddress && manualAddress.latitude,
      longitude: manualAddress && manualAddress.longitude,
    });

    getSpecificFavourites({
      page_no: 1,
      subCatId: value._id,
    });
  }, 500);

  itemPressed = _.debounce((value) => {
    const {
      componentId,
      pushToParticularScreen,
      getMerchantItems,
      selectedItem,
      theme,
      saveSelected,
      getMerchantBanners,
      addDropAddress,
      manualAddress,
    } = this.props;
    //API CALL TO GET ALL THE TITLES PROVIDED BY THIS MERCHANT
    console.log('PRESSEDDDDDD1');
    let data = {
      categoryId: selectedItem && selectedItem._id,
      merchantId: value._id,
    };
    getMerchantItems(data);
    getMerchantBanners(data);

    let selectedDetails = {
      merchantDetails: value,
      selectedItem: selectedItem,
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

    addDropAddress(addressArray);
    saveSelected(selectedDetails);
    // pushToParticularScreen(theme, componentId, 'AddAddressContainer', {
    //   // merchantDetails: value,
    //   // selectedItem: selectedItem,
    // });
    pushToParticularScreen(
      theme,
      componentId,
      'ItemDetailsContainer',
      {
        merchantDetails: value,
        selectedItem: selectedItem,
      },
      true,
    );
  }, 500);

  tabSelected = _.debounce((val) => {
    console.log(val, 'TABSELECTED');
  }, 500);

  getMoreData = (value) => {
    const {selectedCategoryId} = this.state;
    const {
      getAllListing,
      getSpecificFeatured,
      selectedAllPage,
      specificFeaturePage,
      getSpecificFavourites,
      manualAddress,
    } = this.props;
    if (value == 0) {
      getSpecificFeatured({
        page_no: specificFeaturePage + 1,
        id: selectedCategoryId,
        latitude: manualAddress && manualAddress.latitude,
        longitude: manualAddress && manualAddress.longitude,
      });
    } else if (value == 1) {
      getAllListing({
        page_no: selectedAllPage + 1,
        id: selectedCategoryId,
        latitude: manualAddress && manualAddress.latitude,
        longitude: manualAddress && manualAddress.longitude,
      });
    } else if (value == 2) {
      getSpecificFavourites({
        page_no: specificFavPage + 1,
        subCatId: selectedCategoryId,
      });
    }
  };

  changingText = (value) => {
    const {subCategories} = this.props;
    this.setState({
      searchedText: value,
    });
    // console.log(
    //   subCategories.filter((item) =>
    //     item.title.toLowerCase().includes(value.toLowerCase()),
    //   ),
    //   'subCategoriessubCategoriessubCategories',
    // );
  };

  clearText = () => {
    this.setState({
      searchedText: '',
    });
  };
  render() {
    const {
      componentId,
      selectedItem,
      subCategories,
      subCatLoader,
      allLoader,
      selectedAll,
      specificFeatured,
      specificFeatureLoader,
      allFavourite,
      favLoader,
      allBanners,
      bannerLoader,
      theme,
    } = this.props;
    const {searchedText} = this.state;
    let filteredArray =
      subCategories &&
      subCategories.filter((item) =>
        idx(item, (_) =>
          _.title
            .toLowerCase()
            .includes(searchedText && searchedText.toLowerCase()),
        ),
      );

    return (
      <CategoryDetailsComponent
        componentId={componentId}
        goBack={this.goBack}
        categoryPressed={this.categoryPressed}
        itemPressed={this.itemPressed}
        tabSelected={this.tabSelected}
        selectedItem={selectedItem}
        // subCategories={subCategories}
        subCategories={filteredArray}
        subCatLoader={subCatLoader}
        allLoader={allLoader}
        selectedAll={selectedAll}
        getMoreData={this.getMoreData}
        specificFeatured={specificFeatured}
        specificFeatureLoader={specificFeatureLoader}
        allFavourite={allFavourite}
        favLoader={favLoader}
        allBanners={allBanners}
        bannerLoader={bannerLoader}
        theme={theme}
        searchedText={searchedText}
        changingText={this.changingText}
        clearText={this.clearText}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    subCatLoader: state.dashboardReducer.subCatLoader,
    subCategories: state.dashboardReducer.subCategories,
    allLoader: state.dashboardReducer.allLoader,
    selectedAll: state.dashboardReducer.selectedAll,
    selectedAllPage: state.dashboardReducer.selectedAllPage,
    specificFeaturePage: state.dashboardReducer.specificFeaturePage,
    specificFeatured: state.dashboardReducer.specificFeatured,
    specificFeatureLoader: state.dashboardReducer.specificFeatureLoader,
    allFavPage: state.dashboardReducer.allFavPage,
    allFavourite: state.dashboardReducer.specificFavourite,
    favLoader: state.dashboardReducer.favLoader,
    allBanners: state.dashboardReducer.allBanners,
    bannerLoader: state.dashboardReducer.bannerLoader,
    theme: state.themeReducer.theme,
    manualAddress: state.dashboardReducer.manualAddress,
  };
}

export default connect(mapStateToProps, {
  pop,
  pushToParticularScreen,
  getAllListing,
  getSpecificFeatured,
  getMerchantItems,
  getSpecificFavourites,
  getBanners,
  saveSelected,
  getMerchantBanners,
  addDropAddress,
})(CategoryDetails);

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
