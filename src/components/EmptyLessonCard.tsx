import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ImageBackground,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";

const EmptyLessonCard: React.FC = (): JSX.Element => {
  return (
    <View>
      <ImageBackground
        style={styles.lessoncardBackgroundImg1}
        source={require("../../assets/images/lesson-plan/Group.png")}
      >
        <Text style={styles.title}>Title </Text>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.description}>Length</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  lessoncardBackgroundImg1: {
    width: 180,
    height: 120,
  },
  title: {
    color: "white",
    width: 330,
    height: 25,
    fontSize: 16,
    fontFamily: "Inter",
    top: 20,
    left: 18,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    width: 330,
    height: 15,
    fontSize: 10,
    fontFamily: "Inter",
    top: 18,
    left: 18,
    lineHeight: 18,
  },
});
export default EmptyLessonCard;
