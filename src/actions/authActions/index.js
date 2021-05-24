/* eslint-disable module-resolver/use-alias */
import * as Types from "constants/actionsTypes";
import RestClient from "helpers/RestClient";
import API from "constants/urls";
import { pop, pushToParticularScreen } from "actions/appActions/AppActions";
import { goToAuth, goHome } from "config/navigation";
import Toast from "react-native-simple-toast";
import idx from "idx";
export function signIn(requestData, componentId) {
  return async (dispatch) => {
    dispatch({ type: Types.LOGIN_REQUEST });
    dispatch({ type: Types.REQUEST_REQUEST });
    try {
      const response = await RestClient.postCall(API.LOGIN, requestData);
      if (response) {
        console.log("LOGINNNN", response);
        dispatch({ type: Types.LOGIN_SUCCESS, payload: response });
        dispatch({ type: Types.REQUEST_SUCCESS });
        Toast.show("Login Success.");

        goHome();
      } else {
        dispatch({ type: Types.LOGIN_FAIL });
        dispatch({ type: Types.REQUEST_FAIL });
      }
    } catch (error) {
      Toast.show(error);
      console.log("LOGINNNN", error);

      dispatch({ type: Types.LOGIN_FAIL });
      dispatch({ type: Types.REQUEST_FAIL });
    }
  };
}
export function register(requestData, componentId) {
  return async (dispatch) => {
    dispatch({ type: Types.REGISTER_REQUEST });
    dispatch({ type: Types.REQUEST_REQUEST });
    try {
      const response = await RestClient.postCall(API.REGISTER, requestData);
      if (response) {
        Toast.show("Signup successfull. Please login");

        dispatch({ type: Types.REGISTER_SUCCESS, payload: response });
        dispatch({ type: Types.REQUEST_SUCCESS });
        dispatch(pop(componentId));
      } else {
        dispatch({ type: Types.REGISTER_FAIL });
        dispatch({ type: Types.REQUEST_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.REGISTER_FAIL });
      dispatch({ type: Types.REQUEST_FAIL });
    }
  };
}

export function logout(disableToast) {
  return async (dispatch) => {
    dispatch({ type: Types.REGISTER_REQUEST });
    dispatch({ type: Types.REQUEST_REQUEST });
    try {
      const response = await RestClient.postCall(API.LOGOUT, requestData);

      if (disableToast) {
        Toast.show("Token expired. Please relogin");
      } else {
        Toast.show("Logout Success.");
      }
    } catch (error) {
      dispatch({ type: Types.LOGOUT });
    }
    goToAuth();
  };
}

export function forgotPassword(requestData, componentId, theme) {
  return async (dispatch) => {
    dispatch({ type: Types.FORGOT_PASSWORD_REQUEST });
    try {
      const response = await RestClient.postCall(
        API.FORGOT_PASSWORD,
        requestData
      );
      if (response) {
        dispatch(
          pushToParticularScreen(theme, componentId, "EnterOTP", {
            email: requestData.email,
          })
        );
        dispatch({ type: Types.FORGOT_PASSWORD_SUCCESS, payload: response });
      } else {
        dispatch({ type: Types.FORGOT_PASSWORD_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.FORGOT_PASSWORD_FAIL });
    }
  };
}

export function confirmOTP(requestData, componentId, theme) {
  return async (dispatch) => {
    dispatch({ type: Types.CONFIRM_OTP_REQUEST });
    try {
      const response = await RestClient.postCall(API.CONFIRM_OTP, requestData);
      if (response) {
        dispatch(
          pushToParticularScreen(theme, componentId, "EnterPassword", {
            user_id: response.data,
          })
        );
        dispatch({ type: Types.CONFIRM_OTP_SUCCESS, payload: response });
      } else {
        dispatch({ type: Types.CONFIRM_OTP_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.CONFIRM_OTP_FAIL });
    }
  };
}

export function setPassword(requestData) {
  return async (dispatch) => {
    dispatch({ type: Types.SET_PASSWORD_REQUEST });
    try {
      const response = await RestClient.postCall(API.SET_PASSWORD, requestData);
      if (response) {
        Toast.show("Password successfully changed", Toast.LONG);
        goToAuth();
        dispatch({ type: Types.SET_PASSWORD_SUCCESS, payload: response });
      } else {
        dispatch({ type: Types.SET_PASSWORD_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.SET_PASSWORD_FAIL });
    }
  };
}

export const notificationDetails = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: Types.NOTIFICATION_DETAILS, payload: data });
  };
};

export function geUserDetails() {
  return async (dispatch, getState) => {
    let userId = idx(getState(), (_) => _.authReducer.loginData.data._id);
    dispatch({ type: Types.GET_USER_REQUEST });
    try {
      const response = await RestClient.getCall(`${API.GET_USER}${userId}`);
      if (response) {
        dispatch({
          type: Types.GET_USER_SUCCESS,
          payload: idx(response, (_) => _.data),
        });
      } else {
        dispatch({ type: Types.GET_USER_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.GET_USER_FAIL });
    }
  };
}

export function updateProfile(requestData, componentId) {
  return async (dispatch) => {
    dispatch({ type: Types.UPDATE_USER_REQUEST });
    try {
      const response = await RestClient.postCall(API.UPDATE_USER, requestData);
      console.log("response of update Profile", JSON.stringify(response));
      if (response) {
        dispatch(geUserDetails());
        dispatch(pop(componentId));
        dispatch({ type: Types.UPDATE_USER_SUCCESS, payload: response });
      } else {
        dispatch({ type: Types.UPDATE_USER_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.UPDATE_USER_FAIL });
    }
  };
}

export function socketRegister() {
  return async (dispatch) => {
    dispatch({ type: Types.SOCKET_REGISTER_REQUEST });
    try {
      const response = await RestClient.postCall(API.SOCKET_REGISTER);
      if (response) {
        dispatch({ type: Types.SOCKET_REGISTER_SUCCESS });
      } else {
        dispatch({ type: Types.SOCKET_REGISTER_FAIL });
      }
    } catch (error) {
      dispatch({ type: Types.SOCKET_REGISTER_FAIL });
    }
  };
}

export function changePassword(data) {
  console.log("CHANGE_PASSWORD_REQUEST", data);
  return async (dispatch) => {
    dispatch({ type: Types.CHANGE_PASSWORD_REQUEST });
    try {
      const response = await RestClient.postCall(API.CHANGE_PASSWORD, data);
      console.log("CHANGE_PASSWORD_SUCCESS", response);

      if (response) {
        dispatch({ type: Types.CHANGE_PASSWORD_SUCCESS });
      } else {
        dispatch({ type: Types.CHANGE_PASSWORD_FAIL });
      }
    } catch (error) {
      console.log("CHANGE_PASSWORD_FAIL", error);
      dispatch({ type: Types.CHANGE_PASSWORD_FAIL });
    }
  };
}
