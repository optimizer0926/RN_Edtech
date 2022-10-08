import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";

const SearchPageViewAllBtn: React.FC<IProp> = ({
  imageUrl,
  title,
  description,
}: IProp) => {
  return (
    <ImageBackground source={imageUrl} style={styles.imgBackground}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text2}>{description}</Text>
    </ImageBackground>
  );
};

interface IProp {
  imageUrl: HTMLImageElement;
  title: string;
  description: string;
}

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  imgBackground: {
    width: Dimensions.get("window").width * 0.94,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 18,
    paddingLeft: 30,
    paddingRight: 10,
  },
  text2: {
    color: "white",
  },
});

export default SearchPageViewAllBtn;
