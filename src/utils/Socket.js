import io from 'socket.io-client';
import API from 'constants/urls';
const socket = io(API.SERVER_URL);
// const socket = io('https://536b10defc03.ngrok.io/');

socket.on('connect', function () {
  console.log('********SOCKET CONNECTED*******');
});

export default socket;
