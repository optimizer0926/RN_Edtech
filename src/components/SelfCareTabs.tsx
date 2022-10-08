import React from "react";
import { StyleSheet, Dimensions, ViewStyle, ImageStyle, TextStyle, TouchableOpacity, ImageBackground, Text, View} from 'react-native';

const SelfCareTabs = ({imgURL, description, onPress} : IProps ) => {
  return (
    <TouchableOpacity style={styles.tabs} onPress={onPress} >
        <ImageBackground style={styles.image} source={imgURL}>
          <Text style={styles.tabsText}>{description}</Text>
        </ImageBackground>
    </TouchableOpacity>   
  )
}


interface IProps {
    imgURL: NodeRequire | any,
    description: string,
    onPress?: () => any
}


const styles = StyleSheet.create<TextStyle | ViewStyle | ImageStyle | any > ({
    tabs: {
        margin: 15,
        height: Dimensions.get("window").height * .1,
        width: Dimensions.get("window").width * .9,
        marginBottom: 15,
      },
    tabsText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
      },
      image: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      },
})


export default SelfCareTabs