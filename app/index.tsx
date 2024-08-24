import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import SplashImg from "../assets/images/splash.png"; // Import the splash image

const Index: React.FC<{ navigation: any }> = ({}) => {
  useEffect(() => {
    setTimeout(() => {
      router.navigate("/Home");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={SplashImg} style={styles.image} />
      {/* Replace Text with Image */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: set a background color
  },
  image: {
    width: 200, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: "contain", // Ensure the image scales properly
  },
});

export default Index;
