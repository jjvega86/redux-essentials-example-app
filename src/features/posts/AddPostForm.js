import React, { useState } from 'react'
import { postAdded } from './postsSlice'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

export const AddPostForm = () => {
  const [title, setTitleInput] = useState('')
  const [content, setContentInput] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  const onTitleChange = (e) => setTitleInput(e.target.value)
  const onContentChange = (e) => setContentInput(e.target.value)

  const onSavePostClicked = (e) => {
    e.preventDefault()
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      )
    }
    setTitleInput('')
    setContentInput('')
  }

  return (
    <section>
      <button type="button" onClick={() => setIsVisible(!isVisible)}>
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
            <label htmlFor="postContent">Post Content:</label>
            <input
              name="postContent"
              id="postContent"
              value={content}
              onChange={onContentChange}
            />{' '}
            <br />
            <button type="button" onClick={onSavePostClicked}>
              Save Post
            </button>
          </form>
        </>
      )}
    </section>
  )
}
