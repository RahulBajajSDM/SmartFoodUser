/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable module-resolver/use-alias */
import EmptyComponent from 'components/Common/emptyComponent';
import ImageComponent from 'components/Common/imageComponent';
import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import idx from 'idx';

const {height} = Dimensions.get('window');
import {getStyles} from 'helpers/themeStyles';

function History(props) {
  const {
    allLastorders,
    lastLoader,
    getMoreData,
    rateDriver,
    reorder,
    cartLoader,
    theme,
  } = props;
  const [momentum, setMomentum] = useState(false);
  const [selectedIndex, setIndex] = useState(null);
  const {colorBackground, blackTextColor} = getStyles(theme);

  return (
    <FlatList
      data={allLastorders}
      ListEmptyComponent={() => (
        <EmptyComponent
          title={'No History available.'}
          icon={'times'}
          color={colors.Primary}
        />
      )}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!momentum && allLastorders && allLastorders.length > 5) {
          getMoreData();
        }
      }}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        let firstStop = item.firstStop || 0;
        let secondStop = item.secondStop || 0;
        console.log('HISTORYYYYYYY', item);
        return (
          <View
            style={{
              height: RFValue(200),
              borderBottomWidth: 0.5,
              borderBottomColor: colors.Background,
            }}>
            <View style={{flex: 0.35, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                <View
                  style={{
                    height: RFValue(50),
                    width: RFValue(50),
                    borderRadius: RFValue(5),

                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}>
                  {idx(item, (_) => _.merchantId.merchant_image) ? (
                    <ImageComponent
                      styles={{height: RFValue(50), width: RFValue(50)}}
                      resizeMode={'contain'}
                      uri={idx(item, (_) => _.merchantId.merchant_image)}
                    />
                  ) : (
                    <IconsFa
                      name={'archive'}
                      size={RFValue(30)}
                      color={colors.Primary}
                    />
                  )}
                </View>
              </View>

              <View
                style={{
                  flex: 0.55,
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    {
                      fontSize: RFValue(15),
                      fontFamily: Fonts.Regular,
                      paddingBottom: RFValue(5),
                    },
                    blackTextColor,
                  ]}>
                  {idx(item, (_) => _.merchantId.name) || 'Custom Order'}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: RFValue(14),
                      fontFamily: Fonts.Regular,
                      color: colors.Lgrey,
                    },
                    blackTextColor,
                  ]}>
                  Oder #{idx(item, (_) => _.receiptId)}
                </Text>
              </View>
              <View
                style={{
                  flex: 0.25,
                  paddingTop: RFValue(10),
                  alignItems: 'flex-end',
                }}>
                {idx(item, (_) => _.status) == 'Canceled' ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      reorder(item);
                      setIndex(index);
                    }}
                    style={{
                      height: RFValue(25),
                      width: RFValue(65),
                      backgroundColor: colors.Green,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: RFValue(5),
                    }}>
                    {cartLoader ? (
                      selectedIndex == index ? (
                        <ActivityIndicator
                          color={colors.White}
                          size={'small'}
                        />
                      ) : (
                        <Text
                          style={{
                            fontSize: RFValue(12),
                            fontFamily: Fonts.Regular,
                            color: colors.White,
                          }}>
                          Reorder
                        </Text>
                      )
                    ) : (
                      <Text
                        style={{
                          fontSize: RFValue(12),
                          fontFamily: Fonts.Regular,
                          color: colors.White,
                        }}>
                        Reorder
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 0.5,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <IconsFa
                  name={
                    idx(item, (_) => _.status) == 'Canceled'
                      ? 'times'
                      : 'check-circle'
                  }
                  size={RFValue(15)}
                  color={
                    idx(item, (_) => _.status) == 'Canceled'
                      ? colors.Red
                      : colors.Green
                  }
                />
                <Text
                  style={[
                    {
                      fontSize: RFValue(16),
                      fontFamily: Fonts.Medium,
                      color: colors.Black,
                      paddingLeft: RFValue(10),
                    },
                    blackTextColor,
                  ]}>
                  {idx(item, (_) => _.status)}
                </Text>
              </View>
              {idx(item, (_) => _.status) == 'Canceled' ? null : (
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => rateDriver(item)}
                    style={{
                      height: RFValue(25),
                      width: RFValue(80),
                      backgroundColor: colors.Yellow,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: RFValue(5),
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(12),
                        fontFamily: Fonts.Regular,
                        color: colors.White,
                      }}>
                      {idx(item, (_) => _.rating) > 0
                        ? 'Details'
                        : 'Rate Driver'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View
              style={{
                flex: 0.25,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 0.45,
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row'}}>
                  {idx(item, (_) => _.bookedItems.length) > 0 ? (
                    <View
                      style={{
                        backgroundColor: colors.Background,
                        borderRadius: RFValue(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: RFValue(20),
                        borderWidth: 1.5,
                        borderColor:
                          theme == 'dark' ? colors.Primary : colors.White,
                      }}>
                      <Text
                        style={[
                          {
                            fontSize: RFValue(13),
                            fontFamily: Fonts.Medium,
                            color: colors.Primary,
                          },
                        ]}>
                        {idx(item, (_) => _.bookedItems.length)}
                      </Text>
                    </View>
                  ) : null}

                  <Text
                    style={[
                      {
                        fontSize: RFValue(14),
                        fontFamily: Fonts.Medium,
                        color: colors.Lgrey,
                        paddingLeft: RFValue(10),
                      },
                      blackTextColor,
                    ]}>
                    {idx(item, (_) => _.bookedItems[0].productName)}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                    color: colors.Lgrey,
                  }}>
                  ${idx(item, (_) => _.subTotalAmount)}
                </Text>
              </View>
              {/* <View
                style={{
                  flex: 0.55,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    fontFamily: Fonts.Medium,
                    color: colors.Lgrey,
                  }}>
                  Tip
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    fontFamily: Fonts.Medium,
                    color: colors.Lgrey,
                  }}>
                  ${idx(item, (_) => _.riderTip)}
                </Text>
              </View> */}
            </View>
            <View
              style={{
                flex: 0.2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    fontSize: RFValue(16),
                    fontFamily: Fonts.Medium,
                  },
                  blackTextColor,
                ]}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: RFValue(19),
                  fontFamily: Fonts.Medium,
                  color: colors.Red,
                }}>
                {/* ${idx(item, (_) => _.totalAmount)}{' '}
                 */}
                $
                {(
                  item.subTotalAmount +
                  item.riderTip +
                  item.deleiveryFee +
                  firstStop +
                  secondStop
                ).toFixed(2)}
              </Text>
            </View>
          </View>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

export default History;
