export const navItems = [
  { label: 'Lineup', to: '/categories/', end: true },
  { label: 'Headset', to: '/categories/headset' },
  { label: 'Gear', to: '/categories/gear' },
  { label: 'Console', to: '/categories/console' },
  { label: 'DROPS', to: '/categories/drops', isDrops: true },
];

export const searchCategories = navItems.map((item) => ({
  label: item.end ? 'ALL' : item.label.toUpperCase(),
  to: item.to,
  isDrops: item.isDrops,
}));

export const searchLinks = [
  { title: '전체 제품 보기', sub: '2026 S/S 컬렉션', to: '/categories/' },
  { title: 'DROPS 한정 발매', sub: '이번 주 수량 12개', to: '/categories/drops' },
  { title: '브랜드 스토리', sub: 'PULSE가 만들어지기까지', modal: 'brandStory' },
];
