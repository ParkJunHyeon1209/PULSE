import styled from '@emotion/styled';
import BrandStorySec from './components/sections/BrandStorySec';
import BrandIdentitySec from './components/sections/BrandIdentitySec';
import BrandPhilosophySec from './components/sections/BrandPhilosophySec';
import BrandKeywordSec from './components/sections/BrandKeywordSec';
import BrandSignatureSec from './components/sections/BrandSignatureSec';
import BrandLastSignalSec from './components/sections/BrandLastSignalSec';
import SecReveal from './components/shared/SecReveal';

const getPageBackground = (theme) =>
  theme.mode === 'dark'
    ? `
      radial-gradient(circle at 12% 12%, rgba(124, 58, 237, 0.22), transparent 30%),
      radial-gradient(circle at 88% 18%, rgba(56, 189, 248, 0.16), transparent 22%),
      radial-gradient(circle at 55% 88%, rgba(236, 72, 153, 0.1), transparent 28%)
    `
    : `
      radial-gradient(circle at 12% 12%, rgba(124, 58, 237, 0.16), transparent 30%),
      radial-gradient(circle at 88% 18%, rgba(56, 189, 248, 0.14), transparent 22%),
      radial-gradient(circle at 55% 88%, rgba(236, 72, 153, 0.08), transparent 28%)
    `;

const PageWrap = styled.main`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  /* overflow: visible; */
  isolation: isolate;
  margin-top: 100px;
  margin-bottom: -200px;
  padding-bottom: calc(${({ theme }) => theme.spacing[24]} + 200px);
  background: ${({ theme }) => getPageBackground(theme)};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    bottom: -200px;
    background: ${({ theme }) => theme.gradients.bgMesh};
    opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.52 : 0.42)};
    pointer-events: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 88px;
  }
`;

const PageInner = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
  max-width: ${({ theme }) => theme.grid.max};
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.grid.margin};
`;

const PageStack = styled.div`
  display: grid;
  gap: clamp(160px, 14vw, 260px);

  padding-top: clamp(80px, 18vw, 100px);
  padding-bottom: ${({ theme }) => theme.spacing[10]};

  @media (min-width: 869px) {
    padding-top: 0;
  }
`;

export default function BrandPage() {
  return (
    <PageWrap>
      <PageInner>
        <PageStack>
          <SecReveal threshold={0.06}>
            <BrandStorySec />
          </SecReveal>
          <SecReveal threshold={0.08} delay="40ms">
            <BrandIdentitySec />
          </SecReveal>
          <SecReveal threshold={0.08} delay="40ms">
            <BrandPhilosophySec />
          </SecReveal>
          <SecReveal threshold={0.08} delay="40ms">
            <BrandKeywordSec />
          </SecReveal>
          <SecReveal threshold={0.06} delay="40ms">
            <BrandSignatureSec />
          </SecReveal>
          <SecReveal threshold={0.1} delay="40ms">
            <BrandLastSignalSec />
          </SecReveal>
        </PageStack>
      </PageInner>
    </PageWrap>
  );
}
