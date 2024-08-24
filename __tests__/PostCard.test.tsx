import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import PostCard from "../components/PostCard/PostCard";
import { getUserById } from "@/services/api";
import { expect } from "@jest/globals";

jest.mock("@/services/api");

const mockPost = {
  id: 1,
  user_id: 1,
  title: "Test Post",
  body: "This is a test post body",
  avatar_url: "",
  user_name: "",
};

test("renders correctly with given post data", async () => {
  (getUserById as jest.Mock).mockResolvedValue({ name: "Test User" });

  const { getByText } = render(
    <PostCard post={mockPost} postlink="/postdetails/1" />
  );

  await waitFor(() => {
    expect(getByText("Test User")).toBeTruthy();
  });

  expect(getByText("Test Post")).toBeTruthy();
  expect(getByText("This is a test post body")).toBeTruthy();
});
