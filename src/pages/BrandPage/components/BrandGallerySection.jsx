import React from 'react';
import styled from '@emotion/styled';
import { gallerySection, gallerySlots } from '../brandPageData';
import BrandImageSlot from './BrandImageSlot';
import { BrandSectionHeading } from './brandPageShared';

const SectionBlock = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
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

export default function BrandGallerySection() {
  return (
    <SectionBlock>
      <BrandSectionHeading {...gallerySection.section} />

      <GalleryGrid>
        {gallerySlots.map((slot) => (
          <BrandImageSlot
            key={slot.title}
            label={slot.title}
            hint={slot.description}
            ratio="4 / 3"
            accent={slot.tone}
            media={slot.media}
            objectPosition={slot.objectPosition}
            eyebrow={gallerySection.eyebrow}
            sparkTone={slot.tone}
          />
        ))}
      </GalleryGrid>
    </SectionBlock>
  );
}
