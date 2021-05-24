/* eslint-disable module-resolver/use-alias */
import * as Types from '../../constants/actionsTypes';

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  loginData: {},
  notificationData: null,
  userDetails: null,
  selectedDetails: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return Object.assign({}, state, {});
    case Types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loginData: action.payload,
      });
    case Types.LOGIN_FAIL:
      return Object.assign({}, state, {});

    case Types.REGISTER_REQUEST:
      return Object.assign({}, state, {});
    case Types.REGISTER_SUCCESS:
      return Object.assign({}, state, {});
    case Types.REGISTER_FAIL:
      return Object.assign({}, state, {});

    case Types.GET_USER_REQUEST:
      return Object.assign({}, state, {});
    case Types.GET_USER_SUCCESS:
      return Object.assign({}, state, {
        userDetails: action.payload,
      });
    case Types.GET_USER_FAIL:
      return Object.assign({}, state, {});

    case Types.LOGOUT:
      return INITIAL_STATE;

    case Types.NOTIFICATION_DETAILS:
      return Object.assign({}, state, {
        notificationData: action.payload,
      });

    case Types.SELECTED_DETAILS:
      return Object.assign({}, state, {
        selectedDetails: action.payload,
      });

    default:
      return state;
  }
}
export default authReducer;
