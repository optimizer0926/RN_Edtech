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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchBar from "../components/SearchBar";

const AboutScreen: React.FC = (): JSX.Element => {
  return (
    <View>
      <SearchBar />
      <View
        style={{
          height: hp(70),
          width: wp(100),
          margin: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          padding: 0,
        }}
      >
        <ScrollView style={{ height: hp(80) }}>
          <TouchableOpacity>
            <View style={styles.TabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/about-page/SEL-Overview.png")}
              />
              <Text style={styles.TabText}>Overview</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.TabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/about-page/SEL-Casel.png")}
              />
              <Text style={styles.TabText}>
                CASEL and Other{"\n"}Frameworks
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.TabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/about-page/SEL-Benefits.png")}
              />
              <Text style={styles.TabText}>Benefits of SEL</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.TabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/about-page/SEL-Effective-Imp.png")}
              />
              <Text style={styles.TabText}>Effective {"\n"}Implementation</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.TabContainer}>
              <Image
                style={{ width: wp(100) }}
                source={require("../../assets/images/about-page/FAQ-SEL.png")}
              />
              <Text style={styles.TabText}>FAQ</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  tabsWrapper: {
    width: "95%",
    height: 110,
    display: "flex",
    flexDirection: "row",
  },
  TabContainer: {
    height: hp(13.5),
    position: "relative",
  },
  TabText: {
    color: "white",
    position: "absolute",
    top: "40%",
    left: "10%",
    fontSize: 18,
  },
});
export default AboutScreen;
