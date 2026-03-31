import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useAuthStore from '../../store/useAuthStore';
import ProductGallery from './components/ProductGallery';
import ProductDetailPanel from './components/ProductDetailPanel';
import FeatureSection from './components/features/FeatureSection';
import {
  getAllProducts,
  getProductDetailById,
  getCategoryDetailByType,
} from '../../data/categoryProductsApi';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useAuthStore((state) => state.isLogin);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isCareChecked, setIsCareChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [categoryDetail, setCategoryDetail] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  const [toast, setToast] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  // 전체 상품 목록
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        const productList = Array.isArray(data) ? data : (data?.products ?? []);
        setProducts(productList);
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [id]);

  const mapCategoryDetailType = (type) => {
    const normalizedType = type?.toLowerCase();

    const typeMap = {
      etc: 'dropsEtc',
      gearset: 'gearSet',
      consoleset: 'consoleSet',
    };

    return typeMap[normalizedType] || normalizedType;
  };

  // 현재 상세 상품
  useEffect(() => {
    const fetchProductDetail = async () => {
      setIsLoading(true);
      setIsNotFound(false);
      setProduct(null);
      setCategoryDetail(null);

      try {
        const detailData = await getProductDetailById(id);

        if (!detailData) {
          setIsNotFound(true);
          return;
        }

        if (Number(id) === 103 && detailData?.src?.length >= 2) {
          const src = [...detailData.src];
          [src[0], src[1]] = [src[1], src[0]];
          setProduct({ ...detailData, src, image: src[0] });
        } else {
          setProduct(detailData);
        }

        if (detailData?.type) {
          const categoryDetailType = mapCategoryDetailType(detailData.type);
          const categoryData = await getCategoryDetailByType(categoryDetailType);

          setCategoryDetail({
            images: categoryData?.images || categoryData?.image || [],
            specs: categoryData?.specs || [],
          });
        }
      } catch (error) {
        console.error('상세 상품 불러오기 실패', error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  // 상품 바뀔때 초기 상태
  useEffect(() => {
    if (!product) return;

    setSelectedImage(product.image ?? product.src?.[0] ?? null);
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

  // 토스트 메세지
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);
  // 옵션 클릭 핸들러 추가

  const handleSelectOption = (label, item) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [label]: item,
    }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  // 로그인 필요 함수
  const handleRequireLogin = () => {
    setToast({
      message: '로그인 후 이용 가능합니다.',
      type: 'login',
    });

    setTimeout(() => {
      navigate('/login', {
        state: { from: location.pathname + location.search },
      });
    }, 1500);
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <ContentSection>
          <LoadingWrap>
            <LoadingSpinner />
            <LoadingText>상품 정보를 불러오고 있습니다.</LoadingText>
          </LoadingWrap>
        </ContentSection>
      </PageWrapper>
    );
  }

  if (isNotFound || !product) {
    return <Navigate to="/product-not-found" replace />;
  }
  // 추가금 옵션 계산함수
  const getOptionExtraPrice = (selectedOptions) => {
    return Object.values(selectedOptions).reduce((total, value) => {
      const match = String(value).match(/\(\+([\d,]+)\)/);

      if (!match) return total;

      const extraPrice = Number(match[1].replace(/,/g, ''));
      return total + extraPrice;
    }, 0);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (!isLogin) {
      handleRequireLogin();
      return;
    }
    const careService = product.additionalServices?.[0] ?? null;
    const carePrice = isCareChecked ? (careService?.price ?? 0) : 0;
    const optionExtraPrice = getOptionExtraPrice(selectedOptions);
    const finalPrice = product.price + carePrice + optionExtraPrice;

    const optionSummary = Object.entries(selectedOptions ?? {})
      .map(([label, value]) => `${label}: ${value}`)
      .join(' / ');

    const cartItem = {
      id: product.id,
      title: product.title,
      name: product.name ?? product.title,
      category: product.category,
      type: product.type,
      tag: product.tag ?? null,
      image: product.image,
      imageUrl: product.imageUrl ?? product.image,
      thumbnail: product.image,
      meta: product.meta,
      desc: product.desc ?? '',

      quantity,
      checked: true,

      // 가격 관련
      basePrice: product.price,
      carePrice,
      optionExtraPrice,
      price: finalPrice,

      // 장바구니에서 바로 렌더 가능한 문자열만 따로 제공
      optionSummary,
      careTitle: isCareChecked ? (careService?.title ?? '') : '',
      // 나중에 필요하면 쓰라고 남겨두는 값
      options: selectedOptions,
      isCareChecked,
    };
    console.log('optionSummary:', optionSummary);
    console.log('cartItem:', cartItem);
    console.log('careservice', cartItem.careTitle);

    addToCart(cartItem, quantity);

    setToast({
      message: `${product.title} 상품이 ${quantity}개 담겼습니다.${
        optionExtraPrice > 0 ? ` (옵션 추가금 ${optionExtraPrice.toLocaleString()}원 포함)` : ''
      }${isCareChecked && careService ? ` (+ ${careService.title})` : ''}`,
      type: 'cart',
    });
  };

  const galleryImages = (product.src ?? []).filter(Boolean);

  return (
    <PageWrapper>
      <ContentSection>
        <ProductGallery
          product={product}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
          galleryImages={galleryImages}
          teamProducts={products}
          categoryDetail={categoryDetail}
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
          onRequireLogin={handleRequireLogin}
        />
      </ContentSection>
      <FeatureSection
        currentType={product.type.toLocaleLowerCase()}
        teamProducts={products}
        bundleCategory={product.category}
        product={product}
        categoryDetail={categoryDetail}
        onRequireLogin={handleRequireLogin}
      />
      {toast && <ToastMessage $type={toast.type}>{toast.message}</ToastMessage>}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[24]};
  padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[20]}`};
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding-left: ${({ theme }) => theme.spacing[12]};
    padding-right: ${({ theme }) => theme.spacing[12]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.spacing[8]};
    padding-right: ${({ theme }) => theme.spacing[8]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-left: ${({ theme }) => theme.spacing[4]};
    padding-right: ${({ theme }) => theme.spacing[4]};
  }
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

const ToastMessage = styled.div`
  position: fixed;
  top: ${({ theme, $type }) =>
    $type === 'login'
      ? `calc(${theme.spacing[24]} + ${theme.spacing[3]})`
      : `calc(${theme.spacing[24]} + ${theme.spacing[3]})`};
  left: ${({ $type }) => ($type === 'login' ? '50%' : 'auto')};
  right: ${({ $type }) => ($type === 'login' ? 'auto' : '240px')};
  transform: ${({ $type }) => ($type === 'login' ? 'translateX(-50%)' : 'none')};
  z-index: 9999;

  min-width: ${({ $type }) => ($type === 'login' ? '280px' : '320px')};
  max-width: ${({ $type }) => ($type === 'login' ? '360px' : '420px')};

  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[6]}`};
  border-radius: ${({ theme }) => theme.radii.xl};

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.cardBg} 0%,
    ${({ theme }) => theme.colors.surface} 100%
  );
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: ${({ theme }) => theme.effects.blurPromo};

  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  line-height: 1.5;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-break: keep-all;

  box-shadow: 0 12px 32px ${({ theme }) => theme.colors.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: ${({ theme }) => theme.spacing[20]};
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: calc(100% - ${({ theme }) => theme.spacing[12]});
    min-width: auto;
    max-width: 420px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100% - ${({ theme }) => theme.spacing[8]});
  }
`;
const LoadingWrap = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  padding: ${({ theme }) => theme.spacing[20]} 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};

  color: ${({ theme }) => theme.colors.primary};
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 3px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.18);
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const LoadingText = styled.div`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  line-height: 1.5;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;
