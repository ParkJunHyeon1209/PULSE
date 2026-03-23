import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { PageContainer, PageInner } from '../styles/CategoriesPageLayout';
import { getProductsByCategory } from '../../../data/categoryProductsApi';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';
import CategoryHero from './CategoryHero';
import CategoryTabs from './CategoryTabs';
import CategorySection from './CategorySection';
import CategoryPromoBanner from './CategoryPromoBanner';

// 카테고리 메뉴 분류
const categoryConfig = {
  gear: {
    title: 'GEAR',
    label: 'PULSE GEAR PLATFORM',
    heroImage: 'https://i.ibb.co/WNwGd17s/banner.webp',
    tabs: ['ALL', 'KEYBOARD', 'MOUSE', 'GEARSET'],
    promoTitle: 'PULSE × VIBE',
    promoSubtitle: 'EXCLUSIVE DROP',
    promoDescription: 'Pro Gaming Console Controller',
    promoPrice: 199000,
  },
  headset: {
    title: 'HEADSET',
    label: 'PULSE HEADSET PLATFORM',
    heroImage: 'https://i.ibb.co/WNwGd17s/banner.webp',
    tabs: ['ALL', 'HEADSET', 'EARPHONE', 'STREAMING'],
    promoTitle: 'PULSE SOUND',
    promoSubtitle: 'LIMITED EDITION',
    promoDescription: 'Immersive Wireless Gaming Headset',
    promoPrice: 229000,
  },
  console: {
    title: 'CONSOLE',
    label: 'PULSE CONSOLE PLATFORM',
    heroImage: 'https://i.ibb.co/WNwGd17s/banner.webp',
    tabs: ['ALL', 'CONTROLLER', 'CONSOLESET'],
    promoTitle: 'PULSE SOUND',
    promoSubtitle: 'LIMITED EDITION',
    promoDescription: 'Immersive Wireless Gaming Headset',
    promoPrice: 229000,
  },
  drops: {
    title: 'DROPS',
    label: 'PULSE DROPS PLATFORM',
    heroImage: 'https://i.ibb.co/WNwGd17s/banner.webp',
    tabs: ['ALL', 'DROPS', 'ETC'],
    promoTitle: 'PULSE SOUND',
    promoSubtitle: 'LIMITED EDITION',
    promoDescription: 'Immersive Wireless Gaming Headset',
    promoPrice: 229000,
  },
};

