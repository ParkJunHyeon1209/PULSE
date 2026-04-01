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

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      > li {
        flex: 1 1 100%;
        min-width: 0;
      }

      /* 카드 루트 */
      > li > article {
        min-height: 228px;
        height: 228px;
        aspect-ratio: unset;
        border-radius: ${({ theme }) => theme.radii.xl};
      }

      /* 카드 상단 영역 */
      > li > article > div:nth-of-type(1) {
        padding: ${({ theme }) => theme.spacing[3]};
      }

      /* 카드 하단 텍스트 영역 */
      > li > article > div:nth-of-type(3) {
        gap: ${({ theme }) => theme.spacing[2]};
        padding: ${({ theme }) => theme.spacing[3]};
      }

      /* 하단 플러스 버튼 위치가 너무 뜨면 같이 보정 */
      > li > article > button {
        bottom: ${({ theme }) => theme.spacing[3]};
        right: ${({ theme }) => theme.spacing[3]};
      }
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
            <BaseProductCard product={product} />
          </li>
        ))}
      </ul>
    </RecommendWrap>
  );
}
