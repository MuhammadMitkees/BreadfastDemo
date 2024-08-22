import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Use expo-linear-gradient instead
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import PostCard from "../components/PostCard/PostCard";
import { getPosts } from "../services/api";
import colors from "../utils/theme"; // Import the theme

const Index: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <PostCard post={item} postlink={`/postdetails/${item.id}`} />
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.loader} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <Text style={styles.noPostsText}>No posts yet</Text>
        } // Render this when posts array is empty
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    paddingBottom: 20,
    flexGrow: 1, // Ensure the "No posts yet" message is centered vertically
    justifyContent: "center", // Center the content when there's no data
  },
  title: {
    fontSize: 32, // Increased font size for a more prominent title
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.surface, // Text color to contrast with gradient background
    textAlign: "center", // Centered title
    textShadowColor: colors.accent, // Text shadow for a glowing effect
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPostsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.surface,
    textAlign: "center",
  },
});

export default Index;
