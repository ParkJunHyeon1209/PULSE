import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { PageContainer, PageInner } from './styles/CategoriesPageLayout';
import CategorySection from './components/CategorySection';
import CategoryHero from './components/CategoryHero';
import CategoryPromoBanner from './components/CategoryPromoBanner';

const products = [
  {
    id: 1,
    category: 'gear',
    type: 'mouse',
    badge: 'NEW',
    title: 'PULSE Pro Mouse',
    meta: '26000 DPI · 무선 · RGB',
    price: 179000,
    image: 'https://picsum.photos/1100/600',
  },
  {
    id: 2,
    category: 'gear',
    type: 'mouse',
    badge: 'HOT',
    title: 'VELO MX-12',
    meta: '24000 DPI · 유선 · 화이트',
    price: 159000,
    image: 'https://picsum.photos/1200/600',
  },
  {
    id: 3,
    category: 'gear',
    type: 'keyboard',
    badge: 'NEW',
    title: 'PULSE K87',
    meta: '기계식 · RGB · 텐키리스',
    price: 199000,
    image: '',
  },
  {
    id: 4,
    category: 'gear',
    type: 'keyboard',
    badge: 'BEST',
    title: 'VIBE TKL',
    meta: '텐키리스 · RGB · 블랙',
    price: 189000,
    image: '',
  },
  {
    id: 5,
    category: 'gear',
    type: 'keyboard',
    badge: 'HOT',
    title: 'ARC 98',
    meta: '풀배열 · 유무선 · 화이트',
    price: 229000,
    image: '',
  },

  {
    id: 11,
    category: 'headset',
    type: 'headset',
    badge: 'NEW',
    title: 'PULSE H1',
    meta: '7.1채널 · 무선',
    price: 219000,
    image: '',
  },
  {
    id: 12,
    category: 'headset',
    type: 'headset',
    badge: 'HOT',
    title: 'NOVA Sound',
    meta: '노이즈 캔슬링 · 블랙',
    price: 199000,
    image: '',
  },
  {
    id: 13,
    category: 'headset',
    type: 'headset',
    badge: 'BEST',
    title: 'VIBE Air',
    meta: '경량 · RGB',
    price: 209000,
    image: '',
  },
  {
    id: 14,
    category: 'headset',
    type: 'headset',
    badge: 'NEW',
    title: 'CORE H7',
    meta: '유선 · 7.1채널',
    price: 149000,
    image: '',
  },

  {
    id: 21,
    category: 'console',
    type: 'controller',
    badge: 'NEW',
    title: 'PULSE Pad',
    meta: '무선 컨트롤러',
    price: 189000,
    image: '',
  },
  {
    id: 22,
    category: 'console',
    type: 'controller',
    badge: 'HOT',
    title: 'VIBE Controller',
    meta: 'RGB · 듀얼모터',
    price: 199000,
    image: '',
  },
  {
    id: 23,
    category: 'console',
    type: 'ps',
    badge: 'BEST',
    title: 'ARC Pad',
    meta: '유선 · 저지연',
    price: 169000,
    image: '',
  },
  {
    id: 24,
    category: 'console',
    type: 'ps',
    badge: 'NEW',
    title: 'NOVA Console Pad',
    meta: '무선 · 블루',
    price: 179000,
    image: '',
  },

  {
    id: 31,
    category: 'bundle',
    type: 'keyboardSet',
    badge: 'HOT',
    title: 'Starter Bundle',
    meta: '키보드 + 마우스',
    price: 299000,
    image: '',
  },
  {
    id: 32,
    category: 'bundle',
    type: 'keyboardSet',
    badge: 'NEW',
    title: 'Pro Bundle',
    meta: '헤드셋 + 마우스',
    price: 349000,
    image: '',
  },
  {
    id: 33,
    category: 'bundle',
    type: 'mouseSet',
    badge: 'BEST',
    title: 'Full Setup Bundle',
    meta: '풀세트 구성',
    price: 499000,
    image: '',
  },
  {
    id: 34,
    category: 'bundle',
    type: 'mouseSet',
    badge: 'NEW',
    title: 'Desk Bundle',
    meta: '기어 + 액세서리',
    price: 279000,
    image: '',
  },

  {
    id: 41,
    category: 'drops',
    type: 'drops',
    badge: 'NEW',
    title: 'LIMITED Purple Mouse',
    meta: '한정판 · 퍼플',
    price: 239000,
    image: '',
  },
  {
    id: 42,
    category: 'drops',
    type: 'drops',
    badge: 'HOT',
    title: 'LIMITED TKL',
    meta: '한정판 · 텐키리스',
    price: 259000,
    image: '',
  },
  {
    id: 43,
    category: 'drops',
    type: 'drops',
    badge: 'BEST',
    title: 'LIMITED Headset',
    meta: '한정판 · RGB',
    price: 269000,
    image: '',
  },
  {
    id: 44,
    category: 'drops',
    type: 'drops',
    badge: 'NEW',
    title: 'LIMITED Controller',
    meta: '한정판 · 콘솔',
    price: 249000,
    image: '',
  },
];

const categorySections = [
  { key: 'gear', title: 'GEAR' },
  { key: 'headset', title: 'HEADSET' },
  { key: 'console', title: 'CONSOLE' },
  { key: 'bundle', title: 'BUNDLE' },
  { key: 'drops', title: 'DROPS' },
];

export default function CategoryPage() {
  const navigate = useNavigate();

  const productsGroup = useMemo(() => {
    return categorySections.map((section) => ({
      ...section,
      products: products.filter((product) => product.category === section.key).slice(0, 4),
    }));
  }, []);

  return (
    <PageContainer>
      <PageInner>
        <CategoryHero
          title="PULSE"
          label="PULSE PLATFORM"
          backgroundImage="https://picsum.photos/seed/categoryhero/1600/900"
        />

        {productsGroup.map((section, index) => (
          <SectionWrap key={section.key}>
            <CategorySection
              title={section.title}
              viewLabel="VIEW"
              products={section.products}
              columns={4}
              onClickViewAll={() => {
                navigate(`/categories/${section.key}`);
                window.scrollTo(0, 0);
              }}
            />
            {index !== productsGroup.length - 1 && <SectionDivider />}
          </SectionWrap>
        ))}
        <SectionDivider />
        <CategoryPromoBanner
          title="PULSE × VIBE"
          subtitle="EXCLUSIVE DROP"
          description="Pro Gaming Console Controller"
          price={199000}
        />
      </PageInner>
    </PageContainer>
  );
}

const SectionWrap = styled.div`
  width: 100%;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 2px;
  margin: ${({ theme }) => theme.spacing[6]} 0 ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(109, 40, 217, 0.08) 14%,
    rgba(124, 58, 237, 0.45) 34%,
    rgba(96, 165, 250, 0.95) 50%,
    rgba(124, 58, 237, 0.45) 66%,
    rgba(109, 40, 217, 0.08) 86%,
    transparent 100%
  );
`;
