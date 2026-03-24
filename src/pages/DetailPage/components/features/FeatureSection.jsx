import React from 'react';
import styled from '@emotion/styled';
import { categoryDetailApi } from '../../../../data/mockCategoryApi';
import BundelCard from './BundelCard';

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
// 임시 사진
const FeatureImage = styled.img`
  width: 100%;
  height: 800px;
  background: ${({ theme }) => theme.checkbox.bg};
  margin-top: ${({ theme }) => theme.spacing[14]};
  border-radius: ${({ theme }) => theme.radii.xl};
`;

const SectionHeader = styled.div`
  margin-top: ${({ theme }) => theme.spacing[14]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;
const SectionLabel = styled.p`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.sm};

  span {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const SectionTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};

  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  p:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
    background: ${({ theme }) => theme.gradients.lavBlue};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
`;

const SpecList = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[20]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[14]};
`;
const SpecItem = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[12]} 0;
`;
const SpecLine = styled.p`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize.xs};
  border-bottom: 1px solid ${({ theme }) => theme.Line};

  &:last-of-type {
    border-bottom: none;
  }

  > span:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:nth-child(odd) {
    > span:last-child {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export default function FeatureSection({ category, teamProducts }) {
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

      <FeatureImage src="https://placehold.co/1200x600" alt="임시" />
      <SectionHeader>
        <SectionLabel>
          <span>✦</span> PLAYED BY REAL PLAYERS <span>✦</span>
        </SectionLabel>
        <SectionTextGroup>
          <p>초광 게이머가 선택한 장비</p>
          <p>프로게이머가 검증한 성능</p>
        </SectionTextGroup>
      </SectionHeader>
      <SpecList>
        <img src="https://placehold.co/528x395" alt="임시" />
        <SpecItem>
          {visibleSpecs.map((item, index) => (
            <SpecLine key={`${item.label}-${index}`}>
              <span>{item.label}</span>
              <span>{item.value}</span>
            </SpecLine>
          ))}
        </SpecItem>
      </SpecList>
      <BundelCard category={category} teamProducts={teamProducts} />
    </FeatureLayout>
  );
}
