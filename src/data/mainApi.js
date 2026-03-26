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

// 메인 드롭 배너 상품 3개 추천 목록
export async function getDropProducts() {
  return request('/main/recommendItem');
}

// 메인 콜라보 컬렉션 목록
export async function getColProducts() {
  return request('/main/collection');
}

// 메인 카테고리 브라우즈 목록
export async function getBrowse() {
  return request('/main/browse');
}

// 상품 검색
export async function searchProducts(keyword) {
  const query = new URLSearchParams({ keyword });

  return request(`/search?${query.toString()}`);
}
