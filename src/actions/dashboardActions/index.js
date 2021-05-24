/* eslint-disable module-resolver/use-alias */
import {pop} from 'actions/appActions/AppActions';
import {logout} from 'actions/authActions';
import {goHome} from 'config/navigation';
import * as Types from 'constants/actionsTypes';
import API from 'constants/urls';
import RestClient from 'helpers/RestClient';
import idx from 'idx';
import Toast from 'react-native-simple-toast';
export function getCategories(keyword) {
  return async (dispatch) => {
    dispatch({type: Types.GET_CATEGORIES_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_CATEGORIES}filter=${keyword}`,
      );
      if (response) {
        dispatch({type: Types.GET_CATEGORIES_SUCCESS, payload: response.data});
      } else {
        dispatch({type: Types.GET_CATEGORIES_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_CATEGORIES_FAIL});
    }
  };
}

export function getSubCategory(id) {
  return async (dispatch, getState) => {
    let latitude = idx(
      getState(),
      (_) => _.dashboardReducer.manualAddress.latitude,
    );
    let longitude = idx(
      getState(),
      (_) => _.dashboardReducer.manualAddress.longitude,
    );

    dispatch({type: Types.GET_SUBCATEGORIES_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_SUBCATEGORIES}id=${id}&type=admin&merchantID=`,
      );

      if (response) {
        dispatch({
          type: Types.GET_SUBCATEGORIES_SUCCESS,
          payload: response.data,
        });
        let initialId = idx(response, (_) => _.data[0]._id);
        console.log(
          {
            page_no: 1,
            id: initialId,

            latitude: latitude,
            longitude: longitude,
          },
          'DATTTTTTT',
        );
        dispatch(
          getAllListing({
            page_no: 1,
            id: initialId,

            latitude: latitude,
            longitude: longitude,
          }),
        );
        dispatch(
          getSpecificFeatured({
            page_no: 1,
            id: initialId,

            latitude: latitude,
            longitude: longitude,
          }),
        );
        dispatch(
          getSpecificFavourites({
            page_no: 1,
            subCatId: initialId,
          }),
        );

        //API CALL FOR FAV/ALL/FEATURE
      } else {
        dispatch({type: Types.GET_SUBCATEGORIES_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_SUBCATEGORIES_FAIL});
    }
  };
}

export function getBanners(id) {
  return async (dispatch) => {
    dispatch({type: Types.GET_BANNERS_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_BANNERS}perPage=20&page=1&sortBy=name&orderBy=desc&categoryID=${id}&filter=&merchantID=`,
      );
      if (response) {
        dispatch({
          type: Types.GET_BANNERS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_BANNERS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_BANNERS_FAIL});
    }
  };
}

export function getMerchantBanners(data) {
  return async (dispatch) => {
    dispatch({type: Types.GET_MERCHANT_BANNERS_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_BANNERS}perPage=20&page=1&sortBy=name&orderBy=desc&categoryID=${data.categoryId}&filter=&merchantID=${data.merchantId}`,
      );

      if (response) {
        dispatch({
          type: Types.GET_MERCHANT_BANNERS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_MERCHANT_BANNERS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_MERCHANT_BANNERS_FAIL});
    }
  };
}

export function getMerchantItems(data) {
  return async (dispatch) => {
    dispatch({type: Types.GET_MERCHANT_ITEMS_REQUEST});
    try {
      const response = await RestClient.getCall(
        `${API.GET_SUBCATEGORIES}id=${data.categoryId}&type=merchant&merchantID=${data.merchantId}`,
      );
      if (response) {
        dispatch({
          type: Types.GET_MERCHANT_ITEMS_SUCCESS,
          payload: idx(response, (_) => _.data),
        });
        let initialId = idx(response, (_) => _.data[0]._id);
        dispatch(
          getMerchantListing({
            merchantId: data.merchantId,
            subcategoryID: initialId,
            page_no: 1,
          }),
        );
      } else {
        dispatch({type: Types.GET_MERCHANT_ITEMS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_MERCHANT_ITEMS_FAIL});
    }
  };
}

export function getMerchantListing(data) {
  return async (dispatch) => {
    if (data.page_no == 1) {
      dispatch({type: Types.GET_MERCHANT_LISTING_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_MERCHANT_ITEMS}perPage=10&page=${data.page_no}&sortBy=title&orderBy=desc&merchantID=${data.merchantId}&subcategoryID=${data.subcategoryID}`,
      );

      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_MERCHANT_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_MERCHANT_APPEND_LISTING_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_MERCHANT_LISTING_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_MERCHANT_LISTING_FAIL});
    }
  };
}

export function getSpecificFeatured(data) {
  return async (dispatch) => {
    if (data.page_no == 1) {
      dispatch({type: Types.GET_SPECIFIC_FEATURED_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_FEATURED}page=${data.page_no}&pagesize=10&filter=&subCatId=${data.id}&latitude=${data.latitude}&longitude=${data.longitude}`,
      );

      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_SPECIFIC_FEATURED_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_FEATURED_SPECIFIC_APPEND_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_SPECIFIC_FEATURED_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_SPECIFIC_FEATURED_FAIL});
    }
  };
}

