import styled from '@emotion/styled';
import { gallerySection, gallerySlots } from '../../brandPageData';
import BrandImageSlot from '../shared/BrandImageSlot';
import { BrandSectionHeading } from '../shared/brandPageShared';

const SectionBlock = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const SignatureHeading = styled(BrandSectionHeading)``;

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

export default function BrandSignatureSec() {
  return (
    <SectionBlock>
      <SignatureHeading {...gallerySection.section} />

      <GalleryGrid>
        {featuredGallerySlots.map((slot, index) => {
          const displayTone = gallerySparkTones[index] || 'violet';
          const isSignalLineup = slot.title === '시그널 라인업';

          return (
            <BrandImageSlot
              key={slot.title}
              label={slot.title}
              hint={slot.description}
              ratio="4 / 3"
              accent={displayTone}
              media={slot.media}
              objectPosition={getBottomAlignedPosition(slot.objectPosition)}
              imageScale={slot.imageScale}
              eyebrow={gallerySection.eyebrow}
              sparkTone={displayTone}
              lightImageFilter={
                isSignalLineup ? 'none' : 'brightness(1.1) saturate(1.1) contrast(1.1)'
              }
              darkImageFilter={isSignalLineup ? 'none' : 'brightness(0.9) saturate(1.1)'}
              lightImageBlendMode={isSignalLineup ? 'normal' : 'multiply'}
              lightCaptionShadow
              lightDimmed
            />
          );
        })}
      </GalleryGrid>
    </SectionBlock>
  );
}
