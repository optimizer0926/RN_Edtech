import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useContext, useState, FC } from "react";
import * as React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";

const LoginScreen: React.FC = ({ navigation }: any) => {
  const [loginInfo, setLoginInfo] = useState({
    emailAddress: "",
    password: "",
  });

  const [isSecureTextEntry, SetIsSecureTextEntry] = useState(true);

  const { isLoading, login } = useContext<any>(AuthContext);

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "white",
          height: Dimensions.get("window").height,
          paddingTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            top: 10,
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
        <View style={{ marginTop: 30 }}>
          <View style={{ justifyContent: "center", top: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 20, color: "grey" }}>
              Please log in to your account
            </Text>
          </View>

          {/* TextInput for Login */}
          <View style={{ padding: 30 }}>
            <Spinner visible={isLoading} />

            <View style={styles.loginInput}>
              <TextInput
                value={loginInfo.emailAddress}
                style={{ width: "90%" }}
                placeholder="Email Address"
                onChangeText={(text) => {
                  setLoginInfo({ ...loginInfo, emailAddress: text });
                }}
              />
              <Feather name="mail-outline" size={26} color="#C6C6C6" />
            </View>
            <View style={styles.loginInput}>
              <TextInput
                value={loginInfo.password}
                style={{ width: "90%" }}
                placeholder="password"
                onChangeText={(text) => {
                  setLoginInfo({ ...loginInfo, password: text });
                }}
                secureTextEntry={isSecureTextEntry}
              />
              <TouchableOpacity
                onPress={() => {
                  SetIsSecureTextEntry((prev) => !prev);
                }}
              >
                {isSecureTextEntry ? (
                  <Feather name="eye-off" size={26} color="#C6C6C6" />
                ) : (
                  <Feather name="eye" size={26} color="#C6C6C6" />
                )}
              </TouchableOpacity>
            </View>

            {/* Login button */}

            <TouchableOpacity
              style={{ position: "relative", alignItems: "center" }}
              onPress={() => {
                login(loginInfo);
              }}
            >
              <ImageBackground
                source={require("../../assets/images/Login/loginbtn.png")}
                style={{
                  width: 320,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.Logintext}>LOGIN</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* Forget pass Or login with */}
          <TouchableOpacity>
            <Text
              style={{
                textAlign: "right",
                paddingRight: 20,
                color: "#7583CA",
                marginRight: 20,
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              padding: 25,
              color: "grey",
              bottom: 15,
            }}
          >
            or log in with
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: hp(10),
              bottom: 25,
            }}
          >
            <TouchableOpacity>
              <Image source={require("../../assets/images/Login/gmail.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={require("../../assets/images/Login/apple.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/Login/outlook.png")}
              />
            </TouchableOpacity>
          </View>

          {/* Route to register form */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              bottom: 15,
            }}
          >
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{ color: "#7583CA", textDecorationLine: "underline" }}
              >
                Register now
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              bottom: 10,
              top: 5,
            }}
          >
            <Text>By signing up, you agree with our</Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#7583CA",
                  textDecorationLine: "underline",
                  marginBottom: 20,
                }}
              >
                {" "}
                Terms and conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  Logintext: {
    color: "white",
    fontSize: 15,
  },
  loginInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: "5%",
  },
});
export default LoginScreen;
