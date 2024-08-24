import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { getUserById } from "@/services/api";
import colors from "../../utils/theme"; // Import the theme
import { router } from "expo-router";
import { PostCardProps } from "@/utils/types";

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
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: post.avatar_url || defaultAvatar,
          }}
          style={styles.avatar}
        />
      </View>
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
    padding: 15,
    marginVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderColor,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderColor: colors.accent,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  content: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default PostCard;
