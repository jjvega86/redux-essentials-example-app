import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById } from "./usersSlice";
import { createSelector } from "@reduxjs/toolkit";
import { useGetPostsQuery } from "../api/apiSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;
  const user = useSelector((state) => selectUserById(state, userId));

  const selectPostsForUser = useMemo(() => {
    return createSelector(
      (result) => result.data,
      (result, userId) => userId,
      (data, userId) => data.filter((post) => post.user === userId)
    );
  }, []);

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId),
    }),
  });

  const postTitles = postsForUser.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    );
  });

  return (
    <section>
      <h2>{user && user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
};
