/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from "assets";
import Button from "components/Common/buttonComponent";
import EmptyComponent from "components/Common/emptyComponent";
import { default as Colors, default as colors } from "constants/colors";
import Fonts from "constants/fonts";
import { getStyles } from "helpers/themeStyles";
import idx from "idx";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/FontAwesome";

const { height } = Dimensions.get("window");

function CartComponent(props) {
  const {
    increase,
    decrease,
    cancel,
    orderNow,
    cartItems,
    cartLoader,
    headerAdded,
    cartTotal,
    addedAddresses,

    creatingOrder,
    paymentMethod,
    paymentType,
    taxRates,
    theme,
    changeLocation,
  } = props;
  const [momentum, setMomentum] = useState(false);
  const [tip, setTip] = useState(0);
  const [loader, setLoader] = useState(null);
  const [deliveryFees, setDeliveryFees] = useState(0);
  const [tax, setTax] = useState(0);
  const [customCart, setCustomCart] = useState(false);

  const { colorBackground, blackTextColor } = getStyles(theme);
  let stop1Price =
    idx(
      cartItems,
      (_) => _.result[0].dropPoints.find((o) => o.type == "stop1").stop1Price
    ) ||
    idx(
      cartItems,
      (_) => _.result[0].dropPoints.find((o) => o.type == "stop1").price
    );
  let stop2Price =
    idx(
      cartItems,
      (_) => _.result[0].dropPoints.find((o) => o.type == "stop2").stop2Price
    ) ||
    idx(
      cartItems,
      (_) => _.result[0].dropPoints.find((o) => o.type == "stop2").price
    );
  console.log(props, "asdasdasdasdasd");

  useEffect(() => {
    let isCustom = idx(cartItems, (_) => _.result[0].type == "custom");
    setCustomCart(isCustom ? true : false);
    let defaultTip = Number(cartTotal) * 0.15;
    console.log(
      "tax rates ----------------------",
      JSON.stringify(props.taxRates)
    );
    console.log(
      "cartTotal ----------------------",
      JSON.stringify(props.cartTotal)
    );

    let myValue =
      taxRates &&
      taxRates.adminDeliveryFeeComission &&
      taxRates.adminDeliveryFeeComission / 100;

    console.log("my Value", myValue);

    let adminDeliveryFees =
      (taxRates &&
        taxRates.adminDeliveryFeeComission &&
        taxRates.adminDeliveryFeeComission / 100) * cartTotal;
    // let adminDeliveryFees =
    //   idx(props, (_) => {
    //     _.taxRates.adminDeliveryFeeComission / 100;
    //   }) * cartTotal;

    setTip(defaultTip && defaultTip.toFixed(2).toString());
    setTax(taxRates && taxRates.tax / 100);
    console.log("adminDeliveryFees", adminDeliveryFees, cartTotal);
    setDeliveryFees(adminDeliveryFees);
  }, [taxRates, cartItems, cartTotal, stop1Price, stop2Price]);

  let finalAmount =
    Number(cartTotal) +
    Number(deliveryFees) +
    Number(tax) +
    Number(tip) +
    Number(stop1Price || 0) +
    Number(stop2Price || 0);
  let finalCustomAmount =
    Number(deliveryFees) +
    Number(tax) +
    Number(tip) +
    Number(stop1Price || 0) +
    Number(stop2Price || 0);

  const calculateTotal = () => {
    return (
      <Text
        style={{
          fontSize: RFValue(14),
          fontFamily: Fonts.Regular,
          color: colors.Red,
        }}
      >
        ${customCart ? finalCustomAmount.toFixed(2) : finalAmount.toFixed(2)}
      </Text>
    );
  };

  const renderPaymrntType = () => {
    if (paymentType == 0) {
      return "Cash On Delivery";
    } else if (paymentType == 1) {
      return "Paypal";
    } else if (paymentType == 2) {
      return "Stripe";
    } else if (paymentType == 3) {
      return "Debit at Door";
    }
  };
  let stop1Present =
    idx(
      addedAddresses,
      (_) => _.find((o) => o.type == "stop1").formattedAddress
    ) ||
    idx(
      cartItems,
      (_) =>
        _.result[0].dropPoints.find((o) => o.type == "stop1").formattedAddress
    );

  let stop2Present =
    idx(
      addedAddresses,
      (_) => _.find((o) => o.type == "stop2").formattedAddress
    ) ||
    idx(
      cartItems,
      (_) =>
        _.result[0].dropPoints.find((o) => o.type == "stop2").formattedAddress
    );
  console.log(
    addedAddresses,
    "stop1Pricestop1Pricestop1Price",
    addedAddresses && addedAddresses.find((o) => o.type == "initial")
  );
  console.log("tax in GST is", tax);
  console.log("tax in deliveryFees is", deliveryFees);

  return headerAdded && cartLoader ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  ) : cartItems && cartItems.result && cartItems.result.length > 0 ? (
    <KeyboardAwareScrollView
      style={[
        {
          flexGrow: 1,
          paddingHorizontal: RFValue(20),
          paddingTop: !headerAdded ? RFValue(20) : 0,
        },
        colorBackground,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          height: RFPercentage(5),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[
            {
              fontSize: headerAdded ? RFValue(17) : RFValue(20),
              fontFamily: Fonts.Medium,
              color: headerAdded ? colors.Lgrey : colors.Black,
            },
            blackTextColor,
          ]}
        >
          Cart
        </Text>

        <TouchableOpacity
          onPress={() => {
            cancel();
          }}
        >
          <Text
            style={[
              {
                fontSize: RFValue(17),
                fontFamily: Fonts.Medium,
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}
          >
            Clear All
          </Text>
        </TouchableOpacity>
      </View>
      {customCart ? null : (
        <FlatList
          data={cartItems.result}
          contentContainerStyle={{ width: "100%" }}
          ListEmptyComponent={() => (
            <EmptyComponent
              title={"Please add some items in cart."}
              icon={"cart"}
              color={Colors.Primary}
            />
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: RFPercentage(6),
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 0.7,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      {
                        fontSize: RFValue(14),
                        fontFamily: Fonts.Regular,
                      },
                      blackTextColor,
                    ]}
                  >
                    {idx(item, (_) => _.product.title)}
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: RFValue(14),
                        fontFamily: Fonts.Medium,
                      },
                      blackTextColor,
                    ]}
                  >
                    ${idx(item, (_) => _.cartItems.price)}
                  </Text>
                </View>
                {cartLoader && loader == idx(item, (_) => _.cartItems._id) ? (
                  <View
                    style={{
                      flex: 0.3,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingRight: RFValue(16),
                    }}
                  >
                    <ActivityIndicator />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 0.3,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      disabled={cartLoader}
                      onPress={() => {
                        decrease(item),
                          setLoader(idx(item, (_) => _.cartItems._id));
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(25),
                          fontFamily: Fonts.Regular,
                          color: colors.Green,
                          paddingRight: RFValue(15),
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        {
                          fontSize: RFValue(17),
                          fontFamily: Fonts.Regular,
                          paddingRight: RFValue(15),
                        },
                        blackTextColor,
                      ]}
                    >
                      {idx(item, (_) => _.cartItems.quantity)}
                    </Text>
                    <TouchableOpacity
                      disabled={cartLoader}
                      onPress={() => {
                        increase(item),
                          setLoader(idx(item, (_) => _.cartItems._id));
                      }}
                    >
                      <Text
                        style={{
                          fontSize: RFValue(22),
                          fontFamily: Fonts.Regular,
                          color: colors.Green,
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      {/* <View
        style={{
          height: RFPercentage(6),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            {
              fontSize: RFValue(14),
              fontFamily: Fonts.Regular,
            },
            blackTextColor,
          ]}>
          Delivery fee
        </Text>
        <Text
          style={[
            {
              fontSize: RFValue(14),
              fontFamily: Fonts.Regular,
            },
            blackTextColor,
          ]}>
          ${deliveryFees}
        </Text>
      </View> */}
      {stop1Price ? (
        <View
          style={{
            height: RFPercentage(5),

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
              },
              blackTextColor,
            ]}
          >
            Stop 1 Price
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
              },
              blackTextColor,
            ]}
          >
            ${stop1Price}
          </Text>
        </View>
      ) : null}
      {stop2Price ? (
        <View
          style={{
            height: RFPercentage(5),

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
              },
              blackTextColor,
            ]}
          >
            Stop 2 Price
          </Text>
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
              },
              blackTextColor,
            ]}
          >
            ${stop2Price}
          </Text>
        </View>
      ) : null}
      <View
        style={{
          height: RFPercentage(6),

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[
            {
              fontSize: RFValue(14),
              fontFamily: Fonts.Regular,
            },
            blackTextColor,
          ]}
        >
          GST
        </Text>
        <Text
          style={[
            {
              fontSize: RFValue(14),
              fontFamily: Fonts.Regular,
            },
            blackTextColor,
          ]}
        >
          ${tax}
        </Text>
      </View>
      <View
        style={{
          height: RFPercentage(6),

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[
            {
              fontSize: RFValue(14),
              fontFamily: Fonts.Regular,
            },
            blackTextColor,
          ]}
        >
          Delivery Fees
        </Text>
        <Text
          style={[
            {
              fontSize: RFValue(14),
              fontFamily: Fonts.Regular,
            },
            blackTextColor,
          ]}
        >
          ${deliveryFees && deliveryFees.toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          height: RFPercentage(6),
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 0.6, justifyContent: "center" }}>
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
              },
              blackTextColor,
            ]}
          >
            Tip for Driver
          </Text>
        </View>
        <View
          style={{
            flex: 0.4,
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Regular,
                paddingRight: RFValue(5),
                color: colors.Lgrey,
              },
              blackTextColor,
            ]}
          >
            Add
          </Text>
          <TextInput
            style={{
              height: RFValue(35),
              width: RFValue(70),
              backgroundColor: colors.Background,
              borderRadius: RFValue(5),
              paddingHorizontal: RFValue(5),
              fontSize: RFValue(12),
              color: colors.Black,
            }}
            maxLength={5}
            onChangeText={(text) => setTip(text)}
            value={tip}
            placeholder={"$0"}
          />
        </View>
      </View>
      <View
        style={{
          height: RFPercentage(5),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            {
              fontSize: RFValue(14),
              fontFamily: Fonts.Regular,
              paddingVertical: RFValue(10),
            },
            blackTextColor,
          ]}
        >
          Total{" "}
        </Text>
        {calculateTotal()}
      </View>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: RFValue(10),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: RFValue(14),
              fontFamily: Fonts.Medium,
              color: colors.Blue,
              paddingBottom: RFValue(2),
            }}
          >
            Merchant:
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: RFValue(12),
              fontFamily: Fonts.Medium,
              color: colors.Blue,
              paddingBottom: RFValue(2),
            }}
          >
            {idx(
              addedAddresses,
              (_) => _.find((o) => o.type == "merchant").formattedAddress
            ) ||
              idx(
                cartItems,
                (_) =>
                  _.result[0].dropPoints.find((o) => o.type == "merchant")
                    .address
              ) ||
              idx(
                cartItems,
                (_) =>
                  _.result[0].dropPoints.find((o) => o.type == "merchant")
                    .formattedAddress
              )}
          </Text>
        </View>
        {stop1Present ? (
          <TouchableOpacity
            onPress={() => {
              changeLocation();
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: RFValue(10),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFValue(14),
                fontFamily: Fonts.Medium,
                color: colors.Blue,
                paddingBottom: RFValue(2),
              }}
            >
              Stop 1:
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFValue(12),
                fontFamily: Fonts.Medium,
                color: colors.Blue,
                paddingBottom: RFValue(2),
              }}
            >
              {stop1Present}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              changeLocation();
            }}
            style={{
              flexDirection: "row",
              paddingVertical: RFValue(10),
            }}
          >
            <Image
              source={Images.AddMore}
              resizeMode="contain"
              style={{ height: RFValue(20), width: RFValue(20) }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFValue(15),
                fontFamily: Fonts.Medium,
                color: colors.Green,
                paddingBottom: RFValue(2),
                paddingLeft: RFValue(10),
              }}
            >
              Add Stop
            </Text>
          </TouchableOpacity>
        )}
        {stop1Present && !stop2Present ? (
          <TouchableOpacity
            onPress={() => {
              changeLocation();
            }}
            style={{
              flexDirection: "row",
              paddingVertical: RFValue(10),
            }}
          >
            <Image
              source={Images.AddMore}
              resizeMode="contain"
              style={{ height: RFValue(20), width: RFValue(20) }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFValue(15),
                fontFamily: Fonts.Medium,
                color: colors.Green,
                paddingBottom: RFValue(2),
                paddingLeft: RFValue(10),
              }}
            >
              Add Stop
            </Text>
          </TouchableOpacity>
        ) : stop2Present ? (
          <TouchableOpacity
            onPress={() => {
              changeLocation();
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: RFValue(10),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFValue(14),
                fontFamily: Fonts.Medium,
                color: colors.Blue,
                paddingBottom: RFValue(2),
              }}
            >
              Stop 2:
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: RFValue(12),
                fontFamily: Fonts.Medium,
                color: colors.Blue,
                paddingBottom: RFValue(2),
              }}
            >
              {stop2Present}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => {
          changeLocation();
        }}
        style={{
          height: RFPercentage(15),
          flexDirection: "row",
          // backgroundColor: 'red',
        }}
      >
        <View
          // disabled={true}
          style={{
            flex: 0.7,
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              {
                fontSize: RFValue(14),
                fontFamily: Fonts.Medium,
                paddingBottom: RFValue(5),
              },
              blackTextColor,
            ]}
          >
            Deliver to?
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: colors.Red,
              paddingBottom: RFValue(2),
            }}
          >
            Location
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: RFValue(13),
              fontFamily: Fonts.Regular,
              color: colors.Green,
              paddingVertical: RFValue(5),
            }}
          >
            {idx(
              addedAddresses,
              (_) => _.find((o) => o.type == "initial").formattedAddress
            ) ||
              idx(
                cartItems,
                (_) =>
                  _.result[0].dropPoints.find((o) => o.type == "initial")
                    .address
              ) ||
              idx(
                cartItems,
                (_) =>
                  _.result[0].dropPoints.find((o) => o.type == "initial")
                    .formattedAddress
              )}
          </Text>

          {/* {customCart ? null : (
            <Text
              style={{
                fontSize: RFValue(15),
                fontFamily: Fonts.Regular,
                color: colors.Red,
                paddingBottom: RFValue(2),
              }}>
              Merchant
            </Text>
          )}
          {customCart ? null : (
            <Text
              style={{
                fontSize: RFValue(13),
                fontFamily: Fonts.Regular,
                color: colors.Green,
              }}>
              {(addedAddresses &&
                addedAddresses.filter((o) => o.type == 'merchant')
                  .formattedAddress) ||
                idx(
                  cartItems,
                  (_) =>
                    _.result[0].dropPoints.find((o) => o.type == 'merchant')
                      .formattedAddress,
                )}
            </Text>
          )} */}
        </View>
        <View style={{ flex: 0.3, justifyContent: "center" }}>
          <View
            style={{
              height: RFValue(80),
              width: RFValue(80),
              borderRadius: RFValue(5),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1.5,
              borderColor: colors.Primary,
              overflow: "hidden",
            }}
          >
            <Image
              source={Images.MapScreen}
              resizeMode="contain"
              style={{ height: RFValue(75), width: RFValue(75) }}
            />
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
                top: "40%",
              }}
            >
              <Image source={Images.Pin} resizeMode="contain" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => paymentMethod()}
        style={{
          height: RFPercentage(8),
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 0.8, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: colors.Lgrey,
              paddingBottom: RFValue(2),
            }}
          >
            Pay With
          </Text>
          <Text
            style={{
              fontSize: RFValue(15),
              fontFamily: Fonts.Regular,
              color: colors.Green,
              paddingBottom: RFValue(2),
            }}
          >
            {renderPaymrntType()}
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Icon
            name={"chevron-right"}
            size={RFValue(15)}
            color={colors.Lgrey}
          />
        </View>
      </TouchableOpacity>
      <View style={{ height: RFPercentage(20) }}>
        <Button
          title={"Order Now"}
          loading={creatingOrder}
          disabled={creatingOrder}
          onPress={() => {
            orderNow(cartTotal, deliveryFees, tax, Number(tip));
          }}
          containerHeight={RFValue(80)}
          justifyContent={"flex-end"}
        />
      </View>
    </KeyboardAwareScrollView>
  ) : (
    <View
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        colorBackground,
      ]}
    >
      <EmptyComponent
        title={"No items in your cart."}
        icon={"shopping-cart"}
        color={Colors.Primary}
        iconSize={RFValue(50)}
        fontStyle={{ fontSize: RFValue(20), fontFamily: Fonts.Medium }}
      />
    </View>
  );
}
export default CartComponent;
