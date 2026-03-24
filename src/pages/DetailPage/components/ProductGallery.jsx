import React from 'react';
import styled from '@emotion/styled';

export default function ProductGallery({ product, selectedImage, onSelectImage, galleryImages }) {
  const currentIndex = galleryImages.findIndex((image) => image === selectedImage);

  const handlePrev = () => {
    if (!galleryImages.length) return;

    const prevIndex = currentIndex <= 0 ? galleryImages.length - 1 : currentIndex - 1;
    onSelectImage(galleryImages[prevIndex]);
  };

  const handleNext = () => {
    if (!galleryImages.length) return;

    const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    onSelectImage(galleryImages[nextIndex]);
  };

  return (
    <ImageSection>
      <MainImageWrapper>
        {selectedImage && <MainImage src={selectedImage} alt={product.title} />}
        <NewBadge>new</NewBadge>
        <ArrowButton type="button" $left onClick={handlePrev} aria-label="이전 이미지">
          ‹
        </ArrowButton>

        <ArrowButton type="button" onClick={handleNext} aria-label="다음 이미지">
          ›
        </ArrowButton>
      </MainImageWrapper>

      <ThumbnailList>
        {galleryImages.map((image, index) => (
          <ThumbnailButton
            key={`${product.id}-${index}`}
            type="button"
            $isActive={selectedImage === image}
            onClick={() => onSelectImage(image)}
          >
            <ThumbnailImage src={image} alt={`${product.title}-${index + 1}`} />
          </ThumbnailButton>
        ))}
      </ThumbnailList>
      <Features>
        {product.features.map((features, index) => (
          <p key={`${features}-${index}`}>
            ✔<span>{features}</span>
          </p>
        ))}
      </Features>
    </ImageSection>
  );
}

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xxl};
  background: ${({ theme }) => theme.card?.ci1 ?? theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ $left }) => ($left ? 'left: 16px;' : 'right: 16px;')}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: rgba(0, 0, 0, 0.45);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition:
    background-color ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ThumbnailButton = styled.button`
  width: 92px;
  height: 92px;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.cardBg};
  border: 2px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.cardBorder)};
  box-shadow: ${({ $isActive, theme }) => ($isActive ? theme.effects.hoverShadowAvatar : 'none')};
  transition:
    transform ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const NewBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  left: ${({ theme }) => theme.spacing[4]};
  z-index: 3;
  min-width: 52px;
  height: 28px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(52, 211, 153, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.24);
  color: ${({ theme }) => theme.status.new};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  border: 1px solid red;
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSize.xxxs};

  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.lg};

  p span {
    padding-left: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
