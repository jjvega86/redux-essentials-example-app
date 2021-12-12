import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import { PostExcerpt } from "./PostExcerpt";

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return <h2>No Post with that Id Found!</h2>;
  }

  return <PostExcerpt post={post} />;
};
