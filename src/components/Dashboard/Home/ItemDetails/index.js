/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import ImageComponent from 'components/Common/imageComponent';
import TopTabs from 'components/Common/topTabs';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import idx from 'helpers/Idx';
import {getStyles} from 'helpers/themeStyles';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue, RFPercentage} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

const {height} = Dimensions.get('window');

function ItemDetails(props) {
  const {
    goBack,
    information,
    itemPressed,
    tabSelected,
    goToCart,
    merchantDetails,
    mearchantItems,
    merchantLoader,
    allMerchantListing,
    merchantBannerLoader,
    merchantBanner,
    getMoreData,
    allCartItems,
    cartTotal,
    merchantItemLoader,
    theme,
  } = props;
  const {colorBackground, blackTextColor} = getStyles(theme);
  useEffect(() => {
    console.log(props, 'Asdasdasdas');
  }, [merchantDetails]);
  return (
    <View style={[{flex: 1}, colorBackground]}>
      {/* <View
        style={{
          flex: 0.05,
          flexDirection: 'row',
          paddingHorizontal: RFValue(20),
        }}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={{
            flex: 0.5,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={[{fontSize: RFValue(17)}, blackTextColor]}>
            {merchantDetails && merchantDetails.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            information();
          }}
          style={{flex: 0.5, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Image
            source={Images.Info}
            resizeMode="contain"
            style={{tintColor: theme == 'dark' ? 'white' : 'black'}}
          />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          flex: 0.33,
          // backgroundColor: Colors.White,
          borderRadius: RFValue(5),
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.Background,
        }}>
        {merchantBannerLoader ? (
          <ActivityIndicator />
        ) : (
          <Swiper
            scrollEnabled={false}
            loop={true}
            autoplay={true}
            showsButtons={false}
            showsPagination={false}
            dotStyle={{padddingTop: 111}}
            style={{
              backgroundColor: colors.White,
              borderRadius: RFValue(5),
              overflow: 'hidden',
              alignItems: 'center',
              height: RFPercentage(35),
            }}>
            {idx(merchantBanner, (_) => _.data.length) > 0 ? (
              idx(merchantBanner, (_) => _.data).map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: RFPercentage(15),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.Background,
                      borderRadius: RFValue(5),
                    }}>
                    <ImageComponent
                      styles={{
                        width: '100%',
                        height: undefined,
                        aspectRatio: 1,
                      }}
                      resizeMode={'contain'}
                      uri={item.icon}
                    />
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  height: RFPercentage(18),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={Images.Logo} resizeMode="contain" />
              </View>
            )}
          </Swiper>
        )}
        <View
          style={[
            {
              height: RFPercentage(10),
              flexDirection: 'row',
              paddingHorizontal: RFValue(10),
            },
            colorBackground,
          ]}>
          <View
            style={{
              flex: 0.35,
              justifyContent: 'flex-end',
              paddingHorizontal: RFValue(8),
              paddingBottom: RFValue(5),
            }}>
            <Text
              numberOfLines={1}
              style={[
                {
                  fontFamily: Fonts.Bold,
                  fontSize: RFValue(13),
                  color: colors.Primary,
                },
              ]}>
              {idx(merchantDetails, (_) => _.name)}
            </Text>
            <Text
              style={[{fontSize: RFValue(10)}, blackTextColor]}
              numberOfLines={2}>
              {idx(merchantDetails, (_) => _.address)}
            </Text>
          </View>
          <View
            style={{
              flex: 0.65,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: RFValue(5),
              paddingTop: RFValue(8),
            }}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={idx(merchantDetails, (_) => _.avgRating)}
              starSize={RFValue(10)}
              fullStarColor={colors.Yellow}
              containerStyle={{width: '30%'}}
              starStyle={{paddingHorizontal: 2}}
            />
            <View
              style={{
                height: RFValue(30),
                width: RFValue(60),
                borderRadius: RFValue(5),
                backgroundColor: colors.Yellow,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Medium,
                  color: '#049953',
                }}>
                {idx(merchantDetails, (_) => _.avgRating.toFixed(0))}
              </Text>
              <StarRating
                disabled={false}
                maxStars={1}
                rating={1}
                starSize={RFValue(10)}
                fullStarColor={colors.Primary}
                starStyle={{paddingLeft: 5}}
                containerStyle={{width: '30%'}}
              />
            </View>
            <Text
              style={{
                color: '#049953',
              }}>
              {idx(merchantDetails, (_) => _.totalRating)} ratings
            </Text>
          </View>
        </View>
        <View
          style={[
            {
              height: RFValue(45),
              width: RFValue(45),
              borderRadius: RFValue(100),
              justifyContent: 'center',
              alignItems: 'center',
              bottom: RFPercentage(7.5),
              backgroundColor: colors.White,
              left: RFValue(20),
              position: 'absolute',
              paddingRight: RFValue(3),
              borderWidth: 1,
              borderColor: colors.Red,
              overflow: 'hidden',
            },
          ]}>
          <ImageComponent
            styles={{
              width: RFValue(48),
              height: RFValue(48),
            }}
            resizeMode={'contain'}
            uri={idx(merchantDetails, (_) => _.merchant_image)}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={[
            {
              height: RFValue(30),
              width: RFValue(30),
              borderRadius: RFValue(100),
              justifyContent: 'center',
              alignItems: 'center',
              top: RFValue(40),
              left: RFValue(10),
              position: 'absolute',
              paddingRight: RFValue(3),
              backgroundColor:
                theme == 'dark' ? colors.Black : colors.Background,
            },
          ]}>
          <IconsFa
            name={'chevron-left'}
            size={RFValue(15)}
            color={colors.Primary}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.58}}>
        <TopTabs
          titles={mearchantItems}
          data={allMerchantListing}
          tabSelected={tabSelected}
          itemPressed={itemPressed}
          loader={merchantLoader || merchantItemLoader}
          getMoreData={getMoreData}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      </View>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: RFValue(56),
            width: '90%',
            borderWidth: 0.5,
            borderColor: colors.Lgrey,
            borderRadius: RFValue(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: RFValue(10),
          }}>
          <Text
            style={[
              {
                fontSize: RFValue(18),
                fontFamily: Fonts.Regular,
                paddingLeft: RFValue(10),
              },
              blackTextColor,
            ]}>
            {idx(allCartItems, (_) => _.result.length)}
          </Text>
          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: colors.Red,
            }}>
            ${cartTotal}
          </Text>
          <TouchableOpacity
            onPress={() => {
              goToCart();
            }}
            style={{
              height: RFValue(43),
              width: RFValue(166),
              borderRadius: RFValue(5),
              backgroundColor: colors.Red,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: RFValue(10),
            }}>
            <Image source={Images.Bag} resizeMode="contain" />
            <Text
              style={{
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.White,
                paddingLeft: RFValue(5),
              }}>
              View Your Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default ItemDetails;
