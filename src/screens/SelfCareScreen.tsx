import React, { useContext, useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  TextStyle,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import User from "../interface/SelfCareInterface";
import SelfCareFeelingsBtn from "../components/SelfCareFeelingsBtn";
import SelfCareTabs from "../components/SelfCareTabs";

const SelfCarePage: React.FC = ({ navigation }: any): JSX.Element => {
  const { userInfo, isLoading } = useContext<any>(AuthContext);

  const [quote, setQuote] = useState("");

  const onPressCalm = () => {
    setQuote("Calm Quote");
    return quote;
  };

  const onPressRelaxed = () => {
    setQuote("Relaxed Quote");
    return quote;
  };

  const onPressFocused = () => {
    setQuote("Focused Quote");
    return quote;
  };

  const onPressTired = () => {
    setQuote("Tired Quote");
    return quote;
  };

  const onPressAnxious = () => {
    setQuote("Love and accept yourself.");
    return quote;
  };

  return (
    <ScrollView>
      {/** header */}
      <View>
        <Text style={styles.greetingMessage}>
          {userInfo.displayName}, how are you feeling today?
        </Text>
      </View>

      {/** icons */}
      <View style={styles.iconsWrapper}>
        <SelfCareFeelingsBtn
          imgURL={require("../../assets/images/self-care/Calm-Mood.png")}
          description="Calm"
          onPress={onPressCalm}
        />
        <SelfCareFeelingsBtn
          imgURL={require("../../assets/images/self-care/Relax-Mood.png")}
          description="Relaxed"
          onPress={onPressRelaxed}
        />
        <SelfCareFeelingsBtn
          imgURL={require("../../assets/images/self-care/Focus-Mood.png")}
          description="Focused"
          onPress={onPressFocused}
        />
        <SelfCareFeelingsBtn
          imgURL={require("../../assets/images/self-care/Tired.png")}
          description="Tired"
          onPress={onPressTired}
        />
        <SelfCareFeelingsBtn
          imgURL={require("../../assets/images/self-care/Anxious-Mood.png")}
          description="Anxious"
          onPress={onPressAnxious}
        />
      </View>

      {/**style here */}
      <View style={styles.quoteView}>
        <Text style={styles.quoteText}>{quote}</Text>
      </View>

      {/** tabs */}
      <ImageBackground
        style={styles.tabsBackground}
        source={require("../../assets/images/self-care/Background.png")}
      >
        <SelfCareTabs
          imgURL={require("../../assets/images/self-care/blueSelfTab.png")}
          description="SEL Exercises"
          onPress={() => navigation.navigate("SEL Exercises")}
        />
        <SelfCareTabs
          imgURL={require("../../assets/images/self-care/blueSelfTab.png")}
          description="Book Club"
        />
        <SelfCareTabs
          imgURL={require("../../assets/images/self-care/blueSelfTab.png")}
          description="Teacher's Lounge"
        />
        <SelfCareTabs
          imgURL={require("../../assets/images/self-care/blueSelfTab.png")}
          description="Community"
        />
      </ImageBackground>
    </ScrollView>
  );
};

{
  /** styling */
}

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  greetingMessage: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 30,
    color: "2D3436",
    fontFamily: "Inter",
    fontWeight: "bold",
    marginBottom: 4,
  },

  iconsWrapper: {
    marginTop: 20,
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
  },

  tabsBackground: {
    height: "100%",
    alignItems: "center",
  },

  quoteView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  quoteText: {
    fontSize: 18,
  },
});

export default SelfCarePage;
