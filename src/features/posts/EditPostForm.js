import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useGetPostQuery, useEditPostMutation } from "../api/apiSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const { data: post } = useGetPostQuery(postId);
  const [updatePost] = useEditPostMutation();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const history = useHistory();

  const onSaveClicked = async (e) => {
    e.preventDefault();
    if (title && content) {
      await updatePost({ id: postId, title, content });
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
      </form>
      <button type="button" onClick={onSaveClicked}>
        Save Post
      </button>
    </section>
  );
};
