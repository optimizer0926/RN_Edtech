import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { userInfoProps } from "../interface/AuthInterface";

export default function EditProfile() {
  const { editSubmit, userInfo, isLoading } = useContext<any>(AuthContext);
  // const [userInfo, setUserInfo] = useState<userInfoProps>({
  //   firstName: "",
  //   lastName: "",
  //   emailAddress: "",
  //   password: "",
  //   confirmPassword: "",
  //   token: "",
  // });
  const [firstName, setFirstName] = useState<string>(userInfo.firstName);
  const [lastName, setLastName] = useState<string>(userInfo.lastName);

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setFirstName(userInfo.lastName);
  }, []);

  //to render Teacher userImage
  /*    const pics = [
        {
          id: "001",
          image: require("../../assets/images/profile-page/userPic.png"),
        },
      ]; */

  return (
    <View style={styles.pageCtr}>
      <View style={{ alignItems: "center", top: 50 }}>
        <TextInput
          value={firstName}
          style={styles.text}
          placeholder="First Name"
          onChangeText={
            (text) => {
              setFirstName({ ...userInfo, firstName: text });
            }
            //  { setFirstName(text)}
          }
        />

        <TextInput
          value={lastName}
          style={styles.text}
          placeholder="Last Name"
          onChangeText={
            (text) => {
              setLastName({ ...userInfo, lastName: text });
            }
            // { setLastName(text)}
          }
        />

        <TouchableOpacity
          style={styles.editProfile}
          onPress={() => {
            editSubmit(firstName, lastName);
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              width: wp(20),
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            Save
          </Text>
        </TouchableOpacity>

        <Image
          style={{ opacity: 0.8, top: 70 }}
          resizeMode="stretch"
          source={require("../../assets/images/Login/bg.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageCtr: {
    backgroundColor: "white",
    height: "100%",
  },
  text: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    height: 40,
    marginBottom: 30,
    borderColor: "#C6C6C6",
  },
  editProfile: {
    backgroundColor: "#7583CA",
    width: "80%",
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
});
