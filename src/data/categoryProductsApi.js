const BASE_URL = import.meta.env.PROD ? '/api' : 'https://api.mylecture.kr/api/team3';

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


export async function getCategories() {
  return request('/categories');
}


export async function getAllProducts() {
  return request('/products');
}


export async function getProductDetailById(id) {
  return request(`/products/${id}`);
}


export async function getCategoryDetailByType(type) {
  return request(`/categoryDetail/${type}`);
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
