"use client";

import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
}: Props) {
  const [lastAction, setLastAction] = useState<"init" | "next" | "prev">(
    "init"
  );

  useEffect(() => {
    setLastAction("init");
  }, [totalPages]);

  const goPrev = () => {
    if (currentPage > 1) {
      setLastAction("prev");
      onChange(currentPage - 1);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      setLastAction("next");
      onChange(currentPage + 1);
    }
  };

  const onClickPage = (p: number) => {
    if (p === currentPage) return;
    setLastAction(p > currentPage ? "next" : "prev");
    onChange(p);
  };

  const computePages = (): number[] => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (lastAction === "prev") {
      const a = Math.max(1, currentPage);
      const b = Math.min(totalPages, a + 1);
      return a === b ? [a] : [a, b];
    } else {
      const a = Math.max(1, currentPage - 1);
      const b = Math.min(totalPages, a + 1);
      return a === b ? [a] : [a, b];
    }
  };

  const pages = computePages();

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={`${styles.textButton} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={goPrev}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <img
          src="/icons/left-arrow.svg"
          alt="previous"
          className={styles.icon}
        />
        <span className={styles.textLabel}>Previous</span>
      </button>

      <div className={styles.pageGroup}>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onClickPage(p)}
            className={`${styles.pageButton} ${
              p === currentPage ? styles.active : ""
            }`}
            aria-current={p === currentPage ? "page" : undefined}
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
        aria-label="Next page"
      >
        <span className={styles.textLabel}>Next</span>
        <img src="/icons/right-arrow.svg" alt="next" className={styles.icon} />
      </button>
    </nav>
  );
}
