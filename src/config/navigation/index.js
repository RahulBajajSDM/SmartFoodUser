/* eslint-disable module-resolver/use-alias */
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {Dimensions} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {manageAuthStackOptions} from './stackConfig';
const {width, height} = Dimensions.get('window');

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [
          {
            component: {
              name: 'SignIn',
              options: manageAuthStackOptions(),
            },
          },
        ],
      },
    },
  });

export const goHome = async () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'HOME_SCREEN',
                    name: 'HomeContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/home2/home.png'),
                  selectedIcon: require('../../assets/selectedHome/home.png'),
                  text: 'Home',
                  selectedTextColor: colors.Primary,
                  textColor: colors.Grey,
                  fontFamily: Fonts.Medium,
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
          {
            stack: {
              id: 'CHECKOUT_TAB',
              children: [
                {
                  component: {
                    id: 'CHECKOUT_CONTSINER',
                    name: 'CartContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/cart/cart.png'),
                  selectedIcon: require('../../assets/selectedCart/cart.png'),
                  text: 'Checkout',
                  selectedTextColor: colors.Primary,
                  textColor: colors.Grey,
                  fontFamily: Fonts.Medium,
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
          {
            stack: {
              id: 'ORDER_TAB',
              children: [
                {
                  component: {
                    id: 'ORDER_CONTAINER',
                    name: 'OrderContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/list/list.png'),
                  selectedIcon: require('../../assets/selectedList/check-list.png'),
                  text: 'Order',
                  selectedTextColor: colors.Primary,
                  textColor: colors.Grey,
                  fontFamily: Fonts.Medium,
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: 'PROFILE_CONTAINER',
                    name: 'ProfileContainer',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: require('../../assets/user/user.png'),
                  selectedIcon: require('../../assets/userSelected/userSelected.png'),
                  text: 'Profile',
                  selectedTextColor: colors.Primary,
                  textColor: colors.Grey,
                  fontFamily: Fonts.Medium,
                },
                topBar: {visible: false, height: 0},
                statusBar: {
                  backgroundColor: '#F8F8F8',
                  style: 'dark',
                },
              },
            },
          },
        ],
        options: {
          bottomTabs: {
            titleDisplayMode: 'alwaysShow',
          },
        },
      },
    },
  });
