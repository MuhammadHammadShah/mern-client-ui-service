import { Product, Topping } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: Product;
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItems = {
        product: action.payload.product,
        choosenConfiguration: action.payload.choosenConfiguration,
      };

      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItems])
      );
      return {
        cartItems: [...state.cartItems, newItems],
      };
    },
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems } = cartSlice.actions;

export default cartSlice.reducer;
