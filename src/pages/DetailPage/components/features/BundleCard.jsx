import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  CardWish,
  CardBadge,
  CardAddBtn,
  CardGlow,
  CardShim,
} from '../../../../components/common/CardParts';
import BaseSparkIcon from '../../../../components/common/BaseSparkIcon';
import { HeartIcon, PluseIcon } from '../../../../assets/icons/BtnIcon';
import useCartStore from '../../../../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import { BADGE_TONE } from '../../../../utils/toneMap';
import useWishlistStore from '../../../../store/useWishlistStore';

import useAuthStore from '../../../../store/useAuthStore';

/* 번들 전체 섹션 감싸는 영역 */
const BundleCardLayout = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/* 상단 제목 영역 */
const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

/* PULSE BUNDLE 제목 */
const Title = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  line-height: 1;

  > span:first-of-type {
    color: ${({ theme }) => theme.colors.text};
    padding-right: ${({ theme }) => theme.spacing[3]};
  }

  > span:last-of-type {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* Recommendation 설명 문구 */
const SubText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* 카드 3개 배치 영역 */
const CardList = styled.div`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[10]};

  /* 태블릿부터 줄바꿈 허용 */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;

/* -------------------------------------------------------------------------- */
/* 카드 영역 */
/* -------------------------------------------------------------------------- */

/*
  카드 하나
  - flex: 1 1 0; 으로 3개가 가로폭을 균등하게 꽉 채움
  - min-width: 0; 없으면 내부 텍스트 때문에 width 계산이 틀어질 수 있음
*/
const Card = styled.article`
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  min-height: 372px;
  border-radius: ${({ theme }) => theme.radii.xxl};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition:
    transform ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};

  /*
    카드 맨 아래 얇은 라인
    이미지처럼 바닥에 살짝 빛나는 라인 느낌
  */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.5px;
    background: ${({ theme }) => theme.gradients?.violetBlue || theme.colors.primary};
    opacity: 0.9;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBlue};
  }

  /* hover 시 글로우 나타남 */
  &:hover .card-glow {
    opacity: 1;
  }

  /* hover 시 반짝이는 사선 광택 */
  &:hover .card-shim {
    opacity: 1;
    transform: translateX(110%);
    transition:
      opacity 0.15s ease-in,
      transform 0.72s cubic-bezier(0.22, 0.8, 0.36, 1);
  }

  /* hover 시 찜 버튼 조금 더 또렷하게 */
  &:hover .card-wish {
    opacity: 1;
    transform: translateY(0);
  }

  /* 태블릿: 2개씩 */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 calc(50% - 12px);
  }

  /* 모바일: 1개씩 */
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 100%;
    min-height: 228px;
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`;

/*
  실제 상품 이미지
  - 꽉 차게 깔고
  - 그 위에 overlay / 텍스트를 올림
*/
const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/*
  이미지가 없을 때 대신 중앙에 반짝이 아이콘 표시
  지금 피그마 예시처럼 중앙 spark 용도
*/
const SparkWrap = styled.div`
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

/*
  이미지 위에 입히는 컬러 오버레이
  - 위쪽은 퍼플/블루
  - 아래쪽은 좀 더 진하게
*/
const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      180deg,
      rgba(109, 40, 217, 0.24) 0%,
      rgba(59, 130, 246, 0.18) 45%,
      rgba(9, 6, 19, 0.84) 100%
    ),
    ${({ theme }) => theme.colors.cardBgGrad || 'transparent'};
`;

/* 카드 상단 영역: 배지 + 하트 */
const CardTop = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

/* 카드 하단 영역: 텍스트 + 플러스 버튼 */
const CardBottom = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

/* 상품 텍스트 묶음 */
const TextGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

/* 상품명 */
const ProductTitle = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
`;

/* 상품 메타 정보 */
const ProductMeta = styled.p`
  margin: ${({ theme }) => theme.spacing[2]} 0 0;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/* 가격 */
const ProductPrice = styled.p`
  margin: ${({ theme }) => theme.spacing[4]} 0 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

/* -------------------------------------------------------------------------- */
/* 데이터 가공 */
/* -------------------------------------------------------------------------- */

/*
  카테고리별로 대표 색감 tone 반환
  BaseSparkIcon / CardGlow 등에 활용 가능
*/
const getToneByCategory = (item) => {
  const value = item?.type || item?.category || '';

  if (value.includes('mouse')) return 'Blue';
  if (value.includes('headset')) return 'Blue';
  if (value.includes('earphone')) return 'Blue';
  if (value.includes('controller')) return 'Blue';
  if (value.includes('console')) return 'Blue';
  return 'Blue';
};