export default function CategoriesPage() {
  const { categoryName = 'gear' } = useParams();
  const [activeTab, setActiveTab] = useState('ALL');
  const [products, setProducts] = useState([]);

  const currentCategory = categoryConfig[categoryName] || categoryConfig.gear;

  // 카테고리 API
  useEffect(() => {
    async function loadProducts() {
      const data = await getProductsByCategory(categoryName);
      setProducts(data);
    }

    loadProducts();
  }, [categoryName]);

  // 탭 이동시 탭초기화
  useEffect(() => {
    setActiveTab('ALL');
  }, [categoryName]);

  // 이미 카테고리별로 받아온 데이터라서 재필터링하지 않음
  const categoryProducts = useMemo(() => {
    return products;
  }, [products]);

  const keyboardProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'keyboard'),
    [categoryProducts]
  );

  const mouseProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'mouse'),
    [categoryProducts]
  );

  const gearsetProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'gearset'),
    [categoryProducts]
  );

  const headsetProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'headset'),
    [categoryProducts]
  );

  const earphoneProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'earphone'),
    [categoryProducts]
  );

  const streamingProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'streaming'),
    [categoryProducts]
  );

  const controllerProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'controller'),
    [categoryProducts]
  );

  const consolesetProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'consoleset'),
    [categoryProducts]
  );

  const dropsProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'drops'),
    [categoryProducts]
  );

  const etcProducts = useMemo(
    () => categoryProducts.filter((product) => product.type?.toLowerCase() === 'etc'),
    [categoryProducts]
  );

  const handleClickViewAll = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderGearSections = () => {
    if (activeTab === 'ALL') {
      return (
        <>
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>MOUSE</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={mouseProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('MOUSE')}
          />
          <SectionDivider />
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>KEYBOARD</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={keyboardProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('KEYBOARD')}
          />
          <SectionDivider />
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>GEARSET</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={gearsetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('GEARSET')}
          />
          <SectionDivider />
          <CategoryPromoBanner
            title="PULSE × VIBE"
            subtitle="EXCLUSIVE DROP"
            description="Pro Gaming Console Controller"
            price={199000}
          />
        </>
      );
    }

    if (activeTab === 'MOUSE') {
      return (
        <CategorySection
          title="MOUSE"
          viewLabel="BACK TO ALL"
          products={mouseProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'KEYBOARD') {
      return (
        <CategorySection
          title="KEYBOARD"
          viewLabel="BACK TO ALL"
          products={keyboardProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'GEARSET') {
      return (
        <CategorySection
          title="GEARSET"
          viewLabel="BACK TO ALL"
          products={gearsetProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    return null;
  };

  const renderHeadsetSections = () => {
    if (activeTab === 'ALL') {
      return (
        <>
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>HEADSET</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={headsetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('HEADSET')}
          />
          <SectionDivider />
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>EARPHONE</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={earphoneProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('EARPHONE')}
          />
          <SectionDivider />
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>STREAMING</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={streamingProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('STREAMING')}
          />
          <SectionDivider />
          <CategoryPromoBanner
            title="PULSE × VIBE"
            subtitle="EXCLUSIVE DROP"
            description="Pro Gaming Console Controller"
            price={199000}
          />
        </>
      );
    }

    if (activeTab === 'HEADSET') {
      return (
        <CategorySection
          title="HEADSET"
          viewLabel="BACK TO ALL"
          products={headsetProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'EARPHONE') {
      return (
        <CategorySection
          title="EARPHONE"
          viewLabel="BACK TO ALL"
          products={earphoneProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'STREAMING') {
      return (
        <CategorySection
          title="STREAMING"
          viewLabel="BACK TO ALL"
          products={streamingProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    return null;
  };

  const renderConsoleSections = () => {
    if (activeTab === 'ALL') {
      return (
        <>
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>CONTROLLER</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={controllerProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('CONTROLLER')}
          />
          <SectionDivider />
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>CONSOLESET</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={consolesetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('CONSOLESET')}
          />
          <SectionDivider />
          <CategoryPromoBanner
            title="PULSE × VIBE"
            subtitle="EXCLUSIVE DROP"
            description="Pro Gaming Console Controller"
            price={199000}
          />
        </>
      );
    }

    if (activeTab === 'CONTROLLER') {
      return (
        <CategorySection
          title="CONTROLLER"
          viewLabel="BACK TO ALL"
          products={controllerProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'CONSOLESET') {
      return (
        <CategorySection
          title="CONSOLESET"
          viewLabel="BACK TO ALL"
          products={consolesetProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    return null;
  };

  const renderDropsSections = () => {
    if (activeTab === 'ALL') {
      return (
        <>
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>DROPS</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={dropsProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('DROPS')}
          />
          <SectionDivider />
          <CategorySection
            title={
              <SectionTitleWithStar>
                <TitleStar $animate={false}>✦</TitleStar>
                <span>ETC</span>
                <TitleStar $animate={false}>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={etcProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('ETC')}
          />
          <SectionDivider />
          <CategoryPromoBanner
            title="PULSE × VIBE"
            subtitle="EXCLUSIVE DROP"
            description="Pro Gaming Console Controller"
            price={199000}
          />
        </>
      );
    }

    if (activeTab === 'DROPS') {
      return (
        <CategorySection
          title="DROPS"
          viewLabel="BACK TO ALL"
          products={dropsProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'ETC') {
      return (
        <CategorySection
          title="ETC"
          viewLabel="BACK TO ALL"
          products={etcProducts}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={activeTab}
          cardMinHeight="469px"
        />
      );
    }

    return null;
  };

  return (
    <PageContainer>
      <PageInner>
        <CategoryHero
          title={currentCategory.title}
          label={currentCategory.label}
          backgroundImage={currentCategory.heroImage}
        />

        <CategoryTabs tabs={currentCategory.tabs} activeTab={activeTab} onClickTab={setActiveTab} />

        {categoryName === 'gear' && renderGearSections()}
        {categoryName === 'headset' && renderHeadsetSections()}
        {categoryName === 'console' && renderConsoleSections()}
        {categoryName === 'drops' && renderDropsSections()}
      </PageInner>
    </PageContainer>
  );
}

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.spacing[10]} 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.gradients.violetBlue};
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 15%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0.25) 85%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 1%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0.25) 99%,
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
