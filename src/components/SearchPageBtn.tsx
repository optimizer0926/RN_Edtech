import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageSourcePropType,
  ImageBackground,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";

const SearchPageBtn: React.FC<IProps> = ({
  imgURL,
  title,
  description,
}: IProps): JSX.Element => {
  return (
    <ImageBackground source={imgURL} style={styles.imgBackground}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text2}>{description}</Text>
      </View>
    </ImageBackground>
  );
};

interface IProps {
  imgURL: ImageSourcePropType;
  title: string;
  description: string;
}

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  imgBackground: {
    height: 95,
    justifyContent: "center",
    margin: 5,
  },
  textContainer: {
    position: "relative",
    left: "5%",
    width: 135,
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

export default SearchPageBtn;
