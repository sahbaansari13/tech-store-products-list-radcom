"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/hooks/useCart";
import CartSidebar from "../cart/CartSidebar";
import styles from "./header.module.css";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img
              src="/icons/tech-store-icon.svg"
              alt="Tech Store"
              className={styles.logoIcon}
            />
            <span>TechStore</span>
          </Link>

          <nav className={styles.nav}>
            <button
              className={styles.cartButton}
              onClick={() => setIsCartOpen(true)}
            >
              <img
                src="/icons/dark-basket.svg"
                alt="Cart"
                className={styles.cartIcon}
              />
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </button>
          </nav>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
