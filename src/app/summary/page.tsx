import React from "react";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";
import styles from "./summary.module.css";

export default function SummaryPage() {
  return (
    <MainLayout>
      <div className={styles.summaryPage}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/" className={styles.backButton}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#0A0A0A"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Shop
            </Link>
            <h1 className={styles.title}>Order Summary</h1>
          </div>

          <div className={styles.content}>
            <div className={styles.successMessage}></div>
            <div className={styles.actions}>
              <Link href="/" className={styles.continueShopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
