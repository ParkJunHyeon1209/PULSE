import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseToneCard from './common/BaseToneCard';
import { getBrowse } from '../../../data/mainApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToneCardSkeletonItem } from '../../../components/common/Skeleton';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0`};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};

  & > article:first-of-type {
    grid-column: span 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    & > article:first-of-type {
      grid-column: span 1;
    }
  }
`;









export default function CategorySec() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await getBrowse();
        setCategory(data);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return (
    <SectionWrap>
      <BaseSection
        label="Categories"
        title="BROWSE"
        sub="플레이 스타일에 맞는 기어 컬렉션을 찾아보세요."
      />
      <Grid>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <ToneCardSkeletonItem
                key={index}
                as="article"
                height="210px"
                labelWidth="84px"
                labelHeight="16px"
                titleWidth="58%"
                titleHeight="24px"
                countWidth="42%"
                countHeight="18px"
              />
            ))
          : category.map((item) => (
              <BaseToneCard
                img={item.bgImg}
                key={item.categoryId}
                name={item.categoryId}
                count={`${item.totalCount} Products`}
                tone={item.categoryId}
                imgBlendMode="hard-light"
                imgFilter="brightness(1.2) saturate(1)"
                onClick={() => {
                  item.categoryId === 'LINEUP'
                    ? navigate('/categories')
                    : navigate(`/categories/${item.categoryId.toLowerCase()}`);
                }}
              />
            ))}
      </Grid>
    </SectionWrap>
  );
}
