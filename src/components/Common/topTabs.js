// import SpinnerLoader from 'components/common/spinnerLoader';
import * as Images from 'assets';
import Colors from 'constants/colors';
import React, {memo, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import StarRating from 'react-native-star-rating';
import ImageComponent from 'components/Common/imageComponent';
import EmptyComponent from 'components/Common/emptyComponent';
import idx from 'idx';
import API from 'constants/urls';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
const {width} = Dimensions.get('window');
const TopTabs = (props) => {
  const {
    titles,
    data,
    itemPressed,
    tabSelected,
    loader,
    getMoreData,
    blackTextColor,
    theme,
  } = props;
  const [selectedIndex, setSelectedItem] = useState(0);
  const [pressedItem, setPressedItem] = useState(null);
  const [momentum, setMomentum] = useState(false);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.15,
          borderBottomColor: Colors.Lgrey,
          borderBottomWidth: 0.4,
        }}>
        <FlatList
          data={titles}
          horizontal
          contentContainerStyle={{}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(index), tabSelected(item, index);
                }}
                key={index}
                style={{
                  width: width / 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: index == selectedIndex ? 0.8 : 0,
                  borderBottomColor:
                    index == selectedIndex ? Colors.Primary : Colors.Lgrey,
                }}>
                <Text
                  style={{
                    fontSize: RFValue(12),
                    fontFamily: Fonts.Medium,
                    color:
                      index == selectedIndex
                        ? Colors.Primary
                        : theme == 'dark'
                        ? Colors.White
                        : Colors.Lgrey,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          flex: 0.85,
          paddingHorizontal: RFValue(20),
          paddingTop: RFValue(10),
          justifyContent: 'center',
        }}>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            contentContainerStyle={{flexGrow: 1}}
            ListEmptyComponent={() => (
              <EmptyComponent
                title={'No data available.'}
                icon={'times'}
                color={Colors.Primary}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (!momentum && data && data.length > 3) {
                getMoreData();
              }
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      itemPressed(item);
                    }}
                    style={{
                      flexDirection: 'row',
                      // borderWidth: 1,
                      height: RFValue(71),
                      borderRadius: RFValue(5),
                      backgroundColor:
                        theme == 'dark' ? Colors.DarkGray : Colors.White,
                      shadowColor:
                        theme == 'dark' ? Colors.White : Colors.Black,
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
                          height: RFValue(45),
                          width: RFValue(45),
                          borderRadius: RFValue(8),
                          // backgroundColor: Colors.Background,
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',

                          overflow: 'hidden',
                        }}>
                        <ImageComponent
                          styles={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1,
                          }}
                          resizeMode={'stretch'}
                          uri={item.icon}
                        />
                      </View>
                    </View>
                    <View style={{flex: 0.6, justifyContent: 'center'}}>
                      <Text style={[{fontSize: RFValue(14)}, blackTextColor]}>
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={[
                          {
                            fontSize: RFValue(12),
                            color: Colors.Lgrey,
                            paddingTop: RFValue(5),
                          },
                        ]}>
                        {item.description}{' '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.15,
                        //  justifyContent: 'space-evenly'
                        paddingVertical: RFValue(20),
                      }}>
                      <Text style={[{fontSize: RFValue(14)}, blackTextColor]}>
                        ${idx(item, (_) => _.variation[0].variationFlatPrice)}
                      </Text>
                      <View
                        style={{
                          height: RFValue(25),
                          width: RFValue(25),
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}>
                        <Image
                          source={Images.AddMore}
                          resizeMode="contain"
                          style={{height: RFValue(20), width: RFValue(20)}}
                        />
                      </View>
                    </View>
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
        )}
      </View>
    </View>
  );
};

export default memo(TopTabs);
