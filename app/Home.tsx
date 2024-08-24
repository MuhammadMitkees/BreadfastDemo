import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import PostCard from "../components/PostCard/PostCard";
import colors from "../utils/theme";
import { getPosts } from "@/services/api";
import { LinearGradient } from "expo-linear-gradient";

const Home: React.FC = () => {
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
      <View style={styles.container}>
        <Text style={styles.title}>Posts</Text>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noPostsText}>No posts yet</Text>
          }
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // Transparent background to inherit layout's background
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.surface,
    textAlign: "center",
    textShadowColor: colors.accent,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Ensure loader container is transparent
  },
  noPostsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.surface,
    textAlign: "center",
  },
});

export default Home;
