/* eslint-disable module-resolver/use-alias */
import withRedux from '../../hoc/withRedux';
import {lazy} from 'react';
import {Navigation} from 'react-native-navigation';
import Loader from '../../containers/App';

const SignIn = lazy(() => import('containers/Auth/SignIn'));
const Register = lazy(() => import('containers/Auth/Register'));
const ForgotPassword = lazy(() => import('containers/Auth/ForgotPassword'));
const EnterOTP = lazy(() => import('containers/Auth/EnterOTP'));
const EnterPassword = lazy(() => import('containers/Auth/EnterPassword'));

const HomeContainer = lazy(() => import('containers/DashBoard/HomeContainer'));
const CheckoutContainer = lazy(() =>
  import('containers/DashBoard/CheckoutContainer'),
);
const OrderContainer = lazy(() =>
  import('containers/DashBoard/OrderContainer'),
);
const ProfileContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer'),
);

const CategoryDetailsContainer = lazy(() =>
  import('containers/DashBoard/HomeContainer/CategoryDetailsContainer'),
);
const ItemDetailsContainer = lazy(() =>
  import('containers/DashBoard/HomeContainer/ItemDetailsContainer'),
);
const ItemInfoContainer = lazy(() =>
  import('containers/DashBoard/HomeContainer/ItemInfoContainer'),
);

const TrackOrderContainer = lazy(() =>
  import('containers/DashBoard/OrderContainer/TrackOrderContainer'),
);

const HelpComponent = lazy(() => import('components/Common/help'));

const CartContainer = lazy(() =>
  import('containers/DashBoard/OrderContainer/CartContainer'),
);

const AddAddressContainer = lazy(() =>
  import('containers/DashBoard/HomeContainer/AddAddressContainer'),
);

const AboutContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer/AboutContainer'),
);

const GeneralSettingsContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer/GeneralSettings'),
);

const HelpContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer/HelpContainer'),
);

const Terms = lazy(() =>
  import('containers/DashBoard/ProfileContainer/TermsContainer'),
);

const AddNewAddress = lazy(() =>
  import('containers/DashBoard/ProfileContainer/AddNewAddress'),
);

const PaymentContainer = lazy(() =>
  import('containers/DashBoard/OrderContainer/PaymentContainer'),
);

const AddCard = lazy(() =>
  import('containers/DashBoard/OrderContainer/PaymentContainer/addCard'),
);
const Map = lazy(() => import('components/Common/map'));
const ChatContainer = lazy(() =>
  import('containers/DashBoard/ProfileContainer/ChatContainer'),
);

export const registerScreens = (store, Provider) => {
  const withReduxStore = withRedux(store);

  // Basic registration of components without any refrence as they are independent of application state
  Navigation.registerComponentWithRedux(
    'Loader',
    () => Loader,
    Provider,
    store,
  );

  // Components that need refrence and need to have access to global context
  Navigation.registerComponentWithRedux('SignIn', withReduxStore(SignIn));
  Navigation.registerComponentWithRedux('Register', withReduxStore(Register));
  Navigation.registerComponentWithRedux(
    'ForgotPassword',
    withReduxStore(ForgotPassword),
  );
  Navigation.registerComponentWithRedux('EnterOTP', withReduxStore(EnterOTP));
  Navigation.registerComponentWithRedux(
    'EnterPassword',
    withReduxStore(EnterPassword),
  );

  Navigation.registerComponentWithRedux(
    'HomeContainer',
    withReduxStore(HomeContainer),
  );
  Navigation.registerComponentWithRedux(
    'CheckoutContainer',
    withReduxStore(CheckoutContainer),
  );
  Navigation.registerComponentWithRedux(
    'OrderContainer',
    withReduxStore(OrderContainer),
  );
  Navigation.registerComponentWithRedux(
    'ProfileContainer',
    withReduxStore(ProfileContainer),
  );

  Navigation.registerComponentWithRedux(
    'CategoryDetailsContainer',
    withReduxStore(CategoryDetailsContainer),
  );
  Navigation.registerComponentWithRedux(
    'ItemDetailsContainer',
    withReduxStore(ItemDetailsContainer),
  );
  Navigation.registerComponentWithRedux(
    'ItemInfoContainer',
    withReduxStore(ItemInfoContainer),
  );
  Navigation.registerComponentWithRedux(
    'TrackOrderContainer',
    withReduxStore(TrackOrderContainer),
  );

  Navigation.registerComponentWithRedux(
    'HelpComponent',
    withReduxStore(HelpComponent),
  );

  Navigation.registerComponentWithRedux(
    'CartContainer',
    withReduxStore(CartContainer),
  );

  Navigation.registerComponentWithRedux(
    'AddAddressContainer',
    withReduxStore(AddAddressContainer),
  );
  Navigation.registerComponentWithRedux('Map', withReduxStore(Map));
  Navigation.registerComponentWithRedux(
    'AboutContainer',
    withReduxStore(AboutContainer),
  );
  Navigation.registerComponentWithRedux(
    'GeneralSettingsContainer',
    withReduxStore(GeneralSettingsContainer),
  );

  Navigation.registerComponentWithRedux(
    'HelpContainer',
    withReduxStore(HelpContainer),
  );

  Navigation.registerComponentWithRedux('Terms', withReduxStore(Terms));
  Navigation.registerComponentWithRedux(
    'AddNewAddress',
    withReduxStore(AddNewAddress),
  );
  Navigation.registerComponentWithRedux(
    'PaymentContainer',
    withReduxStore(PaymentContainer),
  );
  Navigation.registerComponentWithRedux('AddCard', withReduxStore(AddCard));
  Navigation.registerComponentWithRedux(
    'ChatContainer',
    withReduxStore(ChatContainer),
  );
};
