import mainDropBannerDark from '../../assets/img/banners/D_main-DorpBanner.webp';
import mainDropBannerLight from '../../assets/img/banners/L_main-DorpBanner.webp';
import dropsBannerDark from '../../assets/img/banners/D_Drops.webp';
import dropsBannerLight from '../../assets/img/banners/L_Drops.webp';
import dropsExtrasDark from '../../assets/img/banners/D_DropsExtras.webp';
import dropsExtrasLight from '../../assets/img/banners/L_DropsExtras.webp';
import lineUpDark from '../../assets/img/banners/D_LineUp.webp';
import lineUpLight from '../../assets/img/banners/L_LineUp.webp';
import controllerDark from '../../assets/img/banners/D_Controller.webp';
import controllerLight from '../../assets/img/banners/L_Controller.webp';
import brandBannerDark from '../../assets/img/banners/D_main_brandBanner.webp';
import brandBannerLight from '../../assets/img/banners/L_main_brandBanner.webp';

export const heroSection = {
  kicker: 'PULSE · Brand Story',
  section: {
    // 브랜드 스토리 / 감각을 설계하는 / 게이밍 기어 브랜드 +  빛과 진동, 소리가 하나로 연결되는 순간을 위해.
    label: 'Brand Story',
    title: '감각을 설계하는',
    colorTitle: 'Gaming Gear Brand',
    sub: '단순한 장비가 아닙니다. PULSE는 플레이어의 감각에 반응하는 신호를 설계합니다.',
    titleSize: 'xl',
  },
  lead: '2026 S/S 시즌, PULSE는 게이밍 기어의 새로운 기준을 제시합니다. 한정 드롭부터 플래그십 라인업까지 — 당신의 플레이 신호를 증폭하는 기어를 만납니다.',
  inlineLinkLabel: '지금 드롭 컬렉션 확인하기',
  actions: {
    primary: '드롭 컬렉션 보기',
    secondary: '전체 라인업',
  },
};

export const heroTags = ['2026 S/S 드롭', '게이밍 기어', 'Play Your Signal'];

export const heroStats = [
  { label: 'Concept', value: '감각에 반응하는 게이밍 기어 플랫폼' },
  { label: 'Season', value: '2026 S/S · 한정 드롭 & 플래그십 라인업' },
  { label: 'Signal', value: '빛 · 진동 · 사운드가 하나로 연결되는 순간' },
];

export const identitySection = {
  section: {
    // 브랜드 아이덴티티 / PULSE만의 / 시그널 컬러 시스템
    label: 'Brand Identity',
    titlePrefix: 'PULSE',
    title: '만의',
    titlePrefixFont: 'hero',
    colorTitle: 'Signal Color System',
    sub: '퍼플의 깊이와 블루의 선명함. PULSE의 모든 화면은 이 세 빛을 중심으로 설계됩니다.',
    titleSize: 'lg',
  },
  title: '로고와 컬러 시스템',
  description:
    '네온이 번지는 순간을 포착한 PULSE 로고. 맥박 라인과 퍼플-블루 그라데이션은 플레이어의 신호가 흐르는 방향을 시각화합니다.',
};

export const identityColors = [
  { name: 'Pulse Violet', role: '브랜드 코어 · 로고 · 메인 프레임', tone: 'violet' },
  { name: 'Drop Blue', role: '드롭 링크 · 보조 하이라이트 · 시그널', tone: 'blue' },
  { name: 'Signal Pink', role: '캠페인 포인트 · 글로우 · 강조', tone: 'accent' },
];

export const layoutSection = {
  section: {
    // 제품 철학 / 플레이어의 감각 / 플레이어 중심 설계
    label: 'Product Philosophy',
    title: '플레이를 위한',
    colorTitle: 'Player-First Design',
    sub: '모든 PULSE 기어는 하나의 질문에서 시작합니다. 이 장비가 플레이어의 반응 속도를 높여주는가?',
    titleSize: 'lg',
  },
  body: '소재부터 무게 배분, 스위치 깊이, 조명 파장까지 — PULSE의 설계 기준은 성능 수치보다 실제 플레이 감각에 맞춰져 있습니다. 손에 쥐는 순간부터 다릅니다.',
  details: [
    {
      title: '감각 우선 설계',
      description: '스펙 수치보다 실제 플레이 감각을 기준으로 소재와 구조를 선택합니다.',
      accent: 'violet',
    },
    {
      title: '시즌 드롭 시스템',
      description: '매 시즌 한정 수량으로 공개되는 드롭 컬렉션. 먼저 잡는 플레이어가 가져갑니다.',
      accent: 'blue',
    },
    {
      title: '통합 신호 생태계',
      description: '헤드셋, 마우스, 패드, 컨트롤러가 하나의 라인업 안에서 연결됩니다.',
      accent: 'violet',
    },
  ],
};

export const keywordSection = {
  section: {
    // 브랜드 키워드 / PULSE를 / 정의하는 세 가지
    label: 'Brand Keywords',
    titlePrefix: 'PULSE',
    title: '를 정의하는',
    colorTitle: '3 Keywords',
    sub: '세 가지 키워드가 PULSE의 모든 기어와 캠페인을 관통합니다.',
    titleSize: 'lg',
  },
};

