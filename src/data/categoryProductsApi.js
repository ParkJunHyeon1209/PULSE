const BASE_URL = 'https://api.mylecture.kr/api/team3';

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error('API 응답 실패');
  }

  return json.data;
}

// 카테고리 목록
export async function getCategories() {
  return request('/categories');
}

// 전체 상품 목록
export async function getAllProducts() {
  return request('/products');
}
// 상품 상세 조회
export async function getProductDetailById(id) {
  return request(`/products/${id}`);
}

export async function getProductsByCategory(category) {
  const products = await getAllProducts();

  return products.filter(
    (products) => products.category?.toLowerCase() === category?.toLowerCase()
  );
}

export async function getProductsByType(type) {
  const products = await getAllProducts();

  return products.filter((products) => products.type?.toLowerCase() === type?.toLowerCase());
}

export async function getProductsByCategoryAndType(category, type) {
  const products = await getAllProducts();

  return products.filter(
    (products) =>
      products.category?.toLowerCase() === category?.toLowerCase() &&
      products.type?.toLowerCase() === type?.toLowerCase()
  );
}

export async function getProductById(id) {
  const products = await getAllProducts();

  return products.find((products) => Number(products.id) === Number(id));
}
