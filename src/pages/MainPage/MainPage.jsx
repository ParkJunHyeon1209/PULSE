import styled from '@emotion/styled';
import MainHero from './MainHero';
import HeroBand from './HeroBand';
import ShowcaseSec from './ShowcaseSec';
import ProductsSec from './ProductsSec';
import CategorySec from './CategorySec';
import DropSec from './DropSec';
import BrandPromiseSec from './BrandPromiseSec';

const PageWrap = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  padding-inline: ${({ theme }) => theme.grid.margin};
`;

const Full = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
`;

const HeroWrap = styled(Full)`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  aspect-ratio: 16 / 9;
`;

export default function MainPage() {
  return (
    <PageWrap>
      <HeroWrap>
        <MainHero />
        <HeroBand />
      </HeroWrap>

      <ShowcaseSec />
      <ProductsSec />
      <DropSec />
      <CategorySec />
      <Full>
        <BrandPromiseSec />
      </Full>
    </PageWrap>
  );
}