export const pillars = [
  {
    title: 'Signal',
    description:
      '모든 입력에는 신호가 있습니다. PULSE 기어는 그 신호를 정확하게, 빠르게 전달하도록 설계됩니다. 잡음 없이, 딜레이 없이.',
    accent: 'violet',
  },
  {
    title: 'Drop',
    description:
      '한정 수량, 시즌 단위 공개. PULSE 드롭은 준비된 플레이어만이 먼저 경험할 수 있는 기어를 선보입니다.',
    accent: 'blue',
  },
  {
    title: 'Play',
    description:
      '장비는 도구가 아닙니다. PULSE는 플레이어의 스타일과 감각을 증폭하는 파트너로서의 기어를 만듭니다.',
    accent: 'violet',
  },
];

export const gallerySection = {
  section: {
    // 비주얼 시스템 / 시즌을 담는 / 캠페인 비주얼
    label: 'Visual System',
    title: '시즌을 담아낸',
    colorTitle: 'Campaign Visuals',
    sub: 'PULSE의 모든 시즌 드롭은 전용 비주얼과 함께 공개됩니다. 빛과 그림자, 컬러가 기어의 감각을 시각화합니다.',
    titleSize: 'lg',
  },
  eyebrow: 'CAMPAIGN VISUAL',
};

export const closingSection = {
  miniLabel: 'Last Signal',
  section: {
    // 지금 시작하세요 / 신호가 울리는 순간, / 당신의 플레이가 시작된다
    label: 'Start Now',
    title: '신호가 울리는 순간,',
    colorTitle: 'Your Play Begins',
    sub: '2026 S/S 드롭 컬렉션이 공개되었습니다. 한정 수량, 먼저 경험하는 플레이어가 가져갑니다.',
    titleSize: 'lg',
  },
  lead: 'PULSE의 새로운 기어 라인업을 지금 확인하세요. 시즌 드롭부터 플래그십까지 — 당신의 플레이 신호를 증폭할 기어가 기다리고 있습니다.',
  actions: {
    primary: '드롭 컬렉션 보기',
    secondary: '메인으로',
  },
};

export const heroMedia = {
  label: '2026 S/S 메인 드롭',
  hint: '시즌 대표 비주얼',
  eyebrow: 'MAIN DROP',
  media: { dark: mainDropBannerDark, light: mainDropBannerLight },
  objectPosition: '72% center',
  accent: 'violet',
};

export const supportFrame = {
  label: 'Signal Frame',
  hint: '브랜드 시그널 컷',
  eyebrow: 'SIGNAL',
  media: { dark: lineUpDark, light: lineUpLight },
  objectPosition: '78% center',
  accent: 'blue',
  sparkTone: 'blue',
};

export const identityBackdrop = {
  dark: lineUpDark,
  light: lineUpLight,
};

export const storyCards = [
  {
    label: '드롭 라인업',
    hint: '2026 S/S 시즌 드롭 컬렉션',
    eyebrow: 'DROP SEASON',
    media: { dark: dropsBannerDark, light: dropsBannerLight },
    objectPosition: '74% center',
    accent: 'violet',
    sparkTone: 'violet',
  },
  {
    label: '보조 기어',
    hint: '액세서리 & 서브 라인업',
    eyebrow: 'SUB LINE',
    media: { dark: dropsExtrasDark, light: dropsExtrasLight },
    objectPosition: '76% center',
    accent: 'blue',
    sparkTone: 'blue',
  },
];

export const gallerySlots = [
  {
    title: '메인 드롭 비주얼',
    description: '2026 S/S 시즌 대표 드롭 캠페인',
    tone: 'violet',
    media: { dark: mainDropBannerDark, light: mainDropBannerLight },
    objectPosition: '72% center',
  },
  {
    title: '드롭 라인업',
    description: '시즌 전체 기어 라인업 비주얼',
    tone: 'blue',
    media: { dark: dropsBannerDark, light: dropsBannerLight },
    objectPosition: '74% center',
  },
  {
    title: '브랜드 시그널',
    description: 'PULSE 아이덴티티 & 시그널 컷',
    tone: 'violet',
    media: { dark: lineUpDark, light: lineUpLight },
    objectPosition: '78% center',
  },
  {
    title: '서브 기어 컷',
    description: '액세서리 & 보조 라인업',
    tone: 'blue',
    media: { dark: dropsExtrasDark, light: dropsExtrasLight },
    objectPosition: '76% center',
  },
  {
    title: '캠페인 와이드',
    description: '브랜드 무드 전체를 담은 와이드 컷',
    tone: 'violet',
    media: { dark: brandBannerDark, light: brandBannerLight },
    objectPosition: '70% center',
  },
  {
    title: '컨트롤러 라인',
    description: '플래그십 컨트롤러 & 핵심 기어',
    tone: 'blue',
    media: { dark: controllerDark, light: controllerLight },
    objectPosition: '72% center',
  },
];
