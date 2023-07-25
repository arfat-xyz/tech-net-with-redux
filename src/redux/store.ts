import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/products/productSlice';
import { api } from './features/api/apiSlice';
import userSlice from './features/users/userSlice';
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    [api.reducerPath]: api.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
