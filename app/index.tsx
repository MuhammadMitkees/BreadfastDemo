import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import SplashImg from "../assets/images/splash.png";

const Index: React.FC<{ navigation: any }> = ({}) => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/Home");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={SplashImg} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "center",
  },
});

export default Index;
