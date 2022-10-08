import {
  NavigationAction,
  NavigatorScreenParams,
} from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Dimensions,
  TouchableOpacity,
} from "react-native";

function LessonPlanHeading({ heading, route }: IProps): JSX.Element {
  return (
    <View>
      <View style={styles.titleHeadingContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.titleHeading}>{heading}</Text>
          <TouchableOpacity onPress={route}>
            <Text style={styles.seeAllBtn}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.horizontalLine}></View>
    </View>
  );
}

interface IProps {
  heading: string;
  route: () => void;
}

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  titleHeading: {
    fontSize: 20,
    paddingBottom: 8,
    width: Dimensions.get("window").width,
    overflow: "hidden",
    color: "#495057",
    fontFamily: "Inter",
  },
  titleHeadingContainer: {
    padding: 24,
    marginTop: 15,
    paddingBottom: 0,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalLine: {
    width: Dimensions.get("window").width,
    borderBottomColor: "#dee2e6",
    borderBottomWidth: 3,
    marginBottom: 15,
  },
  seeAllBtn: {
    right: Dimensions.get("window").width * 0.22,
    color: "#495057",
    fontFamily: "Inter",
  },
});

export default LessonPlanHeading;