export function getAllListing(data) {
  return async (dispatch) => {
    if (data.page_no == 1) {
      dispatch({type: Types.GET_ALL_CATEGORIES_REQUEST});
    }

    try {
      const response = await RestClient.getCall(
        `${API.GET_ALL_LISTING}page=${data.page_no}&pagesize=10&subcategoryID=${data.id}&latitude=${data.latitude}&longitude=${data.longitude}`,
      );

      if (response) {
        console.log(response, 'GET_ALL_CATEGORIES_SUCCESS');
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_ALL_CATEGORIES_SUCCESS,
            payload: idx(response, (_) => _.data.result.data),
          });
        } else {
          dispatch({
            type: Types.GET_ALL_CATEGORIES_APPEND_SUCCESS,
            payload: idx(response, (_) => _.data.result.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_ALL_CATEGORIES_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_ALL_CATEGORIES_FAIL});
    }
  };
}

export function getFeatured(data) {
  console.log('FEATUREDDDDDDD', data);
  return async (dispatch) => {
    if (data.page_no == 1) {
      dispatch({type: Types.GET_FEATURED_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_FEATURED}page=${data.page_no}&pagesize=10&filter=&latitude=${data.latitude}&longitude=${data.longitude}`,
      );

      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_FEATURED_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_FEATURED_APPEND_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_FEATURED_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_FEATURED_FAIL});
    }
  };
}

export function getLastOrder(data) {
  return async (dispatch, getState) => {
    let userId = idx(getState(), (_) => _.authReducer.loginData.data._id);
    if (data.page_no == 1) {
      dispatch({type: Types.GET_LASTORDER_REQUEST});
    }
    console.log(
      'LASTORDER+++++++',
      `${API.GET_LASTORDER}perPage=10&page=${data.page_no}&orderBy=desc&userId=${userId}&status=Finalized`,
    );
    try {
      const response = await RestClient.getCall(
        `${API.GET_LASTORDER}perPage=10&page=${data.page_no}&orderBy=desc&userId=${userId}&status=Finalized`,
      );

      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_LASTORDER_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
          });
        } else {
          dispatch({
            type: Types.GET_LASTORDER_APPEND_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_LASTORDER_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_LASTORDER_FAIL});
    }
  };
}

export function getActiveLastOrder(data) {
  return async (dispatch, getState) => {
    let userId = idx(getState(), (_) => _.authReducer.loginData.data._id);
    if (data.page_no == 1) {
      dispatch({type: Types.GET_ACTIVE_LASTORDER_REQUEST});
    }
    try {
      const response = await RestClient.getCall(
        `${API.GET_LASTORDER}perPage=10&page=${data.page_no}&orderBy=desc&userId=${userId}&status=Active`,
      );
      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_ACTIVE_LASTORDER_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
          });
        } else {
          dispatch({
            type: Types.GET_ACTIVE_LASTORDER_APPEND_SUCCESS,
            payload: idx(response, (_) => _.data.finalResult),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_ACTIVE_LASTORDER_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_ACTIVE_LASTORDER_FAIL});
    }
  };
}

export function getFavourites(data) {
  return async (dispatch) => {
    if (data.page_no == 1) {
      dispatch({type: Types.GET_FAVOURITE_REQUEST});
    }

    try {
      const response = await RestClient.getCall(
        `${API.GET_FAVOURITE}page=${data.page_no}&pagesize=10&subcategoryID=${data.subCatId}`,
      );
      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_FAVOURITE_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_FAVOURITE_APPEND_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_FAVOURITE_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_FAVOURITE_FAIL});

      if (idx(error, (_) => _.data.statusCode) == 401) {
        dispatch(logout(true));
      }
    }
  };
}

export function getSpecificFavourites(data) {
  return async (dispatch) => {
    if (data.page_no == 1) {
      dispatch({type: Types.GET_SPECIFIC_FAVOURITE_REQUEST});
    }

    try {
      const response = await RestClient.getCall(
        `${API.GET_FAVOURITE}page=${data.page_no}&pagesize=10&subcategoryID=${data.subCatId}`,
      );
      if (response) {
        if (data.page_no == 1) {
          dispatch({
            type: Types.GET_SPECIFIC_FAVOURITE_SUCCESS,
            payload: idx(response, (_) => _.data.data),
          });
        } else {
          dispatch({
            type: Types.GET_SPECIFIC_FAVOURITE_APPEND_SUCCESS,
            payload: idx(response, (_) => _.data.data),
            page_no: data.page_no,
          });
        }
      } else {
        dispatch({type: Types.GET_SPECIFIC_FAVOURITE_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_SPECIFIC_FAVOURITE_FAIL});
    }
  };
}

export function likeItem(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.LIKE_REQUEST});
    try {
      const response = await RestClient.postCall(API.LIKE, requestData);
      if (response) {
        dispatch(
          getMerchantListing({
            merchantId: requestData.merchantID,
            subcategoryID: requestData.subcategoryID,
            page_no: 1,
          }),
        );
        dispatch({type: Types.LIKE_SUCCESS, payload: response});
        dispatch(
          getSpecificFavourites({
            page_no: 1,
            subCatId: requestData.subcategoryID,
          }),
        );
        dispatch(getFavourites({page_no: 1, subCatId: ''}));
      } else {
        dispatch({type: Types.LIKE_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.LIKE_FAIL});
    }
  };
}

export function addToCart(cartBody, removed, disableToast) {
  return async (dispatch) => {
    dispatch({type: Types.ADD_CART_REQUEST});
    try {
      const response = await RestClient.postCall(API.ADD_CART, cartBody);
      if (response) {
        dispatch({type: Types.ADD_CART_SUCCESS, payload: response});
        if (!disableToast) {
          Toast.show(
            removed ? 'Item removed from cart' : 'Item added to cart.',
          );
        }
        dispatch(getCart());
      } else {
        dispatch({type: Types.ADD_CART_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.ADD_CART_FAIL});
    }
  };
}

export function getCart() {
  return async (dispatch) => {
    dispatch({type: Types.GET_CART_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_CART}`);

      if (response) {
        let customCart = idx(
          response,
          (_) => _.data.result[0].type == 'custom',
        );
        dispatch({
          type: Types.GET_CART_SUCCESS,
          payload: response.data,
        });
        if (customCart) {
          let cartTotal = idx(response, (_) =>
            _.data.result[0].dropPoints
              .map((o) => o.price)
              .reduce((prev, next) => parseFloat(prev) + parseFloat(next)),
          );
          dispatch(setCartTotal(Number(cartTotal || 0)));
        } else {
          let cartTotal = idx(response.data, (_) =>
            _.result
              .map((o) => o.cartItems.price * o.cartItems.quantity)
              .reduce((prev, next) =>
                prev && next ? parseFloat(prev) + parseFloat(next) : 0,
              ),
          );

          let cartItems = idx(response.data, (_) => _.result.length > 0);
          let addOnTotal = cartItems
            ? idx(response.data, (_) =>
                _.result.map((o) =>
                  o.cartItems.addons.map((x) =>
                    x.item
                      .map((d) => d.price)
                      .reduce((prev, next) =>
                        prev && next ? parseFloat(prev) + parseFloat(next) : 0,
                      ),
                  ),
                ),
              )
            : 0;
          let totalAddonCost = idx(addOnTotal && addOnTotal, (_) =>
            _[0].reduce((a, b) => a + b, 0),
          );
          dispatch(
            setCartTotal(Number(cartTotal || 0) + Number(totalAddonCost || 0)),
          );
        }
      } else {
        dispatch({type: Types.GET_CART_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_CART_FAIL});
    }
  };
}

export const setCartTotal = (cartTotal) => {
  return (dispatch, getState) => {
    dispatch({
      type: Types.CART_TOTAL,
      payload: cartTotal,
    });
  };
};

export const addDropAddress = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.DROP_LOCATIONS, payload: data});
  };
};

