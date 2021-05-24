/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import React, {useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('window');

function Dashboard(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authReducer = useSelector((state) => state.authReducer);
  const {logout} = props;
  const {isLoading} = authReducer;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: RFValue(25)}}>UNDER DEVELOPMENT</Text>
      <Text
        style={{fontSize: RFValue(25), paddingTop: RFValue(20)}}
        onPress={() => {}}>
        LOGOUT
      </Text>
    </View>
  );
}
export default Dashboard = React.memo(Dashboard);
