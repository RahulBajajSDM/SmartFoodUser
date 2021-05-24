/* eslint-disable module-resolver/use-alias */
import * as Types from "constants/actionsTypes";
import API from "constants/urls";
import RestClient from "helpers/RestClient";
import idx from "idx";
export function addNewCard(cardBody) {
  return async (dispatch) => {
    dispatch({ type: Types.ADD_CARD_REQUEST });
    try {
      const response = await RestClient.postCall(API.ADD_CARD, cardBody);
      if (response) {
        dispatch({ type: Types.ADD_CARD_SUCCESS });
        dispatch(getAllCards());
      } else {
        dispatch({ type: Types.ADD_CARD_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.ADD_CARD_FAIL });
    }
  };
}

export function getAllCards() {
  return async (dispatch) => {
    dispatch({ type: Types.GET_CARD_REQUEST });
    try {
      const response = await RestClient.getCall(`${API.GET_CARD}`);

      if (response) {
        dispatch({
          type: Types.GET_CARD_SUCCESS,
          payload: response.data,
        });
        if (response.data && response.data.length == 1) {
          dispatch(selectedCard(idx(response, (_) => _.data[0])));
        }
      } else {
        dispatch({ type: Types.GET_CARD_FAIL });
      }
    } catch (error) {}
  };
}

export function removeCard(cardId) {
  return async (dispatch) => {
    dispatch({ type: Types.REMOVE_CARD_REQUEST });
    try {
      const response = await RestClient.deleteRequest(`${API.REMOVE_CARD}`, {
        id: cardId,
      });
      if (response) {
        dispatch({ type: Types.REMOVE_CARD_SUCCESS });
        dispatch(getAllCards());
      } else {
        dispatch({ type: Types.REMOVE_CARD_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.REMOVE_CARD_FAIL });
    }
  };
}

export const paymentTypeSeelcted = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: Types.PAYMENT_TYPE, payload: data });
  };
};

export const selectedCard = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: Types.SELECTED_CARD, payload: data });
  };
};

export function getTax() {
  return async (dispatch) => {
    dispatch({ type: Types.GET_TAX_REQUEST });
    try {
      const response = await RestClient.getCall(`${API.GET_TAX}`);
      console.log("response of tax Rates ", response);
      if (response) {
        dispatch({
          type: Types.GET_TAX_SUCCESS,
          payload: response.data,
        });
      } else {
        dispatch({ type: Types.GET_TAX_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.GET_TAX_FAIL });
    }
  };
}