export function addNewAddress(address, componentId) {
  return async (dispatch) => {
    dispatch({type: Types.ADD_NEW_ADDRESS_REQUEST});
    try {
      const response = await RestClient.postCall(API.ADD_NEW_ADDRESS, address);
      if (response) {
        dispatch({type: Types.ADD_NEW_ADDRESS_SUCCESS, payload: response});
        dispatch(getAllAddress());
        dispatch(pop(componentId));
      } else {
        dispatch({type: Types.ADD_NEW_ADDRESS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.ADD_NEW_ADDRESS_FAIL});
    }
  };
}

export function getAllAddress() {
  return async (dispatch) => {
    dispatch({type: Types.GET_ADDRESS_SUCCESS});
    try {
      const response = await RestClient.getCall(`${API.GET_ADDRESS}`);
      if (response) {
        dispatch({
          type: Types.GET_ADDRESS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_ADDRESS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_ADDRESS_FAIL});
    }
  };
}

export function updateAddress(address, componentId) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_ADDRESS_REQUEST});
    try {
      const response = await RestClient.putCall(API.UPDATE_ADDRESS, address);
      if (response) {
        dispatch({type: Types.UPDATE_ADDRESS_SUCCESS, payload: response});
        dispatch(getAllAddress());
        dispatch(pop(componentId));
      } else {
        dispatch({type: Types.UPDATE_ADDRESS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPDATE_ADDRESS_FAIL});
    }
  };
}

