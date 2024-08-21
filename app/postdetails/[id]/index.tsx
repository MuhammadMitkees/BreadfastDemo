import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CommentCard from "../../../components/CommentCard/CommentCard";
import { getComments, getPostById } from "../../../services/api";
import { useLocalSearchParams } from "expo-router";

const PostDetailsScreen: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [post, setPost] = useState<any>({});
  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const { id } = useLocalSearchParams<{ id: string }>();

  const fetchComments = async () => {
    if (id) {
      try {
        const data = await getComments(id);
        setComments(data);
      } finally {
        setLoadingComments(false);
      }
    }
  };

  const fetchPost = async () => {
    if (id) {
      try {
        const data = await getPostById(id);
        setPost(data);
      } finally {
        setLoadingPost(false);
      }
    }
  };

  useEffect(() => {
    fetchComments();
    fetchPost();
  }, [id]);

  if (loadingPost || loadingComments) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetailsScreen;
