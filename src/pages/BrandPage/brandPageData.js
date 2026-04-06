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
import headsetDark from '../../assets/img/banners/D_Headset.webp';
import headsetLight from '../../assets/img/banners/L_Headset.webp';
import keyboardDark from '../../assets/img/banners/D_Keyboard.webp';
import keyboardLight from '../../assets/img/banners/L_Keyboard.webp';
import earphonesDark from '../../assets/img/banners/D_Earphones.webp';
import earphonesLight from '../../assets/img/banners/L_Earphones.webp';
import consoleSetDark from '../../assets/img/banners/D_ConsoleSet.webp';
import consoleSetLight from '../../assets/img/banners/L_ConsoleSet.webp';
import mouseDark from '../../assets/img/banners/D_mouse.webp';
import mouseLight from '../../assets/img/banners/L_mouse.webp';
import mouseKeySetDark from '../../assets/img/banners/D_mouse&keySey.webp';
import mouseKeySetLight from '../../assets/img/banners/L_mouse&keySey.webp';
import mainBanner3Dark from '../../assets/img/banners/3_dark.webp';
import mainBanner3Light from '../../assets/img/banners/3_light.webp';

export const heroSlides = [
  {
    dark: mainDropBannerDark,
    light: mainDropBannerLight,
    darkFilter: 'brightness(0.82) saturate(1.05)',
    lightFilter: 'brightness(1.2) saturate(1.06)',
    darkOpacity: 0.8,
    lightOpacity: 1,
    imageScale: 1,
    mobileImageScale: 1.02,
    objectPosition: '60% center',
    mobileObjectPosition: '74% center',
  },
  {
    dark: lineUpDark,
    light: lineUpLight,
    darkOpacity: 0.7,
    lightOpacity: 0.6,
    imageScale: 1,
    mobileImageScale: 1.02,
    objectPosition: '48% center',
    mobileObjectPosition: '76% center',
  },
  {
    dark: dropsBannerDark,
    light: dropsBannerLight,
    darkOpacity: 0.9,
    lightOpacity: 0.9,
    darkFilter: 'saturate(1.05)',
    lightFilter: ' saturate(1.3) contrast(1.04)',
    imageScale: 1,
    mobileImageScale: 1.1,
    objectPosition: '60% center',
    mobileObjectPosition: '84% 100%',
  },
];

export const heroSection = {
  kicker: 'PULSE · Brand Story',
  section: {
    
    label: 'Brand Story',
    title: '감각을 설계하는',
    colorTitle: 'Gaming Gear Brand',
    sub: 'PULSE는 플레이어의 감각에 반응하는 신호를 설계합니다.',
    titleSize: 'xl',
  },
  lead: '2026 S/S 시즌, 한정 드롭부터 플래그십까지<br />PULSE의 플레이 신호를 증폭할 기어를 만납니다.',
  inlineLinkLabel: '지금 드롭 컬렉션 확인하기',
  actions: {
    primary: '드롭 컬렉션 보기',
    secondary: '전체 라인업',
  },
};

export const heroTags = ['2026 S/S 드롭', '게이밍 기어', 'Play Your Signal'];

export const heroStats = [
  { label: 'Concept', value: '감각에 반응하는 게이밍 기어 플랫폼', accent: 'pink' },
  { label: 'Season', value: '2026 S/S · 한정 드롭 & 플래그십 라인업', accent: 'violet' },
  { label: 'Signal', value: '빛 · 진동 · 사운드가 하나로 연결되는 순간', accent: 'pink' },
];

export const identitySection = {
  section: {
    
    label: 'Brand Identity',
    titlePrefix: 'PULSE',
    title: '만의',
    titlePrefixFont: 'hero',
    colorTitle: 'Signal Color System',
    sub: '퍼플의 깊이와 블루의 선명함. PULSE의 모든 화면은 이 세 빛을 중심으로 설계됩니다.',
    titleSize: 'lg',
  },
  title: '로고와 컬러 시스템',
  descHeading: '네온이 번지는 순간을 포착한 PULSE 로고.',
  descBody: '맥박 라인과 퍼플-블루 그라데이션은 플레이어의 신호가 흐르는 방향을 시각화합니다.',
};