export function updateNotification(notificationData) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_NOTIFICATION_REQUEST});
    try {
      const response = await RestClient.putCall(
        API.UPDATE_NOTIFICATION,
        notificationData,
      );
      if (response) {
        dispatch({type: Types.UPDATE_NOTIFICATION_SUCCESS});
        dispatch(getNotificationStatus());
      } else {
        dispatch({type: Types.UPDATE_NOTIFICATION_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPDATE_NOTIFICATION_FAIL});
    }
  };
}

export function deleteAddress(address) {
  return async (dispatch) => {
    dispatch({type: Types.DELETE_ADDRESS_REQUEST});
    try {
      const response = await RestClient.deleteCall(
        `${API.DELETE_ADDRESS}/${address}`,
      );
      if (response) {
        dispatch({type: Types.DELETE_ADDRESS_SUCCESS, payload: response});
        dispatch(getAllAddress());
      } else {
        dispatch({type: Types.DELETE_ADDRESS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.DELETE_ADDRESS_FAIL});
    }
  };
}

export function removeProduct(productId) {
  return async (dispatch) => {
    dispatch({type: Types.REMOVE_PRODUCT_REQUEST});
    try {
      const response = await RestClient.deleteRequest(`${API.REMOVE_PRODUCT}`, {
        id: productId,
      });
      if (response) {
        dispatch({type: Types.REMOVE_PRODUCT_SUCCESS, payload: response});
        dispatch(getCart());
      } else {
        dispatch({type: Types.REMOVE_PRODUCT_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.REMOVE_PRODUCT_FAIL});
    }
  };
}

// saveVariationPrice

export function uploadIdImage(requestData, cb) {
  return async (dispatch) => {
    dispatch({type: Types.UPLOAD_ID_REQUEST});
    try {
      const response = await RestClient.postCall(API.UPLOAD_ID, requestData);
      if (response) {
        cb(response);
        dispatch({type: Types.UPLOAD_ID_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.UPLOAD_ID_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPLOAD_ID_FAIL});
    }
  };
}

export const saveSignature = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.SAVE_SIGNATURE, payload: data});
  };
};

export function makeOrderRequest(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.CREATE_ORDER_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.MAKE_ORDER_REQUEST,
        requestData,
      );
      if (response) {
        dispatch({type: Types.CREATE_ORDER_SUCCESS, payload: response});
        dispatch(getCart());
        dispatch(setCartTotal(0));
        dispatch(getLastOrder({page_no: 1}));
        dispatch(addDropAddress([]));
        goHome();
      } else {
        dispatch({type: Types.CREATE_ORDER_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.CREATE_ORDER_FAIL});
    }
  };
}

export function makeCustomOrderRequest(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.CREATE_ORDER_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.MAKE_CUSTOM_ORDER_REQUEST,
        requestData,
      );
      if (response) {
        dispatch({type: Types.CREATE_ORDER_SUCCESS, payload: response});
        dispatch(setCartTotal(0));
        dispatch(getLastOrder({page_no: 1}));
        dispatch(addDropAddress([]));

        goHome();
      } else {
        dispatch({type: Types.CREATE_ORDER_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.CREATE_ORDER_FAIL});
    }
  };
}

export const saveManualAddress = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.SAVE_MANUAL_ADDRESS, payload: data});
  };
};

