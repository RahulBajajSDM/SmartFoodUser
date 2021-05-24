import {Navigation} from 'react-native-navigation';
import colors from 'constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';

export const pushToParticularScreen = (
  myTheme,
  componentId,
  screenName,
  passProps = {},
  disableHeader,
) => {
  let topColor = myTheme == 'dark' ? colors.Black : '#ffffff';
  console.log(disableHeader, 'disableHeaderdisableHeader');
  return () => {
    Navigation.push(componentId, {
      component: {
        name: screenName,
        passProps,
        options: {
          statusBar: {
            visible: true,
            style: 'light',
            hideWithTopBar: false,
            blur: false,
          },
          topBar: {
            visible: disableHeader ? false : true,
            height: disableHeader ? 0 : RFValue(40),
            backButton: {
              color: colors.Primary,
              visible: true,
            },
            noBorder: true,
            elevation: 0,
            background: {
              color: topColor,
            },
          },
          animations: {
            push: {
              waitForRender: true,
            },
          },
          bottomTabs: {visible: false, drawBehind: true, animate: true},
        },
      },
    });
  };
};

export const pushToParticularScreenWithCustomOptions = (
  componentId,
  screenName,
  // options,
  passProps = {},
) => {
  return () => {
    Navigation.push(componentId, {
      component: {
        name: screenName,
        passProps,
        options: {
          topBar: {
            visible: false,
            height: 0,
          },
          statusBar: {
            visible: true,
            style: 'dark',
            backgroundColor: 'white',
          },
          animations: {
            push: {
              waitForRender: true,
            },
          },
        },
      },
    });
  };
};

export const pop = (componentId) => {
  return () => {
    Navigation.pop(componentId);
  };
};

export const popTo = (componentId) => {
  return () => {
    Navigation.popTo(componentId);
  };
};

/**
 * Navigate to a new page and clear the backstack.
 */
export const resetTo = (newScreen) => {
  return (dispatch) => {
    dispatch(navigate(newScreen, true));
  };
};

export const mergeOptions = (componentId, draweropen) => {
  return () => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: draweropen,
        },
      },
    });
  };
};
export const setScreenStack = (componentId, stack, visible) => {
  return () => {
    Navigation.setStackRoot(componentId, {
      component: {
        name: stack,
        options: {
          topBar: {
            title: {
              text: 'Home',
            },
          },
          bottomTabs: {
            visible,
            drawBehind: true,
          },
        },
      },
    });
  };
};

export const setRoot = (screenName, passProps) => {
  Navigation.setRoot({
    root: {
      stack: {
        id: screenName,
        children: [
          {
            component: {
              name: screenName,
              options: {
                statusBar: {
                  visible: true,
                  style: 'light',
                  hideWithTopBar: false,
                  blur: false,
                },
                topBar: {
                  visible: false,
                  height: 0,
                },
                animations: {
                  push: {
                    waitForRender: true,
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
};

/**
 * Internal helper method for setting the redux state
 */
export const navigate = (newScreen, reset) => {
  return {
    type: 'SCREEN',
    screen: newScreen,
    isReset: reset,
  };
};

export const showNotification = (
  description,
  type = 'success',
  title = 'Overture Health Care',
  autoHide = true,
  backgroundColor = 'transparent',
  textColor = 'black',
) => {
  return (dispatch) => {
    showMessage({
      message: title,
      description,
      backgroundColor, // background color
      color: textColor, // text color
      autoHide,
      type,
    });
  };
};

export const hideNotification = () => {
  return (dispatch) => {
    hideMessage();
  };
};
