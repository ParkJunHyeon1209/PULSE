import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { CardBadge } from '../../../components/common/CardParts';
import { BADGE_TONE } from '../../../utils/toneMap';

export default function ProductGallery({
  product,
  selectedImage,
  onSelectImage,
  galleryImages,
  teamProducts,
  categoryDetail,
}) {
  const currentIndex = galleryImages.findIndex((image) => image === selectedImage);

  const normalizeTitle = (value) =>
    String(value || '')
      .trim()
      .toLowerCase();

  const matchedProduct = teamProducts?.find(
    (item) => normalizeTitle(item.title) === normalizeTitle(product.title)
  );

  const rawTag = matchedProduct?.tag ?? product?.tag ?? '';
  const normalizedTag = String(rawTag).trim().toLowerCase();
  const badgeTone = BADGE_TONE[normalizedTag] ?? normalizedTag;
  const badgeLabel = rawTag ? String(rawTag).toUpperCase() : '';

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
  const featureItems = useMemo(() => {
    const shuffledSpecs = [...(categoryDetail?.specs ?? [])].sort(() => Math.random() - 0.5);

    return shuffledSpecs
      .map((spec) => spec.value)
      .filter(Boolean)
      .slice(0, 4);
  }, [categoryDetail]);

  return (
    <ImageSection>
      <MainImageWrapper>
        {selectedImage && <MainImage src={selectedImage} alt={product.title} />}

        {badgeTone && (
          <GalleryBadge variant="tag" tone={badgeTone} icon={false} height="28px">
            {badgeLabel}
          </GalleryBadge>
        )}
        {(galleryImages?.length ?? 0) > 1 && (
          <>
            <ArrowButton type="button" $left onClick={handlePrev} aria-label="이전 이미지">
              ‹
            </ArrowButton>

            <ArrowButton type="button" onClick={handleNext} aria-label="다음 이미지">
              ›
            </ArrowButton>
          </>
        )}
      </MainImageWrapper>

      <ThumbnailList>
        {(galleryImages ?? []).map((image, index) => (
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
      {/* 임시로 옵션 뿌림 features가 없음 features에서 options로 교체 */}
      {featureItems.length > 0 && (
        <Features>
          {featureItems.map((item, index) => (
            <p key={`${item}-${index}`}>
              ✔<span>{item}</span>
            </p>
          ))}
        </Features>
      )}
    </ImageSection>
  );
}

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing[4]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xxl};
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;
const GalleryBadge = styled(CardBadge)`
  top: ${({ theme }) => theme.spacing[5]};
  left: ${({ theme }) => theme.spacing[5]};
  z-index: 4;
  min-width: 50px;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  letter-spacing: 0.1em;
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  flex: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: ${({ theme }) => theme.spacing[4]};
    left: ${({ theme }) => theme.spacing[4]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: ${({ theme }) => theme.spacing[3]};
    left: ${({ theme }) => theme.spacing[3]};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ $left }) => ($left ? 'left: 12px;' : 'right: 12px;')}
    width: 38px;
    height: 38px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $left }) => ($left ? 'left: 10px;' : 'right: 10px;')}
    width: 32px;
    height: 32px;
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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 76px;
    height: 76px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc((100% - ${({ theme }) => theme.spacing[2]} * 3) / 4);
    height: auto;
    aspect-ratio: 1 / 1;
    min-width: 64px;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;

  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSize.xxxs};

  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.lg};

  p span {
    padding-left: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.textSecondary};
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[3]};

    > p {
      font-size: ${({ theme }) => theme.fontSize.xxs};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[1]};
    padding: ${({ theme }) => theme.spacing[3]};

    > p {
      font-size: ${({ theme }) => theme.fontSize.xxs};

      > span {
        padding-left: ${({ theme }) => theme.spacing[1]};
      }
    }
  }
`;
