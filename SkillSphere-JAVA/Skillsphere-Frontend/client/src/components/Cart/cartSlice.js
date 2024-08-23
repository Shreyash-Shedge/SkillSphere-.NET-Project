import { createSlice } from '@reduxjs/toolkit';

const loadCartItems = () => {
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

const saveCartItems = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartItems(), // Load initial state from local storage
  },
  reducers: {
    addItemToCart(state, action) {
      state.items.push(action.payload);
      saveCartItems(state.items); // Save updated cart to local storage
    },
    removeFromCart(state, action) {
      const { id, type } = action.payload;

      console.log('Before Removal:', state.items);
      console.log('Attempting to remove item with id:', id, 'and type:', type);

      state.items = state.items.filter((item) => {
        console.log('Checking item:', item);
        if (type === 'course' && item.courseId) {
          return item.courseId !== id;
        } else if (type === 'consultation' && item.consultationId) {
          return item.consultationId !== id;
        } else if (type === 'workshop' && item.workshopId) {
          return item.workshopId !== id;
        }
        return true;
      });

      console.log('After Removal:', state.items);

      saveCartItems(state.items); // Save updated cart to local storage
    },
    clearCart(state) {
      state.items = [];
      saveCartItems(state.items); // Clear the cart in local storage
    },
  },
});

export const { addItemToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
