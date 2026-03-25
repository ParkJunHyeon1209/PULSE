import React, { Suspense, lazy, useState } from 'react';
import styled from '@emotion/styled';
import { categoryDetailApi } from '../../../../data/mockCategoryApi';
import BundleCard from './BundleCard';

const FeatureDetailContent = lazy(() => import('./FeatureDetailContent'));

const FeatureLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing[20]};
`;

const FeatureTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};

  > p:nth-of-type(1) {
    font-size: ${({ theme }) => theme.fontSize.xxxs};

    > span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  > p:nth-of-type(2) {
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.text};
  }
  > p:nth-of-type(3) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const SpecTable = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.Line};
`;
const SpecRow = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[5]};
  border-bottom: 1px solid ${({ theme }) => theme.Line};
  font-size: ${({ theme }) => theme.fontSize.xs};

  &:last-of-type {
    border-bottom: none;
  }
  > span:first-of-type {
    width: 200px;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  &:nth-of-type(2),
  &:nth-of-type(4) {
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
    > span:first-of-type {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
const DetailToggleButton = styled.button`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[10]};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]}`};
  border-top: 1px solid ${({ theme }) => theme.Line};
  border-bottom: 1px solid ${({ theme }) => theme.Line};

  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 400;
  transition:
    transform ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    font-size ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const DetailFallback = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[14]};
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid ${({ theme }) => theme.Line};
  border-radius: ${({ theme }) => theme.radii.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const BundleCardWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing[40]};
`;

export default function FeatureSection({ category, teamProducts, bundleCategory }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!category) return <div>category 없음</div>;
  const featureData = categoryDetailApi[category];
  const specs = featureData?.specs ?? [];

  const visibleSpecs = [...specs.slice(0, 3), ...specs.slice(-3)];

  return (
    <FeatureLayout>
      <FeatureTop>
        <p>
          <span>✦</span> TECH SPECS
        </p>
        <p>GLASSMORPHISM TABLE</p>
        <p>
          <span>정밀 스펙</span>
          <span>성능 데이터</span>
        </p>
      </FeatureTop>

      <SpecTable>
        {specs.map((item, index) => (
          <SpecRow key={`${item.label}-${index}`}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </SpecRow>
        ))}
      </SpecTable>

      {isDetailOpen && (
        <Suspense fallback={<DetailFallback>상세 정보를 불러오는 중...</DetailFallback>}>
          <FeatureDetailContent visibleSpecs={visibleSpecs} />
        </Suspense>
      )}
      <DetailToggleButton type="button" onClick={() => setIsDetailOpen((prev) => !prev)}>
        {isDetailOpen ? '상세정보 접기' : '상세정보 더보기'}
      </DetailToggleButton>
      <BundleCardWrap>
        <BundleCard category={bundleCategory} teamProducts={teamProducts} />
      </BundleCardWrap>
    </FeatureLayout>
  );
}
