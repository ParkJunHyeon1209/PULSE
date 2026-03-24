export const mockProducts = [
  {
    id: 1,
    title: 'RGB 게이밍 키보드',
    category: 'keyboard',
    price: 79000,
    thumbnail: '/images/keyboard/키보드.png',
    images: ['/images/keyboard/키보드1.png'],
    description: '기계식 스위치를 적용한 RGB 게이밍 키보드',
    colors: [
      {
        name: '미드나잇',
        value: '#7C3AED',
      },
      {
        name: '펄',
        value: '#E5E7EB',
      },
      {
        name: '레드',
        value: '#E11D48',
      },
      { name: '블랙', value: '#000' },
    ],
    platforms: ['PC · Universal', 'PlayStation 5', 'Xbox Series'],
    connections: [
      { id: 'wireless', label: '무선 2.4GHz', soldOut: false },
      { id: 'wired', label: 'USB-C 유선', soldOut: false },
      { id: 'bluetooth', label: '블루투스', soldOut: true },
    ],
    features: [
      '듀얼 햅틱 모터 — 게임 상황별 진동 피드백',
      '무선 3ms 응답속도 · PC / Console 호환',
      'PULSE x VIBE 한정 컬러웨이 · 순번 각인',
    ],
  },
  {
    id: 2,
    title: 'RGB 게이밍 키보드 2',
    category: 'mouse',
    price: 92400,
    thumbnail: '상품이미지',
    images: ['상세이미지3', '상세이미지4'],
    description: '빠른 입력 반응과 몰입감 있는 조명 효과를 제공하는 텐키리스 게이밍 키보드.',
    colors: [
      {
        name: '미드나잇',
        value: '#7C3AED',
      },
      {
        name: '펄',
        value: '#E5E7EB',
      },
      {
        name: '레드',
        value: '#E11D48',
      },
      { name: '블랙', value: '#000' },
    ],
    platforms: ['PC · Universal', 'PlayStation 5', 'Xbox Series'],
    connections: [
      { id: 'wireless', label: '무선 2.4GHz', soldOut: false },
      { id: 'wired', label: 'USB-C 유선', soldOut: false },
      { id: 'bluetooth', label: '블루투스', soldOut: true },
    ],
    features: [
      '듀얼 햅틱 모터 — 게임 상황별 진동 피드백',
      '무선 3ms 응답속도 · PC / Console 호환',
      'PULSE x VIBE 한정 컬러웨이 · 순번 각인',
    ],
  },
];
