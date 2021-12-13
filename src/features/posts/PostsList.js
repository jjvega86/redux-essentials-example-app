import React, { useMemo } from "react";
import { useGetPostsQuery } from "../api/apiSlice";

import { Spinner } from "../../components/Spinner";
import { PostExcerpt } from "./PostExcerpt";

// When one PostExcerpt is updated, all of them will re-render (because the parent component re-renders with a new array reference)
// Memoizing the component is one way to prevent this behavior and only re-render the component that is updating (the individual PostExcerpt component)
//let MemoizedPostExcerpt = React.memo(PostExcerpt);
// return <MemoizedPostExcerpt key={post.id} post={post} />

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  //useMemo will prevent posts from being sorted on each render, only when the value of posts changes
  const sortedPosts = useMemo(() => {
    const properlyArrangedPosts = posts.slice();
    properlyArrangedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return properlyArrangedPosts;
  }, [posts]);

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = sortedPosts.map((post) => {
      return <PostExcerpt post={post} />;
    });
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
