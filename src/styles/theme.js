const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
};

const violetBtnTone = {
  bg: 'linear-gradient(135deg,rgba(150,70,255,0.95) 0%,rgba(109,40,217,0.9) 40%,rgba(150,70,255,0.88) 100%)',
  shadow:
    '0 0 0 1px rgba(190,130,255,0.35),0 0 14px 4px rgba(150,70,255,0.3),0 0 36px 12px rgba(150,70,255,0.2),0 4px 20px rgba(80,40,200,0.2)',
  hoverBg:
    'linear-gradient(135deg,rgba(165,85,255,1) 0%,rgba(150,70,255,0.98) 40%,rgba(165,85,255,0.95) 100%)',
  hoverShadow:
    '0 0 0 1px rgba(93, 0, 255, 0.8),0 0 22px 7px rgba(119, 0, 255, 0.5),0 0 55px 20px rgba(150,70,255,0.2),0 8px 30px rgba(109,40,217,0.1),inset 0 0 20px rgba(190,130,255,0.05)',
  btnActiveBg:
    'linear-gradient(135deg,rgba(150,70,255,0.88) 0%,rgba(150,70,255,0.95) 40%,rgba(109,40,217,0.9) 100%)',
};

// 다크/라이트 공통 블루 버튼 톤 — bg/hoverBg/btnActiveBg/spark 다크·라이트 동일
const blueBtnTone = {
  bg: 'linear-gradient(135deg, rgba(56, 130, 255, 0.95) 0%, rgba(99, 102, 241, 0.92) 45%, rgba(56, 130, 255, 0.88) 100%)',
  hoverBg:
    'linear-gradient(135deg, rgba(96, 165, 250, 1) 0%, rgba(129, 140, 248, 0.98) 45%, rgba(96, 165, 250, 0.95) 100%)',
  btnActiveBg:
    'linear-gradient(135deg, rgba(56, 130, 255, 0.95) 0%, rgba(99, 102, 241, 0.92) 45%, rgba(56, 130, 255, 0.88) 100%)',
  spark: '0 0 8px rgba(255,255,255,0.8), 0 0 18px rgba(147,197,253,0.8)',
};

// 카드 위 + 버튼(cardAdd) 및 다크 secondary 버튼에서 공통으로 사용하는 값
const darkSecondaryBtn = {
  bg: 'rgba(20,10,60,0.65)',
  border: 'rgba(167,139,250,0.38)',
  color: 'rgba(200,180,255,0.9)',
  shadow:
    '0 0 0 1px rgba(124,58,237,0.15),0 0 12px 3px rgba(124,58,237,0.18),inset 0 1px 0 rgba(255,255,255,0.08)',
  hoverBg: 'rgba(49,15,70,0.7)',
  hoverBorder: 'rgba(167,139,250,0.75)',
  hoverColor: 'rgba(220,200,255,1)',
  hoverShadow:
    '0 0 0 1px rgba(167,139,250,0.45),0 0 20px 6px rgba(150,70,255,0.3),0 0 45px 15px rgba(109,40,217,0.15),inset 0 1px 0 rgba(255,255,255,0.12)',
};

