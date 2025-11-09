"use client";

import React from "react";
import { useAppSelector } from "@/hooks/useCart";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import styles from "./CartSidebar.module.css";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items } = useAppSelector((state) => state.cart);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={`${styles.sidebar} ${styles.open}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.title}>
            Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            items)
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12"
                stroke="#0A0A0A"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 4L12 12"
                stroke="#0A0A0A"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.sidebarContent}>
          {items.length === 0 ? (
            <p className={styles.emptyMessage}>Your cart is empty</p>
          ) : (
            <>
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>

              <div className={styles.summary}>
                <CartSummary onCheckout={onClose} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
