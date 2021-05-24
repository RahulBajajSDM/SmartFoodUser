/* eslint-disable module-resolver/use-alias */
import {getChats, uploadChatImage, readMessage} from 'actions/chatActions';
import Constants from 'constants';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import React, {Component} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import socket from 'utils/Socket';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
} from '../../../../../vendors/react-native-gifted-chat';
const {height} = Dimensions.get('window');

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      messages: this.props.personalChats || [],
      chatImage: null,
      isLoadingEarlier: false,
      anotherUser: '',
      chatData: '',
    };
  }

  componentDidMount = () => {
    const {chatData, userData, getChats, readMessage} = this.props;
    let myId = idx(userData, (_) => _.data._id);
    let anotherUser = idx(
      chatData,
      (_) => _.members.filter((o) => o.userId != myId)[0],
    ); //CHANGE MAY BE ???

    readMessage({
      roomId: idx(chatData, (_) => _._id),
    });
    this.setState(
      {
        chatData: chatData,
        anotherUser: anotherUser,
      },
      () => {
        getChats(
          (data) => {
            this.setState({messages: data});
          },
          idx(chatData, (_) => _._id),
        );
      },
    );

    socket.on('receiveMessage', (data) => {
      let newMessage = [
        {
          _id: idx(data, (_) => _._id),
          text: idx(data, (_) => _.message),
          createdAt: idx(data, (_) => _.created_at),
          user: {
            _id: idx(data, (_) => _.senderData[0]._id),
            name: idx(data, (_) => _.senderData[0].firstname),
            avatar: idx(data, (_) => _.senderData[0].profile_image),
          },
          image: idx(data, (_) => _.media),
        },
      ];
      console.log(data, 'NEW MSGGGG', newMessage);

      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, newMessage),
      }));
    });
  };

  renderSend(props) {
    return (
      <Send
        alwaysShowSend={true}
        {...props}
        containerStyle={{
          borderColor: 'transparent',
          height: RFValue(50),
          width: RFValue(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconsFa name={'send'} size={RFValue(15)} />
      </Send>
    );
  }
  renderInputToolbar(props) {
    return (
      <View
        style={{
          height: 50,
          marginTop: Platform.OS == 'ios' ? RFValue(35) : RFValue(0),
        }}>
        <InputToolbar {...props} containerStyle={styles.inputToolbar} />
      </View>
    );
  }

  renderBubble = (props) => {
    let {theme} = this.props;

    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: colors.WHITE,
          },
          left: {
            color: colors.WHITE,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: theme == 'dark' ? 'white' : colors.Background,
          },
          right: {
            backgroundColor: '#70abe6',
          },
        }}
        containerStyle={{
          right: {
            paddingBottom: RFValue(10),
          },
          left: {
            paddingBottom: RFValue(10),
          },
        }}
        // for date container
      />
    );
  };

  onSendImage = (imageData) => {
    const {chatData, chatImage, anotherUser} = this.state;
    const {userData, getChats} = this.props;
    let data = {
      roomId: idx(chatData, (_) => _._id), // id received from first api
      type: '2', // 1 for test message , 2 for media message
      message: '',
      media: chatImage,
      receiverId: idx(anotherUser, (_) => _.userId),
      senderId: idx(userData, (_) => _.data._id),
    };
    socket.emit('sendMessage', data);
    getChats(
      (data) => {},
      idx(chatData, (_) => _._id),
    );
  };

  onUploadImage = (data) => {
    const {uploadChatImage} = this.props;
    let chatImages = {
      uri: data.uri,
      type: data.type,
      name: 'images.jpg',
    };

    let image = new FormData();
    image.append('image', chatImages);
    uploadChatImage(image, (cb) => {
      this.setState({chatImage: cb.data}, () => {
        this.onSendImage();
      });
    });
  };

  onAppendImage = (messages = [], data) => {
    messages[0].is_read = 1;
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  openImagePicker = () => {
    const {userData, chatData} = this.props;
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        loadingModal: false,
      },
      quality: 0.1,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.data) {
        let data = [
          {
            text: '',
            user: {
              _id: idx(userData, (_) => _.data._id), // User id of user sending image
              avatar: idx(userData, (_) => _.data.profile_image),
            },
            createdAt: new Date(),
            _id: idx(chatData, (_) => _._id), // chat id
            image: `data:image/jpeg;base64,${response.data}`, // Image Url from response
          },
        ];
        this.onUploadImage(response);
        this.onAppendImage(data);
        // socket.sendMessage(imageDate); // Sending an image to message.
      }
    });
  };

  renderCustomActions = () => {
    const {} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.openImagePicker();
        }}
        style={{
          height: RFValue(50),
          width: RFValue(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconsFa name={'camera'} size={RFValue(15)} />
      </TouchableOpacity>
    );
  };

  _renderLoader = () => {
    let {getingPersonalChats} = this.props;
    return (
      <View style={styles.loader}>
        {getingPersonalChats ? <ActivityIndicator /> : null}
      </View>
    );
  };

  onSend(messages = []) {
    const {chatData, anotherUser} = this.state;
    const {userData, getChats} = this.props;
    messages[0].is_read = 1;
    let data = {
      roomId: idx(chatData, (_) => _._id), // id received from first api
      type: '1', // 1 for test message , 2 for media message
      message: messages[0].text,
      media: '',
      receiverId: idx(anotherUser, (_) => _.userId),
      senderId: idx(userData, (_) => _.data._id),
    };
    console.log(anotherUser, 'TUSHAR SENDDD', data);
    socket.emit('sendMessage', data); //Socket to send message
    getChats(
      (data) => {},
      idx(chatData, (_) => _._id),
    );
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    let {
      userImage,
      userData,
      previousChat,
      getingPersonalChats,
      theme,
    } = this.props;
    const {colorBackground, blackTextColor} = getStyles(theme);

    const {messages, anotherUser} = this.state;

    return (
      <View style={{flex: 1}}>
        <View
          style={[
            {flex: 0.05, justifyContent: 'center', alignItems: 'center'},
            colorBackground,
          ]}>
          <Text
            style={[
              {fontFamily: Fonts.Regular, fontSize: RFValue(16)},
              blackTextColor,
            ]}>
            {idx(anotherUser, (_) => _.firstname) || 'Admin'}
          </Text>
        </View>
        <View
          style={[
            {
              flex: 0.95,
            },
            colorBackground,
          ]}>
          <GiftedChat
            messages={previousChat || messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: idx(userData, (_) => _.data._id), // Unique id of user
              avatar: idx(userData, (_) => _.data.profile_image), // Avatar of sender user if available
            }}
            listViewProps={{
              onEndReached: this._loadMore,
              onEndReachedThreshold: 0.5,
            }}
            showAvatarForEveryMessage={true}
            renderAvatarOnTop={true}
            showUserAvatar={true}
            keyboardShouldPersistTaps={'never'}
            renderSend={this.renderSend}
            renderInputToolbar={this.renderInputToolbar}
            renderActions={this.renderCustomActions}
            isLoadingEarlier={true}
            renderBubble={this.renderBubble}
            loadEarlier={false}
            renderLoading={this._renderLoader}
            isCustomViewBottom={true}
            inverted={true}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.authReducer.loginData,
    allInbox: state.chatReducer.allInbox,
    getingPersonalChats: state.chatReducer.getingPersonalChats,
    personalChats: state.chatReducer.personalChats,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  uploadChatImage,
  getChats,
  readMessage,
})(ChatContainer);

const styles = StyleSheet.create({
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
  inputToolbar: {
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: RFValue(22),
    marginHorizontal: RFValue(15),
  },
  loader: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
