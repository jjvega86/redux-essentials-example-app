import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { postUpdated } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const postToEdit = useSelector((state) =>
    state.posts.find((post) => post.id === match.params.postId)
  );
  const [title, setTitle] = useState(postToEdit.title);
  const [content, setContent] = useState(postToEdit.content);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onSaveClicked = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(postUpdated({ id: postToEdit.id, title, content }));
      history.push(`/posts/${postToEdit.id}`);
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