const baseTokens = {
  effects: {
    // blur = backdrop-filter 강도
    blurSoft: 'blur(8px)',
    blurMd: 'blur(10px)',
    blurPromo: 'blur(12px)',
    blurBtn: 'blur(14px)',
    blurCard: 'blur(18px)',
    blurNav: 'blur(24px)',
    blurDropdown: 'blur(32px)',

    // hoverShadow = hover 쓰는 그림자
    hoverShadowIcon: '0 0 18px rgba(124,58,237,.25)',
    hoverShadowAvatar: '0 0 0 4px rgba(124,58,237,.18),0 0 20px rgba(124,58,237,.3)',

    // drop-timer에서 쓰는 빨간색 ✦
    glowTextRed: '0 0 6px rgba(236,72,153,.7)',
    // CATEGORIES 섹션에서 쓰는 그림자

    PurpleStar: '0 0 6px rgba(158, 125, 255, 0.9), 0 0 18px rgba(124, 58, 237, 0.7)',

    glowDropShadowPurple:
      'drop-shadow(0 0 8px rgba(167,139,250,.7)) drop-shadow(0 0 22px rgba(124,58,237,.4))',
    glowDropShadowMint:
      'drop-shadow(0 0 8px rgba(52,211,153,.7)) drop-shadow(0 0 22px rgba(16,185,129,.4))',
    // drop-timer에서 쓰는 빨간색 ✦
    glowDropShadowRed:
      'drop-shadow(0 0 8px rgba(244,114,182,.7)) drop-shadow(0 0 22px rgba(236,72,153,.4))',
    glowDropShadowBlue:
      'drop-shadow(0 0 8px rgba(96,165,250,.7)) drop-shadow(0 0 22px rgba(59,130,246,.4))',
  },

  // status = 벳지에서 쓰는 색상
  status: {
    // badge, promise card title, 작은 아이콘 상태색
    new: '#34d399', // 신규/활성 상태 배지, 민트 포인트
    // hot 상태는 theme.colors.accent 사용
    col: '#fbbf24', // 한정/마감 임박 배지, 골드 포인트
    // limited: '#fbbf24', // 한정/마감 임박 배지, 골드 포인트
    info: '#38bdf8', // 정보성 배지, 블루 포인트
    mint: '#6ee7b7', // 보조 민트 장식, 스파크/아이콘 보조색
    rose: '#f9a8d4', // 보조 핑크 장식, 카드 장식/스파크 보조색
    // goldSoft: '#fcd34d', // 연한 골드 장식, 보조 강조선/잔광
  },
  cStatus: {
    // badge, promise card title, 작은 아이콘 상태색
    col: { ...violetBtnTone },
    mint: {
      bg: 'linear-gradient(135deg,rgba(14,168,112,0.52) 0%,rgba(8,140,90,0.38) 40%,rgba(14,168,112,0.44) 100%)',
      // bg: 'linear-gradient(135deg,rgba(14,168,112,0.92) 0%,rgba(8,140,90,0.88) 40%,rgba(14,168,112,0.84) 100%)',
      shadow:
        '0 0 0 1px rgba(52,211,153,0.28),0 0 12px 4px rgba(16,185,129,0.22),0 0 28px 10px rgba(16,185,129,0.12),0 4px 16px rgba(8,140,90,0.18)',
      hoverBg:
        'linear-gradient(135deg,rgba(18,185,125,0.96) 0%,rgba(14,168,112,0.92) 40%,rgba(18,185,125,0.88) 100%)',
      hoverShadow:
        '0 0 0 1px rgba(16,185,129,0.5),0 0 18px 6px rgba(52,211,153,0.32),0 0 40px 14px rgba(16,185,129,0.14),0 6px 22px rgba(8,140,90,0.12)',
      btnActiveBg:
        'linear-gradient(135deg,rgba(10,148,98,0.90) 0%,rgba(14,168,112,0.94) 40%,rgba(8,140,90,0.88) 100%)',
    },
    rose: {
      bg: 'linear-gradient(135deg,rgba(185,40,70,0.38) 0%,rgba(165,25,55,0.34) 40%,rgba(185,40,70,0.34) 100%)',
      // bg: 'linear-gradient(135deg,rgba(185,40,70,0.88) 0%,rgba(165,25,55,0.84) 40%,rgba(185,40,70,0.80) 100%)',
      shadow:
        '0 0 0 1px rgba(244,100,130,0.22),0 0 10px 3px rgba(220,60,90,0.18),0 0 24px 8px rgba(220,60,90,0.1),0 4px 14px rgba(165,25,55,0.15)',
      hoverBg:
        'linear-gradient(135deg,rgba(205,50,80,0.94) 0%,rgba(185,40,70,0.90) 40%,rgba(205,50,80,0.86) 100%)',
      hoverShadow:
        '0 0 0 1px rgba(220,60,90,0.45),0 0 16px 5px rgba(244,100,130,0.28),0 0 36px 12px rgba(220,60,90,0.12),0 6px 20px rgba(165,25,55,0.1)',
      btnActiveBg:
        'linear-gradient(135deg,rgba(170,35,62,0.86) 0%,rgba(185,40,70,0.90) 40%,rgba(165,25,55,0.84) 100%)',
    },
    indigo: {
      bg: 'linear-gradient(135deg,rgba(80,85,210,0.88) 0%,rgba(65,68,190,0.84) 40%,rgba(80,85,210,0.80) 100%)',
      shadow:
        '0 0 0 1px rgba(148,160,240,0.22),0 0 10px 3px rgba(99,102,241,0.18),0 0 24px 8px rgba(99,102,241,0.1),0 4px 14px rgba(65,68,190,0.15)',
      hoverBg:
        'linear-gradient(135deg,rgba(95,100,228,0.94) 0%,rgba(80,85,210,0.90) 40%,rgba(95,100,228,0.86) 100%)',
      hoverShadow:
        '0 0 0 1px rgba(99,102,241,0.45),0 0 16px 5px rgba(148,160,240,0.28),0 0 36px 12px rgba(99,102,241,0.12),0 6px 20px rgba(65,68,190,0.1)',
      btnActiveBg:
        'linear-gradient(135deg,rgba(68,72,195,0.86) 0%,rgba(80,85,210,0.90) 40%,rgba(65,68,190,0.84) 100%)',
    },
    gold: {
      bg: 'linear-gradient(135deg,rgba(222,88,12,0.62) 0%,rgba(194,65,8,0.48) 40%,rgba(222,88,12,0.54) 100%)',
      // bg: 'linear-gradient(135deg,rgba(222,88,12,0.92) 0%,rgba(194,65,8,0.88) 40%,rgba(222,88,12,0.84) 100%)',
      shadow:
        '0 0 0 1px rgba(251,146,60,0.38),0 0 12px 4px rgba(234,88,12,0.32),0 0 28px 10px rgba(234,88,12,0.22),0 4px 16px rgba(194,65,8,0.28)',
      hoverBg:
        'linear-gradient(135deg,rgba(237,100,18,0.96) 0%,rgba(222,88,12,0.92) 40%,rgba(237,100,18,0.88) 100%)',
      hoverShadow:
        '0 0 0 1px rgba(234,88,12,0.5),0 0 18px 6px rgba(251,146,60,0.32),0 0 40px 14px rgba(234,88,12,0.14),0 6px 22px rgba(194,65,8,0.12)',
      btnActiveBg:
        'linear-gradient(135deg,rgba(180,58,8,0.90) 0%,rgba(222,88,12,0.94) 40%,rgba(194,65,8,0.88) 100%)',
    },
  },

  // 라이트/다크 공통 색상
  colors: {
    wColor: '#eeeeff',
    secondary: '#c4b5fd',
    primaryRgb: '124,58,237',
    accentRgb: '236,72,153',
    primaryStrong: '#6d28d9',
    violetDk: '#5b21b6',
    accentSoft: '#f472b6',
    info: '#60a5fa',
    infoSoft: '#93c5fd',
    infoStrong: '#3b82f6',
  },
  // 라이트/다크 공통 그라디언트
  gradients: {
    cardTextG: 'linear-gradient(135deg, #c4b5fd, #9c7bff, #6d3cff)',
    // violetPink: 'linear-gradient(135deg, #6d28d9, #ec4899)',
    violetBlue: 'linear-gradient(135deg, #6d28d9, #3b82f6)',
  },
  // input 공통 state 토큰
  input: {
    state: {
      // 에러/성공 테두리색, glow 효과
      errorBorder: 'rgba(248, 113, 113, 0.45)',
      successBorder: 'rgba(52, 211, 153, 0.35)',
      successGlow: '0 0 0 3px rgba(52, 211, 153, 0.08)',
    },
  },
  btn: {
    // overlay = primary 버튼 공통 상단 하이라이트
    overlay: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, transparent 55%)',
    // cardWish = 카드 위 찜 버튼 전용 토큰 — 다크 wish 값 고정 (다크/라이트 동일)
    cardWish: {
      bg: 'rgba(0,0,0,0.35)',
      border: 'rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.55)',
      hoverBg: 'rgba(236,72,153,0.2)',
      hoverBorder: 'rgba(236,72,153,0.3)',
      hoverColor: '#f472b6',
      activeBg: 'rgba(236,72,153,0.18)',
      activeBorder: 'rgba(236,72,153,0.35)',
      activeColor: '#ec4899',
    },
    // cardAdd = 카드 위 장바구니 버튼 전용 토큰 — 다크 secondary 값 고정 (다크/라이트 동일)
    cardAdd: { ...darkSecondaryBtn },
  },
  // cardLine = BaseCard 하단 컬러 라인
  cardLine: {
    violet:
      'linear-gradient(90deg,transparent 5%, #a78bfa 35%,#c4b5fd 50%, #a78bfa 65%,transparent 95%)',
    mint: 'linear-gradient(90deg,transparent 5%, #34d399 35%,#6ee7b7 50%, #34d399 65%,transparent 95%)',
    pink: 'linear-gradient(90deg,transparent 5%, #f472b6 35%,#fda4af 50%, #f472b6 65%,transparent 95%)',
    blue: 'linear-gradient(90deg,transparent 5%, #60a5fa 35%,#93c5fd 50%, #60a5fa 65%,transparent 95%)',
    indigo:
      'linear-gradient(90deg,transparent 5%, #818cf8 35%,#a5b4fc 50%, #818cf8 65%,transparent 95%)',
  },
  // cardGlow = BaseCard 내부 하단 글로우
  cardGlow: {
    violet: 'radial-gradient(ellipse at 50% 100%,rgba(124,58,237,.25) 0%,transparent 62%)',
    mint: 'radial-gradient(ellipse at 50% 100%,rgba(52,211,153,.25) 0%,transparent 62%)',
    pink: 'radial-gradient(ellipse at 50% 100%,rgba(236,72,153,.25) 0%,transparent 62%)',
    blue: 'radial-gradient(ellipse at 50% 100%,rgba(99,102,241,.25) 0%,transparent 62%)',
    indigo: 'radial-gradient(ellipse at 50% 100%,rgba(79,70,229,.28) 0%,transparent 62%)',
  },
  dropdown: {
    // hoverDanger = 로그아웃 등 위험 액션 항목 hover 배경
    hoverDanger: 'rgba(239,68,68,.1)',
  },
  checkbox: {
    bg: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
    border: '#7c3aed',
    shadow: '0 0 0 3px rgba(124,58,237,.18), 0 0 10px rgba(124,58,237,.3)',
  },
  cart: {
    topBg: 'rgba(124,58,237,.03)',
  },

  // 인풋 상단 tabs 레이아웃
  tabs: {
    containerPadding: '4px',
    gap: '5px',
  },
  radii: {
    // sm = 작게, md = 보통, lg = 크게, xl = 더 크게, 2xl = 훨씬 크게
    sm: '8px',
    md: '12px',
    lg: '16px', // 뺄까 고민중
    xl: '20px',
    xxl: '24px',
    pill: '100px',
    full: '50%',
  },
  motion: {
    fast: '180ms',
    normal: '280ms cubic-bezier(.23,1,.32,1)',
    slow: '450ms cubic-bezier(.23,1,.32,1)',
  },
  fontSize: {
    xxxl: 'clamp(76px,10vw,180px)',
    xxl: 'clamp(64px,8vw,100px)',
    xl: 'clamp(38px,4.5vw,58px)',
    lg: 'clamp(26px,3.6vw,48px)',
    md: '36px',
    m: '32px',
    sm: '24px',
    s: '18px',
    xs: '16px',
    xxs: '14px',
    xxxs: '12px',
  },
  fontFamily: {
    body: "'Pretendard', sans-serif",
    display: "'Syncopate', sans-serif",
    hero: "'Bebas Neue', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  spacing: {
    // spacing 스케일: padding / margin / gap 값을 통일해서 쓰기 위한 기준표
    // 사용 예시: padding: theme.spacing[4];, gap: theme.spacing[6];, margin-bottom: theme.spacing[12];
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
    18: '72px',
    20: '80px',
    24: '96px',
    40: '160px',
  },
  grid: {
    // grid 토큰: 페이지 최대 너비, 좌우 여백, 컬럼 간격 같은 레이아웃 기준값
    // 사용 예시:
    // max-width: theme.grid.max;
    // padding-inline: theme.grid.margin;
    // gap: theme.grid.gap;
    // grid-template-columns: repeat(theme.grid.cols, 1fr);
    cols: 12,
    gap: 'clamp(12px,2vw,24px)',
    margin: 'clamp(20px,6vw,80px)',
    max: '1280px',
  },
  breakpoints,
};

