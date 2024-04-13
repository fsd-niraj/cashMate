import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
    _id: ""
  },
  accessToken: null,
  refreshToken: null
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin(state, action) {
      const { user, accessToken } = action.payload;

      state.isLoggedIn = true
      state.accessToken = accessToken
      state.user = {
        name: user?.name,
        email: user?.email,
        _id: user?._id
      }
      return state;
    },
    userLogout() {
      localStorage.clear()
      return initialState;
    }
  }
})

export const { userLogin, userLogout } = auth.actions;

export default auth.reducer;

export const authReducer = (s) => s?.auth;