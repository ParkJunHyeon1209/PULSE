// badge 라벨 → theme.badge tone 매핑
// c-badge variant 사용 시 cStatus tone으로 매핑됨
export const BADGE_TONE = {
  new: 'mint',
  hot: 'rose',
  best: 'gold',
  collab: 'col',
};

// 카트 벳지 → theme.badge tone 매핑
export const CATEGORY_TONE = {
  GEAR: 'new',
  HEADSET: 'info',
  CONSOLE: 'hot',
  DROPS: 'col',
};

// tone → theme.card 배경키 매핑
export const TONE_BG = {
  violet: 'ci1',
  mint: 'ci2',
  pink: 'ci3',
  blue: 'ci4',
  indigo: 'ci5',

  // 카테고리 매핑
  LINEUP: 'ci1',
  HEADSET: 'ci5',
  GEAR: 'ci2',
  CONSOLE: 'ci3',
  DROPS: 'ci4',
};

// tone → theme.effects 빔 그라디언트 키 매핑
export const TONE_BEAM = {
  violet: 'cb1',
  mint: 'cb2',
  pink: 'cb3',
  blue: 'cb4',
  indigo: 'cb5',

  // 카테고리 매핑
  LINEUP: 'cb1',
  HEADSET: 'cb5',
  GEAR: 'cb2',
  CONSOLE: 'cb3',
  DROPS: 'cb4',
};
