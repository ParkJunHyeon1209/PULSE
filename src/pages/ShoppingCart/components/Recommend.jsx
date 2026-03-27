import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseProductCard from '../../../components/common/BaseProductCard';
import { useMemo, useState, useEffect } from 'react'; // 1. useState, useEffect 추가
import { getAllProducts } from '../../../data/categoryProductsApi';

const RecommendWrap = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
    > li {
      flex: 1;
      min-width: 200px;
    }
    > li > article {
      min-height: 280px;
    }
  }
`;

export default function Recommend() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProductsList(data);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      }
    };
    fetchProducts();
  }, []);

  const recommendedProducts = useMemo(() => {
    if (!productsList || productsList.length === 0) return [];

    const collabProducts = productsList.filter((item) => item.tag === 'collab');

    if (collabProducts.length === 0) return [];
    // eslint-disable-next-line
    return [...collabProducts].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [productsList]);

  return (
    <RecommendWrap>
      <BaseSection label="ALSO IN YOUR SETUP" />
      <ul>
        {recommendedProducts.map((product) => (
          <li key={product.id}>
            <BaseProductCard
              product={{
                ...product,
                image: product.image,
                title: product.title,
                price: product.price,
                meta: product.meta,
              }}
            />
          </li>
        ))}
      </ul>
    </RecommendWrap>
  );
}
