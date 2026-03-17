import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { PageContainer, PageInner } from '../styles/CategoriesPageLayout';
import CategoryHero from './CategoryHero';
import CategoryTabs from './CategoryTabs';
import CategorySection from './CategorySection';
import CategoryPromoBanner from './CategoryPromoBanner';

// 나중에 API 연동 전까지 확인용 더미 데이터
const products = [
  {
    id: 1,
    category: 'gear',
    type: 'mouse',
    badge: 'NEW',
    title: 'PULSE Pro Mouse',
    meta: '26000 DPI · 무선 · RGB',
    price: 179000,
    image: '',
  },
  {
    id: 2,
    category: 'gear',
    type: 'mouse',
    badge: 'HOT',
    title: 'VELO MX-12',
    meta: '24000 DPI · 유선 · 화이트',
    price: 159000,
    image: '',
  },
  {
    id: 3,
    category: 'gear',
    type: 'mouse',
    badge: 'NEW',
    title: 'ORBIT Core',
    meta: '경량 바디 · 무선 · 블랙',
    price: 149000,
    image: '',
  },
  {
    id: 4,
    category: 'gear',
    type: 'mouse',
    badge: 'BEST',
    title: 'NOVA Air',
    meta: '초경량 · RGB · 블루',
    price: 189000,
    image: '',
  },
  {
    id: 5,
    category: 'gear',
    type: 'mouse',
    badge: 'NEW',
    title: 'LITE Arc',
    meta: '게이밍 센서 · 무선',
    price: 139000,
    image: '',
  },

  {
    id: 11,
    category: 'gear',
    type: 'keyboard',
    badge: 'NEW',
    title: 'PULSE K87',
    meta: '기계식 · RGB · 텐키리스',
    price: 199000,
    image: '',
  },
  {
    id: 12,
    category: 'gear',
    type: 'keyboard',
    badge: 'HOT',
    title: 'NOVA K65',
    meta: '60% 배열 · 유선 · 핑크',
    price: 169000,
    image: '',
  },
  {
    id: 13,
    category: 'gear',
    type: 'keyboard',
    badge: 'BEST',
    title: 'VIBE TKL',
    meta: '텐키리스 · RGB · 블랙',
    price: 189000,
    image: '',
  },
  {
    id: 14,
    category: 'gear',
    type: 'keyboard',
    badge: 'NEW',
    title: 'ARC 98',
    meta: '풀배열 · 유무선 · 화이트',
    price: 229000,
    image: '',
  },
  {
    id: 15,
    category: 'gear',
    type: 'keyboard',
    badge: 'HOT',
    title: 'ECHO 75',
    meta: '75% 배열 · RGB · 실버',
    price: 209000,
    image: '',
  },

  {
    id: 21,
    category: 'headset',
    type: 'headset',
    badge: 'NEW',
    title: 'PULSE H1',
    meta: '7.1채널 · 무선',
    price: 29000,
    image: '',
  },
  {
    id: 22,
    category: 'headset',
    type: 'headset',
    badge: 'NEW',
    title: 'PULSE H2',
    meta: '6.1채널 · 무선',
    price: 25000,
    image: '',
  },
  {
    id: 23,
    category: 'headset',
    type: 'headset',
    badge: 'NEW',
    title: 'PULSE H3',
    meta: '5.1채널 · 유선',
    price: 11900,
    image: '',
  },
  {
    id: 24,
    category: 'headset',
    type: 'headset',
    badge: 'NEW',
    title: 'PULSE H4',
    meta: '5.1채널 · 무선',
    price: 31900,
    image: '',
  },

  {
    id: 31,
    category: 'console',
    type: 'controller',
    badge: 'NEW',
    title: 'PULSE C1',
    meta: '조이스틱 · 유선',
    price: 119000,
    image: '',
  },
  {
    id: 32,
    category: 'console',
    type: 'controller',
    badge: 'NEW',
    title: 'PULSE C2',
    meta: '게임패드 · 무선',
    price: 109000,
    image: '',
  },
  {
    id: 33,
    category: 'console',
    type: 'ps',
    badge: 'NEW',
    title: 'PULSE PS1',
    meta: '플레이스테이션 · PS4',
    price: 519000,
    image: '',
  },
  {
    id: 34,
    category: 'console',
    type: 'ps',
    badge: 'NEW',
    title: 'PULSE PS2',
    meta: '플레이스테이션 · PS6',
    price: 619000,
    image: '',
  },

  {
    id: 41,
    category: 'bundle',
    type: 'keyboardSet',
    badge: 'NEW',
    title: 'PULSE KM1',
    meta: '키보드 · 마우스',
    price: 59900,
    image: '',
  },
  {
    id: 42,
    category: 'bundle',
    type: 'keyboardSet',
    badge: 'NEW',
    title: 'PULSE KM2',
    meta: '마우스 · 키보드',
    price: 49000,
    image: '',
  },
  {
    id: 43,
    category: 'bundle',
    type: 'mouseSet',
    badge: 'NEW',
    title: 'PULSE MH1',
    meta: '마우스 · 헤드셋',
    price: 39000,
    image: '',
  },
  {
    id: 44,
    category: 'bundle',
    type: 'mouseSet',
    badge: 'NEW',
    title: 'PULSE MH2',
    meta: '마우스 · 헤드셋',
    price: 19900,
    image: '',
  },

  {
    id: 51,
    category: 'drops',
    type: 'drops',
    badge: 'NEW',
    title: 'PULSE D1',
    meta: 'PULSE · PRO',
    price: 719000,
    image: '',
  },
  {
    id: 52,
    category: 'drops',
    type: 'drops',
    badge: 'NEW',
    title: 'PULSE D2',
    meta: 'PULSE · PRO2',
    price: 819000,
    image: '',
  },
];

