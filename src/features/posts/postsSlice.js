import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL1 =
  "https://e7af6f5a-03fb-4b02-862c-bdcf7c3937ed-00-20ltxhpckpf99.sisko.replit.dev";

const BASE_URL2 =
  "https://683007d0-4082-4b69-804b-4e091b6d5de1-00-mq64xjq353xd.sisko.replit.dev";

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId) => {
    const response = await fetch(`${BASE_URL1}/posts/user/${userId}`);
    return response.json();
  }
);

export const savePost = createAsyncThunk(
  "posts/savePost",
  async (postContent) => {
    const token = localStorage.getItem("authToken");
    const { id, username } = jwtDecode(token);
    // const userId = decode.id;

    const data = {
      title: "Post Title",
      content: postContent,
      user_id: id,
      author: username,
    };

    const response = await axios.post(`${BASE_URL2}/posts`, data);
    return response.data;
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    }),
      builder.addCase(savePost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      });
  },
});

export default postsSlice.reducer;
