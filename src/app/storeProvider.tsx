"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { setInitialCartItems } from "@/lib/store/features/cart/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    //  set initial cart data from localStorage
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;
    if (isLocalStorageAvailable) {
      const cartItems = window.localStorage.getItem("cartItems");

      try {
        const parseItems = JSON.parse(cartItems as string);
        storeRef.current.dispatch(setInitialCartItems(parseItems));
      } catch (err) {
        console.error(err);
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
