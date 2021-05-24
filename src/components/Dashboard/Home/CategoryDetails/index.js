/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets';
import HorizontalList from 'components/Common/horizontalList';
import ImageComponent from 'components/Common/imageComponent';
import ThreeTabs from 'components/Common/threeTabs';
import Featured from 'components/Dashboard/Home/Featured';
import colors from 'constants/colors';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Swiper from 'react-native-swiper';
import IconsFa from 'react-native-vector-icons/FontAwesome';

const {height} = Dimensions.get('window');

function CategoryDetails(props) {
  const {
    categoryPressed,
    itemPressed,
    selectedItem,
    subCategories,
    subCatLoader,
    allLoader,
    selectedAll,
    getMoreData,
    specificFeatured,
    specificFeatureLoader,
    allFavourite,
    favLoader,
    allBanners,
    bannerLoader,
    theme,
    goBack,
    searchedText,
    changingText,
    clearText,
    tabSelected,
  } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const {colorBackground, blackTextColor} = getStyles(theme);

  const renderBody = () => {
    if (selectedTab == 0) {
      //For featured
      return (
        <Featured
          allFeatured={specificFeatured}
          featureLoader={specificFeatureLoader || subCatLoader}
          itemPressed={itemPressed}
          getMoreData={() => getMoreData(0)}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      );
    } else if (selectedTab == 1) {
      //For All items
      return (
        <Featured
          allFeatured={selectedAll}
          featureLoader={allLoader || subCatLoader}
          itemPressed={itemPressed}
          getMoreData={() => getMoreData(1)}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      );
    } else if (selectedTab == 2) {
      //For All FAvs
      return (
        <Featured
          allFeatured={allFavourite}
          featureLoader={favLoader || subCatLoader}
          itemPressed={itemPressed}
          getMoreData={() => getMoreData(2)}
          icon={'star'}
          title={'No Favourite items.'}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      );
    }
  };

  return (
    <View style={[{flex: 1}, colorBackground]}>
      <View
        style={[
          {
            flex: 0.25,
            justifyContent: 'center',
            // paddingHorizontal: RFValue(20),
          },
          colorBackground,
        ]}>
        {bannerLoader ? (
          <ActivityIndicator />
        ) : (
          <Swiper
            scrollEnabled={false}
            loop={true}
            autoplay={true}
            showsButtons={false}
            showsPagination={false}
            style={{
              borderRadius: RFValue(5),
              overflow: 'hidden',
              alignItems: 'center',
              height: '90%',
            }}>
            {idx(allBanners, (_) => _.data.length) > 0 ? (
              idx(allBanners, (_) => _.data).map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.Background,
                      borderRadius: RFValue(5),
                      overflow: 'hidden',
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
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={Images.Logo} resizeMode="contain" />
              </View>
            )}
          </Swiper>
        )}
        <View
          style={{
            height: RFValue(40),
            width: '90%',
            position: 'absolute',
            bottom: RFValue(-5),
            alignSelf: 'center',
            flexDirection: 'row',
            borderRadius: RFValue(10),
            borderWidth: 0.5,
            borderColor: colors.Background,
            overflow: 'hidden',
            backgroundColor: theme == 'dark' ? colors.Black : colors.White,
          }}>
          <View
            style={{
              flex: 0.15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.Search}
              resizeMode="contain"
              style={{
                tintColor: theme == 'dark' ? colors.White : colors.DarkGray,
              }}
            />
          </View>
          <View style={{flex: 0.7}}>
            <TextInput
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={(text) => {
                changingText(text);
              }}
              value={searchedText}
              style={{
                flex: 1,
                fontSize: RFValue(14),
                color: theme == 'dark' ? colors.White : colors.Lgrey,
              }}
              placeholder={'Type keywords to find'}
              placeholderTextColor={
                theme == 'dark' ? colors.White : colors.Lgrey
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              clearText();
            }}
            style={{
              flex: 0.15,
              borderTopRightRadius: RFValue(10),
              borderBottomRightRadius: RFValue(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconsFa name={'times'} size={RFValue(15)} color={colors.Lgrey} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 0.05,
          flexDirection: 'row',
          paddingHorizontal: RFValue(20),
          // backgroundColor: 'red',
          alignItems: 'flex-end',
        }}>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <Text style={[{fontSize: RFValue(17)}, blackTextColor]}>
            {selectedItem && selectedItem.description}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.15,
          paddingHorizontal: RFValue(20),
        }}>
        <HorizontalList
          data={subCategories}
          onItemPress={categoryPressed}
          loading={subCatLoader}
          blackTextColor={blackTextColor}
          theme={theme}
          isSubCat={true}
        />
      </View>
      <View style={{flex: 0.55}}>
        <ThreeTabs
          selectedItem={selectedTab}
          setSelectedItem={(val) => {
            setSelectedTab(val);
            tabSelected(val);
          }}
          titles={[{title: 'Featured'}, {title: 'All'}, {title: 'Favourites'}]}
          blackTextColor={blackTextColor}
        />
        {renderBody()}
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
            backgroundColor: colors.Black,
          },
        ]}>
        <IconsFa
          name={'chevron-left'}
          size={RFValue(15)}
          color={colors.Primary}
        />
      </TouchableOpacity>
    </View>
  );
}

export default CategoryDetails;
