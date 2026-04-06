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


export async function getDropProducts() {
  return request('/main/recommendItem');
}


export async function getColProducts() {
  return request('/main/collection');
}


export async function getBrowse() {
  return request('/main/browse');
}


export async function searchProducts(keyword) {
  const query = new URLSearchParams({ keyword });

  return request(`/search?${query.toString()}`);
}
