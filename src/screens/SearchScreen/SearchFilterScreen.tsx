import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Dimensions,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
  FlatList,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import ModalDropdown from "react-native-modal-dropdown";
import { Octicons } from "@expo/vector-icons";
import ActivitiesData from "./ActivitiesData";
import ActivityCardItem from "../../components/ActivityCardItem";
import ActivitiesList from "../../components/ActivitiesList";
import { SearchFilterContext } from "../../context/SearchFilterContext";
import { IDataProps } from "../../interface/CardInterface";
import { SearchContext } from "../../interface/ContextInterface";

const SearchFilterScreen: React.FC = (): JSX.Element => {
  const { activitiesFilters, domainFilters, updateSearchFilter } =
    useContext<SearchContext>(SearchFilterContext);

  // toggle between activity and lesson tab
  const [filterButton, setFilterButton] = useState<filterButtonProps>({
    activitiesButton: true,
    lessonPlansButton: false,
  });

  let newData: IDataProps[];
  useEffect(() => {
    newData = ActivitiesData.filter(
      (activities) =>
        activities.title === activitiesFilters &&
        activities.description === domainFilters
    );
    setFilteredComponent(
      <ActivitiesList data={newData} item={ActivityCardItem} />
    );
  }, [activitiesFilters, domainFilters]);

  const [filteredComponent, setFilteredComponent] = useState(
    <ActivitiesList data={ActivitiesData} item={ActivityCardItem} />
  );

  useEffect(() => {
    if (activitiesFilters === "View All" && domainFilters === "View All") {
      setFilteredComponent(
        <ActivitiesList data={ActivitiesData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "Lab Activity" &&
      domainFilters === "View All"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.title === "Lab Activity"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "Reflections" &&
      domainFilters === "View All"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.title === "Reflections"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "Group Share" &&
      domainFilters === "View All"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.title === "Group Share"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "Mindful Practice" &&
      domainFilters === "View All"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.title === "Mindful Practice"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "Motivation Moment" &&
      domainFilters === "View All"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.title === "Motivation Moment"
      );
      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "Vocabulary Chart" &&
      domainFilters === "View All"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.title === "Vocabulary Chart"
      );
      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "View All" &&
      domainFilters === "Self Awareness"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.description === "Self Awareness"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "View All" &&
      domainFilters === "Relationship Skills"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.description === "Relationship Skills"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "View All" &&
      domainFilters === "Social Awareness"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.description === "Social Awareness"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "View All" &&
      domainFilters === "Decision Making"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.description === "Decision Making"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    } else if (
      activitiesFilters === "View All" &&
      domainFilters === "Self Management"
    ) {
      let newData = ActivitiesData.filter(
        (activities) => activities.description === "Self Management"
      );

      setFilteredComponent(
        <ActivitiesList data={newData} item={ActivityCardItem} />
      );
    }
  }, [activitiesFilters, domainFilters]);

  interface filterButtonProps {
    activitiesButton: boolean;
    lessonPlansButton: boolean;
  }

  const activitiesFilter: string[] = [
    "Lab Activity",
    "Reflections",
    "Group Share",
    "Mindful Practice",
    "Motivation Moment",
    "Vocabulary Chart",
    "Activities View All",
  ];

  const domainFilter: string[] = [
    "Self Awareness",
    "Relationship Skills",
    "Social Awareness",
    "Decision Making",
    "Self Management",
    "Cultral Responsiveness",
    "Domains View All",
  ];

  const handleActivityButton = () => {
    setFilterButton({
      ...filterButton,
      activitiesButton: true,
      lessonPlansButton: false,
    });
  };

  const handleLessonPlanButton = () => {
    setFilterButton({
      ...filterButton,
      activitiesButton: false,
      lessonPlansButton: true,
    });
  };

  const SwitchButton: React.FC = (): JSX.Element => {
    return (
      <View>
        <View style={styles.switchButton}>
          <TouchableOpacity onPress={handleActivityButton}>
            <Text style={styles.switchButtonText}>Activities</Text>
            {filterButton.activitiesButton == true ? (
              <View style={styles.switchButtonhorizontalLine}></View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLessonPlanButton}>
            <Text style={styles.switchButtonText}>Lesson Plans</Text>
            {filterButton.lessonPlansButton == true ? (
              <View style={styles.switchButtonhorizontalLine}></View>
            ) : null}
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine}></View>
      </View>
    );
  };

  return (
    <View>
      <SearchBar />
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          <ModalDropdown
            options={activitiesFilter}
            style={styles.dropdownBoxStyle}
            dropdownStyle={styles.dropdownStyle}
            onSelect={(index, value) => {
              updateSearchFilter(value);
            }}
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
              <Text style={styles.defaultText}>{activitiesFilters}</Text>
            </View>
          </ModalDropdown>
        </View>

        <View style={styles.filterBox}>
          <ModalDropdown
            options={domainFilter}
            style={styles.dropdownBoxStyle}
            dropdownStyle={styles.dropdownStyle}
            onSelect={(index, value) => {
              updateSearchFilter(value);
            }}
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
              <Text style={styles.defaultText}>{domainFilters}</Text>
            </View>
          </ModalDropdown>
        </View>
      </View>

      <View style={styles.pillFilterContainer}>
        <TouchableOpacity style={styles.pillBtn}>
          <Text style={styles.pillBtnText}>{"<"} 30 minutes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pillBtn}>
          <Text style={styles.pillBtnText}>10 Minutes</Text>
        </TouchableOpacity>
      </View>
      <SwitchButton />

      <View style={{ height: Dimensions.get("window").height * 0.57 }}>
        {filterButton.activitiesButton ? filteredComponent : null}
      </View>
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
    paddingRight: 55,
    paddingLeft: 55,
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterBox: {
    marginLeft: 10,
    marginRight: 10,
  },
  defaultText: {
    fontSize: 12,
  },
  dropdownStyle: {
    width: 170,
    height: 240,
    backgroundColor: "lightgrey",
  },
  dropdownBoxStyle: {
    width: 170,
    height: 20,
    backgroundColor: "lightgrey",
  },
  dropdownContainer: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  dropdownTextStyle: {
    backgroundColor: "lightgrey",
    color: "black",
  },
  pillFilterContainer: {
    marginTop: 20,
    marginLeft: 34,
    flexDirection: "row",
    height: 22,
  },
  pillBtn: {
    backgroundColor: "#7583CA",
    borderRadius: 10,
    marginRight: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
    paddinBottom: 3,
  },
  pillBtnText: {
    color: "white",
  },
});
export default SearchFilterScreen;
