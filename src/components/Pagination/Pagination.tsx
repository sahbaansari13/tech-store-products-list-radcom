"use client";

import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

type Props = {
  totalItems: number;
  itemsPerPage?: number;
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

  const getVisiblePages = (): number[] => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage === 1) {
      return [1, 2];
    } else if (currentPage === totalPages) {
      return [totalPages - 1, totalPages];
    } else {
      return [currentPage - 1, currentPage];
    }
  };

  const pages = getVisiblePages();

  return (
    <nav className={styles.pagination}>
      <button
        className={`${styles.textButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={goPrev}
        aria-disabled={currentPage === 1}
      >
        <img
          src="/icons/left-arrow.svg"
          alt="previous"
          className={styles.icon}
        />
        <span>Previous</span>
      </button>

      <div className={styles.pageGroup}>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`${styles.pageButton} ${
              currentPage === p ? styles.active : ""
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className={`${styles.textButton} ${
          currentPage === totalPages ? styles.disabled : ""
        }`}
        onClick={goNext}
        aria-disabled={currentPage === totalPages}
      >
        <span>Next</span>
        <img src="/icons/right-arrow.svg" alt="next" className={styles.icon} />
      </button>
    </nav>
  );
}
