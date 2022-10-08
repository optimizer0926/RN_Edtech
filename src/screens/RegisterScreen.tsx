import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { userInfoProps } from "../interface/AuthInterface";
const RegisterScreen = ({ navigation }: any) => {
  const [userInfo, setUserInfo] = useState<userInfoProps>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    token: "",
  });
  //const [school, setSchool] = useState<any>("");

  const [isSecureTextEntry, SetIsSecureTextEntry] = useState(true);
  const [isSecureTextEntryCnfm, SetIsSecureTextEntryCnfm] = useState(true);

  const { isLoading, register } = useContext<any>(AuthContext);

  /* Back to login page Fn */
  const backtoLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            top: 12,
            height: hp(13),
          }}
        >
          <View
            style={{ alignItems: "center", marginTop: 25, marginBottom: 15 }}
          >
            <Image
              resizeMode="cover"
              style={{ top: 15 }}
              source={require("../../assets/images/Login/logoSm.png")}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 30, marginBottom: 25 }}
            >
              Mindfulness
            </Text>
            <Text style={{ fontSize: 30 }}> Labs</Text>
          </View>
        </View>

        <View style={{ padding: 30, marginTop: 40 }}>
          <Spinner visible={isLoading} />

          {/* Register TextImputs */}
          <View style={styles.loginInput}>
            <TextInput
              value={userInfo.firstName}
              style={{ width: "80%" }}
              placeholder="FirstName"
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, firstName: text })
              }
            />

            <Feather name="person-outline" size={26} color="#C6C6C6" />
          </View>

          <View style={styles.loginInput}>
            <TextInput
              value={userInfo.lastName}
              style={{ width: "80%" }}
              placeholder="LastName"
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, lastName: text })
              }
            />

            <Feather name="person-outline" size={26} color="#C6C6C6" />
          </View>

          <View style={styles.loginInput}>
            <TextInput
              value={userInfo.emailAddress}
              style={{ width: "80%" }}
              placeholder="Email Address"
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, emailAddress: text })
              }
            />

            <Feather name="mail-outline" size={26} color="#C6C6C6" />
          </View>

          <View style={styles.loginInput}>
            <TextInput
              value={userInfo.password}
              style={{ width: "80%" }}
              placeholder="Password"
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, password: text })
              }
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

          <View style={styles.loginInput}>
            <TextInput
              value={userInfo.confirmPassword}
              style={{ width: "80%" }}
              placeholder="Confirm Password"
              onChangeText={(text) =>
                setUserInfo({ ...userInfo, confirmPassword: text })
              }
              secureTextEntry={isSecureTextEntryCnfm}
            />
            <TouchableOpacity
              onPress={() => {
                SetIsSecureTextEntryCnfm((prev) => !prev);
              }}
            >
              {isSecureTextEntryCnfm ? (
                <Feather name="eye-off" size={26} color="#C6C6C6" />
              ) : (
                <Feather name="eye" size={26} color="#C6C6C6" />
              )}
            </TouchableOpacity>
          </View>

          {/*  commented out for now as School is not a TextInput Option in Register in BackEnd  */}

          {/* <View style={styles.loginInput}>
                     <TextInput 
                     value={school}
                     style={{ width:"80%"}} 
                     placeholder="School"
                     onChangeText={text => setSchool(text)}
                     />
                  
                     <Feather 
                        name="book-outline" 
                        size={26} 
                        color="#C6C6C6"
                       />
                     
                </View>  */}
        </View>

        <TouchableOpacity
          onPress={() => {
            register(
              userInfo.firstName,
              userInfo.lastName,
              userInfo.emailAddress,
              userInfo.password,
              userInfo.confirmPassword
            );
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/Login/loginbtn.png")}
            style={{
              width: 260,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.regtext}>Register</Text>
          </ImageBackground>
        </TouchableOpacity>

        {/* bg image */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            height: hp(20),
            zIndex: 99,
          }}
        >
          <ImageBackground
            style={{
              width: "100%",
              alignItems: "center",
            }}
            source={require("../../assets/images/Login/bg.png")}
          >
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text>Already have an account,</Text>
              <TouchableOpacity onPress={backtoLogin}>
                <Text
                  style={{ color: "#7583CA", textDecorationLine: "underline" }}
                >
                  {" "}
                  Login!
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  regtext: {
    color: "white",
    position: "relative",
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
export default RegisterScreen;
