"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout";
import { useAppSelector } from "@/hooks/useCart";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import styles from "./cart.module.css";

export default function CartPage() {
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);

  const handleCheckout = () => {
    router.push("/summary");
  };

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className={styles.cartPage}>
          <div className={styles.container}>
            <h1 className={styles.title}>Your Cart</h1>
            <p className={styles.emptyMessage}>Your cart is empty</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.cartPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Your Cart</h1>

          <div className={styles.cartContent}>
            <div className={styles.itemsSection}>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className={styles.summarySection}>
              <CartSummary onCheckout={handleCheckout} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
