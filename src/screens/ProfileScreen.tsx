import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  name: string;
  school: string;
  grade: string | number;
}

import { AuthContext } from "../context/AuthContext";

const ProfilePage: React.FC = ({ navigation }: any): JSX.Element => {
  //bringing Children props with Context API
  const { userInfo, isLoading } = useContext<any>(AuthContext);

  //to render Teacher userImage
  const pics = [
    {
      id: "001",
      image: require("../../assets/images/profile-page/userPic.png"),
    },
  ];

  //used FlastList to render notifications
  const [notifications, setNotes] = useState<any>([
    { note: "Meditate today during lunch.", id: "1" },
    { note: "New Article Added", id: "2" },
    { note: "Book club tomorrow at 7 pm.", id: "3" },
    { note: "Continue working on my Lesson 4.", id: "4" },
  ]);

  return (
    <View>
      {/**User info top-container section */}

      <ImageBackground
        source={require("../../assets/images/home-page/background.png")}
        resizeMode="stretch"
        style={styles.userBackground}
      >
        <View style={styles.userPicCtn}>
          {pics.map((item) => (
            <Image key={item.id} source={item.image} />
          ))}
          <View style={styles.userInfoCtn}>
            <Text style={{ fontSize: 22 }}>{userInfo.displayName}</Text>
            <Text>School:{userInfo.emailAddress}</Text>
            <Text>Grade:{userInfo.emailAddress}</Text>

            {/* Keep the Fn to display data in console.Btw,  Not sure why the button bleeds out of page in small screen  */}
            <TouchableOpacity
              style={styles.editProfile}
              onPress={() => {
                navigation.navigate("Edit-Profile");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  width: wp(20),
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/**Notification section */}
      <View style={styles.notificationBar}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            left: 20,
          }}
        >
          Notifications
        </Text>
        <Image
          source={require("../../assets/images/profile-page/icon-chevron-right.png")}
          resizeMode="cover"
        />
      </View>
      <View style={styles.horizontalLine}></View>

      <View style={styles.noteCtn}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={notifications}
          renderItem={({ item }) => (
            <View style={{ flex: 1, height: hp(5) }}>
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    left: 22,
                  }}
                >
                  <Image
                    source={require("../../assets/images/profile-page/li.png")}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 21,
                      width: wp(90),
                    }}
                  >
                    {item.note}
                  </Text>
                </View>
              </ScrollView>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userBackground: {
    height: 230,
  },
  userPicCtn: {
    display: "flex",
    flexDirection: "row",
    top: 10,
  },
  userInfoCtn: {
    marginTop: 30,
    width: wp(50),
  },
  editProfile: {
    backgroundColor: "#7583CA",
    width: "100%",
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  notificationBar: {
    height: hp(10),
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontalLine: {
    width: Dimensions.get("window").width,
    borderBottomColor: "#dee2e6",
    borderBottomWidth: 3,
    marginBottom: 15,
    bottom: 25,
  },
  noteCtn: {
    height: hp(20),
  },
});

export default ProfilePage;
