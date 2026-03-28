import styled from '@emotion/styled';
import lightBannerImg from '../../../assets/img/banners/L_main_brandBanner.webp';
import darkBannerImg from '../../../assets/img/banners/D_main_brandBanner.webp';
import BaseSection from '../../../components/common/BaseSection';
import useThemeStore from '../../../store/useThemeStore';

const SectionWrap = styled.section`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[24]} 0`};

  &:has(.img-text-wrap:hover) .banner-img {
    transform: scale(1.06);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-inline: ${({ theme }) => theme.grid.margin};
  }
`;

const ImgSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  z-index: 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: relative;
    width: 100%;
    min-height: 480px;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 480px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    min-height: unset;
  }
`;

const Img = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  transform: scale(1);
  transition: transform ${({ theme }) => theme.motion.slow};
`;

/* 데스크탑 전용 — Inner 왼쪽 컬럼 */
const ImgTextWrap = styled.div`
  padding-top: ${({ theme }) => theme.spacing[10]};
  padding-inline: ${({ theme }) => theme.grid.margin};
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -${({ theme }) => theme.spacing[6]};
    z-index: -1;
    border-radius: ${({ theme }) => theme.radii.lg};
    background: linear-gradient(to right, rgba(4, 2, 18, 0.68) 0%, transparent 100%);
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

/* 태블릿 전용 — ImgSide 안에 absolute 오버레이 */
const ImgTextWrapTablet = styled.div`
  display: none;
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[10]};
  padding-inline: ${({ theme }) => theme.grid.margin};
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: -${({ theme }) => theme.spacing[6]};
    z-index: -1;
    border-radius: ${({ theme }) => theme.radii.lg};
    background: linear-gradient(to right, rgba(4, 2, 18, 0.68) 0%, transparent 100%);
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const ListSide = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  padding-inline: ${({ theme }) => theme.grid.margin};
  margin-top: ${({ theme }) => theme.spacing[20]};
  margin-bottom: ${({ theme }) => theme.spacing[20]};

  &::before {
    content: '';
    position: absolute;
    top: -200px;
    bottom: -200px;
    left: -500px;
    right: 200px;
    z-index: -1;
    background: radial-gradient(ellipse at center, rgba(57, 24, 215, 0.24) 0%, transparent 65%);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-inline: ${({ theme }) => theme.spacing[3]};
  }
`;

const Item = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.s};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    margin-top: ${({ theme }) => theme.spacing[3]};
    background: ${({ $line }) => $line};
  }
`;

const ItemDesc = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.75;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }
`;

const items = [
  {
    title: '01. Dark · Neon · Glass',
    desc: '어둠 속에서 빛나는 네온 UI. backdrop-filter blur 글라스 레이어로 게이밍 셋업의 감성을 그대로 담아낸 인터페이스.',
    color: '#A78BFA',
    line: 'linear-gradient(90deg, #7C3AED 0%, rgba(124,58,237,.7) 25%, #A78BFA 50%, rgba(124,58,237,.7) 75%, transparent 100%)',
  },
  {
    title: '02. Energy Signal',
    desc: 'Pulse Wave 시그니처 심볼로 시각화된 에너지, 게이밍의 긴장감과 반응 속도를 브랜드 아이덴티티로 승화시킨 비주얼 언어.',
    color: '#FF919E',
    line: 'linear-gradient(90deg, #FF919E 0%, rgba(255,145,158,.7) 25%, #DDBBBF 50%, rgba(255,145,158,.7) 75%, transparent 100%)',
  },
  {
    title: '03. 3-Tap Checkout',
    desc: '3탭 결제 완료 및 실시간 재고 연동. 클릭과 동시에 반응하는 스마트 장바구니 시스템으로 쇼핑의 흐름을 끊김 없이 연결.',
    color: '#93C5FD',
    line: 'linear-gradient(90deg, #3B82F6 0%, rgba(59,130,246,.7) 25%, #60A5FA 50%, rgba(59,130,246,.7) 75%, transparent 100%)',
  },
  {
    title: '04. Magenta × Purple',
    desc: 'Pulse Magenta → Purple → Blue 트라이아드. 네온 발광 감성과 경쟁력 있는 컬러 시스템으로 셋업의 개성을 극대화.',
    color: '#C4B5FD',
    line: 'linear-gradient(90deg, #A78BFA 0%, rgba(167,139,250,.7) 25%, #818CF8 50%, rgba(167,139,250,.7) 75%, transparent 100%)',
  },
];

export default function BrandPromiseSec() {
  const isDarkMode = useThemeStore((s) => s.isDarkMode);
  const bannerImg = isDarkMode ? darkBannerImg : lightBannerImg;

  const section = (
    <BaseSection
      label="Brand Promise"
      title="WHY PULSE"
      sub="PULSE가 만드는 게이밍 기어 경험의 4가지 약속"
    />
  );

  return (
    <SectionWrap>
      <ImgSide>
        <Img className="banner-img" src={bannerImg} alt="Why Pulse" />
        <ImgTextWrapTablet>{section}</ImgTextWrapTablet>
      </ImgSide>

      <Inner>
        <ImgTextWrap className="img-text-wrap">{section}</ImgTextWrap>
        <ListSide>
          {items.map((item) => (
            <Item key={item.title}>
              <ItemTitle $color={item.color} $line={item.line}>
                {item.title}
              </ItemTitle>
              <ItemDesc>{item.desc}</ItemDesc>
            </Item>
          ))}
        </ListSide>
      </Inner>
    </SectionWrap>
  );
}
