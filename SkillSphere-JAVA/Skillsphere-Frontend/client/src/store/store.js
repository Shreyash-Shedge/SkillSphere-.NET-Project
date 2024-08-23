import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "../components/Cart/cartSlice";
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
