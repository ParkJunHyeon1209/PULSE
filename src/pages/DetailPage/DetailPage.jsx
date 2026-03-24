import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';
import useCartStore from '../../store/useCartStore';

import ProductGallery from './components/ProductGallery';
import ProductDetailPanel from './components/ProductDetailPanel';
import FeatureSection from './components/features/FeatureSection';
import { products } from '../../data/categoryProducts';

export default function DetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((item) => String(item.id) === String(id));
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedImage, setSelectedImage] = useState(product?.thumbnail ?? null);
  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name ?? '');
  const [selectedPlatform, setSelectedPlatform] = useState(product?.platforms?.[0] ?? '');
  const [selectedConnection, setSelectedConnection] = useState(product?.connections?.[0]?.id ?? '');
  const [isCareChecked, setIsCareChecked] = useState(false);

  useEffect(() => {
    if (!product) return;

    setSelectedImage(product.thumbnail ?? null);
    setQuantity(1);
    setSelectedColor(product.colors?.[0]?.name ?? '');
    setSelectedPlatform(product.platforms?.[0] ?? '');
    setSelectedConnection(product.connections?.[0]?.id ?? '');
    setIsCareChecked(false);
  }, [product]);

  if (!product) {
    return (
      <PageWrapper>
        <ContentSection>
          <EmptyMessage>상품을 찾을 수 없습니다.</EmptyMessage>
        </ContentSection>
      </PageWrapper>
    );
  }

  const handleDecrease = () => {
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

  const galleryImages = [product.thumbnail, ...(product.images ?? [])].filter(Boolean);

  return (
    <PageWrapper>
      <ContentSection>
        <ProductGallery
          product={product}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
          galleryImages={galleryImages}
        />

        <ProductDetailPanel
          product={product}
          quantity={quantity}
          selectedColor={selectedColor}
          selectedPlatform={selectedPlatform}
          selectedConnection={selectedConnection}
          isCareChecked={isCareChecked}
          onSelectColor={setSelectedColor}
          onSelectPlatform={setSelectedPlatform}
          onSelectConnection={setSelectedConnection}
          onToggleCare={setIsCareChecked}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onAddToCart={handleAddToCart}
        />
      </ContentSection>
      <FeatureSection category={product.category} teamProducts={products} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[20]}`};
  color: ${({ theme }) => theme.colors.text};
`;

const ContentSection = styled.section`
  max-width: ${({ theme }) => theme.grid.max};
  padding-bottom: ${({ theme }) => theme.spacing[20]};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(124, 58, 237, 0.15) 12%,
      rgba(167, 139, 250, 0.9) 50%,
      rgba(124, 58, 237, 0.15) 88%,
      transparent 100%
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[20]} 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
