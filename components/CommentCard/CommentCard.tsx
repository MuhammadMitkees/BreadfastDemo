import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CommentCardProps {
  comment: {
    name: string;
    body: string;
    avatar: string;
  };
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: comment.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{comment.name}</Text>
        <Text style={styles.body}>{comment.body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 8,
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
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default CommentCard;
