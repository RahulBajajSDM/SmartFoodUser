/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from "assets";
import ImageComponent from "components/Common/imageComponent";
import colors from "constants/colors";
import Fonts from "constants/fonts";
import idx from "idx";
import moment from "moment";
import React from "react";
import { Dimensions, Image, Text, View, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Swiper from "react-native-swiper";
import IconsFa from "react-native-vector-icons/FontAwesome";

const { height } = Dimensions.get("window");
function Meter(props) {
  const {
    allLastorders,
    allFavourite,
    allMerchantBanners,
    seeAllFav,
    seeAllLastOrder,
    lastPressed,
    favPressed,
    colorBackground,
    blackTextColor,
    theme,
  } = props;
  return (
    <View style={[{ flex: 1 }]}>
      <View style={{ flex: 0.35 }}>
        <View
          style={{
            // height: RFPercentage(20),
            flex: 1,
            overflow: "hidden",
            borderTopLeftRadius: RFValue(20),
            borderTopRightRadius: RFValue(20),
            backgroundColor: colors.Background,
            // shadowColor: theme == 'dark' ? colors.White : colors.Black,
            // shadowOffset: {
            //   height: 1,
            //   width: 0,
            // },
            // shadowOpacity: 0.7,
            // shadowRadius: 1,
            // elevation: 3,
          }}
        >
          <Swiper
            scrollEnabled={false}
            loop={true}
            autoplay={true}
            showsButtons={false}
            showsPagination={false}
            style={{
              backgroundColor: theme == "dark" ? colors.Black : colors.White,
              borderRadius: RFValue(5),
              // alignItems: 'center',
              height: RFPercentage(35),
            }}
          >
            {idx(allMerchantBanners, (_) => _.data.length) > 0 ? (
              idx(allMerchantBanners, (_) => _.data).map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: RFPercentage(15),

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ImageComponent
                      styles={{
                        // height: RFPercentage(55),
                        // width: RFPercentage(45),
                        width: "100%",
                        height: undefined,
                        aspectRatio: 1,
                      }}
                      resizeMode={"contain"}
                      uri={item.icon}
                    />
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Images.Logo}
                  resizeMode="contain"
                  style={{ height: 200, width: 200 }}
                />
              </View>
            )}
          </Swiper>
        </View>
      </View>

      {allLastorders && allLastorders.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            seeAllLastOrder();
          }}
          style={{
            flex: 0.05,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: RFValue(20),
            paddingBottom: RFValue(10),

            // backgroundColor: 'red',
          }}
        >
          <Text
            style={[
              { fontSize: RFValue(15), fontFamily: Fonts.Bold },
              blackTextColor,
            ]}
          >
            Last Orders
          </Text>
          <Text
            style={{
              fontSize: RFValue(12),
              fontFamily: Fonts.Medium,
              color: colors.Green,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      )}
      <View style={{ flex: 0.2, paddingHorizontal: RFValue(20) }}>
        {allLastorders && allLastorders.length > 0 && (
          <Swiper
            loop={true}
            autoplay={true}
            showsButtons={false}
            showsPagination={false}
            style={{
              // backgroundColor: colors.White,

              borderRadius: RFValue(5),
              overflow: "hidden",
              // alignItems: 'center',
            }}
          >
            {allLastorders.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    lastPressed(item);
                  }}
                  style={[
                    {
                      height: RFValue(80),
                      borderRadius: RFValue(5),
                      flexDirection: "row",
                      paddingHorizontal: RFValue(10),
                      backgroundColor:
                        theme == "dark" ? colors.DarkGray : colors.White,
                      shadowColor:
                        theme == "dark" ? colors.White : colors.Black,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 2.22,
                      elevation: 1,
                    },
                  ]}
                  key={index}
                >
                  <View style={{ flex: 0.2, justifyContent: "center" }}>
                    <View
                      style={{
                        height: RFValue(45),
                        width: RFValue(45),
                        borderRadius: RFValue(10),
                        backgroundColor:
                          theme == "dark" ? colors.White : colors.Background,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: RFValue(5),
                        overflow: "hidden",
                        // borderWidth: 1.5,
                        // borderColor:
                        //   theme == 'dark' ? colors.Primary : colors.White,
                      }}
                    >
                      {idx(item, (_) => _.merchantId.merchant_image) ? (
                        <ImageComponent
                          styles={{
                            height: RFValue(45),
                            width: RFValue(45),
                          }}
                          resizeMode={"contain"}
                          uri={idx(item, (_) => _.merchantId.merchant_image)}
                        />
                      ) : (
                        <IconsFa
                          name={"archive"}
                          size={RFValue(25)}
                          color={colors.Primary}
                        />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: RFValue(15),
                          fontFamily: Fonts.Medium,
                          color: colors.Black,
                        },
                        blackTextColor,
                      ]}
                    >
                      {idx(item, (_) => _.merchantId.name) || "Custom Order"}
                    </Text>
                    {idx(item, (_) => _.bookedItems.length) ? (
                      <Text
                        style={{
                          fontSize: RFValue(12),
                          fontFamily: Fonts.Regular,
                          color: colors.Lgrey,
                        }}
                      >
                        {idx(item, (_) => _.bookedItems.length)}
                        Items{" "}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: RFValue(12),
                        fontFamily: Fonts.Regular,
                        color: colors.Lgrey,
                      }}
                    >
                      {moment(idx(item, (_) => _.bookingDateTime))
                        .local()
                        .format("hh:mm DD/MM/YYYY")}
                    </Text>
                    <Text
                      style={{
                        fontSize: RFValue(15),
                        fontFamily: Fonts.Medium,
                        color: colors.Green,
                      }}
                    >
                      $
                      {idx(item, (_) => _.totalAmount) +
                        idx(item, (_) => _.deleiveryFee)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Swiper>
        )}
      </View>
      {allFavourite && allFavourite.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            seeAllFav();
          }}
          style={{
            flex: 0.05,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: RFValue(20),
            // backgroundColor: 'red',
          }}
        >
          <Text
            style={[
              { fontSize: RFValue(15), fontFamily: Fonts.Bold },
              blackTextColor,
            ]}
          >
            Favourites
          </Text>
          <Text
            style={{
              fontSize: RFValue(12),
              fontFamily: Fonts.Medium,
              color: colors.Green,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      )}
      <View style={[{ flex: 0.35, paddingHorizontal: RFValue(20) }]}>
        {allFavourite && allFavourite.length > 0 && (
          <Swiper
            loop={true}
            autoplay={true}
            showsButtons={false}
            showsPagination={false}
            dotStyle={{ padddingTop: 111 }}
            style={{
              borderRadius: RFValue(5),
              overflow: "hidden",
              // alignItems: 'center',
            }}
          >
            {allFavourite.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    favPressed(item);
                  }}
                  key={index}
                  style={[
                    {
                      height: RFValue(80),
                      flexDirection: "row",
                      backgroundColor:
                        theme == "dark" ? colors.DarkGray : colors.White,
                      shadowColor:
                        theme == "dark" ? colors.White : colors.Black,
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 2.22,
                      elevation: 1,
                      paddingHorizontal: RFValue(10),
                    },
                    // colorBackground,
                  ]}
                >
                  <View style={{ flex: 0.2, justifyContent: "center" }}>
                    <View
                      style={{
                        height: RFValue(45),
                        width: RFValue(45),
                        borderRadius: RFValue(10),
                        backgroundColor:
                          theme == "dark" ? colors.White : colors.Background,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <ImageComponent
                        styles={{
                          height: RFValue(45),
                          width: RFValue(45),
                        }}
                        resizeMode={"contain"}
                        uri={idx(item, (_) => _.productData.icon)}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 0.65, justifyContent: "center" }}>
                    <Text
                      style={[
                        {
                          fontSize: RFValue(15),
                          fontFamily: Fonts.Regular,
                          color: colors.Black,
                        },
                        blackTextColor,
                      ]}
                    >
                      {idx(item, (_) => _.productData.title)}
                    </Text>
                    <Text
                      style={{
                        fontSize: RFValue(12),
                        fontFamily: Fonts.Regular,
                        color: colors.Lgrey,
                      }}
                    >
                      {idx(item, (_) => _.productData.description)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: RFValue(15),
                          fontFamily: Fonts.Medium,
                          color: colors.Black,
                        },
                        blackTextColor,
                      ]}
                    >
                      ${" "}
                      {idx(
                        item,
                        (_) => _.productData.variation[0].variationFlatPrice
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </Swiper>
        )}
      </View>
    </View>
  );
}
export default Meter;
