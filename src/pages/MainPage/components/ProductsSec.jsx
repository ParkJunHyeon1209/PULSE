import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseProductCard from '../../../components/common/BaseProductCard';
import { useEffect, useMemo, useState } from 'react';
import { getColProducts } from '../../../data/mainApi';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0`};
`;

const Grid = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: ${({ theme }) => theme.spacing[5]};

  &::-webkit-scrollbar {
    width: 0;
  }

  > article {
    flex-shrink: 0;
    flex-basis: 250px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export default function ProductsSec() {
  const [productsList, setProductsList] = useState([]);

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

  return (
    <SectionWrap>
      <BaseSection
        label="New Arrivals"
        title="2026 COLLECTION"
        sub="게임과 작업 문화를 위한 PULSE 2026 S/S 기어 라인업."
      />
      <Grid>
        {recommendedProducts.map((item) => (
          <BaseProductCard key={item.id} product={item} />
        ))}
      </Grid>
    </SectionWrap>
  );
}
