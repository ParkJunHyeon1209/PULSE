import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../../data/categoryProductsApi';
import useWishlistStore from '../../../store/useWishlistStore';
import BaseProductCard from '../../../components/common/BaseProductCard';

export default function WishList() {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const wishlistIds = useWishlistStore((state) => state.wishlistIds);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProducts();
        setProductsList(data);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const isLikedList = productsList.filter((product) => wishlistIds.includes(product.id));

  if (isLoading) {
    return <p>위시 리스트를 불러오고 있습니다.</p>;
  }

  return (
    <WishListWrap>
      {isLikedList.length > 0 && !isLoading ? (
        isLikedList.map((product) => (
          <li key={product.id}>
            <BaseProductCard product={product} />
          </li>
        ))
      ) : (
        <li>찜한 상품이 없습니다.</li>
      )}
    </WishListWrap>
  );
}

const WishListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[5]};
  > li {
    flex-shrink: 0;
    flex-basis: calc(25% - ${({ theme }) => theme.spacing[5]});
    width: calc(25% - ${({ theme }) => theme.spacing[5]});
  }
`;
