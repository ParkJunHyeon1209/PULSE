import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { CardBadge } from '../../../components/common/CardParts';
import { BADGE_TONE } from '../../../utils/toneMap';
import { ArrowIconL } from '../../../assets/icons/BtnIcon';

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
    const shuffledSpecs = [...(categoryDetail?.specs ?? [])];
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
          <GalleryBadge variant="c-badge" tone={badgeTone} icon={false} height="32px">
            {badgeLabel}
          </GalleryBadge>
        )}
        {(galleryImages?.length ?? 0) > 1 && (
          <>
            <ArrowButton type="button" $left onClick={handlePrev} aria-label="이전 이미지">
              <ArrowIconL  width="24" height="24" style={{ transform: 'rotate(180deg) translateX(1px)' }} />
            </ArrowButton>

            <ArrowButton type="button" onClick={handleNext} aria-label="다음 이미지">
              <ArrowIconL width="24" height="24" style={{ transform: 'translateX(1px)' }} />
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
              ✓<span>{item}</span>
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
  gap: ${({ theme }) => theme.spacing[3]};

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
  display: flex;
  top: 50%;
  ${({ $left }) => ($left ? 'left: 8px;' : 'right: 8px;')}
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.iconBtn.wish.bg};
  color: ${({ theme }) => theme.colors.secondary}99;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition:
    background-color ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.modalBg} 18%, transparent);
    /* border-color: ${({ theme }) => theme.colors.secondary}; */
    color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary}; 
  }

  &:active {
    transform: translateY(-50%) scale(0.88);
    background: color-mix(in srgb, ${({ theme }) => theme.colors.modalBg} 10%, transparent);

    box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};  }


  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $left }) => ($left ? 'left: 4px;' : 'right: 4px;')}
    width: 36px;
    height: 36px;
  }
`;

const ThumbnailList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;

`;

const ThumbnailButton = styled.button`
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
  margin-top: ${({ theme }) => theme.spacing[3]};;
  display: flex;
  flex-direction: column;
  font-weight: 700;
  /* line-height: 1.2; */
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
