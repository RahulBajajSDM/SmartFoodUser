// import SpinnerLoader from 'components/common/spinnerLoader';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import idx from 'idx';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Modal,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import PictureHolder from 'components/Common/pictureHolder';
import ImagePicker from 'react-native-image-picker';
import ImageComponent from 'components/Common/imageComponent';
import {getStyles} from 'helpers/themeStyles';

const {height, width} = Dimensions.get('window');
const AgeVerification = (props) => {
  const [location, setLocation] = useState(false);
  const {
    visible,
    signaturePadChange,
    setPhoto,
    uploadingID,
    userData,
    idImage,
    vertifyUser,
    theme,
  } = props;
  const options = {
    title: 'Select Photo',
    quality: 0.3,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const _openPicker = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error || response.customButton) {
      } else {
        setPhoto(response);
      }
    });
  };
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#0009',
          //   alignSelf: 'center',
        }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: RFValue(20),
            paddingTop: RFPercentage(10),
            justifyContent: 'center',
          }}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              {
                height: '60%',
                width: '90%',
                borderRadius: RFValue(5),
                alignSelf: 'center',
                overflow: 'hidden',
              },
              colorBackground,
            ]}>
            <View
              style={{
                flex: 0.3,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: RFValue(10),
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: colors.Primary,
              }}>
              <Text
                style={[
                  {
                    fontSize: RFValue(19),
                    fontFamily: Fonts.Medium,
                    paddingBottom: RFValue(5),
                  },
                  blackTextColor,
                ]}>
                Verification
              </Text>
              <Text
                style={{
                  fontSize: RFValue(13),
                  color: colors.Lgrey,
                  fontFamily: Fonts.Regular,
                  textAlign: 'center',
                }}>
                Age verification required to deliver your desired items
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: colors.Primary,
              }}>
              <Text
                style={{
                  paddingLeft: RFValue(20),

                  fontSize: RFValue(13),
                  color: colors.Lgrey,
                  fontFamily: Fonts.Regular,
                }}>
                Permission signature
              </Text>
              <View
                style={{
                  marginTop: RFValue(10),
                  height: RFValue(50),
                  width: '85%',
                  borderRadius: RFValue(5),
                  backgroundColor: '#D9D9D9',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <SignaturePad
                  onChange={signaturePadChange}
                  onError={() => {}}
                  style={{flex: 1, backgroundColor: 'white'}}
                /> */}
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                    color: colors.Grey,
                  }}>
                  {idx(userData, (_) => _.data.firstname)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.27,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: colors.Primary,
              }}>
              <View style={{flex: 0.2}}>
                <Text
                  style={{
                    fontSize: RFValue(13),
                    color: colors.Lgrey,
                    fontFamily: Fonts.Regular,
                    paddingLeft: RFValue(20),
                  }}>
                  Upload your photo
                </Text>
              </View>
              <View style={{flex: 0.8, flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => _openPicker()}
                    style={{
                      height: RFValue(40),
                      width: RFValue(100),
                      borderRadius: RFValue(5),
                      backgroundColor: '#D9D9D9',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(13),
                        color: colors.Grey,
                        fontFamily: Fonts.Regular,
                      }}>
                      Take Photo{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingRight: RFValue(20),
                  }}>
                  <View
                    style={{
                      height: RFValue(70),
                      width: RFValue(70),
                      borderRadius: RFValue(5),
                      borderWidth: 0.5,
                      borderColor: colors.Lgrey,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {uploadingID ? (
                      <ActivityIndicator />
                    ) : (
                      <ImageComponent
                        styles={{height: RFValue(40), width: RFValue(40)}}
                        resizeMode={'contain'}
                        uri={idImage}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              disabled={uploadingID}
              onPress={() => vertifyUser()}
              style={{
                flex: 0.13,
                backgroundColor: '#C4A70E',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  color: colors.White,
                  fontFamily: Fonts.Medium,
                }}>
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default AgeVerification;
