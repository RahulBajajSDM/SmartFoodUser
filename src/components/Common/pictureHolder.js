import * as Images from 'assets';
import colors from 'constants/colors';
import React, {useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const PictureHolder = (props) => {
  const {loading, setPhoto, profilePicture} = props;
  const [spinner, setSpinner] = useState(false);

  const options = {
    title: 'Select Profile Photo',
    quality: 0.3,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const _openPicker = () => {
    setSpinner(true);
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error || response.customButton) {
        setSpinner(false);
      } else {
        setPhoto(`data:${response.type};base64,${response.data}`, response);
        setTimeout(() => {
          setSpinner(false);
        }, 500);
      }
    });
  };

  return (
    <View
      style={{
        height: RFPercentage(18),
        alignItems: 'center',
        borderRadius: RFValue(5),
        backgroundColor: colors.Background,
        justifyContent: 'center',
        marginBottom: RFValue(20),
      }}>
      <TouchableOpacity
        onPress={() => _openPicker()}
        disabled={loading}
        style={{
          height: RFValue(80),
          width: RFValue(80),
          borderRadius: RFPercentage(100),
          borderWidth: 3,
          borderColor: colors.Yellow,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {spinner ? (
          <ActivityIndicator />
        ) : profilePicture ? (
          <Image
            source={{uri: profilePicture}}
            style={{
              width: RFValue(75),
              height: RFValue(75),
              borderRadius: RFValue(60),
            }}
          />
        ) : (
          <Image
            source={Images.User}
            resizeMode="contain"
            style={{tintColor: colors.White}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
export default PictureHolder;
