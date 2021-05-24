/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import EmptyComponent from 'components/Common/emptyComponent';
import ImageComponent from 'components/Common/imageComponent';
import {default as Colors, default as colors} from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import idx from 'idx';
const {height} = Dimensions.get('window');

function Favourites(props) {
  const {
    favLoader,
    allFavourite,
    itemPressed,
    getMoreData,
    blackTextColor,
    theme,
  } = props;
  const [momentum, setMomentum] = useState(false);

  return favLoader ? (
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
      data={allFavourite || []}
      onMomentumScrollBegin={() => {
        setMomentum(false);
      }}
      contentContainerStyle={{flexGrow: 1}}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!momentum && allFavourite && allFavourite.length > 5) {
          getMoreData(2);
        }
      }}
      ListEmptyComponent={() => (
        <EmptyComponent
          title={'No Favourite items.'}
          icon={'star'}
          color={Colors.Primary}
        />
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        let storeLogo = item.storeLogo || idx(item, (_) => _.productData.icon);
        let storeName = item.storeName || idx(item, (_) => _.merchantData.name);
        let itemName = item.itemName || idx(item, (_) => _.productData.title);
        let price = idx(
          item,
          (_) => _.productData.variation[0].variationFlatPrice,
        );
        return (
          <TouchableOpacity
            onPress={() => {
              itemPressed(item && item.merchantData);
            }}
            style={{
              flexDirection: 'row',
              height: RFValue(71),
              paddingHorizontal: RFValue(5),
              width: '90%',
              alignSelf: 'center',
              borderRadius: RFValue(5),
              marginVertical: RFValue(5),
              backgroundColor: theme == 'dark' ? Colors.DarkGray : Colors.White,
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
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  height: RFValue(45),
                  width: RFValue(45),
                  borderRadius: RFValue(5),
                  backgroundColor:
                    theme == 'dark' ? Colors.White : Colors.Background,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageComponent
                  styles={{height: RFValue(40), width: RFValue(40)}}
                  resizeMode={'contain'}
                  uri={storeLogo}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  {
                    fontSize: RFValue(15),
                    fontFamily: Fonts.Medium,
                    color: colors.Black,
                  },
                  blackTextColor,
                ]}>
                {storeName}
              </Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                  fontFamily: Fonts.Regular,
                  color: colors.Lgrey,
                }}>
                {itemName} Items{' '}
              </Text>
            </View>
            <View
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={[
                  {
                    fontSize: RFValue(12),
                    fontFamily: Fonts.Regular,
                    color: colors.Lgrey,
                  },
                  blackTextColor,
                ]}>
                Cost
              </Text>
              <Text
                style={{
                  fontSize: RFValue(15),
                  fontFamily: Fonts.Regular,
                  color: colors.Green,
                }}>
                ${price}{' '}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
export default Favourites;
