import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const UserTypeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={{ backgroundColor: "white", height: hp(100) }}>
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "space-evenly",
          height: hp(100),
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "20%",
            height: hp(13),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              resizeMode="cover"
              source={require("../../assets/images/Login/logoSm.png")}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>
              Mindfulness
            </Text>
            <Text style={{ fontSize: 30 }}> Labs</Text>
          </View>
        </View>

        <View style={styles.userType}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Image
              resizeMode="cover"
              source={require("../../assets/images/Login/box.png")}
            />
            <Text style={styles.text}>Teacher</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Image
              resizeMode="cover"
              source={require("../../assets/images/Login/box.png")}
            />
            <Text style={styles.text}>Guardian</Text>
          </TouchableOpacity>
        </View>
        <Image
          resizeMode="cover"
          source={require("../../assets/images/Login/bg.png")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userType: {
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    top: "40%",
    left: "33%",
  },
});
export default UserTypeScreen;
