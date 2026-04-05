import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseToneCard from './common/BaseToneCard';
import { getDropProducts } from '../../../data/mainApi';
import useSlider from '../../../hooks/useSlider';
import { ArrowUpRightIconL } from '../../../assets/icons/BtnIcon';
import { ToneCardSkeletonItem } from '../../../components/common/Skeleton';

const CARD_WIDTH = 'clamp(260px, 32vw, 400px)';
const CARD_OFFSET = 'clamp(208px, 30.5vw, 400px)';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[18]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0 ${theme.spacing[20]}`};
`;

const HeadWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Track = styled.div`
  position: relative;
  height: clamp(348px, 38vw, 510px);
  perspective: 1200px;

  &.is-resizing * {
    transition: none;
  }
`;

const getCardScale = (slot) => {
  if (slot === 0) return 1;
  if (slot === -1 || slot === 1) return 0.8;
  return 0.7;
};

const getCardOffset = (slot) => {
  if (slot === -1) return `calc(0px - ${CARD_OFFSET})`;
  if (slot === 1) return CARD_OFFSET;
  return '0px';
};

const getCardRotateY = (slot) => {
  if (slot === 1) return 'rotateY(-30deg)';
  if (slot === -1) return 'rotateY(30deg)';
  return 'rotateY(0deg)';
};

const getCardTransform = (slot) =>
  `translate(-50%, -50%) translateX(${getCardOffset(slot)}) scale(${getCardScale(slot)})`;

const getCardTransformMobile = (slot) =>
  `translate(-50%, -50%) translateX(${getCardOffset(slot)}) ${getCardRotateY(slot)} scale(${getCardScale(slot)})`;

const CardWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${CARD_WIDTH};
  aspect-ratio: 3 / 4;
  cursor: ${({ $slot }) => ($slot === null ? 'default' : 'pointer')};
  transform: ${({ $slot }) => getCardTransform($slot)};
  transform-origin: center center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: ${({ $slot }) => getCardTransformMobile($slot)};
  }
  will-change: transform, opacity, filter;
  opacity: ${({ $slot }) => ($slot === 0 ? 1 : $slot === null ? 0 : 0.65)};
  filter: ${({ $slot }) => ($slot === 0 ? ' brightness(1.04) saturate(1.1)' : 'grayscale(50%)')};
  z-index: ${({ $slot }) => ($slot === 0 ? 10 : $slot === null ? 0 : 5)};
  pointer-events: ${({ $slot }) => ($slot === null ? 'none' : 'auto')};
  transition:
    transform 550ms cubic-bezier(0.32, 0.72, 0, 1),
    opacity 400ms ease,
    filter 400ms ease;
`;

const BackContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  z-index: 2;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const BackTitle = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: clamp(18px, 2.5vw, 32px);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.wColor};
  transition: font-size 300ms ease;
`;

const BackDesc = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.wColor + 'b3'};
  line-height: 1.4;
`;

const BackSpecTable = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: ${({ theme }) => theme.spacing[5]};
  padding: 0 ${({ theme }) => theme.spacing[1]};
`;

const BackSpecRow = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[2]} 0`};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: ${({ theme }) => theme.fontSize.xxxs};

  > span:first-of-type {
    color: ${({ theme }) => theme.colors.wColor + '80'};
    font-weight: 600;
  }

  > span:last-of-type {
    color: ${({ theme }) => theme.colors.wColor};
  }
`;

const BackTopRow = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[5]};
  right: ${({ theme }) => theme.spacing[5]};
`;

const GoBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme }) => theme.colors.wColor};
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  & > * {
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.28);
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.94);
  }
`;

export default function ShowcaseSec() {
  const [dropProducts, setDropProducts] = useState([]);
  const [flippedId, setFlippedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const count = loading ? 3 : dropProducts.length;
  const { activeIndex, move, setIsPaused } = useSlider(count);
  const touchX = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let timeout;
    const onResize = () => {
      trackRef.current?.classList.add('is-resizing');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        trackRef.current?.classList.remove('is-resizing');
      }, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const fetchDropProducts = async () => {
      try {
        setLoading(true);
        const data = await getDropProducts();
        setDropProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchDropProducts();
  }, []);

  const getPos = (i) => {
    const diff = (i - activeIndex + count) % count;
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    if (diff === count - 1) return -1;
    return null;
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 44) move(delta > 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <SectionWrap>
      <HeadWrap>
        <BaseSection
          label="Real Gear · Real Signal"
          title="PLAYED BY"
          colorTitle="REAL PLAYERS"
          sub="감각에 반응하는 기어. 플레이어가 직접 선택한 PULSE 라인업."
          align="center"
          titleFont="display"
          titleSize="lg"
        />
      </HeadWrap>

      <Track
        ref={trackRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {(loading ? [0, 1, 2] : dropProducts).map((card, i) => {
          const slot = loading ? (i === 0 ? -1 : i === 1 ? 0 : 1) : getPos(i);

          return (
            <CardWrap
              key={loading ? `skeleton-${i}` : card.id}
              $slot={slot}
              onClick={() => {
                if (loading) return;
                if (slot === -1) move(-1);
                else if (slot === 1) move(1);
                else setFlippedId((prev) => (prev === card.id ? null : card.id));
              }}
            >
              {loading ? (
                <ToneCardSkeletonItem
                  as="article"
                  height="100%"
                  surfaceVariant="showcase"
                  labelWidth="90px"
                  labelHeight="16px"
                  titleWidth="68%"
                  titleHeight="24px"
                  countWidth="44%"
                  countHeight="18px"
                />
              ) : (
                <BaseToneCard
                  white
                  isCenter={slot === 0}
                  imgOpacity={0.9}
                  imgPosition="top"
                  img={card.image}
                  label={card.meta}
                  name={card.title}
                  count={card.desc}
                  tone={card.tag}
                  height="100%"
                  imgFilter="brightness(1.2) saturate(1.2)"
                  badge={card.tag}
                  beamOver
                  // arrow={card.arrow}
                  nameSize="clamp(18px, 2.5vw, 32px)"
                  flipped={flippedId === card.id && slot === 0}
                  backSlot={
                    <BackContent>
                      <BackTopRow>
                        <GoBtn
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${card.id}`);
                          }}
                        >
                          <ArrowUpRightIconL width={24} height={24} />
                        </GoBtn>
                      </BackTopRow>
                      <BackTitle>{card.title}</BackTitle>
                      <BackDesc>{card.desc}</BackDesc>
                      {card.specs && Object.keys(card.specs).length > 0 && (
                        <BackSpecTable>
                          {Object.entries(card.specs)
                            .slice(0, 4)
                            .map(([key, val]) => (
                              <BackSpecRow key={key}>
                                <span>{key}</span>
                                <span>{val}</span>
                              </BackSpecRow>
                            ))}
                        </BackSpecTable>
                      )}
                    </BackContent>
                  }
                />
              )}
            </CardWrap>
          );
        })}
      </Track>
    </SectionWrap>
  );
}
