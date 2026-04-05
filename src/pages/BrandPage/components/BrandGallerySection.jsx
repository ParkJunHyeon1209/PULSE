import React from 'react';
import styled from '@emotion/styled';
import { gallerySection, gallerySlots } from '../brandPageData';
import BrandImageSlot from './BrandImageSlot';
import { BrandSectionHeading } from './brandPageShared';

const SectionBlock = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const GalleryHeading = styled(BrandSectionHeading)`
  > div:first-of-type {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    font-weight: 600;
  }

  .base-section-title {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
  }

  .base-section-title > span {
    font-weight: 600;
  }

  .base-section-title + h2 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: 700;
  }

  > p:last-of-type {
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: 600;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const pickFeaturedSlots = (slots) => {
  const shuffled = [...slots];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, 6);
};

const featuredGallerySlots = pickFeaturedSlots(gallerySlots);
const gallerySparkTones = ['violet', 'blue', 'violet', 'blue', 'violet', 'blue'];
const getBottomAlignedPosition = (objectPosition = 'center center') => {
  const [x = 'center'] = objectPosition.trim().split(/\s+/);
  return `${x} bottom`;
};

export default function BrandGallerySection() {
  return (
    <SectionBlock>
      <GalleryHeading {...gallerySection.section} />

      <GalleryGrid>
        {featuredGallerySlots.map((slot, index) => (
          <BrandImageSlot
            key={slot.title}
            label={slot.title}
            hint={slot.description}
            ratio="4 / 3"
            accent={slot.tone}
            media={slot.media}
            objectPosition={getBottomAlignedPosition(slot.objectPosition)}
            imageScale={slot.imageScale}
            eyebrow={gallerySection.eyebrow}
            sparkTone={gallerySparkTones[index] || 'violet'}
            lightText
            lightDimmed
          />
        ))}
      </GalleryGrid>
    </SectionBlock>
  );
}
