import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";
import ActivityCardItem from "../../components/ActivityCardItem";
import CarouselCards from "../../components/CarouselCards";
import { useNavigation } from "@react-navigation/native";
import { LessonPlans } from "./AllLessonsData";
import ActivityList from "../../components/ActivitiesList";

const ActivitiesHeader: React.FC<IProps> = ({
  header,
}: IProps): JSX.Element => {
  return (
    <View>
      <View>
        <Text style={styles.titleHeading}>{header}</Text>
      </View>
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

interface IProps {
  header: string;
}

const SwitchButton: React.FC = (): JSX.Element => {
  const navigation: any = useNavigation();
  return (
    <View>
      <View style={styles.switchButton}>
        <TouchableOpacity onPress={() => navigation.navigate("Saved Lessons")}>
          <Text style={styles.switchButtonText}>Saved Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("All Lessons")}>
          <Text style={styles.switchButtonText}>All Lessons</Text>
          <View style={styles.switchButtonhorizontalLine}></View>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

const AllLessonsScreen: React.FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <SwitchButton />
      <ActivitiesHeader header="Lesson Plans" />
      <ActivityList data={LessonPlans} />
    </View>
  );
};
const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  switchButton: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switchButtonText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 5,
    paddingRight: 40,
    paddingLeft: 40,
  },
  container: {
    height: Dimensions.get("window").height,
  },
  titleHeading: {
    fontSize: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },
  horizontalLine: {
    width: Dimensions.get("window").width,
    borderBottomColor: "#dee2e6",
    borderBottomWidth: 3,
    marginBottom: 15,
  },
  switchButtonhorizontalLine: {
    width: "100%",
    borderBottomColor: "#7583CA",
    borderBottomWidth: 3,
  },
});

export default AllLessonsScreen;
