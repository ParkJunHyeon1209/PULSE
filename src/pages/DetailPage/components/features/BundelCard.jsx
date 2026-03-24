import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { CardWish } from '../../../../components/common/CardParts';

const BundleCardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing[40]};
`;
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};

  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;

  > span:first-of-type {
    color: ${({ theme }) => theme.colors.wColor};
    padding-right: ${({ theme }) => theme.spacing[3]};
  }

  > span:last-of-type {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardList = styled.div`
  width: 100%;
  display: flex;
  margin-top: ${({ theme }) => theme.spacing[10]};
  gap: ${({ theme }) => theme.spacing[6]};
`;
const Card = styled.article`
  position: relative;
  min-height: 372px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.xxl};
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    background: ${({ $tone, theme }) => theme.cardLine[$tone]};
    opacity: 0.7;
    transition:
      opacity 0.4s,
      height 0.4s;
    border-radius: 0 0 ${({ theme }) => theme.radii.xxl} ${({ theme }) => theme.radii.xxl};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $tone, theme }) => theme.effects[`hoverShadowCategory${$tone}`]};
  }

  &:hover .card-overlay::after {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
    height: 2px;
  }

  &:hover .card-glow {
    opacity: 1;
  }

  &:hover .card-shim {
    opacity: 1;
    transform: translateX(110%);
    transition:
      opacity 0.15s ease-in,
      transform 0.72s cubic-bezier(0.22, 0.8, 0.36, 1);
  }

  &:hover .card-wish {
    opacity: 1;
    transform: translateY(0);
  }
`;
const CardImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: ${({ theme }) => theme.colors.cardBgGrad};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.cardBgGradH};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion.normal};
  }
`;

export default function BundelCard({ category, teamProducts }) {
  const randomProducts = useMemo(() => {
    if (!teamProducts || !teamProducts.length) return [];

    const filteredProducts = teamProducts.filter((item) => item.type !== category);
    const copiedProducts = [...filteredProducts];
    const pickedProducts = [];

    for (let i = 0; i < 3 && copiedProducts.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * copiedProducts.length);
      pickedProducts.push(copiedProducts[randomIndex]);
      copiedProducts.splice(randomIndex, 1);
    }

    return pickedProducts;
  }, [category, teamProducts]);
  if (!randomProducts.length) {
    return <div>추천 상품이 없습니다.</div>;
  }
  return (
    <BundleCardLayout>
      <CardHeader>
        <Title>
          <span>PULSE</span>
          <span>BUNDLE</span>
        </Title>
        <p>Recommendation · 함께 쓰면 완성되는 셋업</p>
      </CardHeader>
      <CardList>
        {randomProducts.map((item) => (
          <Card key={item.id}>
            <CardImage src={item.image} alt={item.title} />
            <CardOverlay />
            <div>{item.badge}</div>
            <p>{item.title}</p>
            <p>{item.meta}</p>
            <p>{item.price?.toLocaleString()}원</p>
          </Card>
        ))}
      </CardList>
    </BundleCardLayout>
  );
}
