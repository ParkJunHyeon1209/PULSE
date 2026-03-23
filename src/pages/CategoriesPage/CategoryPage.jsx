import styled from '@emotion/styled';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageInner } from './styles/CategoriesPageLayout';
import { getAllProducts } from '../../data/categoryProductsApi';
import { LavStarIcon } from '../../assets/icons/BtnIcon';
import CategorySection from './components/CategorySection';
import CategoryHero from './components/CategoryHero';
import CategoryPromoBanner from './components/CategoryPromoBanner';

const categorySections = [
  { key: 'gear', title: 'GEAR' },
  { key: 'headset', title: 'HEADSET' },
  { key: 'console', title: 'CONSOLE' },
  { key: 'drops', title: 'DROPS' },
];

export default function CategoryPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  const productsGroup = useMemo(() => {
    return categorySections.map((section) => ({
      ...section,
      products: products
        .filter((product) => product.category.toLowerCase() === section.key)
        .slice(0, 4),
    }));
  }, [products]);

  return (
    <PageContainer>
      <PageInner>
        <CategoryHero
          title="PULSE"
          label="PULSE PLATFORM"
          backgroundImage="https://i.ibb.co/WNwGd17s/banner.webp"
        />

        {productsGroup.map((section, index) => (
          <SectionWrap key={section.key}>
            <CategorySection
              title={
                <SectionTitleWithStar>
                  <TitleStar $animate={false}>✦</TitleStar>
                  <span>{section.title}</span>
                  <TitleStar $animate={false}>✦</TitleStar>
                </SectionTitleWithStar>
              }
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
  margin-top: 50px;
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

const SectionTitleWithStar = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TitleStar = styled(LavStarIcon)`
  flex-shrink: 0;
`;
