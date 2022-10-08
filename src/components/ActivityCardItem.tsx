import React, { FC, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import {
  ImageBackground,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IDataProps, ActivityItemProp } from "../interface/CardInterface";
import BookmarkButton from "./BookmarkButton";
import { ActivityLessonSelectContext } from "../context/ActivityLessonSelectContext";
import { ActivityLessonSelectContextProps } from "../interface/ContextInterface";

// used to determine which bottom color to use based on type of plan (description key)
export const colorURL = (description: string) => {
  switch (description) {
    case "Decision Making":
      return require("../../assets/images/activity-plan/green-s.png");
    case "Relationship Skills":
      return require("../../assets/images/activity-plan/blue-s.png");
    case "Social Awareness":
      return require("../../assets/images/activity-plan/yellow-s.png");
    case "Self Management":
      return require("../../assets/images/activity-plan/peach-s.png");
    case "Self Awareness":
      return require("../../assets/images/activity-plan/purple-s.png");
    default:
      return;
  }
};
export const activityCardItemData: IDataProps[] = [
  {
    title: "Group Share",
    id: 101,
    description: "Decision Making",
    length: "Length: 20 minutes",
    imgUrl: require("../../assets/images/activity-plan/activity-plan-2.png"),
    colorUrl: colorURL("Decision Making"),
    saved: true,
  },
  {
    title: "Reflections",
    id: 102,
    description: "Relationship Skills",
    length: "Length: 20 minutes",
    imgUrl: require("../../assets/images/activity-plan/activity-plan-4.png"),
    colorUrl: colorURL("Relationship Skills"),
    saved: false,
  },
  {
    title: "Lab Activity",
    id: 103,
    description: "Social Awareness",
    length: "Length: 30 minutes",
    imgUrl: require("../../assets/images/activity-plan/activity-plan-1.png"),
    colorUrl: colorURL("Social Awareness"),
    saved: true,
  },
  {
    title: "Mindful Practices",
    id: 104,
    description: "Relationship Skills",
    length: "Length: 20 minutes",
    imgUrl: require("../../assets/images/activity-plan/activity-plan-4.png"),
    colorUrl: colorURL("Relationship Skills"),
    saved: false,
  },
  {
    title: "Motivation Moment",
    id: 105,
    description: "Social Awareness",
    length: "Length: 30 minutes",
    imgUrl: require("../../assets/images/activity-plan/activity-plan-1.png"),
    colorUrl: colorURL("Social Awareness"),
    saved: true,
  },
  {
    title: "Vocabulary Chart",
    id: 106,
    description: "Self Awareness",
    length: "Length: 30 minutes",
    imgUrl: require("../../assets/images/activity-plan/activity-plan-1.png"),
    colorUrl: colorURL("Self Awareness"),
    saved: true,
  },
];

const ActivityCardItem: React.FC<ActivityItemProp> = ({
  item,
}: ActivityItemProp): JSX.Element => {
  const { addActivity, removeActivity, selectedPlan } =
    useContext<ActivityLessonSelectContextProps>(ActivityLessonSelectContext);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (selectedPlan.includes(item)) {
            removeActivity(item);
          } else {
            addActivity(item);
          }
        }}
      >
        <ImageBackground
          source={item.imgUrl}
          style={styles.image}
          resizeMode="stretch"
        >
          <ImageBackground
            source={item.colorUrl}
            style={styles.color}
            resizeMode="stretch"
          >
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  marginTop: 2,
                  marginBottom: 5,
                }}
              >
                {item.title}
              </Text>
              <Text style={styles.text2}>
                {item.description}
                {"\n"}
                {item.length}
              </Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </TouchableOpacity>
      <View style={styles.text1}>
        <BookmarkButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  image: {
    width: 183,
    height: 220,
    position: "relative",
    right: 15,
    alignItems: "flex-end",
    overflow: "hidden",
    marginLeft: 10,
  },
  color: {
    width: 164,
    minHeight: 60,
    position: "relative",
    right: 9,
    top: 150,
    borderRadius: 10,
  },
  text1: {
    position: "absolute",
    left: 140,
    bottom: 35,
    alignSelf: "center",
  },
  text2: {
    color: "white",
    fontSize: 10,
    lineHeight: 12,
  },
});
export default ActivityCardItem;
