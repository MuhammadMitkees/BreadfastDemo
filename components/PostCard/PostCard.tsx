import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Href, Link } from "expo-router";
interface PostCardProps {
  post: {
    id: number;
    title: string;
    body: string;
    user_name: string;
    avatar_url?: string;
  };
  postlink: Href;
}

const PostCard: React.FC<PostCardProps> = ({ post, postlink }) => {
  const defaultAvatar =
    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg";

  return (
    <Link href={postlink} asChild>
      <TouchableOpacity style={styles.card}>
        <Image
          source={{
            uri: post.avatar_url || defaultAvatar,
          }}
          style={styles.avatar}
        />
        <View style={styles.content}>
          <Text style={styles.userName}>{post.user_name}</Text>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.body}>{post.body}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
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
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  body: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default PostCard;
