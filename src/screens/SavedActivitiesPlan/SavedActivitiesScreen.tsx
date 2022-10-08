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
import { useNavigation } from "@react-navigation/native";
import AddLessonDrawer from "../../components/AddLessonDrawer";

const SwitchButton: React.FC = (): JSX.Element => {
  const navigation: any = useNavigation();
  return (
    <View>
      <View style={styles.switchButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Saved Activities")}
        >
          <Text style={styles.switchButtonText}>Saved Activities</Text>
          <View style={styles.switchButtonhorizontalLine}></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("All Activities")}>
          <Text style={styles.switchButtonText}>All Activities</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

const SavedActivitiesScreen: React.FC = (): JSX.Element => {
  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <ScrollView style={{ marginBottom: 180 }}>
        <SwitchButton />
      </ScrollView>
      <AddLessonDrawer />
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
    paddingBottom: 10,
    paddingRight: 40,
    paddingLeft: 40,
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

export default SavedActivitiesScreen;
