import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import BaseProductCard from '../components/common/BaseProductCard';
import useWishlistStore from '../store/useWishlistStore';
import { getAllProducts } from '../data/categoryProductsApi';

const WishlistSection = styled.section`
  width: 100%;
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.grid.gap};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export default function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const wishlistIds = useWishlistStore((state) => state.wishlistIds);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const wishlistProducts = useMemo(() => {
    return products.filter((product) => wishlistIds.includes(product.id));
  }, [products, wishlistIds]);

  if (isLoading) {
    return <div>위시리스트를 불러오는 중...</div>;
  }

  if (wishlistProducts.length === 0) {
    return <div>찜한 상품이 없습니다.</div>;
  }

  return (
    <WishlistSection>
      <WishlistGrid>
        {wishlistProducts.map((product) => (
          <BaseProductCard key={product.id} product={product} cardMinHeight="469px" />
        ))}
      </WishlistGrid>
    </WishlistSection>
  );
}
