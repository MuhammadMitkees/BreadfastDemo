import React from "react";
import { render } from "@testing-library/react-native";
import CommentCard from "../components/CommentCard/CommentCard";
import { expect } from "@jest/globals";
const mockComment = {
  name: "Test User",
  body: "This is a test comment body",
  avatar: "",
};

test("renders correctly with given comment data", () => {
  const { getByText } = render(<CommentCard comment={mockComment} />);

  expect(getByText("Test User")).toBeTruthy();
  expect(getByText("This is a test comment body")).toBeTruthy();
});