export const identityColors = [
  { name: 'Pulse Violet', role: '브랜드 코어 · 메인 프레임', tone: 'violet' },
  { name: 'Drop Blue', role: '드롭 보조 하이라이트 · 시그널', tone: 'blue' },
  { name: 'Signal Pink', role: '캠페인 포인트 · 글로우 · 강조', tone: 'accent' },
];

export const layoutSection = {
  section: {
    
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
    label: 'Signature Frames',
    titlePrefix: 'PULSE',
    title: '의',
    titlePrefixFont: 'hero',
    colorTitle: 'Proud banners',
    sub: '비주얼 아카이브에서 고른 6개의 프레임에 PULSE의 무드와 플레이 감각을 담았습니다.',
    titleSize: 'lg',
  },
  eyebrow: 'SIGNATURE FRAME',
};

export const closingSection = {
  miniLabel: 'Last Signal',
  section: {
    
    label: 'Start Now',
    title: '신호가 울리는 순간,',
    colorTitle: 'Your Play Begins',
    sub: '2026 S/S 드롭이 시작되었습니다. 한정 수량은 먼저 도착한 플레이어에게 열립니다.',
    titleSize: 'lg',
  },
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

export const closingBackdrop = {
  dark: mainDropBannerDark,
  light: mainDropBannerLight,
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
    title: '헤드셋 무드',
    description: '사운드가 공간을 채우는 순간, 몰입은 더 깊어집니다.',
    tone: 'violet',
    media: { dark: headsetDark, light: headsetLight },
    objectPosition: '72% center',
  },
  {
    title: '키보드 리듬',
    description: '입력의 템포가 살아나는 장면을 네온 톤으로 담았습니다.',
    tone: 'blue',
    media: { dark: keyboardDark, light: keyboardLight },
    objectPosition: '68% center',
  },
  {
    title: '이어폰 컷',
    description: '가볍게 시작해도 감각은 선명하게 이어집니다.',
    tone: 'violet',
    media: { dark: earphonesDark, light: earphonesLight },
    objectPosition: '80% center',
  },
  {
    title: '콘솔 셋업',
    description: '거실에서도 셋업의 텐션은 그대로 유지됩니다.',
    tone: 'violet',
    media: { dark: consoleSetDark, light: consoleSetLight },
    objectPosition: '72% center',
  },
  {
    title: '마우스 포커스',
    description: '손끝의 움직임이 바로 반응으로 이어지는 순간입니다.',
    tone: 'blue',
    media: { dark: mouseDark, light: mouseLight },
    objectPosition: '76% center',
  },
  {
    title: '마우스 & 키세트',
    description: '빛과 리듬, 입력이 하나의 플레이 흐름으로 맞물립니다.',
    tone: 'violet',
    media: { dark: mouseKeySetDark, light: mouseKeySetLight },
    objectPosition: '72% center',
  },
  {
    title: '드롭 라인업',
    description: '시즌 무드를 가장 넓게 보여주는 대표 셋업 프레임입니다.',
    tone: 'blue',
    media: { dark: dropsBannerDark, light: dropsBannerLight },
    objectPosition: '74% center',
  },
  {
    title: '서브 기어 컷',
    description: '작은 액세서리까지도 브랜드 감각 안에서 연결됩니다.',
    tone: 'violet',
    media: { dark: mainBanner3Dark, light: mainBanner3Light },
    objectPosition: 'right 62%',
    imageScale: 1.12,
  },
  {
    title: '플래그십 컨트롤러',
    description: '강한 존재감과 직관적인 컨트롤이 한 컷 안에 담깁니다.',
    tone: 'blue',
    media: { dark: controllerDark, light: controllerLight },
    objectPosition: '72% center',
  },
  {
    title: '시그널 라인업',
    description: 'PULSE의 빛과 실루엣이 선명하게 드러나는 장면입니다.',
    tone: 'violet',
    media: { dark: lineUpDark, light: lineUpLight },
    objectPosition: '78% center',
  },
];
