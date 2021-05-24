// import SpinnerLoader from 'components/common/spinnerLoader';
import * as Images from "assets";
import React from "react";
import { Image, Text, View, TouchableOpacity, Platform } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import IconsFa from "react-native-vector-icons/FontAwesome";
import colors from "constants/colors";
import idx from "idx";
import ImageComponent from "components/Common/imageComponent";

const SettingHeader = (props) => {
  const { userData, editProfile, allLastorders } = props;
  console.log("userProfileImage", JSON.stringify(userData));
  return (
    <View
      style={{
        flex: 0.15,
        paddingHorizontal: RFValue(20),
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 0.25,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: RFValue(75),
            width: RFValue(75),
            borderRadius: RFPercentage(100),
            overflow: "hidden",
            borderWidth: 5,
            borderColor: colors.Background,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageComponent
            styles={{ height: RFValue(65), width: RFValue(70) }}
            resizeMode={"stretch"}
            uri={idx(userData, (_) => _.data.profile_image)}
          />
        </View>
        <View
          style={{
            height: RFValue(20),
            width: RFValue(20),
            borderRadius: RFPercentage(100),
            backgroundColor: colors.White,
            position: "absolute",
            bottom: RFValue(0),
            alignSelf: "center",
            // right: RFValue(40),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconsFa name={"pencil"} size={RFValue(10)} />
        </View>
        <View
          style={{
            height: RFValue(20),
            width: RFValue(20),
            borderRadius: RFPercentage(100),
            backgroundColor: colors.Green,
            position: "absolute",
            top: RFValue(10),
            alignSelf: "center",
            right: RFValue(5),
            borderWidth: 5,
            borderColor: colors.White,
          }}
        ></View>
      </View>
      <View style={{ flex: 0.7 }}>
        <View
          style={{
            flex: 0.34,
            flexDirection: "row",
            // ,
          }}
        >
          <View
            style={{
              flex: 0.6,
              justifyContent: "center",
              paddingLeft: RFValue(10),
            }}
          >
            <Text
              style={{
                fontSize: RFValue(14),
                color: colors.Green,
                fontWeight: "bold",
              }}
            >
              {idx(userData, (_) => _.data.firstname)}
            </Text>
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: RFValue(13),
                color: colors.Lgrey,
                fontWeight: "bold",
                paddingLeft: RFValue(25),
              }}
            >
              Orders
            </Text>
          </View>

          {/*
           */}
        </View>
        <View style={{ flex: 0.34, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.6,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 0.2 }}>
              <Image source={Images.NewPhone} resizeMode="contain" />
            </View>
            <View style={{ flex: 0.8, paddingLeft: RFValue(10) }}>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: colors.Lgrey,
                  fontWeight: "bold",
                }}
              >
                {idx(userData, (_) => _.data.phone)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  editProfile();
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: colors.Lgrey,
                    fontWeight: "bold",
                  }}
                >
                  Device: {Platform.OS}
                </Text>
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: colors.Blue,
                    fontWeight: "bold",
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            {/*
             */}
          </View>
          <View
            style={{
              flex: 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: RFValue(12),
                color: colors.LGreen,
                fontWeight: "bold",
              }}
            >
              {allLastorders && allLastorders.length}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
            paddingLeft: RFValue(5),
            alignItems: "center",
          }}
        >
          <Image source={Images.Send} resizeMode="contain" />
          <Text
            style={{
              fontSize: RFValue(12),
              color: colors.Blue,
              fontWeight: "bold",
              paddingLeft: RFValue(10),
            }}
          >
            {idx(userData, (_) => _.data.email)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SettingHeader;
