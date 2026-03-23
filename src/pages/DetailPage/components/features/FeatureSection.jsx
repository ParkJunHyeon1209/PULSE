import React from 'react';
import styled from '@emotion/styled';

const FeatureLayout = styled.div`
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

export default function FeatureSection() {
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
    </FeatureLayout>
  );
}