export function clearCart(cb) {
  return async (dispatch) => {
    dispatch({type: Types.CLEAR_CART_REQUEST});
    try {
      const response = await RestClient.deleteCall(`${API.CLEAR_CART}`);
      if (response) {
        cb(response);
        dispatch({type: Types.CLEAR_CART_SUCCESS, payload: response});
        dispatch(getCart());
      } else {
        dispatch({type: Types.CLEAR_CART_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.CLEAR_CART_FAIL});
    }
  };
}

export function getAddOns(productId) {
  return async (dispatch) => {
    dispatch({type: Types.GET_ADDON_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_ADDON}${productId}`);
      if (response) {
        dispatch({
          type: Types.GET_ADDON_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_ADDON_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_ADDON_FAIL});
    }
  };
}

export function getFaq() {
  return async (dispatch) => {
    dispatch({type: Types.GET_FAQ_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_FAQ}}`);
      if (response) {
        dispatch({
          type: Types.GET_FAQ_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_FAQ_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_FAQ_FAIL});
    }
  };
}

export function getNotificationStatus() {
  return async (dispatch) => {
    dispatch({type: Types.GET_NOTIFICATION_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_NOTIFICATION}`);
      if (response) {
        dispatch({
          type: Types.GET_NOTIFICATION_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_NOTIFICATION_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_NOTIFICATION_FAIL});
    }
  };
}

export function giveRating(data) {
  return async (dispatch) => {
    dispatch({type: Types.RATE_USER_REQUEST});
    try {
      const response = await RestClient.postCall(API.RATE_USER, data);
      if (response) {
        Toast.show('Thank you for your feedback.');
        dispatch(getActiveLastOrder({page_no: 1}));
        dispatch(getLastOrder({page_no: 1}));
        dispatch({type: Types.RATE_USER_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.RATE_USER_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.RATE_USER_FAIL});
    }
  };
}

export function checkZone(data, cb) {
  return async (dispatch) => {
    dispatch({type: Types.CHECK_ZONE_REQUEST});
    try {
      const response = await RestClient.postCall(API.CHECK_ZONE, data);
      if (response) {
        cb(response);
        dispatch({type: Types.CHECK_ZONE_SUCCESS, payload: response});
      } else {
        dispatch({type: Types.CHECK_ZONE_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.CHECK_ZONE_FAIL});
    }
  };
}

export function fetchZone(data) {
  return async (dispatch) => {
    dispatch({type: Types.FETCH_ZONE_REQUEST});
    try {
      const response = await RestClient.postCall(API.FETCH_ZONE, data);
      if (response) {
        dispatch({type: Types.FETCH_ZONE_SUCCESS, payload: response.data});
      } else {
        dispatch({type: Types.FETCH_ZONE_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.FETCH_ZONE_FAIL});
    }
  };
}

export function getTerms(slug) {
  return async (dispatch) => {
    dispatch({type: Types.GET_TERMS_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_TERMS}${slug}`);
      if (response) {
        dispatch({
          type: Types.GET_TERMS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.GET_TERMS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.GET_TERMS_FAIL});
    }
  };
}

export function jobCompleted(data, cb) {
  return async (dispatch) => {
    dispatch({type: Types.COMPLETE_JOB_REQUEST});
    try {
      const response = await RestClient.postCall(API.COMPLETE_JOB, data);
      cb(true);
      if (response) {
        dispatch({type: Types.COMPLETE_JOB_SUCCESS, payload: response.data});
      } else {
        dispatch({type: Types.COMPLETE_JOB_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.COMPLETE_JOB_FAIL});
    }
  };
}

export function getAdminId() {
  return async (dispatch) => {
    dispatch({type: Types.ADMIN_ID_REQUEST});
    try {
      const response = await RestClient.getCall(`${API.GET_ADMIN_ID}`);
      if (response) {
        dispatch({
          type: Types.ADMIN_ID_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.ADMIN_ID_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.ADMIN_ID_FAIL});
    }
  };
}

export const confirmDelivery = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.DELIVERY_MODAL, payload: data});
  };
};

export const selectedForCompletion = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.SELECTED_ORDER, payload: data});
  };
};

export function updateSelectedOrderStatus(requestData) {
  return async (dispatch) => {
    dispatch({type: Types.UPDATE_ORDER_STATUS_REQUEST});
    try {
      const response = await RestClient.postCall(
        API.UPDATE_ORDER_STATUS,
        requestData,
      );
      if (response) {
        dispatch(getActiveLastOrder({page_no: 1}));
        dispatch(getLastOrder({page_no: 1}));
        dispatch({
          type: Types.UPDATE_ORDER_STATUS_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
      }
    } catch (error) {
      dispatch({type: Types.UPDATE_ORDER_STATUS_FAIL});
    }
  };
}

export const saveSelected = (data) => {
  return (dispatch, getState) => {
    dispatch({type: Types.SELECTED_DETAILS, payload: data});
  };
};
