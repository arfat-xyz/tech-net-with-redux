import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/products/productSlice';
export const store = configureStore({
  reducer: { cart: cartSlice, product: productSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
