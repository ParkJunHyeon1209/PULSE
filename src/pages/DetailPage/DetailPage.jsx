import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';
import styled from '@emotion/styled';
import useCartStore from '../../store/useCartStore';
import ProductDetailPanel from '../../components/detail/ProductDetailPanel';

export default function DetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((item) => item.id === Number(id));
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedImage, setSelectdeImage] = useState(product?.thumbnail ?? null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectdeImage(product.thumbnail);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const handleDecrase = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.title} 상품이 ${quantity}개 담겼습니다.`);
  };

  const galleryImages = [product.thumbnail, ...product.images].filter(Boolean);
  //--------------------------------------------------------------------------------------------------------------------------------------------
  const PageWrapper = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[20]} `};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.gradients.bgMesh}, ${({ theme }) => theme.colors.background};
  `;

  const ContentSection = styled.section`
    max-width: ${({ theme }) => theme.grid.max};
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
  `;

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
    background: ${({ theme }) => theme.card.ci1};
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  `;

  const MainImage = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
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

  const DetailSection = styled.section`
    max-width: ${({ theme }) => theme.grid.max};
    margin: ${({ theme }) => theme.spacing[20]} auto 0;
  `;

  const DetailSectionTitle = styled.h2`
    margin: 0 0 ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
  `;

  const DetailImageList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[5]};
  `;

  const DetailImage = styled.img`
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radii.xxl};
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  `;
  //new bage
  const NewBadge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 999;
    top: 16px;
    left: 16px;

    min-width: 50px;
    height: 26px;

    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid ${({ theme }) => `${theme.status.new}47`};
    background: ${({ theme }) => `${theme.status.new}1F`};

    color: ${({ theme }) => theme.status.new};
    font-family: ${({ theme }) => theme.fontFamily.display};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 400;
  `;

  return (
    <PageWrapper>
      <ContentSection>
        <ImageSection>
          <MainImageWrapper>
            {selectedImage && <MainImage src={selectedImage} alt={product.title} />}
            <NewBadge>new</NewBadge>
          </MainImageWrapper>

          <ThumbnailList>
            {galleryImages.map((image, index) => (
              <ThumbnailButton
                key={`${product.id}-${index}`}
                type="button"
                $isActive={selectedImage === image}
                onClick={() => setSelectdeImage(image)}
              >
                <ThumbnailImage src={image} alt={`${product.title}-${index + 1}`} />
              </ThumbnailButton>
            ))}
          </ThumbnailList>
        </ImageSection>
        <ProductDetailPanel
          product={product}
          quantity={quantity}
          onDecrease={handleDecrase}
          onIncrease={handleIncrease}
          onAddToCart={handleAddToCart}
        />
      </ContentSection>

      <DetailSection>
        <DetailSectionTitle>상품 상세 정보</DetailSectionTitle>
      </DetailSection>
    </PageWrapper>
  );
}
