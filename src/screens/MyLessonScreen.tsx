import { useState } from "react";
import {
  Image,
  TouchableOpacity,
  ScrollView,
  ImageStyle,
  TextStyle,
  ViewStyle,
  Text,
  Dimensions,
} from "react-native";
import { View, StyleSheet } from "react-native";
import { activityCardItemData } from "../components/ActivityCardItem";
import { newLessonCardItemData } from "../components/LessonCardItem";
import CarouselCards from "../components/CarouselCards";
import LessonPlanHeading from "../components/LessonPlanHeading";
import EmptyLessonCard from "../components/EmptyLessonCard";
import ModalDropdown from "react-native-modal-dropdown";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import LessonCarouselCards from "../components/LessonCarouselCards";
import AddLessonDrawer from "../components/AddLessonDrawer";

const MyLessonScreen: React.FC = ({ navigation }: any): JSX.Element => {
  const [selected, setSelected] = useState<string>("Class");
  const classes: string[] = ["3rd Grade - '21", "3rd Grade - '20"];

  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <ScrollView style={{ marginBottom: 180 }}>
        <View style={styles.classSelect}>
          <View style={styles.filterBox}>
            <ModalDropdown
              options={classes}
              style={styles.dropdownBoxStyle}
              dropdownStyle={styles.dropdownStyle}
              onSelect={(index, value) => setSelected(value)}
              dropdownTextStyle={styles.dropdownTextStyle}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View style={styles.dropdownContainer}>
                  <Octicons name="chevron-down" size={18} color="black" />
                </View>
                <Text style={styles.defaultText}>{selected}</Text>
              </View>
            </ModalDropdown>
          </View>
        </View>

        <View>
          <LessonPlanHeading
            heading="My Lessons Plans"
            route={() => navigation.navigate("My Lesson Plans")}
          />
          <View style={styles.lessonCardContainer}>
            <EmptyLessonCard />
            <EmptyLessonCard />
          </View>

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

        <View>
          <LessonPlanHeading
            heading="Saved Lessons Plans"
            route={() => navigation.navigate("Saved Lessons")}
          />
          <View style={{ marginBottom: 40, marginLeft: 20 }}>
            <LessonCarouselCards data={newLessonCardItemData} />
          </View>
        </View>

        <View>
          <LessonPlanHeading
            heading="Saved Activities Plans"
            route={() => navigation.navigate("Saved Activities")}
          />
          <View style={{ marginBottom: 40, marginLeft: 20 }}>
            <CarouselCards data={activityCardItemData} />
          </View>
        </View>
      </ScrollView>
      <AddLessonDrawer />
    </View>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  lessoncardIconPlusImg1: {
    width: 60,
    height: 60,
  },
  addLessonCardBtn: {
    alignItems: "center",
    marginTop: 20,
  },
  seeAllText: {
    fontSize: 20,
    borderColor: "black",
    left: 50,
    flex: 1,
    marginLeft: 50,
    position: "absolute",
  },
  lessonPlanText: {
    fontSize: 20,
    borderColor: "black",
    fontFamily: "Inter",
    marginRight: 50,
  },
  classSelect: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  lessonCardContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  defaultText: {
    fontSize: 15,
  },
  dropdownStyle: {
    width: 220,
    height: 75,
    backgroundColor: "#EFF0F6",
  },
  dropdownBoxStyle: {
    width: 220,
    height: 40,
    backgroundColor: "#EFF0F6",
    justifyContent: "center",
  },
  dropdownContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    justfyContent: "center",
    alignItems: "center",
  },
  dropdownTextStyle: {
    backgroundColor: "#EFF0F6",
    color: "black",
    marginLeft: 10,
    fontSize: 15,
  },
});

export default MyLessonScreen;
