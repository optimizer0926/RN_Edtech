import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import LottieView from "lottie-react-native";

const SplashScreen = ({navigation}:any) => {
  return (
    <View style={styles.splashscreen}>
    <LottieView 
      source = {require("../../assets/images/animation_l89ltckt.json")} 
      autoPlay
      loop = {false}
      speed ={0.5}
      resizeMode="cover"
      onAnimationFinish = { () =>{
        navigation.replace("UserType")
      }}
     
    />
   
    </View>
  )};


const styles = StyleSheet.create({
   
  splashscreen:{
    flex:1,
    backgroundColor:"white"
  }

})
export default SplashScreen;


