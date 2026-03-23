import { products } from './categoryProducts';

export async function getAllProducts() {
  return products;
  /*
	const res = await fetch('/api/products');
  if (!res.ok) {
    throw new Error('상품 목록 조회 실패');
  }
  return res.json();
	*/
}

export async function getProductsByCategory(category) {
  return products.filter((item) => item.category?.toLowerCase() === category?.toLowerCase());
}

export async function getProductsByType(type) {
  return products.filter((item) => item.type?.toLowerCase() === type?.toLowerCase());
}

export async function getProductsByCategoryAndType(category, type) {
  return products.filter(
    (item) =>
      item.category?.toLowerCase() === category?.toLowerCase() &&
      item.type?.toLowerCase() === type?.toLowerCase()
  );
}

export async function getProductById(id) {
  return products.find((item) => item.id === Number(id));
}
