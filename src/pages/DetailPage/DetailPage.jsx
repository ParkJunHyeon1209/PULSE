import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';
import styled from '@emotion/styled';

export default function DetailPage() {
  const { id } = useParams();

  const product = mockProducts.find((item) => item.id === Number(id));

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

  const totalPrice = product.price * quantity;

  const handleDecrase = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    // zustand 연결
    // addToCart({...product, quantity})

    console.log('장바구니 담기:', {
      ...product,
      quantity,
    });
    alert(`${product.title} 상품이 ${quantity}개 담겼다`);
  };
  //--------------------------------------------------------------------------------------------------------------------------------------------
  const PageWrapper = styled.div`
    min-height: 100vh;
    padding: 48px 20px 100px;
    color: #fff;
  `;

  const ContentSection = styled.section`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  `;

  const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  const MainImageWrapper = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 28px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.35),
      0 0 30px rgba(122, 92, 255, 0.08);
  `;

  const MainImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `;

  const ThumbnailList = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  `;

  const ThumbnailButton = styled.button`
    width: 92px;
    height: 92px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid ${({ isActive }) => (isActive ? '#8b5cf6' : 'rgba(255,255,255,0.08)')};
    box-shadow: ${({ isActive }) => (isActive ? '0 0 0 4px rgba(139, 92, 246, 0.15)' : 'none')};
    transition: 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      border-color: #8b5cf6;
    }
  `;

  const ThumbnailImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  `;

  const InfoSection = styled.div`
    padding: 12px 4px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `;

  const CategoryBadge = styled.span`
    width: fit-content;
    padding: 8px 14px;
    border: 1px solid rgba(139, 92, 246, 0.28);
    color: #c4b5fd;
    font-size: 14px;
    font-weight: 700;
  `;

  const Title = styled.h1`
    font-size: 24px;
    font-weight: 800;
  `;

  const Price = styled.p`
    font-size: 48px;
    font-weight: 800;
    color: #34d399;
  `;

  const SubMeta = styled.p`
    font-size: 16px;
    color: #b8b8c7;
  `;

  const Description = styled.p`
    font-size: 16px;
    color: #b8b8c7;
  `;

  const OptionBox = styled.div`
    display: flex;
    font-weight: 700;
    gap: 12px;
  `;

  const OptionLabel = styled.span`
    font-size: 14px;
    font-weight: 700px;
    color: #d6d6e3;
  `;

  const QuantityBox = styled.div`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 14px;
    border-radius: 16px;
    background: #171722;
    border: 1px solid rgba(255, 255, 255, 0.08);
  `;

  const QuantityButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #252536;
    font-size: 20px;

    transition: 0.2s ease;

    &:hover {
      background-color: #323248;
    }
  `;

  const QuantityValue = styled.span`
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  `;

  const TotalPriceBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 20px;
    border-radius: 20px;
    background: linear-gradient(135deg, #151522 0%, #1c1c2b 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);

    span {
      color: #b8b8c7;
      font-size: 15px;
    }

    strong {
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
    }
  `;

  const ButtonGroup = styled.div`
    display: flex;
    gap: 14px;
  `;

  const BaseButton = styled.button`
    flex: 1;
    height: 58px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 800;
    transition: 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  `;
  const CartButton = styled(BaseButton)`
    background: #202031;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.08);
  `;
  const BuyButton = styled(BaseButton)`
    background: #202031;
    color: #ffffff;
  `;

  const DetailSection = styled.section`
    margin: 80px auto 0;
  `;

  const DetailSectionTitle = styled.h2`
    font-size: 24px;
  `;
  return (
    <PageWrapper>
      <ContentSection>
        <ImageSection>
          <MainImageWrapper>
            <MainImage src={selectedImage} alt={product.title} />
          </MainImageWrapper>

          <ThumbnailList>
            {[product.thumbnail, ...product.images].map((image, index) => (
              <ThumbnailButton
                key={`${product.id}-${index}`}
                type="button"
                onClick={() => setSelectdeImage(image)}
              >
                <ThumbnailImage src={image} alt={`${product.title}-${index + 1}`} />
              </ThumbnailButton>
            ))}
          </ThumbnailList>
        </ImageSection>

        <InfoSection>
          <CategoryBadge>{product.category}</CategoryBadge>
          <Title>{product.title}</Title>
          <Price>₩{product.price.toLocaleString()}</Price>
          <SubMeta>
            <span>VAT 포함</span>
            <span>무료 배송</span>
            <span>한정판</span>
          </SubMeta>
          <Description>{product.description}</Description>
          <div>
            <button>직로배송</button>
            <button>햅틱 피드백</button>
            <button>한정 수량</button>
          </div>

          <OptionBox>
            <OptionLabel>수량</OptionLabel>
            <QuantityBox>
              <QuantityButton type="button" onClick={handleDecrase}>
                -
              </QuantityButton>
              <QuantityValue>{quantity}</QuantityValue>
              <QuantityButton type="button" onClick={handleIncrease}>
                +
              </QuantityButton>
            </QuantityBox>
          </OptionBox>

          <TotalPriceBox>
            <span>총 상품 금액</span>
            <strong>{totalPrice.toLocaleString()}원</strong>
          </TotalPriceBox>

          <ButtonGroup>
            <CartButton type="button" onClick={handleAddToCart}>
              장바구니 담기
            </CartButton>
            <BuyButton type="button">바로 구매</BuyButton>
          </ButtonGroup>
        </InfoSection>
      </ContentSection>

      <DetailSection>
        <DetailSectionTitle>상품 상세 정보</DetailSectionTitle>
      </DetailSection>
    </PageWrapper>
  );
}
