const BASE_URL = 'https://api.mylecture.kr/api/team3';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error(json.message || 'API 응답 실패');
  }

  return json;
}

export async function loginApi(email, password) {
  // 테스트용
  if (email === 'myadmin1@pulse.com' && password === 'password123!') {
    return {
      success: true,
      message: '테스트 계정 로그인 성공',
      token: 'test-admin-token-pulse-platform',
      userInfo: {
        loginId: 'myadmin1@pulse.com',
        name: '테스트',
      },
    };
  }

  return await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ id: email, password }),
  });
}

export async function signupApi(userData) {
  return await request('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function checkIdApi(email) {
  // 테스트용
  const testIds = ['myadmin1@pulse.com', 'user@test.com', 'admin@pulse.com'];

  if (testIds.includes(email)) {
    return { success: false };
  }

  return await request('/auth/check-id', {
    method: 'POST',
    body: JSON.stringify({ id: email }),
  });
}
