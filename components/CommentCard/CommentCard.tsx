import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import colors from "../../utils/theme"; // Import the theme
import { CommentCardProps } from "@/utils/types";
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  const defaultAvatar =
    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
      style={styles.card}
    >
      <Image
        source={{ uri: comment.avatar || defaultAvatar }}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{comment.name}</Text>
        <Text style={styles.body}>{comment.body}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.surface,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: colors.shadowColor || "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    marginTop: 5,
    color: colors.textSecondary,
  },
});

export default CommentCard;
