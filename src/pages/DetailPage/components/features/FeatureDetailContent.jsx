FeatureDetailContent.jsx;
import React, { useLayoutEffect } from 'react';
import styled from '@emotion/styled';

const DetailContent = styled.div`
  width: 100%;
`;

const FeatureImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin-top: ${({ theme }) => theme.spacing[14]};
  border-radius: ${({ theme }) => theme.radii.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    object-fit: contain;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    object-fit: contain;
  }
`;

const SpecList = styled.div`
  width: 100%;
  margin: ${({ theme }) => theme.spacing[8]} 0;
  display: grid;
  align-items: center;
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
  /* width: 100%; */
`;

const SpecLine = styled.p`
  display: grid;
  grid-template-columns: 14ch minmax(0, 1fr);
  align-items: center;
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

export default function FeatureDetailContent({
  visibleSpecs = [],
  product,
  categoryDetail,
  onReady,
}) {
  const images = categoryDetail?.images ?? [];

  useLayoutEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        onReady?.();
      });

      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [onReady, product?.id]);

  return (
    <DetailContent>
      <FeatureImage src={images[0]} alt={product.title} />

      <SpecList>
        <SpecPreview>
          <SpecPreviewImage src={images[1]} alt={product.title} />
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
