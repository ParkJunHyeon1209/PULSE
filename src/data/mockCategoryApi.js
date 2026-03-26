export const categoryDetailApi = {
  controller: {
    image: 'img url',
    specs: [
      { label: 'CONNECTION', value: 'Wireless 2.4GHz · USB-C' },
      { label: 'RESPONSE TIME', value: '3ms' },
      { label: 'BATTERY', value: '2000mAh · 최대 20h' },
      { label: 'HAPTIC', value: 'Dual Motor · 진동 강도 4단계' },
      { label: 'RGB', value: 'Pulse Lighting System' },
      { label: 'WEIGHT', value: '210g' },
      { label: 'TRIGGER', value: '아날로그 가변 트리거' },
      { label: 'COMPATIBILITY', value: 'PC / PlayStation / Xbox' },
    ],
  },

  mouse: {
    image: 'img url',
    specs: [
      { label: 'CONNECTION', value: '유선 (USB-C)' },
      { label: 'SENSOR', value: '광학 센서' },
      { label: 'DPI', value: '100~30,000 DPI' },
      { label: 'LIGHTING', value: 'RGB 레인보우' },
      { label: 'DESIGN', value: 'Pulse Lighting System' },
      { label: 'WEIGHT', value: '60g' },
      { label: 'TECH', value: '400 IPS, 5KHz' },
      { label: 'COMPATIBILITY', value: 'PC / macOS / iOS / Android' },
    ],
  },

  keyboard: {
    image: 'img url',
    specs: [
      { label: 'CONNECTION', value: '유선 · Bluetooth · 2.4GHz' },
      { label: 'SWITCH', value: '기계식 스위치' },
      { label: 'LAYOUT', value: '87Key 텐키리스 / 104Key 풀배열' },
      { label: 'LIGHTING', value: 'RGB 레인보우 백라이트' },
      { label: 'DESIGN', value: 'Pulse Lighting System' },
      { label: 'KEYCAP', value: 'PBT 키캡' },
      { label: 'BATTERY', value: '최대 40h (무선 기준)' },
      { label: 'COMPATIBILITY', value: 'PC / macOS / Tablet' },
    ],
  },

  headset: {
    image: 'img url',
    specs: [
      { label: 'CONNECTION', value: 'Wireless 2.4GHz · Bluetooth · USB-C' },
      { label: 'DRIVER', value: '50mm 네오디뮴 드라이버' },
      { label: 'MIC', value: '탈착식 노이즈 캔슬링 마이크' },
      { label: 'BATTERY', value: '최대 30h' },
      { label: 'LIGHTING', value: 'RGB 레인보우' },
      { label: 'DESIGN', value: 'Pulse Lighting System' },
      { label: 'WEIGHT', value: '320g' },
      { label: 'COMPATIBILITY', value: 'PC / PlayStation / Mobile' },
    ],
  },

  earphone: {
    image: 'img url',
    specs: [
      { label: 'CONNECTION', value: 'Wireless Bluetooth · USB-C 충전' },
      { label: 'DRIVER', value: '듀얼 다이내믹 드라이버' },
      { label: 'MIC', value: 'ENC 노이즈 리덕션 마이크' },
      { label: 'BATTERY', value: '이어버드 8h · 케이스 포함 최대 30h' },
      { label: 'LIGHTING', value: 'Pulse LED 포인트 라이팅' },
      { label: 'DESIGN', value: '인이어 게이밍 핏' },
      { label: 'LATENCY', value: '저지연 게이밍 모드' },
      { label: 'COMPATIBILITY', value: 'Mobile / PC / Tablet / Switch' },
    ],
  },

  streaming: {
    image: 'img url',
    specs: [
      { label: 'COMPOSITION', value: '무선 헤드셋 · 게이밍 이어폰 세트' },
      { label: 'HEADSET', value: '50mm 드라이버 · 탈착식 마이크' },
      { label: 'EARPHONE', value: '듀얼 드라이버 · 저지연 모드' },
      { label: 'CONNECTION', value: '2.4GHz · Bluetooth · USB-C' },
      { label: 'BATTERY', value: '헤드셋 30h · 이어폰 30h' },
      { label: 'LIGHTING', value: 'RGB · Pulse LED 라이팅' },
      { label: 'DESIGN', value: 'Pulse Audio Collection' },
      { label: 'COMPATIBILITY', value: 'PC / Console / Mobile / Switch' },
    ],
  },

  gearset: {
    image: 'img url',
    specs: [
      { label: 'COMPOSITION', value: '게이밍 키보드 · 초경량 마우스 세트' },
      { label: 'KEYBOARD', value: '기계식 스위치 · RGB 백라이트' },
      { label: 'MOUSE', value: '광학 센서 · 30,000 DPI' },
      { label: 'CONNECTION', value: '유선 · 2.4GHz · Bluetooth' },
      { label: 'LIGHTING', value: 'RGB 레인보우 싱크' },
      { label: 'DESIGN', value: 'Pulse Desk Setup' },
      { label: 'WEIGHT', value: '키보드 풀사이즈 · 마우스 60g' },
      { label: 'COMPATIBILITY', value: 'PC / macOS / Tablet' },
    ],
  },

  consoleSet: {
    image: 'img url',
    specs: [
      { label: 'COMPOSITION', value: '무선 컨트롤러 · 콘솔 기기 세트' },
      { label: 'CONTROLLER', value: '듀얼 햅틱 · 3ms 응답속도' },
      { label: 'CONSOLE', value: '고해상도 출력 · 초고속 로딩' },
      { label: 'CONNECTION', value: 'Wireless 2.4GHz · USB-C · HDMI' },
      { label: 'BATTERY', value: '컨트롤러 최대 20h 사용' },
      { label: 'LIGHTING', value: 'Pulse RGB 시스템' },
      { label: 'DESIGN', value: 'Pulse Console Setup' },
      { label: 'COMPATIBILITY', value: 'Console / TV / Monitor' },
    ],
  },

  etc: {
    image: 'img url',
    specs: [
      { label: 'COMPOSITION', value: '마우스패드 · 헤드셋 거치대 · 주변기기 세트' },
      { label: 'MOUSEPAD', value: '논슬립 베이스 · 정밀 표면 텍스처' },
      { label: 'STAND', value: '헤드셋 거치 · 안정적인 메탈 프레임' },
      { label: 'DESK USE', value: '게이밍 데스크 정리 · 공간 확장' },
      { label: 'LIGHTING', value: 'RGB 포인트 · Pulse 감성 연출' },
      { label: 'DESIGN', value: 'Pulse Accessory Collection' },
      { label: 'MATERIAL', value: '패브릭 · 메탈 · 러버 베이스' },
      { label: 'COMPATIBILITY', value: 'PC Desk / Console Desk / Studio Setup' },
    ],
  },

  drops: {
    image: 'img url',
    specs: [
      { label: 'COLLECTION', value: 'PULSE 한정판 게이밍 컬렉션' },
      { label: 'COMPOSITION', value: '키보드 · 마우스 · 오디오 · 액세서리 구성' },
      { label: 'DESIGN', value: 'Drops Exclusive Edition' },
      { label: 'LIGHTING', value: '시그니처 RGB · Pulse 라이팅' },
      { label: 'KEYBOARD', value: '기계식 스위치 · 커스텀 키캡' },
      { label: 'MOUSE', value: '초경량 쉘 · 고정밀 센서' },
      { label: 'AUDIO', value: '헤드셋 · 이어폰 멀티 오디오 구성' },
      { label: 'COMPATIBILITY', value: 'PC / Console / Mobile / Desk Setup' },
    ],
  },
};
