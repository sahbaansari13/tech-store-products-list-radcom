"use client";

import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

type Props = {
  totalItems: number; // تعداد کل محصولات (مثلاً 100)
  itemsPerPage?: number; // چند تا در هر صفحه؟ (پیش‌فرض 10)
  onPageChange: (startIndex: number, endIndex: number) => void;
};

export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    onPageChange(start, end);
  }, [currentPage, totalItems]);

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <nav className={styles.pagination}>
      <button
        className={`${styles.textButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={goPrev}
      >
        <img src="/icons/left-arrow.svg" alt="previous" className={styles.icon} />
        <span>Previous</span>
      </button>

      <div className={styles.pageGroup}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.pageButton} ${
              currentPage === i + 1 ? styles.active : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        className={`${styles.textButton} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={goNext}
      >
        <span>Next</span>
        <img src="/icons/right-arrow.svg" alt="next" className={styles.icon} />
      </button>
    </nav>
  );
}
