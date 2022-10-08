import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SELExercises: React.FC = (): JSX.Element => {
  return (
    <View>
      <View
        style={{
          height: hp(10),
          width: wp(100),
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <SearchBar />
      </View>

      <ScrollView style={{ height: hp(80) }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            padding: 0,
          }}
        >
          <TouchableOpacity>
            <View style={styles.tabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/self-care/muscle-relaxation.png")}
              />
              <Text style={styles.tabText}>Muscle Relaxation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.tabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/self-care/breathing.png")}
              />
              <Text style={styles.tabText}>Breathing</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.tabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/self-care/stress-relief.png")}
              />
              <Text style={styles.tabText}>Stress Relief</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.tabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/self-care/meditation.png")}
              />
              <Text style={styles.tabText}>Meditation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.tabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/self-care/mood-journal.png")}
              />
              <Text style={styles.tabText}>Mood Journal</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
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
  tabContainer: {
    height: 80,
    margin: 10,
  },

  tabText: {
    color: "white",
    position: "absolute",
    top: "65%",
    left: "9%",
    fontSize: 17,
    fontStyle: "bold",
  },
});
export default SELExercises;
