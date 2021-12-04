import React from 'react'
import { useSelector } from 'react-redux'
import { allPosts } from './postsSlice'

export const PostsList = () => {
  const posts = useSelector(allPosts)
  const renderedPosts = posts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p className="post-content">{post.content}</p>
      </article>
    )
  })
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
