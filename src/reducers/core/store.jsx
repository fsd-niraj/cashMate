import { configureStore } from "@reduxjs/toolkit";
import reducers from "./index"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = "https://localhost:5000/api"

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['*'],
  endpoints: builder => ({})
})

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === undefined || serializedState === null || !serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

export default store;