export const darkTheme = {
  ...baseTokens,
  mode: 'dark',
  colors: {
    ...baseTokens.colors,
    // background = 페이지 전체 배경
    background: '#0a0518', // #090613, #06060e 기존값
    // navBg = 내비게이션 배경
    navBg: 'rgba(10, 5, 24, 0.88)', //rgba(6,6,14,0.78)
    // promoBg = 인풋 tabs 호버색
    promoBg: 'rgba(9, 6, 19, 0.6)',
    surface: 'rgba(255,255,255,0.04)',

    // 반투명 카드 배경/테두리 색상
    cardBg: 'rgba(255,255,255,0.04)',
    cardBgGrad: 'linear-gradient(180deg, transparent 30%, rgba(12,8,32,3) 100%)',
    cardBgGradH: 'linear-gradient(180deg, transparent 20%, rgba(9, 6, 19, 1) 100%)',
    cardBorder: 'rgba(255,255,255,0.08)',
    modalBorder: 'rgba(167,139,250,.16)',
    modalBg: 'rgba(12,8,32,.97)',
    btnBg: 'rgba(12, 8, 32, 0.7)',
    dividerStrong: 'linear-gradient(90deg, transparent, rgba(135,95,255,.5), transparent)',
    modalShadow: '0 0 0 1px rgba(124,58,237,.08), 0 32px 80px rgba(0,0,0,.7)',
    bandBg: 'rgba(120,60,255,.04)',

    // btn2Bg = 보조 버튼 배경
    btn2Bg: 'rgba(255,255,255,0.06)',

    // dimBg = 모달/검색 딤드 배경
    dimBg: 'rgba(0,0,0,.18)',

    // 텍스트 색상
    text: '#eeeeff',
    noneText: '#eeeeff',
    textSecondary: 'rgba(200,205,255,0.42)',
    border: 'rgba(255,255,255,0.07)',
    // primary = pulse 메인 라벤더 보라
    primary: '#a78bfa',
    accent: '#ec4899',
    // warning = 경고/주의 상태, 강조 배지
    warning: '#fbbf24',

    // glowOp = 배경 그라디언트투명도
    glowOp: 0.6,

    shadow: 'rgba(20,10,60,0.45)',
    error: '#f87171',
    success: '#34d399',
    // th = 컬렉션 카드 그라디언트
    // th1a/th1b = 1번 테마 카드의 시작/끝 색상
    th1a: '#1a0545',
    th1b: '#0d2060',
    // th2a/th2b = 2번 테마 카드의 시작/끝 색상
    th2a: '#033d2a',
    th2b: '#042d3a',
    // th3a/th3b = 3번 테마 카드의 시작/끝 색상
    th3a: '#3a0520',
    th3b: '#1f0640',
    // th4a/th4b = 4번 테마 카드의 시작/끝 색상
    th4a: '#0c1856',
    th4b: '#0a2e52',
  },
  gradients: {
    ...baseTokens.gradients,
    // lavBlue = 라벤더에서 블루로 가는 그라디언트
    lavBlue: 'linear-gradient(90deg, #a78bfa, #60a5fa)',
    Headline: 'linear-gradient(90deg, #a78bfa, #ec4899)',
    navActive: 'linear-gradient(90deg, #a78bfa, #7c3aed)',
    top: 'linear-gradient(180deg, rgb(20, 12, 56), #2c1a6e)',
    bgMesh: `
      radial-gradient(ellipse 60% 45% at 1% 55%,rgba(100,40,220,0.22) 0%,transparent 62%),
      /* previous adjusted value: radial-gradient(ellipse 55% 45% at 18% 55%,rgba(100,60,220,0.22) 0%,transparent 62%) */
      radial-gradient(ellipse 65% 45% at 100% 28%,rgba(40,110,250,0.16) 0%,transparent 58%),
      radial-gradient(ellipse 50% 45% at 55% 101%,rgba(220,50,140,0.10) 0%,transparent 70%)
      /* previous adjusted value: radial-gradient(ellipse 30% 40% at 55% 82%,rgba(180,40,100,0.10) 0%,transparent 58%) */
    `,
  },
  foot: {
    // decoBand = 푸터 상단 장식 띠 본체(.deco-box)
    decoBand: `linear-gradient(
      to right,
      rgba(6,6,14,1) 4%,
      rgba(59,17,120,.9) 18%,
      rgba(124,58,237,.95) 32%,
      rgba(192,168,255,1) 48%,
      rgba(255,255,255,1) 50%,
      rgba(192,168,255,1) 52%,
      rgba(124,58,237,.95) 68%,
      rgba(59,130,246,.85) 82%,
      rgba(6,6,14,1) 96%
    )`,
    divider: 'linear-gradient(to right, transparent, rgba(167,139,250,.35), transparent)',
    // backGlow = 푸터 상단 행성 글로우 배경
    backGlow: `radial-gradient(
      ellipse 100% 28% at 50% 0%,
      rgba(167,139,250,.65) 0%,
      rgba(124,58,237,.45) 30%,
      rgba(80,40,200,.22) 55%,
      transparent 80%
    )`,
  },

  // Line = 구분선에 쓰는 선 색상
  Line: 'rgba(255, 255, 255, 0.08)',

  // tones = violet / blue 컬러 세트
  tones: {
    violet: {
      // link

      color: '#a78bfa',
      hoverColor: '#ffffff',
      subtleColor: 'rgba(167, 139, 250, 0.5)',
      // tabs
      containerBg:
        'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
      containerBorder: 'rgba(124, 58, 237, 0.2)',
      containerShadow: 'inset 0 1px 0 rgba(167, 139, 250, 0.08), 0 0 20px rgba(124, 58, 237, 0.08)',
      tabActiveBg: 'rgba(124, 58, 237, 0.12)',
      activeBorder: 'rgba(124, 58, 237, 0.35)',
      activeColor: '#a78bfa',
      activeShadow: '0 0 16px rgba(124, 58, 237, 0.15)',
      activeLine: 'linear-gradient(90deg, #6d28d9, #7c3aed)',
      // input
      focusBorder: '#a78bfa',
      focusShadow: '0 1px 0 0 rgba(167, 139, 250, 0.35)',
      iconHover: '#a78bfa',
      // btn
      ...violetBtnTone,
      spark: '0 0 8px rgba(255,255,255,0.8), 0 0 18px rgba(220,180,255,0.7)',
    },
    blue: {
      // link
      color: '#60a5fa',
      hoverColor: '#bae6fd',
      subtleColor: 'rgba(96, 165, 250, 0.55)',
      // tabs
      containerBg:
        'linear-gradient(135deg, rgba(56, 130, 255, 0.1) 0%, rgba(99, 102, 241, 0.08) 100%)',
      containerBorder: 'rgba(96, 165, 250, 0.2)',
      containerShadow: 'inset 0 1px 0 rgba(147, 197, 253, 0.07), 0 0 20px rgba(56, 189, 248, 0.07)',
      tabActiveBg: 'rgba(56, 189, 248, 0.08)',
      activeBorder: 'rgba(96, 165, 250, 0.3)',
      activeColor: '#93c5fd',
      activeShadow: '0 0 16px rgba(56, 189, 248, 0.1)',
      activeLine: 'linear-gradient(90deg, #38bdf8, #818cf8)',
      // input
      focusBorder: '#60a5fa',
      focusShadow: '0 1px 0 0 rgba(56, 130, 255, 0.3)',
      iconHover: '#60a5fa',
      // btn
      ...blueBtnTone,
      shadow:
        '0 0 0 1px rgba(147, 197, 253, 0.4), 0 0 14px 4px rgba(96, 165, 250, 0.4), 0 0 36px 12px rgba(99, 102, 241, 0.2), 0 4px 20px rgba(56, 100, 240, 0.38)',
      hoverShadow:
        '0 0 0 1.5px rgba(108, 200, 250, 0.5), 0 0 22px 7px rgba(31, 132, 255, 0.4), 0 0 55px 20px rgba(99, 102, 241, 0.3), 0 8px 30px rgba(56, 100, 240, 0.1)',
    },
  },
  iconBtn: {
    // auth 소셜 로그인 버튼, 원형 아이콘 액션 버튼 같은 UI에 사용
    socialBg: 'rgba(167, 139, 250, 0.05)',
    socialBorder: 'rgba(167, 139, 250, 0.15)',
    socialColor: 'rgba(167, 139, 250, 0.5)',
    socialHoverBg: 'rgba(167, 139, 250, 0.12)',
    socialHoverBorder: 'rgba(167, 139, 250, 0.4)',
    socialHoverColor: '#a78bfa',
    socialHoverShadow: '0 6px 20px rgba(124, 58, 237, 0.2)',
    // 좋아요 아이콘 — cardWish 토큰과 동일, baseTokens에서 참조
    wish: { ...baseTokens.btn.cardWish },
  },
  tabs: {
    // Tabs 컴포넌트 공용 토큰
    // 로그인/회원가입 탭, 필터 탭등...
    ...baseTokens.tabs,
    itemColor: 'rgba(200, 205, 255, 0.55)',
    itemHoverColor: 'rgba(220, 225, 255, 0.82)',
    itemHoverBg: 'rgba(255, 255, 255, 0.03)',
  },
  input: {
    // Input 컴포넌트 공용 토큰
    lineBorder: 'rgba(167, 139, 250, 0.18)',
    placeholder: 'rgba(200, 205, 255, 0.2)',
    icon: 'rgba(167, 139, 250, 0.35)',
    state: { ...baseTokens.input.state },
  },
  btn: {
    // Button 컴포넌트 공용 토큰
    ...baseTokens.btn,
    secondaryBg: darkSecondaryBtn.bg,
    secondaryBorder: darkSecondaryBtn.border,
    secondaryColor: darkSecondaryBtn.color,
    secondaryShadow: darkSecondaryBtn.shadow,
    secondaryHoverBg: darkSecondaryBtn.hoverBg,
    secondaryHoverBorder: darkSecondaryBtn.hoverBorder,
    secondaryHoverColor: darkSecondaryBtn.hoverColor,
    secondaryHoverShadow: darkSecondaryBtn.hoverShadow,
  },
  // toggle.thumb = 테마 토글 핸들(원형 버튼)
  // toggle.track = 토글 pill 트랙 자체
  toggle: {
    thumbBg: 'linear-gradient(145deg, #6d28d9, #4c1d95)',
    thumbShadow:
      '0 0 0 1px rgba(167,139,250,.35),0 0 8px 3px rgba(130,60,255,.55),0 0 18px 6px rgba(100,40,230,.3)',
    trackBg: 'rgba(14,8,30,.7)', // 트랙 배경
    trackBorder: 'rgba(167,139,250,.32)', // 트랙 테두리
    trackShadow:
      '0 0 0 1px rgba(100,40,200,.1), 0 0 10px 2px rgba(130,60,220,.18), inset 0 1px 0 rgba(255,255,255,.07)', // 트랙 기본 그림자
    trackHoverBorder: 'rgba(190,150,255,.6)', // 트랙 hover 테두리
    trackHoverShadow:
      '0 0 0 1px rgba(130,60,220,.2), 0 0 16px 5px rgba(150,70,255,.32), 0 0 36px 12px rgba(120,40,230,.16), inset 0 1px 0 rgba(255,255,255,.1)', // 트랙 hover 그림자
  },
  dropdown: {
    ...baseTokens.dropdown,
    bg: 'rgba(10,8,26,.9)', // 드롭다운 배경
    border: 'rgba(167,139,250,.18)', // 드롭다운 테두리
    shadow: '0 20px 52px rgba(0,0,0,.32)', // 드롭다운 그림자
    hoverBg: 'rgba(124,58,237,.13)', // 일반 항목 hover 배경
  },
  effects: {
    // 카드 하단 beam / glow / line 같은 장식 효과
    ...baseTokens.effects,

    cb1: 'linear-gradient(to top,rgba(124,58,237,.85),rgba(167,139,250,.3),transparent)', // 카테고리 카드 안쪽 효과 1
    cb2: 'linear-gradient(to top,rgba(59,130,246,.75),rgba(96,165,250,.28),transparent)', // 카테고리 카드 안쪽 효과 2
    cb3: 'linear-gradient(to top,rgba(236,72,153,.75),rgba(244,114,182,.28),transparent)', // 카테고리 카드 안쪽 효과 3
    cb4: 'linear-gradient(to top,rgba(99,102,241,.75),rgba(129,140,248,.28),transparent)', // 카테고리 카드 안쪽 효과 4
    cb5: 'linear-gradient(to top,rgba(242,79,136,.7),rgba(249,168,212,.25),transparent)', // 카테고리 카드 안쪽 효과 5
    hoverShadowCardBase: '0 20px 52px rgba(0,0,0,.30),0 0 32px rgba(124,58,237,.10)',
    hoverShadowCardviolet:
      '0 20px 52px rgba(0,0,0,.3),0 0 40px rgba(124,58,237,.2),0 2px 30px rgba(167,139,250,.15)',
    hoverShadowCardmint:
      '0 20px 52px rgba(0,0,0,.3),0 0 40px rgba(16,185,129,.18),0 2px 30px rgba(52,211,153,.12)',
    hoverShadowCardpink:
      '0 20px 52px rgba(0,0,0,.3),0 0 40px rgba(236,72,153,.18),0 2px 30px rgba(244,114,182,.12)',
    hoverShadowCardblue:
      '0 20px 52px rgba(0,0,0,.3),0 0 40px rgba(59,130,246,.18),0 2px 30px rgba(96,165,250,.12)',
    hoverShadowCategoryBase: '0 14px 40px rgba(20,10,60,.45)',
    hoverShadowCategoryviolet: '0 14px 40px rgba(20,10,60,.45),0 0 36px rgba(124,58,237,.22)',
    hoverShadowCategorymint: '0 14px 40px rgba(20,10,60,.45),0 0 36px rgba(16,185,129,.2)',
    hoverShadowCategorypink: '0 14px 40px rgba(20,10,60,.45),0 0 36px rgba(236,72,153,.2)',
    hoverShadowCategoryblue: '0 14px 40px rgba(20,10,60,.45),0 0 36px rgba(59,130,246,.2)',
    hoverShadowCategoryindigo: '0 14px 40px rgba(20,10,60,.45),0 0 36px rgba(99,102,241,.22)',
  },
  spark: {
    // cat-spark = 카테고리 카드 중앙 반짝임 장식
    // arm = 십자/대각선 빛줄기 색
    // glow = cat-spark 전체 drop-shadow 발광
    csk1Arm: 'linear-gradient(to bottom,transparent,#c4b5fd 40%,#fff 50%,#c4b5fd 60%,transparent)',
    csk1Glow: 'drop-shadow(0 0 8px rgba(167,139,250,.7)) drop-shadow(0 0 22px rgba(124,58,237,.4))',
    csk2Arm: 'linear-gradient(to bottom,transparent,#6ee7b7 40%,#fff 50%,#6ee7b7 60%,transparent)',
    csk2Glow: 'drop-shadow(0 0 8px rgba(52,211,153,.7)) drop-shadow(0 0 22px rgba(16,185,129,.4))',
    csk3Arm: 'linear-gradient(to bottom,transparent,#fda4af 40%,#fff 50%,#fda4af 60%,transparent)',
    csk3Glow: 'drop-shadow(0 0 8px rgba(244,114,182,.7)) drop-shadow(0 0 22px rgba(236,72,153,.4))',
    csk4Arm: 'linear-gradient(to bottom,transparent,#93c5fd 40%,#fff 50%,#93c5fd 60%,transparent)',
    csk4Glow: 'drop-shadow(0 0 8px rgba(96,165,250,.7)) drop-shadow(0 0 22px rgba(59,130,246,.4))',
    csk5Arm:
      'linear-gradient(to bottom,transparent,rgba(196,181,253,.9) 40%,#fff 50%,rgba(196,181,253,.9) 60%,transparent)',
    csk5Glow:
      'drop-shadow(0 0 8px rgba(196,181,253,.8)) drop-shadow(0 0 22px rgba(167,139,250,.5))',
  },
  card: {
    // 제품 카드/카테고리 카드 배경
    // th = 테마 메인 카드
    // ci = 카드 안쪽 / 보조 카드
    th1: 'linear-gradient(145deg, #2d1065 0%, #0d2a70 60%, #061540 100%)', // 테마 메인 카드 1
    th2: 'linear-gradient(145deg, #064028 0%, #054858 60%, #021820 100%)', // 테마 메인 카드 2
    th3: 'linear-gradient(145deg, #5a0828 0%, #2a0858 60%, #160424 100%)', // 테마 메인 카드 3
    th4: 'linear-gradient(145deg, #0c1e68 0%, #0a3060 60%, #040c28 100%)', // 테마 메인 카드 4
    ci1: 'linear-gradient(155deg, #1a0848 0%, #0d2260 60%, #060c28 100%)', // 카드 안쪽/보조 카드 1
    ci2: 'linear-gradient(155deg, #042e20 0%, #053a40 60%, #011018 100%)', // 카드 안쪽/보조 카드 2
    ci3: 'linear-gradient(155deg, #3a0620 0%, #1e0640 60%, #0e041e 100%)', // 카드 안쪽/보조 카드 3
    ci4: 'linear-gradient(155deg, #0c1660 0%, #082846 60%, #040c22 100%)', // 카드 안쪽/보조 카드 4
    ci5: 'linear-gradient(145deg, #1e0638 0%, #0d1a50 60%, #040c28 100%)', // 카드 안쪽/보조 카드 5
  },
  // badge = 태그 버튼 배지 토큰 (limited / hot / collab / new)
  badge: {
    col: { bg: 'rgba(124,58,237,.22)', border: 'rgba(124,58,237,.38)', color: '#c4b5fd' },
    hot: { bg: 'rgba(236,72,153,.18)', border: 'rgba(236,72,153,.38)', color: '#f9a8d4' },
    best: { bg: 'rgba(251,191,36,.13)', border: 'rgba(251,191,36,.3)', color: '#fbbf24' },
    new: { bg: 'rgba(52,211,153,.12)', border: 'rgba(52,211,153,.3)', color: '#6ee7b7' },
    info: { bg: 'rgba(0, 68, 153, 0.2)', border: 'rgba(56,189,248,.38)', color: '#38bdf8' },
  },
  // badge: {
  //   col: { bg: 'rgba(42, 0, 116, 0.22)', border: 'rgba(124,58,237,.38)', color: '#6e4aff' },
  //   hot: { bg: 'rgba(97, 0, 48, 0.18)', border: 'rgba(236,72,153,.38)', color: '#ff008c' },
  //   best: { bg: 'rgba(59, 43, 0, 0.13)', border: 'rgba(251,191,36,.3)', color: '#ffb700' },
  //   new: { bg: 'rgba(0, 41, 26, 0.12)', border: 'rgba(52,211,153,.3)', color: '#00ff99' },
  //   info: { bg: 'rgba(0, 68, 153, 0.2)', border: 'rgba(56,189,248,.38)', color: '#38bdf8' },
  // },
  cart: {
    ...baseTokens.cart,
    topBorder: 'rgba(167,139,250,.3)',
    shadow: '0 0 0 1px rgba(124,58,237,.12), 0 8px 32px rgba(100,40,220,.1)',
  },
};

