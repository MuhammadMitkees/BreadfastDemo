import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Home from "../app/Home";
import { getPosts } from "@/services/api";
import { expect } from "@jest/globals";

jest.mock("@/services/api");

const mockPosts = [
  {
    id: 1,
    user_id: 1,
    title: "Test Post",
    body: "This is a test post body",
    avatar_url: "",
  },
];

test("renders posts correctly", async () => {
  (getPosts as jest.Mock).mockResolvedValue(mockPosts);

  const { getByText } = render(<Home />);

  await waitFor(() => {
    expect(getByText("Test Post")).toBeTruthy();
    expect(getByText("This is a test post body")).toBeTruthy();
  });
});
