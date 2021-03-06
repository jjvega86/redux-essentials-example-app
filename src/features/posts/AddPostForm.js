import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "../api/apiSlice";
import { selectAllUsers } from "../users/usersSlice";

export const AddPostForm = () => {
  const [title, setTitleInput] = useState("");
  const [content, setContentInput] = useState("");
  const [userId, setUserId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitleInput(e.target.value);
  const onContentChange = (e) => setContentInput(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSavePostClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap();
        setTitleInput("");
        setContentInput("");
        setUserId("");
      } catch (error) {
        console.error("Failed to save the post: ", error);
      }
    }
  };

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <section style={{ marginTop: "2vh" }}>
      <button
        type="button"
        style={{ width: "200px" }}
        onClick={() => setIsVisible(!isVisible)}
      >
        Toggle Form
      </button>
      {isVisible && (
        <>
          <h2>Add New Post</h2>
          <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
              name="postTitle"
              id="postTitle"
              value={title}
              onChange={onTitleChange}
            />
            <label htmlFor="postAuthor">Author:</label>
            <select id="postAuthor" value={userId} onChange={onAuthorChange}>
              <option value=""></option>
              {usersOptions}
            </select>
            <label htmlFor="postContent">Post Content:</label>
            <input
              name="postContent"
              id="postContent"
              value={content}
              onChange={onContentChange}
            />
            {"\n\n"}
            <button
              type="button"
              onClick={onSavePostClicked}
              disabled={!canSave}
            >
              Save Post
            </button>
          </form>
        </>
      )}
    </section>
  );
};
