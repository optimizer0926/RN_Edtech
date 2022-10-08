import React from "react";
import {
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";

const SelfCareFeelingsBtn = ({ imgURL, description, onPress }: IProps) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Image source={imgURL} />
      <Text style={styles.iconText}>{description}</Text>
    </TouchableOpacity>
  );
};

interface IProps {
  imgURL: NodeRequire | any;
  description: string;
  onPress: () => string;
}

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  iconText: {
    color: "808080",
    fontSize: 12,
    marginTop: 10,
    margin: 15,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelfCareFeelingsBtn;
