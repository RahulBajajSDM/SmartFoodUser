import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import React, {memo, useEffect, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  NativeModules,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import IconsFa from 'react-native-vector-icons/FontAwesome';
import EmptyComponent from 'components/Common/emptyComponent';
import idx from 'idx';
import _ from 'lodash';
const {UIManager} = NativeModules;
const CustomLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
  },
};

const Accordian = (props) => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [selectedAddon, setSelectedAddon] = useState(null);

  const {
    additionalItems,
    selectiedVariation,
    addOns,
    selectedAddOns,
    blackTextColor,
  } = props;
  useEffect(() => {
    variationClone[0].selected = true;

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    setRefresh(!refresh);
  }, []);

  let variationClone = [...additionalItems];
  let addonsClone = [...addOns];

  const checkItem = (index) => {
    variationClone[index].selected = variationClone[index].selected
      ? variationClone[index].selected
      : true;

    variationClone.map((item, i) => {
      if (i != index) {
        return (variationClone[i].selected = false);
      }
    });
    selectiedVariation(variationClone);

    setRefresh(!refresh);
  };

  useEffect(() => {}, [refresh]);

  const checkAddons = (indexType) => {
    addonsClone[indexType.parentIndex].item[
      indexType.childIndex
    ].selected = !addonsClone[indexType.parentIndex].item[indexType.childIndex]
      .selected;
    selectedAddOns(addonsClone);
    setRefresh(!refresh);
    // addonsClone
  };

  return (
    <View>
      <View
        onPress={() => {
          LayoutAnimation.configureNext(CustomLayoutAnimation);
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={[
            {
              fontSize: RFValue(17),
              fontFamily: Fonts.Medium,
              paddingVertical: RFValue(10),
            },
            blackTextColor,
          ]}>
          Variation
        </Text>
      </View>

      <FlatList
        data={additionalItems}
        contentContainerStyle={{width: '100%', flexGrow: 1}}
        ListEmptyComponent={() => (
          <EmptyComponent
            title={'No categories available.'}
            icon={'times'}
            color={colors.Primary}
          />
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                height: RFValue(40),
                borderRadius: RFValue(5),
                borderColor: colors.Background,
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderBottomWidth: 0.2,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  checkItem(index);
                }}
                key={index}
                style={{
                  flexDirection: 'row',
                  height: RFValue(25),
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: RFValue(30),
                    width: RFValue(30),
                    justifyContent: 'center',
                  }}>
                  <IconsFa
                    name={'circle'}
                    size={RFValue(15)}
                    color={item.selected ? colors.Green : colors.Background}
                  />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      {
                        fontSize: RFValue(15),
                        fontFamily: Fonts.Regular,
                      },
                      blackTextColor,
                    ]}>
                    {_.startCase(item.title)}{' '}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={[
                      {
                        fontSize: RFValue(13),
                        fontFamily: Fonts.Regular,
                      },
                      blackTextColor,
                    ]}>
                    ${item.variationFlatPrice}{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <FlatList
        data={addonsClone || addOns}
        contentContainerStyle={{width: '100%', flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          console.log(selected, 'selectedselectedselected');
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  LayoutAnimation.configureNext(CustomLayoutAnimation);
                  setSelected(selectedAddon);
                  setSelectedAddon(index);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    {
                      fontSize: RFValue(17),
                      fontFamily: Fonts.Medium,
                      paddingVertical: RFValue(10),
                    },
                    blackTextColor,
                  ]}>
                  {idx(item, (_) => _.name.name)}
                </Text>
                <View>
                  <IconsFa
                    name={index == selectedAddon ? 'minus' : 'plus'}
                    size={RFValue(15)}
                    color={
                      index == selectedAddon ? colors.Primary : colors.Green
                    }
                  />
                </View>
              </TouchableOpacity>

              {selectedAddon == index
                ? item &&
                  item.item.map((value, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          height: RFValue(40),
                          borderRadius: RFValue(5),
                          borderColor: colors.Background,
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          borderBottomWidth: 0.2,
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            checkAddons({parentIndex: index, childIndex: i});
                          }}
                          key={index}
                          style={{
                            flexDirection: 'row',
                            height: RFValue(25),
                            width: '100%',
                            // justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              // height: RFValue(30),
                              // width: RFValue(30),
                              justifyContent: 'center',
                              flex: 0.1,
                            }}>
                            <IconsFa
                              name={'circle'}
                              size={RFValue(15)}
                              color={
                                value.selected
                                  ? colors.Green
                                  : colors.Background
                              }
                            />
                          </View>
                          <View
                            style={{
                              flex: 0.8,
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={[
                                {
                                  fontSize: RFValue(15),
                                  fontFamily: Fonts.Regular,
                                },
                                blackTextColor,
                              ]}>
                              {value.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 0.1,
                              justifyContent: 'center',
                              alignItems: 'flex-end',
                            }}>
                            <Text
                              style={[
                                {
                                  fontSize: RFValue(13),
                                  fontFamily: Fonts.Regular,
                                },
                                blackTextColor,
                              ]}>
                              ${value.price}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })
                : null}
            </>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Accordian;
