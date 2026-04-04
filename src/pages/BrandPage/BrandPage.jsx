import React from 'react';
import styled from '@emotion/styled';
import BrandHeroSection from './components/BrandHeroSection';
import BrandIdentitySection from './components/BrandIdentitySection';
import BrandLayoutSection from './components/BrandLayoutSection';
import BrandKeywordSection from './components/BrandKeywordSection';
import BrandGallerySection from './components/BrandGallerySection';
import BrandClosingSection from './components/BrandClosingSection';
import SectionReveal from './components/SectionReveal';

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
  gap: clamp(220px, 18vw, 280px);

  padding-top: clamp(200px, 18vw, 240px);
  padding-bottom: ${({ theme }) => theme.spacing[10]};
`;

export default function BrandPage() {
  return (
    <PageWrap>
      <PageInner>
        <PageStack>
          <SectionReveal threshold={0.06}>
            <BrandHeroSection />
          </SectionReveal>
          <SectionReveal threshold={0.08} delay="40ms">
            <BrandIdentitySection />
          </SectionReveal>
          <SectionReveal threshold={0.08} delay="40ms">
            <BrandLayoutSection />
          </SectionReveal>
          <SectionReveal threshold={0.08} delay="40ms">
            <BrandKeywordSection />
          </SectionReveal>
          <SectionReveal threshold={0.06} delay="40ms">
            <BrandGallerySection />
          </SectionReveal>
          <SectionReveal threshold={0.1} delay="40ms">
            <BrandClosingSection />
          </SectionReveal>
        </PageStack>
      </PageInner>
    </PageWrap>
  );
}
