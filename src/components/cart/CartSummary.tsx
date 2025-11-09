"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useCart";
import styles from "./CartSummary.module.css";

interface CartSummaryProps {
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const router = useRouter();
  const { items, total } = useAppSelector((state) => state.cart);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const shipping = 0;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
    router.push("/summary");
  };

  if (items.length === 0) {
    return (
      <div className={styles.cartSummary}>
        <h2 className={styles.title}>Shopping Cart (0 items)</h2>
        <p className={styles.emptyMessage}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.cartSummary}>
      <h2 className={styles.title}>Shopping Cart ({totalItems} items)</h2>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Subtotal</span>
          <span className={styles.value}>${total.toFixed(2)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.label}>Shipping</span>
          <span className={styles.shippingValue}>Free</span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.label}>Tax</span>
          <span className={styles.value}>${tax.toFixed(2)}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>${finalTotal.toFixed(2)}</span>
        </div>

        <button className={styles.checkoutButton} onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
