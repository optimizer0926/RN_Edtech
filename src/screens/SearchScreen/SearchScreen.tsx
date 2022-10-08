import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useContext, useReducer, useState } from "react";
import SearchPageBtn from "../../components/SearchPageBtn";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from "../../components/SearchBar";
import { SearchFilterContext } from "../../context/SearchFilterContext";
import { SearchContext } from "../../interface/ContextInterface";

const SearchScreen: React.FC = ({ navigation }: any): JSX.Element => {
  const { updateSearchFilter } = useContext<SearchContext>(SearchFilterContext);

  return (
    <View style={{ paddingBottom: hp(10) }}>
      <SearchBar />

      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Searches");
            updateSearchFilter("Self Awareness");
          }}
        >
          <SearchPageBtn
            imgURL={require("../../../assets/images/search-page/Group6902.png")}
            title="Self Awareness"
            description="Activities and Plans"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Searches");
            updateSearchFilter("Relationship Skills");
          }}
        >
          <SearchPageBtn
            imgURL={require("../../../assets/images/search-page/Group6901.png")}
            title="Relationship Skills"
            description="Activities and Plans"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Searches");
            updateSearchFilter("Social Awareness");
          }}
        >
          <SearchPageBtn
            imgURL={require("../../../assets/images/search-page/Group6900.png")}
            title="Social Awareness"
            description="Acitivities and Plans"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Searches");
            updateSearchFilter("Decision Making");
          }}
        >
          <SearchPageBtn
            imgURL={require("../../../assets/images/search-page/Group6899.png")}
            title="Decision Making"
            description="Activities and Plans"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Searches");
            updateSearchFilter("Self Management");
          }}
        >
          <SearchPageBtn
            imgURL={require("../../../assets/images/search-page/Group6898.png")}
            title="Self Management"
            description="Activities and Plans"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Searches");
            updateSearchFilter("Cultral Responsiveness");
          }}
        >
          <SearchPageBtn
            imgURL={require("../../../assets/images/search-page/Group6909.png")}
            title="Cultral Responsiveness"
            description="Tools and Information"
          />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Searches");
              updateSearchFilter("Domains View All");
              updateSearchFilter("Activities View All");
            }}
          >
            <ImageBackground
              source={require("../../../assets/images/search-page/Group6897.png")}
              style={styles.imgBackground}
            >
              <View style={styles.textContainer}>
                <Text style={styles.text}>View All</Text>
                <Text style={styles.text2}>Activities and Plans</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    width: "95%",
    height: 110,
    display: "flex",
    flexDirection: "row",
  },
  searchInput: {
    flexDirection: "row",
    borderColor: "#C6C6C6",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    border: "none",
    width: wp(80),
  },
  TabContainer: {
    height: hp(15),
    position: "relative",
  },
  TabText: {
    color: "white",
    position: "absolute",
    top: "40%",
    left: "10%",
    fontSize: 18,
  },
  imgBackground: {
    height: 65,
    justifyContent: "center",
    margin: 5,
  },
  textContainer: {
    position: "relative",
    left: "30%",
    width: 150,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
    padding: 5,
  },
  text2: {
    color: "white",
    fontSize: 12,
    padding: 5,
  },
});

export default SearchScreen;
