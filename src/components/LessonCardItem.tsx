import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ImageBackground,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from "react-native";
import { IDataObjProps, IDataProps } from "../interface/CardInterface";
import BookmarkButton from "./BookmarkButton";

export const newLessonCardItemData: IDataProps[] = [
  {
    title: "Lesson Plan",
    id: 101,
    description: "Relationship Skills",
    length: "Length: 1 1/2 hours",
    imgUrl: require("../../assets/images/lesson-plan/lesson-plan-image.png"),
    colorUrl: require("../../assets/images/lesson-plan/blue-b.png"),
    saved: false,
  },
  {
    title: "Lesson Plan",
    id: 102,
    description: "Self Awareness",
    length: "Length: 45 minutes",
    imgUrl: require("../../assets/images/lesson-plan/lesson-plan-image.png"),
    colorUrl: require("../../assets/images/lesson-plan/purple-b.png"),
    saved: true,
  },
  {
    title: "Lesson Plan",
    id: 103,
    description: "Social Awareness",
    length: "Length: 20 minutes",
    imgUrl: require("../../assets/images/lesson-plan/lesson-plan-image.png"),
    colorUrl: require("../../assets/images/lesson-plan/yellow-b.png"),
    saved: true,
  },
  {
    title: "Lesson Plan",
    id: 104,
    description: "Decision Making ",
    length: "Length: 45 minutes",
    imgUrl: require("../../assets/images/lesson-plan/lesson-plan-image.png"),
    colorUrl: require("../../assets/images/lesson-plan/green-b.png"),
    saved: true,
  },
  {
    title: "Lesson Plan",
    id: 105,
    description: "Self Management",
    length: "Length: 45 minutes",
    imgUrl: require("../../assets/images/lesson-plan/lesson-plan-image.png"),
    colorUrl: require("../../assets/images/lesson-plan/peach-b.png"),
    saved: true,
  },
];

const LessonCardItem: React.FC<IDataObjProps> = ({
  item,
}: IDataObjProps): JSX.Element => {
  return (
    <View style={{ marginLeft: 10 }}>
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
            <View style={{ position: "absolute", left: 125, bottom: 25 }}>
              <BookmarkButton />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                marginTop: 5,
                marginBottom: 2,
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "white", fontSize: 10, lineHeight: 12 }}>
              {item.description}
            </Text>
            <Text style={{ color: "white", fontSize: 10, top: 45 }}>
              {item.length}
            </Text>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  image: {
    width: 183,
    height: 200,
    position: "relative",
    right: 15,
    alignItems: "flex-end",
    overflow: "hidden",
  },
  color: {
    width: 164,
    minHeight: 105,
    position: "relative",
    right: 9,
    top: 90,
    borderRadius: 10,
  },
});
export default LessonCardItem;
