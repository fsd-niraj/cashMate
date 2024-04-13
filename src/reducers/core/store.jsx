import { configureStore } from "@reduxjs/toolkit";
import reducers from "./index"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
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
  // reducer: {
  //   [apiSlice.reducerPath]: apiSlice.reducer,
  //   auth: auth
  // },
  reducer: reducers,
  devTools: true,
  // middleware: getDefault => getDefault().concat(apiSlice.middleware)
});

export default store;