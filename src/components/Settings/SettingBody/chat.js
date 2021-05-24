import EmptyComponent from 'components/Common/emptyComponent';
import ImageComponent from 'components/Common/imageComponent';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import idx from 'idx';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {SwipeListView} from 'react-native-swipe-list-view';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import * as ChatAssets from './assets';
import socket from 'utils/Socket';

export default function Basic(props) {
  const {
    goToMyChat,
    loadingChats,
    allInbox,
    deleteChat,
    userData,
    renderChatList,
    colorBackground,
    blackTextColor,
    theme,
    muteUser,
    refreshed,
  } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [newRoomId, setNewRoomId] = useState('');

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setNewRoomId(data.roomId);
      refreshed();
    });
  }, []);

  const renderItem = (data) => {
    let myId = idx(userData, (_) => _.data._id);
    let anotherUser = idx(
      data,
      (_) => _.item.members.filter((o) => o.userId._id != myId)[0],
    );
    let thisRoomId = idx(data, (_) => _.item.read);
    console.log('myIdmyIdmyId', data);
    return (
      <TouchableOpacity
        onPress={() => goToMyChat(data)}
        style={[
          styles.rowFront,
          {
            backgroundColor: theme == 'dark' ? colors.DarkGray : colors.White,
            borderWidth: 1.5,
            borderColor: theme == 'dark' ? colors.Primary : colors.White,
          },
          thisRoomId == newRoomId ? styles.additionalShadow : {},
        ]}
        underlayColor={'#AAA'}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: RFValue(40),
              width: RFValue(40),
              borderRadius: RFValue(100),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: colors.Primary,
              overflow: 'hidden',
            }}>
            {idx(anotherUser, (_) => _.profile_image) ? (
              <ImageComponent
                styles={{height: RFValue(40), width: RFValue(40)}}
                resizeMode={'contain'}
                uri={idx(anotherUser, (_) => _.profile_image)}
              />
            ) : (
              <IconsFa
                name={'user'}
                size={RFValue(20)}
                color={colors.Primary}
              />
            )}
          </View>
          <View
            style={{
              height: RFValue(12),
              width: RFValue(12),
              borderRadius: RFValue(100),
              backgroundColor: 'green',
              position: 'absolute',
              right: RFValue(7),
              top: RFValue(20),
              borderWidth: 2,
              borderColor: colors.Background,
            }}></View>
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <Text
            style={[
              {
                fontSize: RFValue(14.5),
                fontFamily: thisRoomId == newRoomId ? Fonts.Bold : Fonts.Medium,
                color: colors.Grey,
              },
              blackTextColor,
            ]}>
            {idx(anotherUser, (_) => _.firstname) || 'Admin'}
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(12),
                fontFamily: thisRoomId == newRoomId ? Fonts.Bold : Fonts.Light,
              },
              blackTextColor,
            ]}
            numberOfLines={1}>
            {idx(data, (_) => _.item.lastMessage)}
          </Text>
        </View>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
                color: colors.Grey,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            {moment(idx(data, (_) => _.item.lastMessageDate))
              .local()
              .format('hh:mm a')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    let myId = idx(userData, (_) => _.data._id);
    let anotherUser = idx(
      data,
      (_) => _.item.members.filter((o) => o.userId._id != myId)[0],
    );
    console.log(anotherUser, 'anotherUseranotherUseranotherUser');
    return (
      <View
        style={{
          height: RFValue(70),
          justifyContent: 'flex-end',
          flexDirection: 'row',
          width: '100%',
          paddingTop: RFValue(5),
        }}>
        <TouchableOpacity
          onPress={() => {
            muteUser(data);
            closeRow(rowMap, data.item.key);
          }}
          style={{
            height: RFValue(72),
            width: RFValue(50),
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 1,
            backgroundColor:
              anotherUser && anotherUser.isMute ? colors.Primary : colors.White,
            borderTopLeftRadius: RFValue(10),
            borderBottomLeftRadius: RFValue(10),
          }}>
          <Image
            source={ChatAssets.Bell}
            style={{
              tintColor:
                anotherUser && anotherUser.isMute ? colors.White : colors.Black,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            closeRow(rowMap, data.item.key), deleteChat(data);
          }}
          style={{
            height: RFValue(72),
            width: RFValue(50),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.Red,
            borderBottomRightRadius: RFValue(10),
            borderTopRightRadius: RFValue(10),
          }}>
          <Image
            source={ChatAssets.Bin}
            resizeMode="contain"
            style={{tintColor: colors.White}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, colorBackground]}>
      <View
        style={{
          height: RFValue(45),
          flexDirection: 'row',
          marginVertical: RFValue(10),
        }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(0);
            renderChatList(0);
          }}
          style={{
            flex: 0.49,
            borderRadius: RFValue(5),
            backgroundColor: selectedTab == 0 ? '#4C84FF' : colors.White,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: selectedTab == 0 ? colors.White : colors.Grey,
            }}>
            DRIVERS
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.02}} />
        <TouchableOpacity
          onPress={() => {
            setSelectedTab(1);
            renderChatList(1);
          }}
          style={{
            flex: 0.49,
            borderRadius: RFValue(5),
            backgroundColor: selectedTab == 1 ? '#4C84FF' : colors.White,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: selectedTab == 1 ? colors.White : colors.Grey,
            }}>
            HELP DESK
          </Text>
        </TouchableOpacity>
      </View>
      {loadingChats ? (
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 0.9}}>
          <ActivityIndicator />
        </View>
      ) : allInbox && allInbox.data && allInbox.data.length > 0 ? (
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={allInbox.data}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-150}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      ) : (
        <EmptyComponent
          title={'No chats available'}
          icon={'comments'}
          color={colors.Primary}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: RFValue(20),
    flex: 1,
    paddingTop: RFValue(20),
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: colors.White,
    borderRadius: RFValue(10),

    color: colors.GREY,
    height: RFValue(77),
    marginBottom: RFValue(10),
    marginTop: RFValue(3),
    flexDirection: 'row',
  },
  additionalShadow: {
    elevation: 3,
    shadowOffset: {width: 0, height: 7},
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  normalShadow: {
    elevation: 1,
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    height: RFValue(77),
  },
  backRightBtnLeft: {
    marginTop: RFValue(3),

    backgroundColor: 'blue',
    right: 75,
    height: RFValue(77),
  },
  backRightBtnRight: {
    marginTop: RFValue(3),

    backgroundColor: 'red',
    right: 0,
    height: RFValue(75),
    borderTopEndRadius: RFValue(10),
    borderBottomRightRadius: RFValue(10),
    overflow: 'hidden',
  },
});
