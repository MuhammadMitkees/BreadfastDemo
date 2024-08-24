import { Href } from "expo-router";
export interface CommentCardProps {
  comment: {
    name: string;
    body: string;
    avatar?: string;
  };
}
export interface PostCardProps {
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
