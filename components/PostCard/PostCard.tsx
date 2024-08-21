import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { Href } from "expo-router";
import { getUserById } from "@/services/api";
import colors from "../../utils/theme"; // Import the theme
import { router } from "expo-router";
interface PostCardProps {
  post: {
    id: number;
    user_id: number;
    title: string;
    body: string;
    user_name: string;
    avatar_url?: string;
  };
  postlink: Href;
}

const PostCard: React.FC<PostCardProps> = ({ post, postlink }) => {
  const [userName, setUserName] = useState<string>("Unknown user");
  const defaultAvatar =
    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserById(post.user_id);
        if (userDetails) {
          setUserName(userDetails.name || "Unknown user");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [post.user_id]);

  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      style={styles.card}
      onTouchEnd={() => {
        router.navigate(postlink);
      }}
    >
      <Image
        source={{
          uri: post.avatar_url || defaultAvatar,
        }}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: colors.surface,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: colors.shadowColor || "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 15,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    color: colors.textSecondary,
  },
  body: {
    fontSize: 12,
    marginTop: 4,
    color: colors.textSecondary,
  },
});

export default PostCard;
