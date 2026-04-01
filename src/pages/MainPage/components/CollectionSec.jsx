import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import BaseSection from '../../../components/common/BaseSection';
import BaseProductCard from '../../../components/common/BaseProductCard';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getColProducts } from '../../../data/mainApi';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0`};
`;

const Grid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: clamp(8px, 1.5vw, ${({ theme }) => theme.spacing[5]});
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-block: ${({ theme }) => theme.spacing[6]};
  margin-block: -${({ theme }) => theme.spacing[6]};

  &::-webkit-scrollbar {
    height: 0;
  }

  scrollbar-width: none;

  > article {
    flex-shrink: 0;
    flex-basis: clamp(150px, 28%, 300px);
    min-height: clamp(280px, 37vw, 400px);
    scroll-snap-align: start;
  }
`;

const EdgeFade = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(72px, 9vw, 140px);
  pointer-events: none;
  z-index: 2;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.motion.normal};

  ${({ $direction, theme }) =>
    $direction === 'left'
      ? `
        left: 0;
        background: linear-gradient(
          to right,
          ${theme.mode === 'dark' ? 'rgba(10, 5, 24, 0.62)' : 'rgba(236, 233, 255, 0.42)'} 0%,
          ${theme.mode === 'dark' ? 'rgba(10, 5, 24, 0.42)' : 'rgba(236, 233, 255, 0.22)'} 22%,
          ${theme.mode === 'dark' ? 'rgba(10, 5, 24, 0.24)' : 'rgba(236, 233, 255, 0.18)'} 32%,
          transparent 100%
        );
      `
      : `
        right: 0;
        background: linear-gradient(
          to left,
          ${theme.mode === 'dark' ? 'rgba(10, 5, 24, 0.62)' : 'rgba(236, 233, 255, 0.42)'} 0%,
          ${theme.mode === 'dark' ? 'rgba(10, 5, 24, 0.42)' : 'rgba(236, 233, 255, 0.22)'} 22%,
          ${theme.mode === 'dark' ? 'rgba(10, 5, 24, 0.24)' : 'rgba(236, 233, 255, 0.18)'} 32%,
          transparent 100%
        );
      `}
`;

const CarouselWrap = styled.div`
  position: relative;
  overflow: hidden;
  padding-block: ${({ theme }) => theme.spacing[8]};
  margin-block: -${({ theme }) => theme.spacing[8]};
`;

const ArrowHitButton = styled.button`
  position: absolute;
  top: -${({ theme }) => theme.spacing[8]};
  bottom: -${({ theme }) => theme.spacing[8]};
  width: clamp(72px, 9vw, 140px);
  ${({ $direction }) => ($direction === 'left' ? 'left: 0;' : 'right: 0;')}
  z-index: 4;

  display: flex;
  align-items: center;
  justify-content: ${({ $direction }) => ($direction === 'left' ? 'flex-start' : 'flex-end')};

  padding: ${({ $direction }) => ($direction === 'left' ? '0 0 0 14px' : '0 14px 0 0')};
  border: 0;
  background: transparent;
  cursor: pointer;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

  transition: opacity ${({ theme }) => theme.motion.fast};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 64px;
    padding: ${({ $direction }) => ($direction === 'left' ? '0 0 0 8px' : '0 8px 0 0')};
  }
`;

const ArrowIconWrap = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
  color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ $active }) => ($active ? 1 : 0.78)};
  transform: ${({ $direction, $active }) =>
    $direction === 'left'
      ? `translateX(${$active ? '-6px' : '-2px'})`
      : `translateX(${$active ? '6px' : '2px'})`};
  background: ${({ theme, $active }) =>
    $active
      ? theme.mode === 'dark'
        ? 'rgba(255,255,255,0.05)'
        : 'rgba(255,255,255,0.32)'
      : theme.mode === 'dark'
        ? 'rgba(255,255,255,0.02)'
        : 'rgba(255,255,255,0.18)'};
  box-shadow: ${({ theme, $active }) =>
    $active
      ? theme.mode === 'dark'
        ? '0 0 18px rgba(124,58,237,0.18)'
        : '0 0 18px rgba(124,58,237,0.12)'
      : 'none'};
  transition:
    transform ${({ theme }) => theme.motion.fast},
    opacity ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 36px;
    height: 36px;
  }
