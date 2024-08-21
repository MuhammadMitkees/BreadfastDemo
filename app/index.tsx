import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PostCard from "../components/PostCard/PostCard";
import { getPosts } from "../services/api";

const Index: React.FC<{ postlink: any }> = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getPosts();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <PostCard post={item} postlink={`/postdetails/${item.id}`} />
  );

  return (
    <View style={styles.container}>
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
});

export default Index;
