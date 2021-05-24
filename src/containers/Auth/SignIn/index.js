/* eslint-disable module-resolver/use-alias */
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {signIn} from 'actions/authActions';
import {manageComponentStats} from 'actions/componentStats';
import * as Validator from 'helpers/combinedValidators';
import {ThemeContext} from 'hoc/withRedux';
import _ from 'lodash';
import React, {Component, lazy} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
const SignInComponent = lazy(() => import('components/Auth/SignIn'));
class SignIn extends Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {};
    this.props.manageComponentStats(
      this.props.componentId,
      'Login',
      this.props.componentStats,
    );
  }

  goToSignUp = _.debounce(() => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'Register', {
      fromSignIn: true,
    });
  }, 500);

  signIn = (value) => {
    const {signIn, componentId, deviceID, deviceToken} = this.props;
    let enableSubmission = Validator.LoginValidations(value);

    if (enableSubmission) {
      // Toast.show('Under Dev');
      signIn(
        {
          email: value.email,
          password: value.password,
          role: 4,
          deviceID: Platform.OS,
          deviceToken: deviceToken && deviceToken.fcmToken,
        },
        componentId,
      );
    }
  };

  goToForgotPass = () => {
    const {componentId, pushToParticularScreen, theme} = this.props;
    pushToParticularScreen(theme, componentId, 'ForgotPassword');
  };

  render() {
    const {loading, theme} = this.props;
    return (
      <SignInComponent
        goToSignUp={this.goToSignUp}
        signIn={this.signIn}
        goToForgotPass={this.goToForgotPass}
        loading={loading}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.commonReducer.loader,
    deviceToken: state.authReducer.notificationData,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  pop,
  manageComponentStats,
  pushToParticularScreen,
  signIn,
})(SignIn);