`;

function ChevronIcon({ direction = 'right' }) {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  const fill = isDark ? '#9FA8FF' : '#120516';
  const fillOpacity = isDark ? '0.76' : '0.76';
  const strokeColor = isDark ? '#9FA8FF' : '#120516';
  const strokeOpacity = isDark ? '0.5' : '0.68';

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform={direction === 'left' ? 'rotate(180 8 8)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.12588 2.13558C5.16568 2.0926 5.21296 2.0585 5.26501 2.03524C5.31707 2.01198 5.37287 2 5.42923 2C5.48559 2 5.54139 2.01198 5.59344 2.03524C5.6455 2.0585 5.69278 2.0926 5.73258 2.13558L10.8741 7.67339C10.914 7.71626 10.9457 7.76718 10.9673 7.82325C10.9889 7.87932 11 7.93942 11 8.00012C11 8.06082 10.9889 8.12093 10.9673 8.17699C10.9457 8.23306 10.914 8.28398 10.8741 8.32685L5.73258 13.8647C5.65213 13.9513 5.54301 14 5.42923 14C5.31545 14 5.20633 13.9513 5.12588 13.8647C5.04542 13.778 5.00022 13.6605 5.00022 13.5379C5.00022 13.4154 5.04542 13.2979 5.12588 13.2112L9.96493 8.00012L5.12588 2.78904C5.08598 2.74617 5.05432 2.69525 5.03272 2.63918C5.01112 2.58312 5 2.52301 5 2.46231C5 2.40161 5.01112 2.3415 5.03272 2.28544C5.05432 2.22937 5.08598 2.17845 5.12588 2.13558Z"
          fill={fill}
          fillOpacity={fillOpacity}
        />
        <path
          d="M5.42969 1.90039C5.50003 1.90046 5.56926 1.91553 5.63379 1.94434C5.69839 1.97321 5.757 2.01491 5.80566 2.06738L10.9473 7.60547C10.996 7.65786 11.0345 7.71955 11.0605 7.78711C11.0866 7.85473 11.0996 7.92718 11.0996 8C11.0996 8.07285 11.0866 8.14524 11.0605 8.21289C11.0345 8.28046 10.996 8.34212 10.9473 8.39453L5.80566 13.9326C5.70724 14.0386 5.57229 14.0995 5.42969 14.0996C5.2869 14.0996 5.15127 14.0387 5.05273 13.9326C4.95446 13.8268 4.90043 13.6848 4.90039 13.5381C4.90039 13.3914 4.95451 13.2494 5.05273 13.1436L9.82812 8L5.05273 2.85742C5.00391 2.80496 4.96552 2.74247 4.93945 2.6748C4.91346 2.60722 4.90039 2.53468 4.90039 2.46191C4.90044 2.38918 4.91343 2.31656 4.93945 2.24902C4.96552 2.18152 5.00401 2.11973 5.05273 2.06738C5.1014 2.0149 5.16 1.97321 5.22461 1.94434C5.28929 1.91546 5.35917 1.90039 5.42969 1.90039Z"
          stroke={strokeColor}
          strokeOpacity={strokeOpacity}
          strokeWidth="0.3"
        />
      </g>
    </svg>
  );
}

export default function CollectionSec() {
  const [productsList, setProductsList] = useState([]);
  const gridRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isLeftHover, setIsLeftHover] = useState(false);
  const [isRightHover, setIsRightHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getColProducts();
        setProductsList(data);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    };

    fetchProducts();
  }, []);

  const recommendedProducts = useMemo(() => {
    if (!productsList || productsList.length === 0) return [];

    // eslint-disable-next-line
    return [...productsList].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [productsList]);

  const updateArrowState = () => {
    const el = gridRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
  };

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    updateArrowState();

    el.addEventListener('scroll', updateArrowState);
    window.addEventListener('resize', updateArrowState);

    return () => {
      el.removeEventListener('scroll', updateArrowState);
      window.removeEventListener('resize', updateArrowState);
    };
  }, [recommendedProducts]);

  const handleScroll = (direction) => {
    const el = gridRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.72;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <SectionWrap>
      <BaseSection
        label="New Arrivals"
        title="2026 COLLECTION"
        sub="게임과 작업 문화를 위한 PULSE 2026 S/S 기어 라인업."
      />

      <CarouselWrap>
        <EdgeFade $direction="left" $visible={canScrollLeft} />
        <EdgeFade $direction="right" $visible={canScrollRight} />

        <ArrowHitButton
          type="button"
          $direction="left"
          $visible={canScrollLeft}
          onClick={() => handleScroll('left')}
          onMouseEnter={() => setIsLeftHover(true)}
          onMouseLeave={() => setIsLeftHover(false)}
          aria-label="이전 상품 보기"
        >
          <ArrowIconWrap $direction="left" $active={isLeftHover}>
            <ChevronIcon direction="left" />
          </ArrowIconWrap>
        </ArrowHitButton>

        <ArrowHitButton
          type="button"
          $direction="right"
          $visible={canScrollRight}
          onClick={() => handleScroll('right')}
          onMouseEnter={() => setIsRightHover(true)}
          onMouseLeave={() => setIsRightHover(false)}
          aria-label="다음 상품 보기"
        >
          <ArrowIconWrap $direction="right" $active={isRightHover}>
            <ChevronIcon direction="right" />
          </ArrowIconWrap>
        </ArrowHitButton>

        <Grid ref={gridRef}>
          {recommendedProducts.map((item) => (
            <BaseProductCard key={item.id} product={item} hideAddBtn={isMobile} compactPadding />
          ))}
        </Grid>
      </CarouselWrap>
    </SectionWrap>
  );
}
