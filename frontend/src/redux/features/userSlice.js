/* eslint-disable no-unused-expressions */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelectorHook } from "react-redux";
import $axios from "../../helpers/axios";

const queryParams = new URLSearchParams(window.location.search);
const token = queryParams.get("token");

if (token) {
  localStorage.setItem("token", token);
  window.location.href = "/";
}

export const fetchUser = createAsyncThunk(
  "/user/getUser",
  async (payload, { dispatch, rejectWithValue }) => {
    return await $axios.get("/users/me");
  }
);

export const destroyUser = createAsyncThunk(
  "/user/destroyUser",
  async (payload, { dispatch }) => {
    return localStorage.removeItem("token");
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    fetchUser: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload.data;
        state.fetchUser = true;
      } else {
        state.user = null;
        state.fetchUser = true;
      }
    }),
      builder.addCase(fetchUser.rejected, (state, action) => {
        state.fetchUser = true;
        state.user = null;
      }),
      builder.addCase(destroyUser.fulfilled, (state, action) => {
        localStorage.removeItem("token");
        location.reload();
      }),
      builder.addCase(destroyUser.pending, (state, action) => {
        console.log("Logging out...");
        localStorage.removeItem("token");
      });
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectFetchUser = (state) => state.user.fetchUser;

export const selectCompletedTodoDescriptions = createSelectorHook(
  [],
  (user) => (state) => state.user.user
);

export default userSlice.reducer;
