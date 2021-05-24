/* eslint-disable module-resolver/use-alias */
import {logout} from 'actions/authActions';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Constants from 'constants';
import _ from 'lodash';
const HelpComponent = lazy(() =>
  import('../../../../components/Dashboard/Profile/Help'),
);

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  render() {
    const {componentId, userData, theme} = this.props;
    return (
      <HelpComponent
        componentId={componentId}
        userData={userData}
        theme={theme}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {})(Help);

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
