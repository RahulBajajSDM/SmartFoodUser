/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import Accordian from 'components/Common/accordian';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import API from 'constants/urls';
import ImageComponent from 'components/Common/imageComponent';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import idx from 'idx';
import {getStyles} from 'helpers/themeStyles';

function ItemInfo(props) {
  const {
    likeItem,
    addtoCart,
    checkItem,
    selectedItem,
    goToCart,
    cartLoader,
    allCartItems,
    cartTotal,
    selectedAddOns,
    gettingAddon,
    allAddons,
    theme,
  } = props;
  const [isFav, setIsFav] = useState(false);
  const [variationPrice, selectedVariationPrice] = useState(false);
  const [variationType, setVariationType] = useState(null);

  const merchantArray = useSelector((store) =>
    idx(store, (_) => _.dashboardReducer.allMerchantListing),
  );
  const {colorBackground, blackTextColor} = getStyles(theme);

  useEffect(() => {
    let selected = merchantArray.find(
      (o) => o._id == (selectedItem && selectedItem._id),
    );
    let initialVarionPrice = idx(
      selectedItem,
      (_) => _.variation[0].variationFlatPrice,
    );
    let initialVariation = idx(selectedItem, (_) => _.variation[0]._id);
    selectedVariationPrice(initialVarionPrice);
    setVariationType(initialVariation);

    setIsFav(selected.isFav);
  }, [setIsFav]);

  const selectiedVariation = (value) => {
    let selectedPrice = value && value.find((o) => o.selected == true);
    selectedVariationPrice(
      (selectedPrice && selectedPrice.variationFlatPrice) ||
        idx(selectedItem, (_) => _.variation[0].variationFlatPrice),
    );
    let selectedVariation = value && value[0] && value[0]._id;
    setVariationType(selectedVariation);
  };

  return (
    <>
      <ScrollView
        style={[
          {flexGrow: 1, paddingHorizontal: RFValue(20)},
          colorBackground,
        ]}>
        <View>
          <View
            style={{
              height: RFPercentage(20),
              backgroundColor: colors.Background,
              borderRadius: RFValue(5),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1.5,
              borderColor: theme == 'dark' ? colors.Primary : colors.White,
            }}>
            <ImageComponent
              styles={{
                width: '100%',
                height: '100%',
                aspectRatio: 1,
              }}
              resizeMode={'stretch'}
              uri={selectedItem.icon}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              likeItem();
              setIsFav(!isFav);
            }}
            style={{position: 'absolute', right: 15, top: 15}}>
            {/* <Image source={Images.Heart} resizeMode="contain" /> */}
            <IconsFa
              name={'heart'}
              size={RFValue(25)}
              color={isFav ? colors.Red : colors.White}
            />
          </TouchableOpacity>
        </View>
        <View style={{height: RFPercentage(18)}}>
          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={[
                {fontSize: RFValue(19), fontFamily: Fonts.Medium},
                blackTextColor,
              ]}>
              {_.startCase(selectedItem.title)}
            </Text>
            <Text
              style={[
                {fontSize: RFValue(19), fontFamily: Fonts.Medium},
                blackTextColor,
              ]}>
              ${variationPrice}
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
              borderBottomWidth: 0.2,
              borderColor: colors.Background,
            }}>
            <View style={{flex: 0.85}}>
              <Text
                style={[
                  {fontSize: RFValue(14), fontFamily: Fonts.Regular},
                  blackTextColor,
                ]}>
                {_.startCase(selectedItem.description)}
              </Text>
            </View>
            <TouchableOpacity
              disabled={cartLoader}
              onPress={() => addtoCart(variationPrice, variationType)}
              style={{
                flex: 0.15,
                alignItems: 'flex-end',
              }}>
              {cartLoader ? (
                <ActivityIndicator />
              ) : (
                <Image
                  source={Images.AddMore}
                  resizeMode="contain"
                  style={{height: RFValue(30), width: RFValue(30)}}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {gettingAddon ? (
          <View
            style={{
              height: RFPercentage(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <Accordian
            additionalItems={idx(selectedItem, (_) => _.variation)}
            checkItem={checkItem}
            selectiedVariation={selectiedVariation}
            addOns={
              idx(allAddons, (_) => _.addons.length > 0)
                ? idx(allAddons, (_) => _.addons)
                : []
            }
            selectedAddOns={selectedAddOns}
            blackTextColor={blackTextColor}
          />
        )}

        {/* <Accordian additionalItems={additionalItems} checkItem={checkItem} /> */}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: RFValue(15),
          width: '90%',
          alignSelf: 'center',
          height: RFPercentage(8),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          // elevation: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: colors.Lgrey,
          borderRadius: RFValue(5),
        }}>
        <View
          style={{
            height: RFPercentage(8),
            width: '100%',
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
              idx(allCartItems, (_) => _.result.length) > 0
                ? goToCart()
                : addtoCart(variationPrice, variationType);
            }}
            disabled={cartLoader}
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
              {idx(allCartItems, (_) => _.result.length) > 0
                ? 'View Your Cart'
                : 'Add To Cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default ItemInfo;
