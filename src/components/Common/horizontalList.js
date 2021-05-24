// import SpinnerLoader from 'components/common/spinnerLoader';
import EmptyComponent from 'components/Common/emptyComponent';
import ImageComponent from 'components/Common/imageComponent';
import Colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {memo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const HorizontalList = (props) => {
  const {data, onItemPress, loading, blackTextColor, theme, isSubCat} = props;

  const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandB = b.title;
    let comparison = 0;
    if (bandB == 'Delivery') {
      comparison = 1;
    } else {
      comparison = -1;
    }
    return comparison;
  };
  data && data.sort(compare);
  console.log(data, 'TUSHARRRRR');
  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator />
    </View>
  ) : (
    <FlatList
      data={data || []}
      horizontal
      contentContainerStyle={{flexGrow: 1}}
      ListEmptyComponent={() => (
        <EmptyComponent
          title={'No categories available.'}
          icon={'times'}
          color={Colors.Primary}
        />
      )}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                onItemPress(item);
              }}
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                // paddingHorizontal: RFValue(10),
                height: RFValue(100),
                width: RFValue(80),
                // backgroundColor: 'red',
              }}>
              <View
                style={{
                  height: RFValue(56),
                  width: RFValue(56),
                  borderBottomRightRadius: RFValue(5),
                  borderBottomLeftRadius: RFValue(5),

                  backgroundColor:
                    Platform.OS == 'ios' ? 'transparent' : 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: theme == 'dark' ? Colors.White : Colors.Black,
                  shadowOffset: {
                    height: 1,
                    width: 0,
                  },
                  shadowOpacity: 0.7,
                  shadowRadius: 1,
                  // elevation: 1,
                }}>
                <ImageComponent
                  styles={{
                    height: isSubCat ? RFValue(55) : RFValue(40),
                    width: isSubCat ? RFValue(55) : RFValue(40),
                    borderRadius: isSubCat ? RFValue(5) : 0,
                  }}
                  resizeMode={isSubCat ? 'stretch' : 'contain'}
                  uri={`${item.icon}`}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: RFValue(32),
                }}>
                <Text
                  adjustsFontSizeToFit
                  style={[
                    {
                      fontSize: RFValue(12),
                      // paddingTop: RFValue(10),
                      fontFamily: Fonts.Medium,
                      textAlign: 'center',
                      // width: RFValue(56),
                    },
                    blackTextColor,
                  ]}>
                  {item.title}
                </Text>
              </View>
              {/* <View style={{overflow: 'hidden', paddingBottom: 5}}>
                <View
                  style={{
                    height: RFValue(56),
                    width: RFValue(56),
                    borderRadius: RFValue(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor:
                      theme == 'dark' ? Colors.Black : Colors.White,
                    shadowColor: theme == 'dark' ? Colors.White : Colors.Black,
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.5,
                    shadowRadius: 0,
                    elevation: 1,
                  }}>
                  <ImageComponent
                    styles={{
                      height: isSubCat ? RFValue(55) : RFValue(40),
                      width: isSubCat ? RFValue(55) : RFValue(40),
                      borderRadius: isSubCat ? RFValue(5) : 0,
                    }}
                    resizeMode={isSubCat ? 'stretch' : 'contain'}
                    uri={`${item.icon}`}
                  />
                </View>
              </View> */}
              {/* <Text
                adjustsFontSizeToFit
                style={[
                  {
                    fontSize: RFValue(12),
                    // paddingTop: RFValue(10),
                    fontFamily: Fonts.Medium,
                    // width: RFValue(56),
                  },
                  blackTextColor,
                ]}>
                {item.title}
              </Text> */}
            </TouchableOpacity>
            {/* <View
              style={{
                width: RFValue(15),
                height: RFValue(15),
                backgroundColor: 'green',
              }}
            /> */}
          </>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default memo(HorizontalList);
