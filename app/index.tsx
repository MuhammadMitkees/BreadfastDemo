import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import PostCard from "../components/PostCard/PostCard";
import { getPosts } from "../services/api";

const Index: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    }
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <PostCard post={item} postlink={`/postdetails/${item.id}`} />
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
