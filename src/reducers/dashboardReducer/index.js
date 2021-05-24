/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  loader: false,
  allCategories: null,
  allFavourite: null,
  favLoader: false,
  allLastorders: null,
  lastLoader: false,
  allFeatured: null,
  featureLoader: false,
  subCategories: null,
  subCatLoader: false,
  allLoader: false,
  selectedAll: null,
  allFavPage: 1,
  allLastOrderPage: 1,
  allFeaturePage: 1,
  selectedAllPage: 1,
  specificFeatureLoader: false,
  specificFeatured: null,
  specificFeaturePage: 1,
  merchantItemLoader: false,
  mearchantItems: null,
  likeLoader: false,
  allBanners: null,
  bannerLoader: false,
  merchantBannerLoader: false,
  merchantBanner: null,
  merchantLoader: false,
  allMerchantListing: null,
  merchantListingPage: 1,
  specificFavourite: null,
  specificFavPage: 1,
  cartLoader: false,
  allCartItems: null,
  addedAddresses: null,
  addingAddress: false,
  gettingAddress: false,
  allAddresses: null,
  updatingAddress: false,
  delitingAdress: false,
  cartTotal: 0,
  uploadingID: false,
  signatureDetails: null,
  creatingOrder: false,
  manualAddress: '',
  gettingAddon: false,
  allAddons: null,
  activeLoader: false,
  activeLastorders: null,
  activeLastOrderPage: 1,
  loadngFaq: false,
  faq: null,
  loadingNotification: false,
  notificationStatus: null,
  zoneId: null,
  gettingTerms: false,
  allTerms: null,
  completingJob: false,
  adminChatId: '',
  deliveryModal: false,
  selectedOrder: null,
  fetchingZone: false,
};

function commonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        loader: true,
      });
    case Types.GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
        allCategories: action.payload,
      });
    case Types.GET_CATEGORIES_FAIL:
      return Object.assign({}, state, {
        loader: false,
      });

    case Types.SELECTED_ORDER:
      return Object.assign({}, state, {
        selectedOrder: action.payload,
      });

    case Types.ADMIN_ID_REQUEST:
      return Object.assign({}, state, {});
    case Types.ADMIN_ID_SUCCESS:
      return Object.assign({}, state, {
        adminChatId: action.payload,
      });
    case Types.ADMIN_ID_FAIL:
      return Object.assign({}, state, {});

    case Types.CREATE_ORDER_REQUEST:
      return Object.assign({}, state, {
        creatingOrder: true,
      });
    case Types.CREATE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        creatingOrder: false,
      });
    case Types.CREATE_ORDER_FAIL:
      return Object.assign({}, state, {
        creatingOrder: false,
      });

    case Types.ADD_NEW_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        addingAddress: true,
      });
    case Types.ADD_NEW_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        addingAddress: false,
      });
    case Types.ADD_NEW_ADDRESS_FAIL:
      return Object.assign({}, state, {
        addingAddress: false,
      });

    case Types.GET_FAQ_REQUEST:
      return Object.assign({}, state, {
        loadngFaq: true,
      });
    case Types.GET_FAQ_SUCCESS:
      return Object.assign({}, state, {
        loadngFaq: false,
        faq: action.payload,
      });
    case Types.GET_FAQ_FAIL:
      return Object.assign({}, state, {
        loadngFaq: false,
      });

    case Types.GET_NOTIFICATION_REQUEST:
      return Object.assign({}, state, {
        loadingNotification: true,
      });
    case Types.GET_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        loadingNotification: false,
        notificationStatus: action.payload,
      });
    case Types.GET_NOTIFICATION_FAIL:
      return Object.assign({}, state, {
        loadingNotification: false,
      });

    case Types.SAVE_SIGNATURE:
      return Object.assign({}, state, {
        signatureDetails: action.payload,
      });

    case Types.GET_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        gettingAddress: true,
      });
    case Types.GET_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        gettingAddress: false,
        allAddresses: action.payload,
      });
    case Types.GET_ADDRESS_FAIL:
      return Object.assign({}, state, {
        gettingAddress: false,
      });

    case Types.CART_TOTAL:
      return Object.assign({}, state, {
        cartTotal: action.payload,
      });

    case Types.DELETE_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        delitingAdress: true,
      });
    case Types.DELETE_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        delitingAdress: false,
      });
    case Types.DELETE_ADDRESS_FAIL:
      return Object.assign({}, state, {
        delitingAdress: false,
      });

    case Types.UPLOAD_ID_REQUEST:
      return Object.assign({}, state, {
        uploadingID: true,
      });
    case Types.UPLOAD_ID_SUCCESS:
      return Object.assign({}, state, {
        uploadingID: false,
      });
    case Types.UPLOAD_ID_FAIL:
      return Object.assign({}, state, {
        uploadingID: false,
      });

    case Types.FETCH_ZONE_REQUEST:
      return Object.assign({}, state, {
        fetchingZone: true,
      });
    case Types.FETCH_ZONE_SUCCESS:
      return Object.assign({}, state, {
        zoneId: action.payload,
        fetchingZone: false,
      });
    case Types.FETCH_ZONE_FAIL:
      return Object.assign({}, state, {
        fetchingZone: false,
      });

    case Types.UPDATE_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        updatingAddress: true,
      });
    case Types.UPDATE_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        updatingAddress: false,
      });
    case Types.UPDATE_ADDRESS_FAIL:
      return Object.assign({}, state, {
        updatingAddress: false,
      });

    case Types.DELIVERY_MODAL:
      return Object.assign({}, state, {
        deliveryModal: action.payload,
      });

    case Types.DROP_LOCATIONS:
      return Object.assign({}, state, {
        addedAddresses: action.payload,
      });

    case Types.GET_CART_REQUEST:
      return Object.assign({}, state, {
        cartLoader: true,
      });
    case Types.GET_CART_SUCCESS:
      return Object.assign({}, state, {
        cartLoader: false,
        allCartItems: action.payload,
      });
    case Types.GET_CART_FAIL:
      return Object.assign({}, state, {
        cartLoader: false,
      });

    case Types.GET_TERMS_REQUEST:
      return Object.assign({}, state, {
        gettingTerms: true,
      });
    case Types.GET_TERMS_SUCCESS:
      return Object.assign({}, state, {
        gettingTerms: false,
        allTerms: action.payload,
      });
    case Types.GET_TERMS_FAIL:
      return Object.assign({}, state, {
        gettingTerms: false,
      });

    case Types.ADD_CART_REQUEST:
      return Object.assign({}, state, {
        cartLoader: true,
      });
    case Types.ADD_CART_SUCCESS:
      return Object.assign({}, state, {
        cartLoader: false,
      });
    case Types.ADD_CART_FAIL:
      return Object.assign({}, state, {
        cartLoader: false,
      });

    case Types.COMPLETE_JOB_REQUEST:
      return Object.assign({}, state, {
        completingJob: true,
      });
    case Types.COMPLETE_JOB_SUCCESS:
      return Object.assign({}, state, {
        completingJob: false,
      });
    case Types.COMPLETE_JOB_FAIL:
      return Object.assign({}, state, {
        completingJob: false,
      });

    case Types.GET_ADDON_REQUEST:
      return Object.assign({}, state, {
        gettingAddon: true,
      });
    case Types.GET_ADDON_SUCCESS:
      return Object.assign({}, state, {
        gettingAddon: false,
        allAddons: action.payload,
      });
    case Types.GET_ADDON_FAIL:
      return Object.assign({}, state, {
        gettingAddon: false,
      });

    case Types.GET_MERCHANT_LISTING_REQUEST:
      return Object.assign({}, state, {
        merchantLoader: true,
      });
    case Types.GET_MERCHANT_LISTING_SUCCESS:
      return Object.assign({}, state, {
        merchantLoader: false,
        allMerchantListing: action.payload,
      });

    case Types.GET_MERCHANT_APPEND_LISTING_SUCCESS:
      return Object.assign({}, state, {
        merchantLoader: false,
        allMerchantListing: [...state.allMerchantListing, ...action.payload],
        merchantListingPage: action.page_no,
      });

    case Types.GET_MERCHANT_LISTING_FAIL:
      return Object.assign({}, state, {
        merchantLoader: false,
      });

    case Types.GET_BANNERS_REQUEST:
      return Object.assign({}, state, {
        bannerLoader: true,
      });
    case Types.GET_BANNERS_SUCCESS:
      return Object.assign({}, state, {
        bannerLoader: false,
        allBanners: action.payload,
      });
    case Types.GET_BANNERS_FAIL:
      return Object.assign({}, state, {
        bannerLoader: false,
      });

    case Types.GET_MERCHANT_BANNERS_REQUEST:
      return Object.assign({}, state, {
        merchantBannerLoader: true,
      });
    case Types.GET_MERCHANT_BANNERS_SUCCESS:
      return Object.assign({}, state, {
        merchantBannerLoader: false,
        merchantBanner: action.payload,
      });
    case Types.GET_MERCHANT_BANNERS_FAIL:
      return Object.assign({}, state, {
        merchantBannerLoader: false,
      });

    case Types.LIKE_REQUEST:
      return Object.assign({}, state, {
        likeLoader: true,
      });
    case Types.LIKE_SUCCESS:
      return Object.assign({}, state, {
        likeLoader: false,
      });
    case Types.LIKE_FAIL:
      return Object.assign({}, state, {
        likeLoader: false,
      });

    case Types.GET_ALL_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        allLoader: true,
      });
    case Types.GET_ALL_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        allLoader: false,
        selectedAll: action.payload,
      });

    case Types.SAVE_MANUAL_ADDRESS:
      return Object.assign({}, state, {
        manualAddress: action.payload,
      });

    case Types.GET_ALL_CATEGORIES_APPEND_SUCCESS:
      return Object.assign({}, state, {
        allLoader: false,
        selectedAll: [...state.selectedAll, ...action.payload],
        selectedAllPage: action.page_no,
      });

    case Types.GET_ALL_CATEGORIES_FAIL:
      return Object.assign({}, state, {
        allLoader: false,
      });

    case Types.GET_SUBCATEGORIES_REQUEST:
      return Object.assign({}, state, {
        subCatLoader: true,
      });
    case Types.GET_SUBCATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        subCatLoader: false,
        subCategories: action.payload,
      });
    case Types.GET_SUBCATEGORIES_FAIL:
      return Object.assign({}, state, {
        subCatLoader: false,
      });
    //TABS START
    case Types.GET_FAVOURITE_REQUEST:
      return Object.assign({}, state, {
        favLoader: true,
      });
    case Types.GET_FAVOURITE_SUCCESS:
      return Object.assign({}, state, {
        favLoader: false,
        allFavourite: action.payload,
      });
    case Types.GET_FAVOURITE_APPEND_SUCCESS:
      return Object.assign({}, state, {
        favLoader: false,
        allFavourite: [...state.allFavourite, ...action.payload],
        allFavPage: action.page_no,
      });

    case Types.GET_SPECIFIC_FAVOURITE_REQUEST:
      return Object.assign({}, state, {
        favLoader: true,
      });
    case Types.GET_SPECIFIC_FAVOURITE_SUCCESS:
      return Object.assign({}, state, {
        favLoader: false,
        specificFavourite: action.payload,
      });
    case Types.GET_SPECIFIC_FAVOURITE_APPEND_SUCCESS:
      return Object.assign({}, state, {
        favLoader: false,
        specificFavourite: [...state.allFavourite, ...action.payload],
        specificFavPage: action.page_no,
      });

    case Types.GET_FAVOURITE_FAIL:
      return Object.assign({}, state, {
        favLoader: false,
      });

    case Types.GET_FEATURED_REQUEST:
      return Object.assign({}, state, {
        featureLoader: true,
      });
    case Types.GET_FEATURED_SUCCESS:
      return Object.assign({}, state, {
        featureLoader: false,
        allFeatured: action.payload,
      });

    case Types.GET_FEATURED_APPEND_SUCCESS:
      return Object.assign({}, state, {
        featureLoader: false,
        allFeatured: [...state.allFeatured, ...action.payload],
        allFeaturePage: action.page_no,
      });

    case Types.GET_FEATURED_FAIL:
      return Object.assign({}, state, {
        featureLoader: false,
      });

    case Types.GET_SPECIFIC_FEATURED_REQUEST:
      return Object.assign({}, state, {
        specificFeatureLoader: true,
      });

    case Types.GET_SPECIFIC_FEATURED_SUCCESS:
      return Object.assign({}, state, {
        specificFeatureLoader: false,
        specificFeatured: action.payload,
      });

    case Types.GET_MERCHANT_ITEMS_REQUEST:
      return Object.assign({}, state, {
        merchantItemLoader: true,
      });
    case Types.GET_MERCHANT_ITEMS_SUCCESS:
      return Object.assign({}, state, {
        merchantItemLoader: false,
        mearchantItems: action.payload,
      });
    case Types.GET_MERCHANT_ITEMS_FAIL:
      return Object.assign({}, state, {
        merchantItemLoader: false,
      });

    case Types.GET_SPECIFIC_FEATURED_APPEND_SUCCESS:
      return Object.assign({}, state, {
        specificFeatureLoader: false,
        specificFeatured: [...state.specificFeatured, ...action.payload],
        specificFeaturePage: action.page_no,
      });

    case Types.GET_SPECIFIC_FEATURED_FAIL:
      return Object.assign({}, state, {
        specificFeatureLoader: false,
      });

    case Types.GET_LASTORDER_REQUEST:
      return Object.assign({}, state, {
        lastLoader: true,
      });
    case Types.GET_LASTORDER_SUCCESS:
      return Object.assign({}, state, {
        lastLoader: false,
        allLastorders: action.payload,
      });

    case Types.GET_LASTORDER_APPEND_SUCCESS:
      return Object.assign({}, state, {
        lastLoader: false,
        allLastorders: [...state.allLastorders, ...action.payload],
        allLastOrderPage: action.page_no,
      });

    case Types.GET_LASTORDER_FAIL:
      return Object.assign({}, state, {
        lastLoader: false,
      });

    case Types.GET_ACTIVE_LASTORDER_REQUEST:
      return Object.assign({}, state, {
        lastLoader: true,
      });
    case Types.GET_ACTIVE_LASTORDER_SUCCESS:
      return Object.assign({}, state, {
        activeLoader: false,
        activeLastorders: action.payload,
      });

    case Types.GET_ACTIVE_LASTORDER_APPEND_SUCCESS:
      return Object.assign({}, state, {
        activeLoader: false,
        activeLastorders: [...state.activeLastorders, ...action.payload],
        activeLastOrderPage: action.page_no,
      });

    case Types.GET_ACTIVE_LASTORDER_FAIL:
      return Object.assign({}, state, {
        activeLoader: false,
      });

    //TABS END

    case Types.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default commonReducer;
