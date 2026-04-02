import React, { Suspense, lazy, useState, useRef } from 'react';
import styled from '@emotion/styled';
// import { categoryDetailApi } from '../../../../data/mockCategoryApi';
import BundleCard from './BundleCard';
import BaseSection from '../../../../components/common/BaseSection';

const FeatureDetailContent = lazy(() => import('./FeatureDetailContent'));

const FeatureLayout = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  padding-top: ${({ theme }) => theme.spacing[20]};
  margin-top: ${({ theme }) => theme.spacing[10]};
`;


const SpecTable = styled.div`
  background: color-mix(in srgb, ${({ theme }) => theme.colors.cardBg} 40%, transparent);
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.Line};
  box-shadow:
    0 4px 32px ${({ theme }) => theme.colors.primary}22,
    0 1px 0 rgba(255, 255, 255, 0.04) inset;
`;

const SpecRow = styled.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  align-items: center;
  column-gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[5]};
  border-bottom: 1px solid ${({ theme }) => theme.Line};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;

  &:last-of-type {
    border-bottom: none;
  }

  > span:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
  }

  > span:last-of-type {
    min-width: 0;
    line-height: 1.5;
    white-space: normal;
    word-break: keep-all;
    overflow-wrap: anywhere;
    text-align: left;
  }

  &:nth-of-type(2),
  &:nth-of-type(4) {
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);

    > span:first-of-type {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 140px minmax(0, 1fr);
    column-gap: ${({ theme }) => theme.spacing[4]};
    padding: ${({ theme }) => theme.spacing[4]};

    > span:first-of-type {
      font-size: ${({ theme }) => theme.fontSize.xxxs};
    }

    > span:last-of-type {
      font-size: ${({ theme }) => theme.fontSize.xxs};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    row-gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[4]};

    > span:first-of-type {
      font-size: ${({ theme }) => theme.fontSize.xxxs};
    }

    > span:last-of-type {
      font-size: ${({ theme }) => theme.fontSize.xs};
    }
  }
`;

const AnimatedWrap = styled.div`
  max-height: ${({ $open }) => ($open ? '4000px' : '0')};
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  overflow: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition:
    max-height ${({ $open }) => ($open ? '0.6s ease' : '0.35s ease')},
    opacity ${({ $open }) => ($open ? '0.4s ease 0.1s' : '0.2s ease')};
`;

const DetailContentWrap = styled.div`
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  height: ${({ $visible }) => ($visible ? 'auto' : '0')};
  overflow: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
`;

const ButtonLabel = styled.span`
  display: inline-block;
  animation: fadeInUp 0.22s ease;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DetailToggleButton = styled.button`
  width: 100%;
  height: 52px;
  margin-top: ${({ theme }) => theme.spacing[10]};
  border-top: 2px solid ${({ theme }) => theme.Line};
  border-bottom: 2px solid ${({ theme }) => theme.Line};

  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  transition:
    border-color ${({ theme }) => theme.motion.normal},
    font-size ${({ theme }) => theme.motion.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary}40;
    font-size: ${({ theme }) => theme.fontSize.xxs};
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 3px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.18);
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const BundleCardWrap = styled.div`
  margin: ${({ theme }) => theme.spacing[40]} 0 ${({ theme }) => theme.spacing[16]}  ;
`;

export default function FeatureSection({
  currentType,
  teamProducts,
  product,
  categoryDetail,
  onRequireLogin,
}) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const toggleBtnRef = useRef(null);
  const prevProductIdRef = useRef(product?.id);

  if (prevProductIdRef.current !== product?.id) {
    prevProductIdRef.current = product?.id;
    setIsDetailOpen(false);
    setIsContentLoading(false);
  }

  if (!currentType) return <div>category 없음</div>;

  const specs = categoryDetail?.specs ?? [];
  const visibleSpecs = [...specs.slice(0, 3), ...specs.slice(-3)];

  const handleToggleDetail = () => {
    if (isDetailOpen) {
      setIsDetailOpen(false);
      setIsContentLoading(false);
      setTimeout(() => {
        toggleBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setIsDetailOpen(true);
    setIsContentLoading(true);
  };

  return (
    <FeatureLayout>
      <BaseSection
        label="TECH SPECS"
        title="PRODUCT"
        colorTitle="SPECS"
        sub="정밀 스펙 · 성능 데이터"
        titleSize="xl"
        inline
        solidColor
      />

      <SpecTable>
        {specs.map((item, index) => (
          <SpecRow key={`${item.label}-${index}`}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </SpecRow>
        ))}
      </SpecTable>

      <AnimatedWrap $open={isDetailOpen}>
        {isDetailOpen && (
          <>
            {isContentLoading && (
              <DetailFallback>
                <LoadingSpinner />
                <LoadingText>상세정보를 불러오는 중...</LoadingText>
              </DetailFallback>
            )}
            <Suspense fallback={null}>
              <DetailContentWrap $visible={!isContentLoading}>
                <FeatureDetailContent
                  visibleSpecs={visibleSpecs}
                  product={product}
                  categoryDetail={categoryDetail}
                  onReady={() => setIsContentLoading(false)}
                />
              </DetailContentWrap>
            </Suspense>
          </>
        )}
      </AnimatedWrap>

      <DetailToggleButton ref={toggleBtnRef} type="button" onClick={handleToggleDetail}>
        <ButtonLabel key={String(isDetailOpen)}>
          {isDetailOpen ? '상세정보 접기' : '상세정보 더보기'}
        </ButtonLabel>
      </DetailToggleButton>

      <BundleCardWrap>
        <BundleCard
          currentType={currentType}
          teamProducts={teamProducts}
          onRequireLogin={onRequireLogin}
        />
      </BundleCardWrap>
    </FeatureLayout>
  );
}
