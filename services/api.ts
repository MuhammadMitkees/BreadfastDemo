import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2";

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const getComments = async (postId: string) => {
  const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
  return response.data;
};
export const getPostById = async (postId: string) => {
  const response = await axios.get(`${API_URL}/posts/${postId}`);
  return response.data;
};
