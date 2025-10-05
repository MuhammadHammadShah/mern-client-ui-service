"use client";
import { increment } from "@/lib/store/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartCounter = () => {
  //
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.cart.value);

  const handleIncrement = () => {
    dispatch(increment());
  };
  //
  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingBasket className="hover:text-primary" />
      </Link>
      <span className="absolute -right-5 -top-4 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
        {value}
      </span>
      <button onClick={() => handleIncrement()}>increment</button>
    </div>
  );
};

export default CartCounter;
