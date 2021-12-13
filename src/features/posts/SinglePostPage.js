import React from "react";
import { PostExcerpt } from "./PostExcerpt";
import { Spinner } from "../../components/Spinner";
import { useGetPostQuery } from "../api/apiSlice";

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);

  let content;
  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = <PostExcerpt post={post} />;
  }

  return <section>{content}</section>;
};
