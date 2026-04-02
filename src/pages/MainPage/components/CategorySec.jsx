import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseToneCard from './common/BaseToneCard';
import { getBrowse } from '../../../data/mainApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const SkeletonCategoryCard = styled.div`
  position: relative;
  min-height: 240px;
  border-radius: ${({ theme }) => theme.radii.xxl};
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
    animation: categorySkeletonShimmer 1.5s infinite;
  }

  @keyframes categorySkeletonShimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

const SkeletonCategoryImage = styled.div`
  width: 100%;
  height: 65%;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'
      : 'linear-gradient(180deg, rgba(124,58,237,0.10), rgba(124,58,237,0.05))'};
`;

const SkeletonCategoryBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[5]};
`;

const SkeletonCategoryLine = styled.div`
  width: ${({ $w }) => $w || '100%'};
  height: ${({ $h }) => $h || '16px'};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(124,58,237,0.1)'};
`;

// const items = [
//   { label: 'Category 01', name: 'LINEUP', count: '12 Products', tone: 'violet' },
//   { label: 'Category 02', name: 'HEADSET', count: '8 Products', tone: 'blue' },
//   { label: 'Category 03', name: 'GEAR', count: '6 Products', tone: 'pink' },
//   { label: 'Category 04', name: 'CONSOLE', count: '4 Products', tone: 'mint' },
//   { label: 'Category 05', name: 'DROPS', count: 'Limited Edition', tone: 'indigo' },
// ];

export default function CategorySec() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // console.log(category);

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
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCategoryCard key={index}>
                <SkeletonCategoryImage />
                <SkeletonCategoryBody>
                  <SkeletonCategoryLine $w="84px" $h="16px" />
                  <SkeletonCategoryLine $w="58%" $h="24px" />
                  <SkeletonCategoryLine $w="42%" $h="18px" />
                </SkeletonCategoryBody>
              </SkeletonCategoryCard>
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
