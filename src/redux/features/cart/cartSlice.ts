import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  total: number;
}
const initialState: ICart = {
  products: [],
  total: 0,
};
/* 
1.  Add total
2.  order summary
*/
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (store, action: PayloadAction<IProduct>) => {
      const exist = store.products.find(
        (product) => product._id === action.payload._id
      );
      if (exist) {
        exist.quantity = exist.quantity! + 1;
      } else {
        store.products.push({ ...action.payload, quantity: 1 });
      }
      store.total += action.payload.price;
    },
    removeOne: (store, action: PayloadAction<IProduct>) => {
      const exist = store.products.find(
        (product) => product._id === action.payload._id
      );
      if (exist && exist.quantity! > 1) {
        exist.quantity = exist.quantity! - 1;
      } else {
        store.products = store.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
      store.total -= action.payload.price;
    },
    removeFromCart: (store, action: PayloadAction<IProduct>) => {
      store.products = store.products.filter(
        (product) => product._id !== action.payload._id
      );
      store.total -= action.payload.price * action.payload.quantity!;
    },
  },
});
export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;
export default cartSlice.reducer;
