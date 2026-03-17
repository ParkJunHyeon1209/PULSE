import styled from '@emotion/styled';
import { useState } from 'react';

const CardContainer = styled.article`
  position: relative;
  min-height: 372px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.xxl};
  background: ${({ theme, backgroundKey }) => theme.card[backgroundKey]};
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};
  display: flex;
  align-items: flex-end;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryPurple};
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 40%;
    background: ${({ theme }) => theme.effects.cb1};
    pointer-events: none;
  }
`;

const CardBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  left: ${({ theme }) => theme.spacing[4]};
  z-index: 3;
  min-width: 52px;
  height: 28px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.24);
  color: ${({ theme }) => theme.status.new};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const CardWishlistButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  z-index: 3;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: rgba(255, 255, 255, 0.06);
  color: ${({ isLiked, theme }) => (isLiked ? '#ff4d6d' : theme.colors.text)};
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const CardBackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  z-index: 0;
`;

const CardSparkWrap = styled.div`
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%);
  width: 88px;
  height: 88px;
  z-index: 0;
  filter: ${({ theme, glowKey }) => theme.spark[glowKey]};
`;

const CardSparkVertical = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  transform: translateX(-50%);
  background: ${({ theme, armKey }) => theme.spark[armKey]};
`;

const CardSparkHorizontal = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  transform: translateY(-50%);
  background: ${({ theme, armKey }) => theme.spark[armKey]};
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(7, 10, 26, 0.06) 0%,
    rgba(7, 10, 26, 0.18) 40%,
    rgba(7, 10, 26, 0.58) 72%,
    rgba(7, 10, 26, 0.88) 100%
  );
`;
const CardBottomGlow = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  height: 42%;
  z-index: 1;
  background: ${({ theme }) => theme.effects.cb1};
  pointer-events: none;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const CardTextGroup = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 800;
  line-height: 1.08;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.p`
  margin: ${({ theme }) => theme.spacing[2]} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`;

const CardPrice = styled.strong`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.infoStrong};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 800;
`;

const CardActionButton = styled.button`
  flex-shrink: 0;
  align-self: flex-end;
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.btn2Bg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const categoryBackgroundMap = {
  gear: 'th1',
  headset: 'th2',
  console: 'th3',
  bundle: 'th4',
  drops: 'th2',
};
const sparkArms = ['csk1Arm', 'csk2Arm', 'csk3Arm', 'csk4Arm', 'csk5Arm'];
const sparkGlows = ['csk1Glow', 'csk2Glow', 'csk3Glow', 'csk4Glow', 'csk5Glow'];

export default function CategoryProductCard({ product, variantIndex = 0 }) {
  const backgroundKey = categoryBackgroundMap[product.category] || 'th1';
  const sparkArmKey = sparkArms[variantIndex % sparkArms.length];
  const sparkGlowKey = sparkGlows[variantIndex % sparkGlows.length];

  const [isLiked, setIsLiked] = useState(false);

  const handleClickWishlist = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <CardContainer backgroundKey={backgroundKey}>
      {product.image ? (
        <CardBackgroundImage src={product.image} alt={product.title} />
      ) : (
        <CardSparkWrap glowKey={sparkGlowKey}>
          <CardSparkVertical armKey={sparkArmKey} />
          <CardSparkHorizontal armKey={sparkArmKey} />
        </CardSparkWrap>
      )}
      <CardOverlay />
      <CardBottomGlow />

      <CardBadge>{product.badge}</CardBadge>
      <CardWishlistButton type="button" onClick={handleClickWishlist} isLiked={isLiked}>
        ♡
      </CardWishlistButton>

      <CardContent>
        <CardTextGroup>
          <CardTitle>{product.title}</CardTitle>
          <CardMeta>{product.meta}</CardMeta>
          <CardPrice>{product.price.toLocaleString()}원</CardPrice>
        </CardTextGroup>

        <CardActionButton type="button">+</CardActionButton>
      </CardContent>
    </CardContainer>
  );
}
