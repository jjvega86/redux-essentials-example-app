import React, { useState } from 'react'

export const AddPostForm = () => {
  const [titleInput, setTitleInput] = useState('')
  const [contentInput, setContentInput] = useState('')

  const onTitleChange = (e) => setTitleInput(e.target.value)
  const onContentChange = (e) => setContentInput(e.target.value)

  return (
    <section>
      <h2>Add New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          name="postTitle"
          id="postTitle"
          value={titleInput}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post Content:</label>
        <input
          name="postContent"
          id="postContent"
          value={contentInput}
          onChange={onContentChange}
        />
        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
