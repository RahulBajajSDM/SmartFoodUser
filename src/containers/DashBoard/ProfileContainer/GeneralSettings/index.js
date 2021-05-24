/* eslint-disable module-resolver/use-alias */
import Constants from 'constants';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {updateNotification} from 'actions/dashboardActions';
import {setTheme} from 'config/theme/actions';
import {pop} from 'actions/appActions/AppActions';
import {Navigation} from 'react-native-navigation';
import {goToAuth, goHome, goToRegister} from 'config/navigation';

const GeneralSettingComponent = lazy(() =>
  import('components/Dashboard/Profile/GeneralSettings'),
);

class GeneralSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  changeTheme = (theme) => {
    const {setTheme, componentId, pop} = this.props;
    let tabColor = theme == 'dark' ? '#28282c' : 'white';
    setTheme(theme);

    Navigation.mergeOptions('componentId', {
      bottomTabs: {
        backgroundColor: tabColor,
      },
    });
    goHome();
  };
  updateNotification = (data) => {
    const {updateNotification} = this.props;
    updateNotification(data);
  };

  render() {
    const {componentId, userData, notificationStatus} = this.props;
    return (
      <GeneralSettingComponent
        componentId={componentId}
        userData={userData}
        changeTheme={this.changeTheme}
        notificationStatus={notificationStatus}
        updateNotification={this.updateNotification}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    notificationStatus: state.dashboardReducer.notificationStatus,
  };
}

export default connect(mapStateToProps, {
  updateNotification,
  setTheme,
  pop,
})(GeneralSettings);

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
