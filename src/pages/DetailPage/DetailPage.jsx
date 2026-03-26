import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
// import { mockProducts } from '../../data/mockData';
import useCartStore from '../../store/useCartStore';
import ProductGallery from './components/ProductGallery';
import ProductDetailPanel from './components/ProductDetailPanel';
import FeatureSection from './components/features/FeatureSection';
import { getAllProducts } from '../../data/categoryProductsApi';

export default function DetailPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  //const product = mockProducts.find((item) => String(item.id) === String(id));
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedImage, setSelectedImage] = useState(product?.thumbnail ?? null);
  const [quantity, setQuantity] = useState(1);
  // option api명세대로 변경
  // const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name ?? '');
  // const [selectedPlatform, setSelectedPlatform] = useState(product?.platforms?.[0] ?? '');
  // const [selectedConnection, setSelectedConnection] = useState(product?.connections?.[0]?.id ?? '');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isCareChecked, setIsCareChecked] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();

        const productList = Array.isArray(data) ? data : (data?.products ?? []);

        setProducts(productList);

        const foundProduct = productList.find((item) => String(item.id) === String(id));
        setProduct(foundProduct ?? null);
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
        setProducts([]);
        setProduct(null);
      }
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    setSelectedImage(product.image ?? null);
    setQuantity(1);
    setIsCareChecked(false);

    const initialOption = {};
    (product.options ?? []).forEach((option) => {
      if (option.items?.length) {
        initialOption[option.label] = option.items[0];
      }
    });
    setSelectedOptions(initialOption);
  }, [product]);
  // 옵션 클릭 핸들러 추가
  const handleSelectOption = (label, item) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: item,
    }));
  };
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

  // 추가금 옵션 계산함수
  const getOptionExtraPrice = (selectedOptions) => {
    return Object.values(selectedOptions).reduce((total, value) => {
      const match = String(value).match(/\(\+([\d,]+)\)/);

      if (!match) return total;

      const extraPrice = Number(match[1].replace(/,/g, ''));
      return total + extraPrice;
    }, 0);
  };
  // 옵션, 서비스 체크 유무 가격 변경
  const handleAddToCart = () => {
    //addToCart(product, quantity);
    const careService = product.additionalServices?.[0] ?? null;
    const carePrice = isCareChecked ? (careService?.price ?? 0) : 0;
    const optionExtraPrice = getOptionExtraPrice(selectedOptions);

    // 요금 추가 확인용 콘솔로그
    console.log('기본 상품 price:', product.price);
    console.log('선택된 옵션들:', selectedOptions);
    console.log('옵션 추가금:', optionExtraPrice);
    console.log('케어 체크 여부:', isCareChecked);
    console.log('케어 가격:', carePrice);
    console.log('최종 장바구니 price:', product.price + carePrice + optionExtraPrice);

    const cartItem = {
      ...product,
      selectedOptions,
      careService: isCareChecked ? careService : null,
      carePrice,

      basePrice: product.price,
      price: product.price + carePrice + optionExtraPrice,
    };
    addToCart(cartItem, quantity);
    //alert(`${product.title} 상품이 ${quantity}개 담겼습니다.`);
    alert(
      `${product.title} 상품이 ${quantity}개 담겼습니다.${
        optionExtraPrice > 0 ? ` (옵션 추가금 ${optionExtraPrice.toLocaleString()}원 포함)` : ''
      }${isCareChecked && careService ? ` (+ ${careService.title})` : ''}`
    );
  };

  const galleryImages = [product.image, ...(product.src ?? [])].filter(Boolean);

  return (
    <PageWrapper>
      <ContentSection>
        <ProductGallery
          product={product}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
          galleryImages={galleryImages}
          teamProduct={products}
        />

        <ProductDetailPanel
          product={product}
          quantity={quantity}
          selectedOptions={selectedOptions}
          isCareChecked={isCareChecked}
          onSelectOption={handleSelectOption}
          onToggleCare={setIsCareChecked}
          onDecrease={handleDecrease}
          onIncrease={handleIncrease}
          onAddToCart={handleAddToCart}
        />
      </ContentSection>
      <FeatureSection
        category={product.type.toLocaleLowerCase()}
        teamProducts={products}
        bundleCategory={product.category}
        product={product}
      />
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
