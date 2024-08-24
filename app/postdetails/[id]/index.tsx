import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import CommentCard from "../../../components/CommentCard/CommentCard";
import { getComments, getPostById, getUserById } from "../../../services/api";
import { useLocalSearchParams } from "expo-router";
import colors from "../../../utils/theme";

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
    if (userId) {
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
      const data = await getPostById(id);
      try {
        setPost(data);
        fetchUser(data.user_id);
      } catch (error) {
        console.log(error);
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
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <Animated.Text
        style={styles.userName}
        entering={FadeIn}
        exiting={FadeOut}
      >
        {user.name || "Unknown User"}
      </Animated.Text>
      <Animated.Text style={styles.title} entering={FadeIn} exiting={FadeOut}>
        {post?.title}
      </Animated.Text>
      <Animated.Text style={styles.body} entering={FadeIn} exiting={FadeOut}>
        {post?.body}
      </Animated.Text>

      {/* Comments Section Indication */}
      <Animated.Text
        style={styles.commentsHeader}
        entering={FadeIn}
        exiting={FadeOut}
      >
        Comments
      </Animated.Text>
      <View style={styles.divider} />

      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <CommentCard comment={item} />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.noComments}>No comments yet</Text>
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.surface,
    textAlign: "center",
    textShadowColor: colors.accent,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 12,
    color: colors.surface,
    textAlign: "center",
    textShadowColor: colors.accent,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  body: {
    fontSize: 18,
    marginVertical: 10,
    color: colors.surface,
    textAlign: "center",
  },
  commentsHeader: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    color: colors.surface,
    textAlign: "left",
    textShadowColor: colors.accent,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.accent,
    marginVertical: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  noComments: {
    textAlign: "center",
    fontSize: 16,
    color: colors.surface,
    marginTop: 20,
  },
});

export default Index;
