import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", title: "First post", content: "Hello!" },
  { id: "2", title: "Second post", content: "More text!" },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const postToUpdate = state.find((post) => post.id === id);
      if (postToUpdate) {
        postToUpdate.title = title;
        postToUpdate.content = content;
      }
    },
  },
});

export const allPosts = (state) => state.posts;

export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;
