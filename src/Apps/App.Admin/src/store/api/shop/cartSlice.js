// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { updateSearchFilter, updateCategoryFilter } from "./action";

const initialCartState = {
  items: [],
  totalPrice: 0,
  filters: {
    search: "",
    category: "all",
    price: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, img, brand } = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, price, img, brand, quantity: 1 });
      }

      state.totalPrice += price;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalPrice +=
          (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    checkout: (state) => {
      // Checkout logic
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSearchFilter, (state, action) => {
        state.filters.search = action.payload;
      })
      .addCase(updateCategoryFilter, (state, action) => {
        state.filters.category = action.payload;
      });
  },
});

export const { addToCart, updateQuantity, removeFromCart, checkout } =
  cartSlice.actions;
export default cartSlice.reducer;
