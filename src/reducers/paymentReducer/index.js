/* eslint-disable module-resolver/use-alias */
import * as Types from 'constants/actionsTypes';

const INITIAL_STATE = {
  addingCard: false,
  gettingCard: false,
  removingCard: false,
  allCards: null,
  paymentType: 0,
  selectedCard: null,
  taxRates: null,
};

function commonReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_CARD_REQUEST:
      return Object.assign({}, state, {
        addingCard: true,
      });
    case Types.ADD_CARD_SUCCESS:
      return Object.assign({}, state, {
        addingCard: false,
      });
    case Types.ADD_CARD_FAIL:
      return Object.assign({}, state, {
        addingCard: false,
      });

    case Types.GET_CARD_REQUEST:
      return Object.assign({}, state, {
        gettingCard: true,
      });
    case Types.GET_CARD_SUCCESS:
      return Object.assign({}, state, {
        gettingCard: false,
        allCards: action.payload,
      });
    case Types.GET_CARD_FAIL:
      return Object.assign({}, state, {
        gettingCard: false,
      });

    case Types.REMOVE_CARD_REQUEST:
      return Object.assign({}, state, {
        removingCard: true,
      });
    case Types.REMOVE_CARD_SUCCESS:
      return Object.assign({}, state, {
        removingCard: false,
      });
    case Types.REMOVE_CARD_FAIL:
      return Object.assign({}, state, {
        removingCard: false,
      });

    case Types.PAYMENT_TYPE:
      return Object.assign({}, state, {
        paymentType: action.payload,
      });

    case Types.SELECTED_CARD:
      return Object.assign({}, state, {
        selectedCard: action.payload,
      });

    case Types.GET_TAX_REQUEST:
      return Object.assign({}, state, {});
    case Types.GET_TAX_SUCCESS:
      return Object.assign({}, state, {
        taxRates: action.payload,
      });
    case Types.GET_TAX_FAIL:
      return Object.assign({}, state, {});

    case Types.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default commonReducer;
