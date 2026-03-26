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
  },
  headset: {
    title: 'HEADSET',
    label: 'PULSE HEADSET PLATFORM',
    heroImage: 'https://i.ibb.co/WNwGd17s/banner.webp',
    tabs: ['ALL', 'HEADSET', 'EARPHONE', 'STREAMING'],
  },
  console: {
    title: 'CONSOLE',
    label: 'PULSE CONSOLE PLATFORM',
    heroImage: 'https://i.ibb.co/WNwGd17s/banner.webp',
    tabs: ['ALL', 'CONTROLLER', 'CONSOLESET'],
  },
  drops: {
    title: 'DROPS',
    label: 'PULSE DROPS PLATFORM',
    heroImage: 'https://i.ibb.co/WNwGd17s/banner.webp',
    tabs: ['ALL', 'DROPS', 'ETC'],
  },
};

// 필터링 목록
const detailFilters = [
  { key: 'ALL', label: '전체' },
  { key: 'NEW', label: '신규' },
  { key: 'BEST', label: '인기상품' },
  { key: 'PRICE', label: '가격순' },
];

export default function CategoriesPage() {
  const { categoryName = 'gear' } = useParams();
  const [activeTab, setActiveTab] = useState('ALL');
  const [products, setProducts] = useState([]);

  const [activeFilter, setActiveFilter] = useState('ALL');
  const [priceOrder, setPriceOrder] = useState('');

  const currentCategory = categoryConfig[categoryName] || categoryConfig.gear;

  // 카테고리 API
  useEffect(() => {
    async function loadProducts() {
      const data = await getProductsByCategory(categoryName);
      setProducts(data);
    }

    loadProducts();
  }, [categoryName]);

  // 탭 이동시 초기화
  useEffect(() => {
    setActiveTab('ALL');
    setActiveFilter('ALL');
    setPriceOrder('');
  }, [categoryName]);

  // 필터만 초기화
  useEffect(() => {
    setActiveFilter('ALL');
    setPriceOrder('');
  }, [activeTab]);

  const categoryProducts = useMemo(() => {
    return products.filter(
      (product) => product.category?.toLowerCase() === categoryName?.toLowerCase()
    );
  }, [products, categoryName]);

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
                <TitleStar>✦</TitleStar>
                <span>MOUSE</span>
                <TitleStar>✦</TitleStar>
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
                <TitleStar>✦</TitleStar>
                <span>KEYBOARD</span>
                <TitleStar>✦</TitleStar>
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
                <TitleStar>✦</TitleStar>
                <span>GEARSET</span>
                <TitleStar>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={gearsetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('GEARSET')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'MOUSE') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(mouseProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'KEYBOARD') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(keyboardProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'GEARSET') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(gearsetProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
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
                <TitleStar>✦</TitleStar>
                <span>HEADSET</span>
                <TitleStar>✦</TitleStar>
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
                <TitleStar>✦</TitleStar>
                <span>EARPHONE</span>
                <TitleStar>✦</TitleStar>
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
                <TitleStar>✦</TitleStar>
                <span>STREAMING</span>
                <TitleStar>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={streamingProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('STREAMING')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'HEADSET') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(headsetProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'EARPHONE') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(earphoneProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'STREAMING') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(streamingProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
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
                <TitleStar>✦</TitleStar>
                <span>CONTROLLER</span>
                <TitleStar>✦</TitleStar>
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
                <TitleStar>✦</TitleStar>
                <span>CONSOLESET</span>
                <TitleStar>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={consolesetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('CONSOLESET')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'CONTROLLER') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(controllerProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'CONSOLESET') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(consolesetProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
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
                <TitleStar>✦</TitleStar>
                <span>DROPS</span>
                <TitleStar>✦</TitleStar>
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
                <TitleStar>✦</TitleStar>
                <span>ETC</span>
                <TitleStar>✦</TitleStar>
              </SectionTitleWithStar>
            }
            viewLabel="VIEW"
            products={etcProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('ETC')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'DROPS') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(dropsProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
          cardMinHeight="469px"
        />
      );
    }

    if (activeTab === 'ETC') {
      return (
        <CategorySection
          title={null}
          viewLabel={null}
          products={getFilteredProducts(etcProducts)}
          columns={3}
          onClickViewAll={() => setActiveTab('ALL')}
          enablePagination
          itemsPerPage={6}
          resetKey={`${activeTab}-${activeFilter}`}
          cardMinHeight="469px"
        />
      );
    }

    return null;
  };

  const handleClickFilter = (filterKey) => {
    if (filterKey === 'PRICE') {
      if (activeFilter === 'PRICE') {
        setPriceOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setActiveFilter('PRICE');
        setPriceOrder('asc');
      }
      return;
    }

    setActiveFilter(filterKey);
  };

  const getFilteredProducts = (items) => {
    const list = [...items];

    switch (activeFilter) {
      case 'NEW':
        return list.filter((item) => item.tag?.toLowerCase() === 'new');

      case 'BEST':
        return list.filter((item) => item.tag?.toLowerCase() === 'best');

      case 'PRICE':
        return [...items].sort((a, b) =>
          priceOrder === 'asc' ? a.price - b.price : b.price - a.price
        );

      default:
        return list;
    }
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

        {activeTab !== 'ALL' && (
          <FilterBar>
            {detailFilters.map((filter) => {
              const isPrice = filter.key === 'PRICE';
              const label =
                isPrice && activeFilter === 'PRICE'
                  ? priceOrder === 'asc'
                    ? '낮은 가격순'
                    : '높은 가격순'
                  : filter.label;
              return (
                <FilterBadge
                  key={filter.key}
                  type="button"
                  $active={activeFilter === filter.key}
                  onClick={() => handleClickFilter(filter.key)}
                >
                  {label}
                </FilterBadge>
              );
            })}
          </FilterBar>
        )}

        {categoryName === 'gear' && renderGearSections()}
        {categoryName === 'headset' && renderHeadsetSections()}
        {categoryName === 'console' && renderConsoleSections()}
        {categoryName === 'drops' && renderDropsSections()}

        {activeTab === 'ALL' && (
          <>
            <CategoryPromoBanner
              title="PULSE × VIBE"
              subtitle="EXCLUSIVE DROP"
              description="Pro Gaming Console Controller"
              price={199000}
            />
          </>
        )}
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

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 ${({ theme }) => theme.spacing[8]};
`;

const FilterBadge = styled.button`
  height: 34px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.tones.violet.activeBorder : 'rgba(255, 255, 255, 0.08)'};
  background: ${({ theme, $active }) =>
    $active ? theme.tones.violet.tabActiveBg : 'rgba(255, 255, 255, 0.02)'};
  color: ${({ theme, $active }) =>
    $active ? theme.tones.violet.activeColor : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.tones.violet.activeBorder};
  }
`;
