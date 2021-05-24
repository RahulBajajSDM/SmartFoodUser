import colors from 'constants/colors';
import Fonts from 'constants/fonts';
import {getStyles} from 'helpers/themeStyles';
import idx from 'idx';
import React, {memo, useEffect, useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';

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

const HelpComponent = (props) => {
  const {faq} = props;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const themeReducer = useSelector((state) => state.themeReducer.theme);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);
  const {colorBackground, blackTextColor, container} = getStyles(themeReducer);
  return (
    <View style={[{flex: 1, paddingHorizontal: RFValue(20)}, colorBackground]}>
      <Text
        style={{
          fontFamily: Fonts.Regular,
          color: colors.Lgrey,
          fontSize: RFValue(17),
        }}>
        How can we help?{' '}
      </Text>
      <FlatList
        data={idx(faq, (_) => _.data) || []}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={{height: RFValue(60), flexDirection: 'row'}}
                onPress={() => {
                  setSelectedIndex(index),
                    LayoutAnimation.configureNext(CustomLayoutAnimation);
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={[
                      {
                        fontFamily: Fonts.Medium,
                        color: colors.Black,
                        fontSize: RFValue(14),
                      },
                      blackTextColor,
                    ]}>
                    {item.question}
                  </Text>
                </View>
              </TouchableOpacity>
              {index == selectedIndex && (
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts.Regular,
                      color: colors.Lgrey,
                      fontSize: RFValue(14),
                    }}>
                    {item.answer}
                  </Text>
                </View>
              )}
            </>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default memo(HelpComponent);
