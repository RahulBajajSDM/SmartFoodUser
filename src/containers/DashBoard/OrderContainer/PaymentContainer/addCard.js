/* eslint-disable module-resolver/use-alias */
import { popTo } from "actions/appActions/AppActions";
import {
  addNewCard,
  getAllCards,
  removeCard,
  selectedCard,
} from "actions/paymentAction";
import * as Images from "assets";
import Button from "components/Common/buttonComponent";
import EmptyComponent from "components/Common/emptyComponent";
import TextInputComponent from "components/Common/textInput";
import { default as colors, default as Colors } from "constants/colors";
import Fonts from "constants/fonts";
import * as Validator from "helpers/combinedValidators";
import { getStyles } from "helpers/themeStyles";
import _ from "lodash";
import React, { Component } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import Icons from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import stripe from "tipsi-stripe";
import CardType from "../../../../utils/CardType";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      expiry: "",
      cardnum: "",
      cvv: "",
      buttonStatus: "",
      selectedIndex: 0,
      cardToken: null,
      generatingToken: false,
    };
  }

  componentDidMount = () => {
    const { selectedCard, allCards, method } = this.props;
    let defaultCard = allCards && allCards[0];
    selectedCard(defaultCard);
  };

  generateToken = () => {
    const { cardnum, cvv } = this.state;
    const params = {
      // mandatory
      number: cardnum,
      expMonth: 11,
      expYear: 25,
      cvc: cvv,
    };
    const token = stripe.createTokenWithCard(params);
    return token;
  };

  formatExpiry = (expiry) => {
    const removeNonNumber = (string = "") => string.replace(/[^\d]/g, "");
    const limitLength = (string = "", maxLength) => string.substr(0, maxLength);
    const sanitized = limitLength(removeNonNumber(expiry), 4);

    if (sanitized.match(/^[2-9]$/)) {
      return `0${sanitized}`;
    }
    if (sanitized.length > 2) {
      return `${sanitized.substr(0, 2)}/${sanitized.substr(
        2,
        sanitized.length
      )}`;
    }
    return sanitized;
  };
  setExpiry = (expiry) => {
    let formattedExpiry = this.formatExpiry(expiry);
    this.setState({ expiry: formattedExpiry });
  };

  setCard = (value) => {
    this.setState({ cardnum: value });
  };

  setCvv = (value) => {
    this.setState({ cvv: value });
  };

  setButtonStatus = (value) => {
    this.setState({ buttonStatus: value });
  };

  addNewCard = async () => {
    const { addNewCard } = this.props;
    const { cardnum, cvv, expiry } = this.state;
    let cardYear = expiry && expiry.split("/")[1];
    let cardMonth = expiry && expiry.split("/")[0];

    let enableSubmission = Validator.CardValidations(
      cardnum,
      cardYear,
      cardMonth,
      cvv
    );
    if (enableSubmission) {
      this.setState({ generatingToken: true });
      let token = await this.generateToken();
      this.setState({ generatingToken: false });

      addNewCard({ token: token && token.tokenId });
      this.setState({
        expiry: "",
        cardnum: "",
        cvv: "",
      });
    }
  };

  deleteCard = (cardId) => {
    const { removeCard } = this.props;
    removeCard(cardId);
  };

  selectCard = (item, index) => {
    const { selectedCard } = this.props;
    this.setState({ selectedIndex: index });
    selectedCard(item);
  };

  proceed = _.debounce(() => {
    const { popTo, componentStats } = this.props;
    popTo(componentStats && componentStats.CartContainer);
  });

  render() {
    const { expiry, cardnum, cvv, selectedIndex, generatingToken } = this.state;
    const {
      method,
      addingCard,
      gettingCard,
      removingCard,
      allCards,
      theme,
    } = this.props;
    const { colorBackground, blackTextColor } = getStyles(theme);

    return (
      <View
        style={[{ flex: 1, paddingHorizontal: RFValue(20) }, colorBackground]}
      >
        <View
          style={{
            height: RFValue(40),
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              {
                fontSize: RFValue(17),
                fontFamily: Fonts.Medium,
                color: colors.Grey,
              },
              blackTextColor,
            ]}
          >
            {method == 1 ? "PayPal" : "Stripe"}
          </Text>
        </View>
        <View style={{ height: RFValue(80) }}>
          <TextInputComponent
            placeholder={"Card Number"}
            onChangeText={this.setCard}
            value={cardnum}
            validationType={"card"}
            buttonStatus={this.setButtonStatus}
            autoCapitalize={"none"}
            disabled={addingCard}
            icon={Images.Envelope}
            maxLength={16}
            blackTextColor={blackTextColor}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            height: RFValue(80),
          }}
        >
          <View style={{ flex: 0.5 }}>
            <TextInputComponent
              placeholder={"Expiry"}
              onChangeText={this.setExpiry}
              value={expiry}
              validationType={"name"}
              buttonStatus={this.setButtonStatus}
              autoCapitalize={"none"}
              disabled={addingCard}
              icon={Images.Envelope}
              keyboardType={"numeric"}
              maxLength={5}
              blackTextColor={blackTextColor}
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <TextInputComponent
              placeholder={"Cvv"}
              onChangeText={this.setCvv}
              value={cvv}
              validationType={"cvv"}
              buttonStatus={this.setButtonStatus}
              autoCapitalize={"none"}
              disabled={addingCard}
              icon={Images.Envelope}
              maxLength={3}
              blackTextColor={blackTextColor}
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <Button
          title={"Add Card"}
          loading={addingCard || generatingToken}
          disabled={addingCard || generatingToken}
          onPress={() => this.addNewCard()}
          containerHeight={RFValue(80)}
          justifyContent={"flex-end"}
        />
        <View style={{ height: RFPercentage(55) }}>
          <View style={{ flex: 0.1, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: RFValue(17),
                fontFamily: Fonts.Medium,
                color: colors.Grey,
              }}
            >
              Added Cards
            </Text>
          </View>
          <View style={{ flex: 0.65 }}>
            {removingCard || gettingCard ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            ) : (
              <FlatList
                data={allCards}
                contentContainerStyle={{ width: "100%", flexGrow: 1 }}
                ListEmptyComponent={() => (
                  <EmptyComponent
                    title={"No cards added."}
                    icon={"credit-card"}
                    color={Colors.Primary}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.cardHolder}>
                      <View style={styles.creditCard}>
                        <View style={{ flex: 0.05 }} />
                        <TouchableOpacity
                          onPress={() => {
                            this.selectCard(item, index);
                          }}
                          style={styles.cardNumberHolder}
                        >
                          <View
                            style={{ flex: 0.15, justifyContent: "center" }}
                          >
                            <CheckBox
                              disabled={true}
                              checkedIcon="dot-circle-o"
                              uncheckedIcon="circle-o"
                              checked={selectedIndex == index ? true : false}
                              right={true}
                              size={RFValue(15)}
                              checkedColor={Colors.Primary}
                              uncheckedColor={Colors.Lgrey}
                            />
                          </View>
                          <View style={{ flex: 0.2, justifyContent: "center" }}>
                            <Image
                              source={CardType(_.lowerCase(item.brand))}
                              style={{
                                width: RFValue(26),
                                height: RFValue(18),
                              }}
                            />
                          </View>
                          <View
                            style={{
                              flex: 0.65,
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Text style={[styles.cardType, blackTextColor]}>
                              {item.brand}
                            </Text>
                            <Text style={[styles.secret, blackTextColor]}>
                              ********{item.last4}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.deleteCard(item.id)}
                          style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 999,
                          }}
                        >
                          <Icons
                            name="trash"
                            size={RFValue(20)}
                            color={colors.Primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
          <View
            style={{
              flex: 0.2,
              // backgroundColor: "#000",
              // justifyContent: "center",
            }}
          >
            <Button
              title={"Proceed"}
              //   loading={addingCard}
              disabled={addingCard}
              onPress={this.proceed}
              justifyContent={"flex-end"}
            />
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    addingCard: state.paymentReducer.addingCard,
    gettingCard: state.paymentReducer.gettingCard,
    removingCard: state.paymentReducer.removingCard,
    allCards: state.paymentReducer.allCards,
    componentStats: state.componentStats.componentStats,
    theme: state.themeReducer.theme,
  };
}

