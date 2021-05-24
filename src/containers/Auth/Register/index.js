/* eslint-disable module-resolver/use-alias */
import {pop, pushToParticularScreen} from 'actions/appActions/AppActions';
import {manageComponentStats} from 'actions/componentStats';
import * as Validator from 'helpers/combinedValidators';
import idx from 'helpers/Idx';
import {ThemeContext} from 'hoc/withRedux';
import _ from 'lodash';
import React, {Component, lazy} from 'react';
import {connect} from 'react-redux';
import {
  register,
  updateProfile,
  changePassword,
} from '../../../actions/authActions';
const RegisterComponent = lazy(() => import('components/Auth/Register'));

class Register extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      profilePicture: null,
      profileObj: null,
    };
    this.props.manageComponentStats(
      this.props.componentId,
      'Register',
      this.props.componentStats,
    );
  }

  componentDidMount = () => {
    const {fromProfile, userDetails} = this.props;

    if (fromProfile) {
      this.setState({
        profilePicture: idx(userDetails, (_) => _.profile_image),
      });
    }
  };

  submitLoginForm = (value) => {
    const {register, componentId} = this.props;
    const {profileObj} = this.state;

    // let data = {
    //   firstname: value.fullName,
    //   email: value.email,
    //   phone: `+${value.countryCode}${value.phone}`,
    //   password: value.password,
    //   role: 4,
    // };

    let enableSubmission = Validator.SignUpValidations(value);
    if (enableSubmission) {
      let registerForm = new FormData();
      registerForm.append('firstname', value.fullName);
      registerForm.append('email', value.email);
      registerForm.append('phone', `+${value.countryCode}${value.phone}`);
      registerForm.append('password', value.password);
      registerForm.append('role', 4);
      registerForm.append(
        'profile_image',
        profileObj && profileObj.uri
          ? {
              uri: profileObj.uri,
              type: profileObj.type,
              name: 'images.jpg',
            }
          : '',
      );

      register(registerForm, componentId);
    }
  };

  setPhoto = _.debounce((value, response) => {
    this.setState({
      profilePicture: value,
      profileObj: response,
    });
  }, 500);

  goToSignIn = _.debounce(() => {
    const {
      componentId,
      pushToParticularScreen,
      fromSignIn,
      pop,
      theme,
    } = this.props;
    if (fromSignIn) {
      pop(componentId);
    } else {
      pushToParticularScreen(theme, componentId, 'SignIn');
    }
  }, 500);

  updateProfile = _.debounce((value) => {
    const {
      updateProfile,
      componentId,
      changePassword,
      userDetails,
    } = this.props;
    const {profileObj, profilePicture} = this.state;

    let enableSubmission = Validator.UpdateValidations(value);
    if (enableSubmission) {
      let registerForm = new FormData();
      registerForm.append('firstname', value.fullName);
      registerForm.append('email', value.email);
      registerForm.append(
        'phone',
        value.countryCode.includes('+')
          ? `${value.countryCode}${value.phone}`
          : `+${value.countryCode}${value.phone}`,
      );
      registerForm.append('role', 4);

      registerForm.append('_id', userDetails && userDetails._id);
      registerForm.append(
        'profile_image',
        profileObj
          ? {
              uri: profileObj.uri,
              type: profileObj.type,
              name: 'images.jpg',
            }
          : profilePicture,
      );

      updateProfile(registerForm, componentId);
      changePassword({
        oldpassword: value.password,
        password: value.confirmPassword,
      });
    }
  }, 500);

  render() {
    const {loading, fromProfile, userDetails, theme} = this.props;
    const {profilePicture} = this.state;
    return (
      <RegisterComponent
        submitLoginForm={
          fromProfile ? this.updateProfile : this.submitLoginForm
        }
        goToSignIn={this.goToSignIn}
        loading={loading}
        setPhoto={this.setPhoto}
        profilePicture={profilePicture}
        fromProfile={fromProfile}
        userDetails={userDetails}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.commonReducer.loader,
    userDetails: state.authReducer.userDetails,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  pushToParticularScreen,
  manageComponentStats,
  register,
  pop,
  updateProfile,
  changePassword,
})(Register);
