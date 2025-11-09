"use client";

import React from "react";
import { CartItem as CartItemType } from "@/types";
import { useAppDispatch } from "@/hooks/useCart";
import { updateQuantity, removeFromCart } from "@/store/cartSlice";
import styles from "./CartItem.module.css";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.product.id));
    } else {
      dispatch(updateQuantity({ id: item.product.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product.id));
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          <img
            src={item.product.thumbnail}
            alt={item.product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h4 className={styles.title}>{item.product.title}</h4>
          <p className={styles.price}>${item.product.price.toFixed(2)}</p>

          <div className={styles.quantityControls}>
            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(item.quantity - 1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className={styles.quantity}>{item.quantity}</span>

            <button
              className={styles.quantityButton}
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3V13M3 8H13"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button className={styles.removeButton} onClick={handleRemove}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4H14M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4M13 4V13C13 13.5523 12.5523 14 12 14H4C3.44772 14 3 13.5523 3 13V4H13Z"
                  stroke="#FB2C36"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 7V11"
                  stroke="#FB2C36"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 7V11"
                  stroke="#FB2C36"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
