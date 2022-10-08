import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  ImageStyle,
  TextStyle,
  Dimensions,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";

const HomeScreenSearchComponent: React.FC<IProps> = ({
  imgURL,
  title,
  description,
}: IProps): JSX.Element => {
  return (
    <ImageBackground source={imgURL} style={styles.imgBackground}>
      <View style={{ width: 160 }}>
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
    width: Dimensions.get("window").width * 0.45,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    margin: Dimensions.get("window").width * 0.01,
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

export default HomeScreenSearchComponent;
