import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CommentCard from "../../../components/CommentCard/CommentCard";
import { getComments, getPostById } from "../../../services/api";
import { useLocalSearchParams } from "expo-router";

const PostDetailsScreen: React.FC = () => {
  //   const { post } = route.params;
  const [comments, setComments] = useState<any[]>([]);
  const [post, setPost] = useState<any[]>([]);
  const { id } = useLocalSearchParams<{ id: string }>();
  const fetchComments = async () => {
    const data = await getComments(id);
    setComments(data);
  };
  const fetchPost = async () => {
    if (id) {
      const data = await getPostById(id);
      setPost(data);
    }
  };
  useEffect(() => {
    fetchComments();
    fetchPost();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.body}</Text>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentCard comment={item} />}
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
    marginVertical: 10,
  },
  body: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default PostDetailsScreen;
