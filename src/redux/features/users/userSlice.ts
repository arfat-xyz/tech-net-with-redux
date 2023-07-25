import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword } from 'firebase/auth';

interface IUser {
  user: {
    email: null | string;
  };
  isLoading: boolean;
  isError: boolean;
  error: null | string;
}
interface ICredentials {
  email: string;
  password: string;
}
const initialState: IUser = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};
const createUser = createAsyncThunk(
  'user/create-user',
  async ({ email, password }: ICredentials): Promise<string | null> => {
    const data = createUserWithEmailAndPassword(auth, email, password);
    return (await data).user.email;
  }
);
const userSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user.email = null;
        state.error = action.error.message!;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
