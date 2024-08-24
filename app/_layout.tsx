import React from "react";
import { Stack, usePathname } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import colors from "../utils/theme"; // Import the theme

export default function RootLayout() {
  const currentRoute = usePathname(); // Get the current route

  if (currentRoute === "/") {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    );
  }

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      {/* Header */}
      <LinearGradient
        colors={[colors.accent, colors.primary]}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => alert("Settings pressed!")}>
          <Ionicons name="settings-outline" size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text style={styles.headerText}>SocialApp</Text>
        <TouchableOpacity onPress={() => alert("Profile pressed!")}>
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={colors.surface}
          />
        </TouchableOpacity>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        <Stack>
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen
            name="postdetails/[id]/index"
            options={{ headerShown: false }}
          />
        </Stack>
      </View>

      {/* Footer */}
      <LinearGradient
        colors={[colors.secondary, colors.primary]}
        style={styles.footer}
      >
        <TouchableOpacity onPress={() => alert("Home pressed!")}>
          <Ionicons name="home-outline" size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text style={styles.footerText}>© 2024 SocialApp</Text>
        <TouchableOpacity onPress={() => alert("Help pressed!")}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={colors.surface}
          />
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "transparent", // Ensure transparency
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.surface,
    textShadowColor: colors.accent,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: "transparent", // Ensure content area is transparent
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.accent,
    backgroundColor: "transparent", // Ensure transparency
  },
  footerText: {
    fontSize: 14,
    color: colors.surface,
  },
});