/* -------------------------------------------------------------------------- */
/* 번들 카드 한 장 */
/* -------------------------------------------------------------------------- */

function BundleItemCard({ item, onRequireLogin }) {
  const navigate = useNavigate();

  const isLogin = useAuthStore((state) => state.isLogin);
  const addToCart = useCartStore((state) => state.addToCart);

  const wishlistIds = useWishlistStore((state) => state.wishlistIds);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const liked = wishlistIds.includes(item?.id);

  /* 현재는 전부 블루 계열 무드로 맞춤 */
  const tone = getToneByCategory(item);
  const badgeText = item.tag || item.badge || 'new';
  const badgeTone = BADGE_TONE[String(badgeText).trim().toLowerCase()] ?? 'col';
  const handleClickAddCart = (e) => {
    e.stopPropagation();

    if (!isLogin) {
      onRequireLogin?.();
      return;
    }

    addToCart(item);
  };
  const handleClickWishlist = (e) => {
    e.stopPropagation();

    if (!isLogin) {
      onRequireLogin?.();
      return;
    }

    if (!item?.id) return;

    toggleWishlist(item.id);
  };
  const handleMoveDetail = () => {
    navigate(`/product/${item.id}`);
  };

  return (
    <Card onClick={handleMoveDetail}>
      {/* hover 시 지나가는 반짝 광택 */}
      <CardShim className="card-shim" aria-hidden="true" />

      {/* 실제 상품 이미지가 있으면 깔아줌 */}
      {item.image ? (
        <CardImage src={item.image} alt={item.title} />
      ) : (
        /* 이미지 없을 때는 중앙 spark 표시 */
        <SparkWrap>
          <BaseSparkIcon tone={tone} />
        </SparkWrap>
      )}

      {/* 전체 컬러 오버레이 */}
      <CardOverlay />

      {/* glow 효과 */}
      <CardGlow className="card-glow" $tone="Blue" aria-hidden="true" />

      {/* 카드 상단: 배지 / 하트 */}
      <CardTop>
        <CardBadge variant="c-badge" tone={badgeTone} icon={false} height="32px">
          {badgeText}
        </CardBadge>

        <CardWish
          className="card-wish"
          variant="ic-btn"
          size="32px"
          flex="0 0 auto"
          icon={false}
          aria-label="찜하기"
          onClick={handleClickWishlist}
          $isLiked={liked}
        >
          <HeartIcon />
        </CardWish>
      </CardTop>

      {/* 카드 하단: 제목 / 메타 / 가격 / 추가 버튼 */}
      <CardBottom>
        <TextGroup>
          <ProductTitle>{item.title}</ProductTitle>
          <ProductMeta>{item.meta}</ProductMeta>
          <ProductPrice>{item.price?.toLocaleString()}원</ProductPrice>
        </TextGroup>

        <CardAddBtn
          variant="ic-btn"
          size="36px"
          flex="0 0 auto"
          icon={false}
          aria-label="장바구니 담기"
          onClick={handleClickAddCart}
        >
          <PluseIcon />
        </CardAddBtn>
      </CardBottom>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* 메인 컴포넌트 */
/* -------------------------------------------------------------------------- */

export default function BundleCard({ currentType, teamProducts, onRequireLogin }) {
  /*
    현재 상세 카테고리와 다른 상품들만 추려서
    랜덤으로 3개 뽑음
  */
  const normalizeValue = (value) =>
    String(value || '')
      .trim()
      .toLowerCase();

  const randomProducts = useMemo(() => {
    if (!teamProducts || !teamProducts.length) return [];

    const filteredProducts = teamProducts.filter(
      (item) => normalizeValue(item.type) !== normalizeValue(currentType)
    );

    const copiedProducts = [...filteredProducts];
    const pickedProducts = [];

    for (let i = 0; i < 3 && copiedProducts.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * copiedProducts.length);
      pickedProducts.push(copiedProducts[randomIndex]);
      copiedProducts.splice(randomIndex, 1);
    }

    return pickedProducts;
  }, [currentType, teamProducts]);

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
        <SubText>Recommendation · 함께 쓰면 완성되는 셋업</SubText>
      </CardHeader>

      <CardList>
        {randomProducts.map((item) => (
          <BundleItemCard key={item.id} item={item} onRequireLogin={onRequireLogin} />
        ))}
      </CardList>
    </BundleCardLayout>
  );
}
