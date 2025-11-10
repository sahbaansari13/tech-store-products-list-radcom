"use client";

import React, { useState } from "react";
import { Product } from "@/types/products";
import ProductCard from "./ProductCard";
import Pagination from "../Pagination/Pagination";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: Product[];
  itemsPerPage?: number;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  itemsPerPage = 6,
}) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(
    products.slice(0, itemsPerPage)
  );

  const handlePageChange = (start: number, end: number) => {
    setVisibleProducts(products.slice(start, end));
  };

  return (
    <div className={styles.productList}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Latest Products</h2>
          <p className={styles.subtitle}>
            Discover our amazing collection of tech products
          </p>
        </div>

        <div className={styles.grid}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className={styles.paginationWrapper}>
          <Pagination
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
