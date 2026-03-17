import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useCartStore from '../../../store/useCartStore';

const RecommendWrap = styled.div``;

export default function Recommend() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const increaseQuantity = useCartStore((state) => state.addToCart);

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
      <h2>ALSO IN YOUR SETUP</h2>
      <ul>
        {products
          .filter((product) => product.tag === 'BEST')
          .map((product) => (
            <li key={product.id}>
              <div className="thumbnail-img">
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.price.toLocaleString()}원</p>
                <button
                  onClick={() => {
                    increaseQuantity(product);
                    console.log(product.quantity);
                  }}
                >
                  +
                </button>
              </div>
            </li>
          ))}
      </ul>
    </RecommendWrap>
  );
}
