/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import EmptyComponent from 'components/Common/emptyComponent';
import ImageComponent from 'components/Common/imageComponent';
import Colors from 'constants/colors';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import StarRating from 'react-native-star-rating';
import idx from 'helpers/Idx';
import API from 'constants/urls';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
const {height} = Dimensions.get('window');

function Featured(props) {
  const {
    allFeatured,
    featureLoader,
    itemPressed,
    getMoreData,
    icon,
    title,
    blackTextColor,
    theme,
  } = props;
  const [momentum, setMomentum] = useState(false);
  console.log(featureLoader, 'featureLoader', allFeatured);
  return featureLoader ? (
    <View
      style={{
        height: RFPercentage(40),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator />
    </View>
  ) : (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      data={allFeatured || []}
      onMomentumScrollBegin={() => {
        setMomentum(false);
      }}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!momentum && allFeatured && allFeatured.length > 5) {
          getMoreData(0);
        }
      }}
      ListEmptyComponent={() => (
        <EmptyComponent
          title={title ? title : 'No data available.'}
          icon={icon ? icon : 'times'}
          color={Colors.Primary}
        />
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        let itemImage =
          item.merchant_image ||
          idx(item, (_) => _.merchantData.merchant_image);
        let itemName = item.name || idx(item, (_) => _.merchantData.name);
        let itemRating =
          item.avgRating || idx(item, (_) => _.merchantData.avgRating);
        let isOpen = item.openNow || idx(item, (_) => _.merchantData.openNow);
        let isDelivery =
          item.isDelivery || idx(item, (_) => _.merchantData.isDelivery);
        let isPickup =
          item.isPickup || idx(item, (_) => _.merchantData.isPickup);
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                itemPressed(item);
              }}
              style={{
                flexDirection: 'row',
                height: RFValue(71),
                paddingVertical: RFValue(5),
                width: '90%',
                alignSelf: 'center',
                borderRadius: RFValue(5),
                marginTop: RFValue(5),
                backgroundColor:
                  theme == 'dark' ? Colors.DarkGray : Colors.White,
                shadowColor: theme == 'dark' ? Colors.White : Colors.Black,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 2.22,
                elevation: 1,
              }}>
              <View
                style={{
                  flex: 0.25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: RFValue(50),
                    width: RFValue(50),
                    borderRadius: RFValue(5),
                    // backgroundColor:
                    //   theme == 'dark' ? Colors.Black : Colors.Background,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  <ImageComponent
                    styles={{height: RFValue(50), width: RFValue(50)}}
                    resizeMode={'contain'}
                    uri={`${itemImage}`}
                  />
                </View>
              </View>
              <View style={{flex: 0.75}}>
                <View style={{flex: 0.333, justifyContent: 'center'}}>
                  <Text style={[{fontSize: RFValue(14)}, blackTextColor]}>
                    {itemName}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.333,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: RFValue(20),
                  }}>
                  {/* <View style={{flex: 0.5}}> */}
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={itemRating || 0}
                    starSize={RFValue(10)}
                    fullStarColor={Colors.Yellow}
                    containerStyle={{width: '30%'}}
                  />
                  <Text
                    style={[
                      {fontSize: RFValue(13), color: Colors.Lgrey},
                      blackTextColor,
                    ]}>
                    {itemName}{' '}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.333,
                    flexDirection: 'row',
                  }}>
                  {isPickup && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image source={Images.Check} resizeMode="contain" />

                      <Text
                        style={[
                          {
                            fontSize: RFValue(11),
                            color: Colors.Lgrey,
                            paddingLeft: RFValue(5),
                          },
                          blackTextColor,
                        ]}>
                        Pickup
                      </Text>
                    </View>
                  )}
                  {isDelivery && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: RFValue(5),
                      }}>
                      <Image
                        source={Images.Check}
                        resizeMode="contain"
                        style={{
                          tintColor:
                            theme == 'dark' ? Colors.Primary : colors.Grey,
                        }}
                      />

                      <Text
                        style={{
                          fontSize: RFValue(11),
                          color: Colors.Lgrey,
                          paddingLeft: RFValue(5),
                          fontFamily: Fonts.Medium,
                        }}>
                        Delivery
                      </Text>
                    </View>
                  )}
                  {isOpen && (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: RFValue(10),
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(11),
                          color: Colors.Green,
                          paddingLeft: RFValue(5),
                          fontFamily: Fonts.Medium,
                        }}>
                        Open
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* 
          <Text
            style={{
              fontSize: RFValue(13),
              paddingTop: RFValue(10),
            }}>
            Title
          </Text> */}
            </TouchableOpacity>
            <View
              style={{
                width: RFValue(15),
                height: RFValue(15),
              }}
            />
          </>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
export default Featured;
