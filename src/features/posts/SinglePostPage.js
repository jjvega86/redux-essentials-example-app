import React from "react";
import { PostExcerpt } from "./PostExcerpt";

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  return <PostExcerpt key={postId} postId={postId} />;
};
