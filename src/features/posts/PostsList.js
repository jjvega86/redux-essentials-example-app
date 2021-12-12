import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, fetchPosts } from "./postsSlice";

import { Spinner } from "../../components/Spinner";
import { PostExcerpt } from "./PostExcerpt";

// When one PostExcerpt is updated, all of them will re-render (because the parent component re-renders with a new array reference)
// Memoizing the component is one way to prevent this behavior and only re-render the component that is updating (the individual PostExcerpt component)
//let MemoizedPostExcerpt = React.memo(PostExcerpt);
// return <MemoizedPostExcerpt key={post.id} post={post} />

const contentCreator = (status, posts, error) => {
  if (status === "loading") {
    return <Spinner />;
  } else if (status === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    return orderedPosts.map((post) => {
      return <PostExcerpt key={post.id} post={post} />;
    });
  } else if (status === "error") {
    return <div>{error}</div>;
  }
};

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content = contentCreator(postStatus, posts, error);

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
