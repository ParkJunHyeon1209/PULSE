import { useMemo } from 'react';
import styled from '@emotion/styled';
import BaseSection from '../../../../components/common/BaseSection';
import BaseProductCard from '../../../../components/common/BaseProductCard';

const BundleCardLayout = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CardList = styled.ul`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[10]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const CardItem = styled.li`
  flex: 1 1 0;
  min-width: 0;
  list-style: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 calc(50% - 12px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 1 1 100%;
    min-width: 0;
  }

  /* BaseProductCard 루트(article) */
  > article {
    min-height: 420px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    /* 모바일에서 기존 번들카드처럼 가로로 길고 낮은 형태로 보정 */
    > article {
      min-height: 228px;
      height: 228px;
      aspect-ratio: unset;
      border-radius: ${({ theme }) => theme.radii.xl};
    }

    /* 카드 상단 영역 */
    > article > div:nth-of-type(1) {
      padding: ${({ theme }) => theme.spacing[3]};
    }

    /* 카드 하단 텍스트 영역 */
    > article > div:nth-of-type(3) {
      gap: ${({ theme }) => theme.spacing[2]};
      padding: ${({ theme }) => theme.spacing[3]};
    }

    /* 플러스 버튼 위치 보정 */
    > article > button {
      bottom: ${({ theme }) => theme.spacing[3]};
      right: ${({ theme }) => theme.spacing[3]};
    }
  }
`;

export default function BundleCard({ currentType, teamProducts }) {
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
      <BaseSection
        label="COMPLETE YOUR LOADOUT"
        title="PULSE"
        colorTitle="BUNDLE"
        sub="함께 쓰면 완성되는 셋업"
        titleSize="xl"
        inline
        solidColor
      />

      <CardList>
        {randomProducts.map((item) => (
          <CardItem key={item.id}>
            <BaseProductCard product={item} cardMinHeight="420px" compactPadding />
          </CardItem>
        ))}
      </CardList>
    </BundleCardLayout>
  );
}
