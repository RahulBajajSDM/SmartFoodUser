/* eslint-disable module-resolver/use-alias */
import Constants from 'constants';
import React, {Component, lazy} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
const AboutComponent = lazy(() => import('components/Dashboard/Profile/About'));

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  updateApp = () => {
    alert('UPDATE APP');
  };

  render() {
    const {componentId, userData, theme} = this.props;
    return (
      <AboutComponent
        componentId={componentId}
        userData={userData}
        updateApp={this.updateApp}
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

export default connect(mapStateToProps, {})(About);

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
