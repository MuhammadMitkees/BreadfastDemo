import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import PostCard from "./PostCard";
import { getUserById } from "@/services/api";

// Mock the API call
jest.mock("@/services/api", () => ({
  getUserById: jest.fn(),
}));

const mockPost = {
  id: 1,
  user_id: 1,
  title: "Test Post",
  body: "This is a test post body",
  user_name: "Test User",
  avatar_url: "",
};

test("renders correctly with given post data", async () => {
  // Mock implementation of getUserById to return a specific user name
  (getUserById as jest.Mock).mockResolvedValue({ name: "Test User" });

  const { getByText } = render(
    <PostCard post={mockPost} postlink="/postdetails/1" />
  );

  // Use waitFor to wait for the async update
  await waitFor(() => {
    expect(getByText("Test User")).toBeTruthy();
  });

  expect(getByText("Test Post")).toBeTruthy();
  expect(getByText("This is a test post body")).toBeTruthy();
});