const categoryConfig = {
  gear: {
    title: 'GEAR',
    label: 'PULSE GEAR PLATFORM',
    heroImage: 'https://picsum.photos/seed/gearhero/1600/900',
    tabs: ['ALL', 'KEYBOARD', 'MOUSE'],
    promoTitle: 'PULSE × VIBE',
    promoSubtitle: 'EXCLUSIVE DROP',
    promoDescription: 'Pro Gaming Console Controller',
    promoPrice: 199000,
  },
  headset: {
    title: 'HEADSET',
    label: 'PULSE HEADSET PLATFORM',
    heroImage: 'https://picsum.photos/seed/headsethero/1600/900',
    tabs: ['ALL', 'HEADSET'],
    promoTitle: 'PULSE SOUND',
    promoSubtitle: 'LIMITED EDITION',
    promoDescription: 'Immersive Wireless Gaming Headset',
    promoPrice: 229000,
  },
  console: {
    title: 'CONSOLE',
    label: 'PULSE CONSOLE PLATFORM',
    heroImage: 'https://picsum.photos/seed/consolehero/1600/900',
    tabs: ['ALL', 'CONTROLLER', 'PS'],
    promoTitle: 'PULSE SOUND',
    promoSubtitle: 'LIMITED EDITION',
    promoDescription: 'Immersive Wireless Gaming Headset',
    promoPrice: 229000,
  },
  bundle: {
    title: 'BUNDLE',
    label: 'PULSE BUNDLE PLATFORM',
    heroImage: 'https://picsum.photos/seed/bundlehero/1600/900',
    tabs: ['ALL', 'KEYBOARDSET', 'MOUSESET'],
    promoTitle: 'PULSE SOUND',
    promoSubtitle: 'LIMITED EDITION',
    promoDescription: 'Immersive Wireless Gaming Headset',
    promoPrice: 229000,
  },
  drops: {
    title: 'DROPS',
    label: 'PULSE DROPS PLATFORM',
    heroImage: 'https://picsum.photos/seed/bundlehero/1600/900',
    tabs: ['ALL', 'DROPS'],
    promoTitle: 'PULSE SOUND',
    promoSubtitle: 'LIMITED EDITION',
    promoDescription: 'Immersive Wireless Gaming Headset',
    promoPrice: 229000,
  },
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const { categoryName = 'gear' } = useParams();
  const [activeTab, setActiveTab] = useState('ALL');

  const currentCategory = categoryConfig[categoryName] || categoryConfig.gear;

  const categoryProducts = useMemo(() => {
    return products.filter((product) => product.category === categoryName);
  }, [categoryName]);

  const keyboardProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'keyboard');
  }, [categoryProducts]);

  const mouseProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'mouse');
  }, [categoryProducts]);

  const headsetProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'headset');
  }, [categoryProducts]);

  const controllerProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'controller');
  }, [categoryProducts]);

  const psProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'ps');
  }, [categoryProducts]);

  const keyboardSetProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'keyboardSet');
  }, [categoryProducts]);

  const mouseSetProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'mouseSet');
  }, [categoryProducts]);

  const dropsProducts = useMemo(() => {
    return categoryProducts.filter((product) => product.type === 'drops');
  }, [categoryProducts]);

  const handleClickViewAll = (tabName) => {
    setActiveTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderGearSections = () => {
    if (activeTab === 'ALL') {
      return (
        <>
          <CategorySection
            title="MOUSE"
            viewLabel="VIEW"
            products={mouseProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('MOUSE')}
          />
          <SectionDivider />
          <CategorySection
            title="KEYBOARD"
            viewLabel="VIEW"
            products={keyboardProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('KEYBOARD')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'MOUSE') {
      return (
        <CategorySection
          title="MOUSE"
          viewLabel="BACK TO ALL"
          products={mouseProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
        />
      );
    }

    if (activeTab === 'KEYBOARD') {
      return (
        <CategorySection
          title="KEYBOARD"
          viewLabel="BACK TO ALL"
          products={keyboardProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
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
            title="HEADSET"
            viewLabel="VIEW"
            products={headsetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('HEADSET')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'HEADSET') {
      return (
        <CategorySection
          title="HEADSET"
          viewLabel="BACK TO ALL"
          products={headsetProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
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
            title="CONTROLLER"
            viewLabel="VIEW"
            products={controllerProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('CONTROLLER')}
          />
          <SectionDivider />

          <CategorySection
            title="PS"
            viewLabel="VIEW"
            products={psProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('PS')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'CONTROLLER') {
      return (
        <CategorySection
          title="CONTROLLER"
          viewLabel="BACK TO ALL"
          products={controllerProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
        />
      );
    }

    if (activeTab === 'PS') {
      return (
        <CategorySection
          title="PS"
          viewLabel="BACK TO ALL"
          products={psProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
        />
      );
    }

    return null;
  };

  const renderBundleSections = () => {
    if (activeTab === 'ALL') {
      return (
        <>
          <CategorySection
            title="KEYBOARD SET"
            viewLabel="VIEW"
            products={keyboardSetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('KEYBOARDSET')}
          />
          <SectionDivider />

          <CategorySection
            title="MOUSE SET"
            viewLabel="VIEW"
            products={mouseSetProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('MOUSESET')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'KEYBOARDSET') {
      return (
        <CategorySection
          title="KEYBOARD SET"
          viewLabel="BACK TO ALL"
          products={keyboardSetProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
        />
      );
    }

    if (activeTab === 'MOUSESET') {
      return (
        <CategorySection
          title="MOUSE SET"
          viewLabel="BACK TO ALL"
          products={mouseSetProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
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
            title="DROPS"
            viewLabel="VIEW"
            products={dropsProducts.slice(0, 4)}
            columns={4}
            onClickViewAll={() => handleClickViewAll('DROPS')}
          />
          <SectionDivider />
        </>
      );
    }

    if (activeTab === 'DROPS') {
      return (
        <CategorySection
          title="DROPS"
          viewLabel="BACK TO ALL"
          products={dropsProducts}
          columns={4}
          onClickViewAll={() => setActiveTab('ALL')}
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
        {categoryName === 'bundle' && renderBundleSections()}
        {categoryName === 'drops' && renderDropsSections()}

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
