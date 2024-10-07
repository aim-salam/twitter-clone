import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// const BASE_URL1 =
//   "https://e7af6f5a-03fb-4b02-862c-bdcf7c3937ed-00-20ltxhpckpf99.sisko.replit.dev";

// const BASE_URL2 =
//   "https://683007d0-4082-4b69-804b-4e091b6d5de1-00-mq64xjq353xd.sisko.replit.dev";

// Async thunk for fetching a user's posts
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchByUser",
  async (userId) => {
    // const response = await fetch(`${BASE_URL1}/posts/user/${userId}`);
    // return response.json();x
    try {
      const postsRef = collection(db, `users/${userId}/posts`);

      const querySnapshot = await getDocs(postsRef);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return docs;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const savePost = createAsyncThunk(
  "posts/savePost",
  async ({ userId, postContent, file }) => {
    console.log(userId);
    console.log(postContent);
    console.log(file);
    try {
      let imageUrl = "";
      if (file !== null) {
        const imageRef = ref(storage, `posts/${file.name}`);
        const response = await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(response.ref);
      }

      const postsRef = collection(db, `users/${userId}/posts`);
      const newPostRef = doc(postsRef);
      await setDoc(newPostRef, {
        content: postContent,
        likes: [],
        imageUrl,
      });
      const newPost = await getDoc(newPostRef);

      const post = {
        id: newPost.id,
        ...newPost.data(),
      };

      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // async (postContent) => {
  //   const token = localStorage.getItem("authToken");
  //   const { id, username } = jwtDecode(token);
  //   // const userId = decode.id;

  //   const data = {
  //     title: "Post Title",
  //     content: postContent,
  //     user_id: id,
  //     author: username,
  //   };

  //   const response = await axios.post(`${BASE_URL2}/posts`, data);
  //   return response.data;
  // }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ userId, postId, newPostContent, newFile }) => {
    console.log(userId);
    console.log(postId);
    console.log(newPostContent);
    console.log(newFile);
    try {
      let newImageUrl = "";
      if (newFile) {
        const imageRef = ref(storage, `posts/${newFile.name}`);
        const response = await uploadBytes(imageRef, newFile);
        newImageUrl = await getDownloadURL(response.ref);
      }

      const postRef = doc(db, `users/${userId}/posts/${postId}`);

      const postSnap = await getDoc(postRef);
      console.log(postSnap.exists());
      if (postSnap.exists()) {
        const postData = postSnap.data();

        const updatedData = {
          ...postData,
          content: newPostContent || postData.content,
          imageUrl: newImageUrl || postData.imageUrl,
        };

        await updateDoc(postRef, updatedData);

        const updatedPost = { id: postId, ...updatedData };
        return updatedPost;
      } else {
        throw new Error("Post does not exist");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], loading: true },
  // reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
  //     state.posts = action.payload;
  //     state.loading = false;
  //   }),
  //     builder.addCase(savePost.fulfilled, (state, action) => {
  //       state.posts = [action.payload, ...state.posts];
  //     });
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        // Find and update the post in the state
        const postIndex = state.posts.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      });
  },
});

export default postsSlice.reducer;
