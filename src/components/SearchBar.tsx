import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchBar = () => {
  return (
    <View
      style={{
        padding: "3%",
        height: hp(9),
        width: wp(100),
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View style={styles.searchInput}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity>
            <Feather
              name="search"
              size={22}
              color="#C6C6C6"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={{ fontSize: 18, width: wp(50) }}
          />
        </View>
        <TouchableOpacity>
          <Feather
            name="mic"
            size={22}
            color="#C6C6C6"
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: "row",
    borderColor: "#C6C6C6",
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
    border: "none",
    width: wp(80),
  },
});

export default SearchBar;
