import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CommentCard from "../../../components/CommentCard/CommentCard";
import { getComments, getPostById, getUserById } from "../../../services/api";
import { useLocalSearchParams } from "expo-router";
import colors from "../../../utils/theme"; // Import the theme

const Index: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [post, setPost] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    fetchComments();
    fetchPost();
  }, [id]);

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

  const fetchUser = async (userId: number) => {
    if (id) {
      try {
        const data = await getUserById(userId);
        setUser(data);
      } finally {
        setLoadingPost(false);
      }
    }
  };

  const fetchPost = async () => {
    if (id) {
      try {
        const data = await getPostById(id);
        setPost(data);
      } finally {
        fetchUser(post.user_id);
        setLoadingPost(false);
      }
    }
  };

  if (loadingPost || loadingComments) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.loader} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user?.user_name || "Unknown User"}</Text>
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.body}</Text>
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentCard comment={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.noComments}>No comments yet</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background, // Use the background color from the theme
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: colors.textPrimary, // Use the primary text color from the theme
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.textPrimary, // Use the primary text color from the theme
  },
  body: {
    fontSize: 16,
    marginVertical: 10,
    color: colors.textPrimary, // Use the primary text color from the theme
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background, // Use the background color from the theme
  },
  noComments: {
    textAlign: "center",
    fontSize: 16,
    color: colors.secondary, // Use the secondary color from the theme
    marginTop: 20,
  },
});

export default Index;
