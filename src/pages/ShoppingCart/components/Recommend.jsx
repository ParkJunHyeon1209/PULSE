import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
// import useCartStore from '../../../store/useCartStore';
import BaseSection from '../../../components/common/BaseSection';
import BaseProductCard from '../../../components/common/BaseProductCard';
import { ClassNames } from '@emotion/react';

const RecommendWrap = styled.div`
  ul {
    display: flex;
    gap: ${({ theme }) => theme.spacing[3]};
    > li > article {
      min-height: 280px;
    }
  }
`;

export default function Recommend() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const increaseQuantity = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 성공 시 로직
        const response = await fetch('/data/products.json');

        if (!response.ok) {
          throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        // 실패 시 로직
        console.error('데이터 로드 중 오류 발생:', error);
      } finally {
        // 성공하든 실패하든 로딩 종료
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>PULSE 장비 로딩 중...</div>;
  return (
    <RecommendWrap>
      <BaseSection label="ALSO IN YOUR SETUP" />
      <ul>
        {products.map((product, i) =>
          i > 2 ? null : (
            <li key={product.id}>
              <BaseProductCard
                product={{
                  ...product,
                  image: product.thumbnail,
                  title: product.title,
                  price: product.price,
                  category: product.category || 'gear',
                  meta: product.meta || 'Limited Edition',
                }}
              />
            </li>
          )
        )}
      </ul>
    </RecommendWrap>
  );
}
