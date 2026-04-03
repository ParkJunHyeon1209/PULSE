import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import { ChevronIcon } from '../../../assets/icons/BtnIcon';
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

const SkeletonCard = styled.div`
  position: relative;
  flex-shrink: 0;
  flex-basis: clamp(150px, 28%, 300px);
  min-height: clamp(280px, 37vw, 400px);
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBg};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, ${({ theme }) => (theme.mode === 'dark' ? 0.08 : 0.22)}),
      transparent
    );
    animation: collectionSkeletonShimmer 1.5s infinite;
  }

  @keyframes collectionSkeletonShimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(124,58,237,0.08)'};
`;

const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const SkeletonLine = styled.div`
  width: ${({ $w }) => $w || '100%'};
  height: ${({ $h }) => $h || '14px'};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.1)'};
`;

export default function CollectionSec() {
  const [productsList, setProductsList] = useState([]);
  const gridRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isLeftHover, setIsLeftHover] = useState(false);
  const [isRightHover, setIsRightHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 730);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getColProducts();
        setProductsList(data);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
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
        <EdgeFade $direction="left" $visible={!loading && canScrollLeft} />
        <EdgeFade $direction="right" $visible={!loading && canScrollRight} />

        <ArrowHitButton
          type="button"
          $direction="left"
          $visible={!loading && canScrollLeft}
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
          $visible={!loading && canScrollRight}
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
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index}>
                  <SkeletonImage />
                  <SkeletonBody>
                    <SkeletonLine $w="70px" $h="20px" />
                    <SkeletonLine $w="78%" $h="18px" />
                    <SkeletonLine $w="54%" />
                    <SkeletonLine $w="38%" $h="20px" />
                  </SkeletonBody>
                </SkeletonCard>
              ))
            : recommendedProducts.map((item) => (
                <BaseProductCard
                  key={item.id}
                  product={item}
                  hideAddBtn={isMobile}
                  compactPadding
                />
              ))}
        </Grid>
      </CarouselWrap>
    </SectionWrap>
  );
}
