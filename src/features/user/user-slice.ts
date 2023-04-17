import { createSlice } from '@reduxjs/toolkit';
import { UserSliceType } from '@/types';

const initialState: UserSliceType = {
  name: null,
  token: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
      state.token = payload.token;
    },
    logoutUser: (state) => {
      return {
        name: null,
        token: null,
        email: null,
      };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
