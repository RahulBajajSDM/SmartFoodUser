/* eslint-disable module-resolver/use-alias */
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {paymentTypeSeelcted} from 'actions/paymentAction';
import React, {Component, lazy} from 'react';
import {connect} from 'react-redux';
const PaymentComponent = lazy(() =>
  import('components/Dashboard/Order/Payment'),
);

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  methodSelected = (method) => {
    const {
      pushToParticularScreen,
      componentId,
      paymentTypeSeelcted,
      pop,
      theme,
    } = this.props;
    paymentTypeSeelcted(method);
    // 0 for COD
    // 1 Paypal
    // 2 Stripe
    // 3 Debit
    if (method == 0) {
      pop(componentId);
    } else if (method == 1) {
      alert('Under Dev');
    } else if (method == 2) {
      pushToParticularScreen(theme, componentId, 'AddCard', {method: method});
    } else if (method == 3) {
      pop(componentId);
    }
  };

  render() {
    const {componentId} = this.props;
    return (
      <PaymentComponent
        componentId={componentId}
        methodSelected={this.methodSelected}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  pushToParticularScreen,
  paymentTypeSeelcted,
  pop,
})(Payment);
