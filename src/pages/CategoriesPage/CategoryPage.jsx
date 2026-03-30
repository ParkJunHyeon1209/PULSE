import styled from '@emotion/styled';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, PageInner } from './styles/CategoriesPageLayout';
import { getAllProducts } from '../../data/categoryProductsApi';
import { LavStarIcon } from '../../assets/icons/BtnIcon';
import CategorySection from './components/CategorySection';
import CategoryHero from './components/CategoryHero';
import CategoryPromoBanner from './components/CategoryPromoBanner';
import useThemeStore from '../../store/useThemeStore';
import categoryBannerDark from '../../assets/img/banners/1_dark.webp';
import categoryBannerLight from '../../assets/img/banners/1_light.webp';

// 프로모션 배너 이미지 모음
import gearBannerDark from '../../assets/img/banners/D_mouse&keySey.webp';
import gearBannerLight from '../../assets/img/banners/L_mouse&keySey.webp';
import headsetBannerDark from '../../assets/img/banners/D_Headset.webp';
import headsetBannerLight from '../../assets/img/banners/L_Headset.webp';
import consoleBannerDark from '../../assets/img/banners/D_ConsoleSet.webp';
import consoleBannerLight from '../../assets/img/banners/L_ConsoleSet.webp';
import etcBannerDark from '../../assets/img/banners/D_DropsExtras.webp';
import etcBannerLight from '../../assets/img/banners/L_DropsExtras.webp';

const categorySections = [
  { key: 'gear', title: 'GEAR' },
  { key: 'headset', title: 'HEADSET' },
  { key: 'console', title: 'CONSOLE' },
  { key: 'drops', title: 'DROPS' },
];

const getRandomItem = (list = []) => {
  if (!Array.isArray(list) || list.length === 0) return '';
  return list[Math.floor(Math.random() * list.length)];
};

const promoBannerImages = {
  dark: [gearBannerDark, headsetBannerDark, consoleBannerDark, etcBannerDark],
  light: [gearBannerLight, headsetBannerLight, consoleBannerLight, etcBannerLight],
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const heroBackgroundImage = isDarkMode ? categoryBannerDark : categoryBannerLight;

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
        .filter((product) => product.category?.toLowerCase() === section.key.toLowerCase())
        .slice(0, 4),
    }));
  }, [products]);

  const currentPromoBackground = useMemo(() => {
    const imageList = isDarkMode ? promoBannerImages.dark : promoBannerImages.light;
    return getRandomItem(imageList);
  }, [isDarkMode]);

  return (
    <PageContainer>
      <PageInner>
        <CategoryHero title="PULSE" label="PULSE PLATFORM" backgroundImage={heroBackgroundImage} />

        {productsGroup.map((section, index) => (
          <SectionWrap key={section.key}>
            <CategorySection
              title={
                <SectionTitleWithStar>
                  <TitleStar>✦</TitleStar>
                  <span>{section.title}</span>
                  <TitleStar>✦</TitleStar>
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
          backgroundImage={currentPromoBackground}
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
