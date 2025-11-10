import React from "react";
import MainLayout from "@/layouts/MainLayout";
import ProductList from "@/components/product/ProductList";
import { Product, ProductsResponse } from "@/types/products";

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=100&skip=10", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <MainLayout>
      <ProductList products={products} />
    </MainLayout>
  );
}
