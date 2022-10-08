import React from "react";
import {
  ImageStyle,
  Image,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  Dimensions,
} from "react-native";
import SearchBar from "../components/SearchBar";

const MyLessonPlansScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <SearchBar />

      <View style={styles.addLessonCardBtn}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Saved Activities")}
        >
          <Image
            style={styles.lessoncardIconPlusImg1}
            source={require("../../assets/images/lesson-plan/icon-plus-square.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "white",
    alignItems: "center",
  },
  lessoncardIconPlusImg1: {
    width: 60,
    height: 60,
  },
  addLessonCardBtn: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default MyLessonPlansScreen;
