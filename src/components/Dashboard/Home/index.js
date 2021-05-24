/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import HomeHeader from 'components/Common/homeHeader';
import HorizontalList from 'components/Common/horizontalList';
import ThreeTabs from 'components/Common/threeTabs';
import Favourites from 'components/Dashboard/Home/Favourites';
import Featured from 'components/Dashboard/Home/Featured';
import LastOrder from 'components/Dashboard/Home/LastOrder';
import {getStyles} from 'helpers/themeStyles';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

function Home(props) {
  const [password, setPassword] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);

  const {formattedAddress} = props;
  const {
    itemPressed,
    changingText,
    categoryPressed,
    tabSelected,
    allCategories,
    loading,
    allFavourite,
    favLoader,
    allLastorders,
    lastLoader,
    allFeatured,
    featureLoader,
    clearText,
    searchText,
    getMoreData,
    changeManualLoc,
    theme,
  } = props;

  const {colorBackground, blackTextColor} = getStyles(theme);

  const renderBody = () => {
    if (selectedItem == 0) {
      return (
        <Featured
          allFeatured={allFeatured}
          featureLoader={featureLoader}
          itemPressed={itemPressed}
          getMoreData={getMoreData}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      );
    } else if (selectedItem == 1) {
      return (
        <LastOrder
          allLastorders={allLastorders}
          lastLoader={lastLoader}
          itemPressed={itemPressed}
          getMoreData={getMoreData}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      );
    } else if (selectedItem == 2) {
      return (
        <Favourites
          allFavourite={allFavourite}
          favLoader={favLoader}
          itemPressed={itemPressed}
          getMoreData={getMoreData}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      );
    }
  };
  return (
    <View
      style={[{flexGrow: 1}, colorBackground]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View style={{height: RFPercentage(28.5)}}>
        <HomeHeader
          changingText={changingText}
          formattedAddress={formattedAddress}
          clearText={clearText}
          searchText={searchText}
          changeManualLoc={changeManualLoc}
          colorBackground={colorBackground}
          blackTextColor={blackTextColor}
          theme={theme}
        />
      </View>
      <View
        style={{
          height: RFPercentage(20),
          justifyContent: 'center',
          paddingHorizontal: RFValue(20),
        }}>
        <View
          style={{
            flex: 0.25,
            justifyContent: 'center',
          }}>
          <Text style={[{fontSize: RFValue(17)}, blackTextColor]}>
            Categories
          </Text>
        </View>
        <View style={{flex: 0.75}}>
          <HorizontalList
            data={allCategories}
            onItemPress={categoryPressed}
            loading={loading}
            blackTextColor={blackTextColor}
            theme={theme}
          />
        </View>
      </View>
      <ThreeTabs
        theme={theme}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        titles={[
          {title: 'Featured'},
          {title: 'Last orders'},
          {title: 'Favourites'},
        ]}
      />
      {/* <View style={{height: RFValue(45), flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => setSelectedItem(0)}
          style={{
            flex: 0.333,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor:
              selectedItem == 0 ? Colors.Primary : Colors.Lgrey,
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              color: selectedItem == 0 ? Colors.Primary : Colors.Lgrey,
              fontFamily: Fonts.Medium,
            }}>
            Feature
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedItem(1)}
          style={{
            flex: 0.333,
            justifyContent: 'center',
            alignItems: 'center',

            borderBottomWidth: 1,
            borderBottomColor:
              selectedItem == 1 ? Colors.Primary : Colors.Lgrey,
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              fontFamily: Fonts.Medium,

              color: selectedItem == 1 ? Colors.Primary : Colors.Lgrey,
            }}>
            Last orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedItem(2)}
          style={{
            flex: 0.333,
            justifyContent: 'center',
            alignItems: 'center',

            borderBottomWidth: 1,
            borderBottomColor:
              selectedItem == 2 ? Colors.Primary : Colors.Lgrey,
          }}>
          <Text
            style={{
              fontSize: RFValue(14),
              fontFamily: Fonts.Medium,
              color: selectedItem == 2 ? Colors.Primary : Colors.Lgrey,
            }}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={{flex: 1, paddingTop: RFValue(10)}}>{renderBody()}</View>
    </View>
  );
}
export default Home = React.memo(Home);
