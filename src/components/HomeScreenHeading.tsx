import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Dimensions,
} from "react-native";

const HomeScreenHeading: React.FC<IProps> = ({
  heading,
}: IProps): JSX.Element => {
  return (
    <View style={styles.titleHeadingContainer}>
      <View style={styles.titleHorizontalLine}>
        <Text style={styles.titleHeading}>{heading}</Text>
      </View>
    </View>
  );
};

interface IProps {
  heading: string;
}

const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any>({
  titleHeading: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 8,
    width: Dimensions.get("window").width,
    overflow: "hidden",
  },
  titleHeadingContainer: {
    padding: 24,
    marginTop: 15,
  },
  titleHorizontalLine: {
    alignSelf: "flex-start",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});

export default HomeScreenHeading;