export const lightTheme = {
  ...baseTokens,
  mode: 'light',
  colors: {
    ...baseTokens.colors,
    background: '#ece9ff', // 기존 색상 #e4e0ff
    navBg: 'rgba(236,233,255,0.92)',
    promoBg: 'rgba(228,224,255,1)',
    surface: 'rgba(124,58,237,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardBgGrad: 'linear-gradient(180deg, transparent 30%, rgba(49, 49, 49, 0.7) 90%)',
    cardBgGradH: 'linear-gradient(180deg, transparent 20%, rgba(10, 4, 22, 0.8) 100%)',
    cardBorder: 'rgba(124,58,237,0.18)',
    modalBorder: 'rgba(124,58,237,.18)',
    modalBg: 'rgba(252,250,255,.97)',
    btnBg: 'radial-gradient(circle at bottom, rgb(212, 186, 255), rgba(236, 233, 255, 0.77))',
    dividerStrong: 'linear-gradient(90deg, transparent, rgba(124,58,237,.3), transparent)',
    modalShadow: '0 0 0 1px rgba(124,58,237,.08), 0 32px 80px rgba(100,60,200,.14)',
    bandBg: 'rgba(124,58,237,.04)',
    btn2Bg: 'rgba(124,58,237,0.10)',
    dimBg: 'rgba(0,0,0,.08)',
    text: '#2d1b69',
    noneText: '#1c133a',
    textSecondary: 'rgba(45,27,105,0.52)',
    border: 'rgba(100,80,200,0.18)',
    primary: '#7c3aed',
    accent: '#ec4899',
    warning: '#f59e0b',
    glowOp: 0.35,
    shadow: 'rgba(100,60,220,0.10)',
    error: '#ef4444',
    success: '#10b981',
    th1a: '#cbb8ff',
    th1b: '#a0bcff',
    th2a: '#8ee8c4',
    th2b: '#9edcf4',
    th3a: '#ffacd0',
    th3b: '#cca0ff',
    th4a: '#a8c4ff',
    th4b: '#b8a8f4',
  },
  gradients: {
    ...baseTokens.gradients,
    lavBlue: 'linear-gradient(90deg, #7c3aed, #60a5fa)',
    // lavPink = 라벤더에서 핑크로 가는 그라디언트
    Headline: 'linear-gradient(90deg, #7c3aed, #ec4899)',
    navActive: 'linear-gradient(90deg, #7c3aed, #6d28d9)',
    top: 'linear-gradient(180deg, rgba(252,250,255,0.97), #dabaff)',
    bgMesh: `
      radial-gradient(ellipse 55% 55% at 8% 44%,rgba(100,40,220,0.36) 0%,transparent 62%),
      /* previous adjusted value: radial-gradient(ellipse 55% 45% at 18% 55%,rgba(100,60,220,0.06) 0%,transparent 62%) */
      radial-gradient(ellipse 45% 35% at 92% 28%,rgba(40,110,250,0.30) 0%,transparent 58%),
      // radial-gradient(ellipse 45% 35% at 82% 28%,rgba(218, 40, 250, 0.45) 0%,transparent 58%),
      radial-gradient(ellipse 80% 40% at 50% 100%, rgba(124, 58, 237, 0.42) 0%, transparent 55%)

    `,
  },
  foot: {
    // decoBand = 푸터 상단 장식
    decoBand: `linear-gradient(
      to right,
      rgba(235,233,255,1) 4%,
      rgba(167,139,250,.7) 20%,
      rgba(124,58,237,.9) 35%,
      rgba(180,160,255,1) 48%,
      rgba(220,210,255,1) 50%,
      rgba(180,160,255,1) 52%,
      rgba(124,58,237,.9) 65%,
      rgba(167,139,250,.7) 80%,
      rgba(235,233,255,1) 96%
    )`,
    // 네비&푸터 구분선
    divider: 'linear-gradient(to right, transparent, rgba(124,58,237,.25), transparent)',
    // backGlow = 푸터 상단 행성 글로우 배경
    backGlow: `radial-gradient(
      ellipse 100% 28% at 50% 0%,
      rgba(167,139,250,.45) 0%,
      rgba(124,58,237,.28) 40%,
      transparent 75%
    )`,
  },
  Line: 'rgba(124, 58, 237, 0.15)',

  tones: {
    violet: {
      // link
      color: '#6d28d9',
      hoverColor: '#5b21b6',
      subtleColor: 'rgba(109, 40, 217, 0.55)',
      // tabs
      containerBg:
        'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(99, 102, 241, 0.07) 100%)',
      containerBorder: 'rgba(124, 58, 237, 0.18)',
      containerShadow: 'inset 0 1px 0 rgba(167, 139, 250, 0.08), 0 0 20px rgba(124, 58, 237, 0.08)',
      tabActiveBg: 'rgba(124, 58, 237, 0.14)',
      activeBorder: 'rgba(124, 58, 237, 0.35)',
      activeColor: '#6d28d9',
      activeShadow: '0 0 12px rgba(124, 58, 237, 0.12)',
      activeLine: 'linear-gradient(90deg, #6d28d9, #7c3aed)',
      // input
      focusBorder: '#6d28d9',
      focusShadow: '0 1px 0 0 rgba(124, 58, 237, 0.3)',
      iconHover: '#6d28d9',
      // btn
      bg: 'linear-gradient(135deg,rgba(124,58,237,0.9),rgba(99,40,210,0.88))',
      shadow:
        '0 0 0 0.8px rgba(167,139,250,0.55),0 0 12px 3px rgba(124,58,237,0.4),0 4px 18px rgba(100,20,200,0.35)',
      hoverBg: 'linear-gradient(135deg,rgba(139,70,255,1),rgba(110,45,240,0.98))',
      hoverShadow:
        '0 0 0 1px rgba(180,140,255,0.4),0 0 20px 6px rgba(140,80,255,0.2),0 8px 28px rgba(110,30,230,0.05)',
      btnActiveBg:
        'linear-gradient(135deg,rgba(150,70,255,0.88) 0%,rgba(150,70,255,0.95) 40%,rgba(109,40,217,0.9) 100%)',
      spark: '0 0 8px rgba(255,255,255,0.8), 0 0 18px rgba(220,180,255,0.7)',
    },
    blue: {
      // link
      color: '#3b82f6',
      hoverColor: '#2563eb',
      subtleColor: 'rgba(59, 130, 246, 0.5)',
      // tabs
      containerBg:
        'linear-gradient(135deg, rgba(56, 130, 255, 0.08) 0%, rgba(99, 102, 241, 0.06) 100%)',
      containerBorder: 'rgba(96, 165, 250, 0.18)',
      containerShadow: 'inset 0 1px 0 rgba(147, 197, 253, 0.07), 0 0 20px rgba(56, 189, 248, 0.07)',
      tabActiveBg: 'rgba(56, 189, 248, 0.1)',
      activeBorder: 'rgba(96, 165, 250, 0.3)',
      activeColor: '#60a5fa',
      activeShadow: '0 0 12px rgba(56, 189, 248, 0.1)',
      activeLine: 'linear-gradient(90deg, #3b82f6, #818cf8)',
      // input
      focusBorder: '#3b82f6',
      focusShadow: '0 1px 0 0 rgba(56, 130, 255, 0.3)',
      iconHover: '#3b82f6',
      // btn
      ...blueBtnTone,
      shadow: '0 0 0 0.8px rgba(147, 197, 253, 0.4), 0 4px 16px rgba(56, 130, 255, 0.25)',
      hoverShadow:
        '0 0 0 1px rgba(147, 197, 253, 0.4), 0 0 20px rgba(56, 130, 255, 0.2), 0 8px 24px rgba(56, 130, 255, 0.05)',
    },
  },
  iconBtn: {
    socialBg: '#ffffffcc',
    socialBorder: 'rgba(124, 58, 237, 0.15)',
    socialColor: 'rgba(45, 27, 105, 0.7)',
    socialHoverBg: '#ffffff',
    socialHoverBorder: 'rgba(124, 58, 237, 0.3)',
    socialHoverColor: '#2d1b69',
    socialHoverShadow: '0 6px 20px rgba(124, 58, 237, 0.12)',
    wish: {
      bg: 'rgba(161, 161, 161, 0.1)',
      border: 'rgba(0,0,0,.08)',
      color: 'rgba(45,27,105,.4)',
      hoverBg: 'rgba(236,72,153,.2)',
      hoverBorder: 'rgba(236,72,153,.3)',
      hoverColor: '#f472b6',
      activeBg: 'rgba(236,72,153,.18)',
      activeBorder: 'rgba(236,72,153,.35)',
      activeColor: '#ec4899',
    },
  },
  tabs: {
    ...baseTokens.tabs,
    itemColor: 'rgba(45, 27, 105, 0.45)',
    itemHoverColor: 'rgba(45, 27, 105, 0.65)',
    itemHoverBg: 'rgba(124, 58, 237, 0.05)',
  },
  input: {
    lineBorder: 'rgba(124, 58, 237, 0.2)',
    placeholder: 'rgba(45, 27, 105, 0.25)',
    icon: 'rgba(45, 27, 105, 0.4)',
    state: { ...baseTokens.input.state },
  },
  btn: {
    ...baseTokens.btn,
    secondaryBg: 'rgba(109,40,217,0.10)',
    secondaryBorder: 'rgba(109,40,217,0.40)',
    secondaryColor: '#6d28d9',
    secondaryShadow: '0 0 10px 2px rgba(109,40,217,0.08),inset 0 1px 0 rgba(255,255,255,0.4)',
    secondaryHoverBg: 'rgba(109,40,217,0.18)',
    secondaryHoverBorder: 'rgba(109,40,217,0.65)',
    secondaryHoverColor: '#5b21b6',
    secondaryHoverShadow: '0 0 18px 5px rgba(109,40,217,0.18),0 0 36px 12px rgba(109,40,217,0.08)',
  },
  dropdown: {
    ...baseTokens.dropdown,
    bg: 'rgba(242,240,255,.98)', // 드롭다운 배경
    border: 'rgba(124,58,237,.2)', // 드롭다운 테두리
    shadow: '0 20px 52px rgba(124,58,237,.14)', // 드롭다운 그림자
    hoverBg: 'rgba(124,58,237,.08)', // 일반 항목 hover 배경
  },
  toggle: {
    thumbBg: 'linear-gradient(145deg, #f59e0b, #d97706)',
    thumbShadow:
      '0 0 0 1px rgba(251,191,36,.5),0 0 8px 3px rgba(245,158,11,.65),0 0 18px 6px rgba(217,119,6,.35)',
    trackBg: 'rgba(240,235,255,.75)', // 트랙 배경
    trackBorder: 'rgba(124,58,237,.28)', // 트랙 테두리
    trackShadow: '0 0 8px 2px rgba(124,58,237,.1), inset 0 1px 0 rgba(255,255,255,.8)', // 트랙 기본 그림자
    trackHoverBorder: 'rgba(124,58,237,.55)', // 트랙 hover 테두리
    trackHoverShadow: '0 0 16px 5px rgba(124,58,237,.2), inset 0 1px 0 rgba(255,255,255,.9)', // 트랙 hover 그림자
  },
  effects: {
    ...baseTokens.effects,
    cb1: 'linear-gradient(to top,rgba(109,40,217,.55),rgba(124,58,237,.22),transparent)',
    cb2: 'linear-gradient(to top,rgba(37,99,235,.5),rgba(59,130,246,.2),transparent)',
    cb3: 'linear-gradient(to top,rgba(219,39,119,.5),rgba(236,72,153,.2),transparent)',
    cb4: 'linear-gradient(to top,rgba(79,70,229,.5),rgba(99,102,241,.2),transparent)',
    cb5: 'linear-gradient(to top,rgba(190,50,120,.55),rgba(219,39,119,.2),transparent)',
    hoverShadowCardBase: '0 16px 40px rgba(100,60,220,.12),0 0 24px rgba(124,58,237,.08)',
    hoverShadowCardviolet: '0 16px 40px rgba(100,60,220,.14),0 0 32px rgba(124,58,237,.12)',
    hoverShadowCardmint: '0 16px 40px rgba(16,100,80,.12),0 0 32px rgba(16,185,129,.10)',
    hoverShadowCardpink: '0 16px 40px rgba(180,40,100,.12),0 0 32px rgba(236,72,153,.10)',
    hoverShadowCardblue: '0 16px 40px rgba(40,80,200,.12),0 0 32px rgba(59,130,246,.10)',
    hoverShadowCategoryBase: '0 12px 32px rgba(100,60,220,.12)',
    hoverShadowCategoryviolet: '0 12px 32px rgba(100,60,220,.16),0 0 28px rgba(124,58,237,.14)',
    hoverShadowCategorymint: '0 12px 32px rgba(16,100,80,.14),0 0 28px rgba(16,185,129,.12)',
    hoverShadowCategorypink: '0 12px 32px rgba(180,40,100,.14),0 0 28px rgba(236,72,153,.12)',
    hoverShadowCategoryblue: '0 12px 32px rgba(40,80,200,.14),0 0 28px rgba(59,130,246,.12)',
    hoverShadowCategoryindigo: '0 12px 32px rgba(60,50,200,.14),0 0 28px rgba(99,102,241,.12)',
  },
  spark: {
    csk1Arm:
      'linear-gradient(to bottom,transparent,#7c3aed 35%,#a78bfa 50%,#7c3aed 65%,transparent)',
    csk1Glow: 'drop-shadow(0 0 6px rgba(124,58,237,.6)) drop-shadow(0 0 16px rgba(124,58,237,.35))',
    csk2Arm:
      'linear-gradient(to bottom,transparent,#059669 35%,#34d399 50%,#059669 65%,transparent)',
    csk2Glow: 'drop-shadow(0 0 6px rgba(5,150,105,.6)) drop-shadow(0 0 16px rgba(16,185,129,.35))',
    csk3Arm:
      'linear-gradient(to bottom,transparent,#db2777 35%,#f472b6 50%,#db2777 65%,transparent)',
    csk3Glow: 'drop-shadow(0 0 6px rgba(219,39,119,.6)) drop-shadow(0 0 16px rgba(236,72,153,.35))',
    csk4Arm:
      'linear-gradient(to bottom,transparent,#2563eb 35%,#60a5fa 50%,#2563eb 65%,transparent)',
    csk4Glow: 'drop-shadow(0 0 6px rgba(37,99,235,.6)) drop-shadow(0 0 16px rgba(59,130,246,.35))',
    csk5Arm:
      'linear-gradient(to bottom,transparent,#be185d 35%,#f9a8d4 50%,#be185d 65%,transparent)',
    csk5Glow: 'drop-shadow(0 0 6px rgba(190,24,93,.6)) drop-shadow(0 0 16px rgba(236,72,153,.35))',
  },
  card: {
    // th = 테마 메인 카드
    th1: 'linear-gradient(145deg, #c4b0ff, #9ab8ff)',
    th2: 'linear-gradient(145deg, #90e8c0, #a0d8f0)',
    th3: 'linear-gradient(145deg, #ffb0cc, #d8a0ff)',
    th4: 'linear-gradient(145deg, #a8c8ff, #bab0f8)',
    ci1: 'linear-gradient(155deg, #d8c8ff, #b8ccff)',
    ci2: 'linear-gradient(155deg, #b0ccff, #9ee8d4)',
    ci3: 'linear-gradient(155deg, #ffb4d4, #d8a8ff)',
    ci4: 'linear-gradient(155deg, #b8c8ff, #b0a8f0)',
    ci5: 'linear-gradient(145deg, #d4b8ff, #baaaf8)',
  },
  // badge = 태그 버튼 배지 토큰 (limited / hot / collab / new)
  badge: {
    col: { bg: 'rgba(124,58,237,.12)', border: 'rgba(124,58,237,.25)', color: '#6d28d9' },
    hot: { bg: 'rgba(236,72,153,.12)', border: 'rgba(236,72,153,.25)', color: '#be185d' },
    best: { bg: 'rgba(251,191,36,.12)', border: 'rgba(251,191,36,.25)', color: '#92400e' },
    new: { bg: 'rgba(52,211,153,.10)', border: 'rgba(52,211,153,.22)', color: '#065f46' },
    info: { bg: 'rgba(56,189,248,.10)', border: 'rgba(56,189,248,.25)', color: '#0369a1' },
  },
  cart: {
    ...baseTokens.cart,
    topBorder: 'rgba(124,58,237,.35)',
    shadow: '0 0 0 1px rgba(124,58,237,.1), 0 8px 32px rgba(100,40,220,.08)',
  },
  cardGlow: {
    violet: 'radial-gradient(ellipse at 50% 100%, rgba(76, 0, 255, 0.3) 0%,transparent 60%)',
    mint: 'radial-gradient(ellipse at 50% 100%, rgba(0, 255, 170, 0.3) 0%,transparent 60%)',
    pink: 'radial-gradient(ellipse at 50% 100%, rgba(219,39,119,.3) 0%,transparent 60%)',
    blue: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,.3) 0%,transparent 60%)',
    indigo: 'radial-gradient(ellipse at 50% 100%, rgba(41, 32, 209, 0.3) 0%,transparent 60%)',
  },
};

export const theme = darkTheme;
