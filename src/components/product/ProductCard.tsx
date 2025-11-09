"use client";

import React from "react";
import { Product } from "@/types/products";
import { useAppDispatch } from "@/hooks/useCart";
import { addToCart } from "@/store/cartSlice";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.header}>
          <h3 className={styles.title}>{product.title}</h3>
          <span className={styles.badge}>{product.category}</span>
        </div>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceSection}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
          <div className={styles.stock}>{product.stock} in stock</div>
        </div>

        <button className={styles.addButton} onClick={handleAddToCart}>
          <span className={styles.buttonIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2H4L4.5 4M4.5 4H14L12 10H6M4.5 4L6 10M6 10L5 12M6 10H12M11 13.5C11 13.7761 10.7761 14 10.5 14C10.2239 14 10 13.7761 10 13.5C10 13.2239 10.2239 13 10.5 13C10.7761 13 11 13.2239 11 13.5ZM7 13.5C7 13.7761 6.77614 14 6.5 14C6.22386 14 6 13.7761 6 13.5C6 13.2239 6.22386 13 6.5 13C6.77614 13 7 13.2239 7 13.5Z"
                stroke="white"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
