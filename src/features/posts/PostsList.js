import React, { useMemo } from "react";
import classNames from "classnames";
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
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
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
    const renderedPosts = sortedPosts.map((post) => {
      return <PostExcerpt key={post.id} post={post} />;
    });

    const containerClassName = classNames("posts-container", {
      disabled: isFetching,
    });

    content = <div className={containerClassName}>{renderedPosts}</div>;
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  );
};
