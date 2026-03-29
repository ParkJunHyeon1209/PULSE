import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseToneCard from './common/BaseToneCard';
import { getDropProducts } from '../../../data/mainApi';
import useSlider from '../../../hooks/useSlider';

const CARD_WIDTH = 'clamp(260px, 28vw, 404px)';
const CARD_OFFSET = 'clamp(208px, 28vw, 404px)';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[18]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0 ${theme.spacing[20]}`};
  /* overflow: hidden; */
`;

const HeadWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Track = styled.div`
  position: relative;
  height: clamp(348px, 38vw, 510px);
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

const getCardTransform = (slot) =>
  `translate(-50%, -50%) translateX(${getCardOffset(slot)}) scale(${getCardScale(slot)})`;

const CardWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${CARD_WIDTH};
  aspect-ratio: 3 / 4;
  cursor: ${({ $slot }) => ($slot === -1 || $slot === 1 ? 'pointer' : 'default')};
  transform: ${({ $slot }) => getCardTransform($slot)};
  transform-origin: center center;
  will-change: transform, opacity, filter;
  opacity: ${({ $slot }) => ($slot === 0 ? 1 : $slot === null ? 0 : 0.65)};
  filter: ${({ $slot }) => ($slot === 0 ? ' brightness(1.04) saturate(1.1)' : 'grayscale(70%)')};
  z-index: ${({ $slot }) => ($slot === 0 ? 10 : $slot === null ? 0 : 5)};
  pointer-events: ${({ $slot }) => ($slot === null ? 'none' : 'auto')};
  transition:
    transform 550ms cubic-bezier(0.32, 0.72, 0, 1),
    opacity 400ms ease,
    filter 400ms ease;
`;

export default function ShowcaseSec() {
  const [dropProducts, setDropProducts] = useState([]);
  const navigate = useNavigate();
  const count = dropProducts.length;
  const { activeIndex, move, setIsPaused } = useSlider(count);
  const touchX = useRef(null);

  useEffect(() => {
    getDropProducts().then(setDropProducts);
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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {dropProducts.map((card, i) => {
          const slot = getPos(i);
          return (
            <CardWrap
              key={card.id}
              $slot={slot}
              onClick={() => {
                if (slot === -1) move(-1);
                else if (slot === 1) move(1);
                else navigate(`product/${card.id}`);
              }}
            >
              <BaseToneCard
                img={card.image}
                label={card.meta}
                name={card.title}
                count={card.desc}
                tone={card.tone}
                height="100%"
                badge={card.tag}
                beamOver
                arrow={card.arrow}
              />
            </CardWrap>
          );
        })}
      </Track>
    </SectionWrap>
  );
}
