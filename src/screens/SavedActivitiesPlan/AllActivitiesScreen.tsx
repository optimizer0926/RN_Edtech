import React, { useContext } from "react";
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
import CarouselCards from "../../components/CarouselCards";
import {
  selfManagement,
  decisionMaking,
  socialAwareness,
  selfAwareness,
  relationshipSkills,
} from "./AllActivitesData";
import AddLessonDrawer from "../../components/AddLessonDrawer";
import { useNavigation } from "@react-navigation/native";

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
        <TouchableOpacity
          onPress={() => navigation.navigate("Saved Activities")}
        >
          <Text style={styles.switchButtonText}>Saved Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("All Activities")}>
          <Text style={styles.switchButtonText}>All Activities</Text>
          <View style={styles.switchButtonhorizontalLine}></View>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

const AllActivitiesScreen: React.FC = (): JSX.Element => {
  return (
    <View style={{ height: Dimensions.get("window").height }}>
      <SwitchButton />
      <ScrollView style={{ marginBottom: 180 }}>
        <ActivitiesHeader header="Self-Awareness" />
        <View style={styles.container}>
          {<CarouselCards data={selfAwareness} />}
        </View>
        <ActivitiesHeader header="Social-Awareness" />
        <View style={styles.container}>
          {<CarouselCards data={socialAwareness} />}
        </View>
        <ActivitiesHeader header="Relationship Skills" />
        <View style={styles.container}>
          {<CarouselCards data={relationshipSkills} />}
        </View>
        <ActivitiesHeader header="Decision-Making" />
        <View style={styles.container}>
          {<CarouselCards data={decisionMaking} />}
        </View>
        <ActivitiesHeader header="Self-Management" />
        <View style={styles.container}>
          {<CarouselCards data={selfManagement} />}
        </View>
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
    paddingBottom: 5,
    paddingRight: 40,
    paddingLeft: 40,
  },
  container: {
    marginLeft: 20,
    marginBottom: 10,
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

export default AllActivitiesScreen;