export default connect(mapStateToProps, {
  addNewCard,
  getAllCards,
  removeCard,
  selectedCard,
  popTo,
})(AddCard);

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(14),
    color: colors.GREY,
    fontFamily: Fonts.REGULAR,
  },

  subTitleText: {
    fontSize: RFValue(25),
    color: colors.DGREY,
    fontFamily: Fonts.MEDIUM,
  },
  card: { flex: 0.8, paddingTop: RFValue(10) },
  cardHolder: {
    height: RFValue(80),
    alignItems: "center",
    justifyContent: "center",
  },
  creditCard: {
    height: RFValue(70),

    width: "100%",
    borderRadius: RFValue(10),
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: colors.Primary,
  },

  cardNumberHolder: {
    flex: 0.8,
    justifyContent: "center",
    flexDirection: "row",
  },
  cardType: {
    fontSize: RFValue(15),
    fontFamily: Fonts.Regular,
  },
  secret: {
    fontSize: RFValue(12),
    fontFamily: Fonts.Regular,
    color: colors.GREY,
  },
  addCardText: {
    fontSize: RFValue(15),
    fontFamily: Fonts.MEDIUM,
    color: colors.DGREY,
    paddingLeft: RFValue(10),
  },
  button: { flex: 0.1 },
  imageHolder: {
    height: RFValue(20),
    width: RFValue(20),
  },
});
