/* eslint-disable module-resolver/use-alias */
import {logout} from 'actions/authActions';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'constants';
const CheckoutComponent = lazy(() => import('components/Dashboard/Checkout'));

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  logout = () => {
    const {logout} = this.props;
    logout();
  };
  render() {
    const {componentId, theme} = this.props;
    return (
      <CheckoutComponent
        componentId={componentId}
        logout={this.logout}
        theme={theme}
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
  logout,
})(Checkout);

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
