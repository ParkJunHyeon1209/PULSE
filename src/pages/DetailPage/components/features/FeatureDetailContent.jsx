import React from 'react';
import styled from '@emotion/styled';

const DetailContent = styled.div`
  width: 100%;
`;

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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxs};

    span {
      font-size: ${({ theme }) => theme.fontSize.xxxs};
    }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.fontSize.xs};

    p:first-of-type {
      font-size: ${({ theme }) => theme.fontSize.md};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.fontSize.xxs};

    p:first-of-type {
      font-size: ${({ theme }) => theme.fontSize.sm};
    }
  }
`;

const SpecList = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[20]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[14]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;
const SpecPreview = styled.div`
  width: 100%;
  height: 420px;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.checkbox.bg};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 230px;
  }
`;

const SpecPreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.checkbox.bg};
  object-fit: cover;
  display: block;
`;

const SpecItem = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[12]} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[8]} 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[6]} 0;
  }
`;
const SpecLine = styled.p`
  display: grid;
  grid-template-columns: 14ch minmax(0, 1fr);
  align-items: start;
  column-gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[4]} 0;
  border-bottom: 1px solid ${({ theme }) => theme.Line};

  &:last-of-type {
    border-bottom: none;
  }

  > span:first-of-type {
    min-width: 0;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
  }

  > span:last-of-type {
    min-width: 0;
    font-size: ${({ theme }) => theme.fontSize.xs};
    color: ${({ theme }) => theme.colors.text};
    text-align: right;
    line-height: 1.5;
    white-space: normal;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  &:nth-of-type(odd) {
    > span:last-of-type {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 12ch minmax(0, 1fr);
    column-gap: ${({ theme }) => theme.spacing[5]};

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
    padding: ${({ theme }) => theme.spacing[4]} 0;

    > span:first-of-type {
      font-size: ${({ theme }) => theme.fontSize.xxxs};
    }

    > span:last-of-type {
      font-size: ${({ theme }) => theme.fontSize.xs};
      text-align: left;
    }
  }
`;
export default function FeatureDetailContent({ visibleSpecs = [], product }) {
  return (
    <DetailContent>
      <FeatureImage src={product.image} alt={product.title} />
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
        <SpecPreview>
          <SpecPreviewImage src={product.image} alt={product.title} />
        </SpecPreview>
        <SpecItem>
          {visibleSpecs.map((item, index) => (
            <SpecLine key={`${item.label}-${index}`}>
              <span>{item.label}</span>
              <span>{item.value}</span>
            </SpecLine>
          ))}
        </SpecItem>
      </SpecList>
    </DetailContent>
  );
}
