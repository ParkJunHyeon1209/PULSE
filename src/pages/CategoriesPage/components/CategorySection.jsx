import { useEffect, useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import BaseProductCard from '../../../components/common/BaseProductCard';
import { ArrowIcon } from '../../../assets/icons/BtnIcon';

const SectionBlock = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[18]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing[14]};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.08em;
`;

const SectionLinkButton = styled.button`
  height: 36px;
  gap: ${({ theme }) => theme.spacing[2]};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.tones.violet.color};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: color ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.tones.violet.hoverColor};
  }

  &:hover .section-arrow-icon {
    transform: translateX(2px);
  }
`;

const ArrowIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.motion.fast};
`;

const PagerIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $direction }) =>
    $direction === 'left' ? 'translateX(-1px)' : 'translateX(1px)'};
  transition: transform ${({ theme }) => theme.motion.fast};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(0, 1fr));
  gap: ${({ theme }) => theme.grid.gap};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PaginationBar = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin: ${({ theme }) => theme.spacing[8]} auto 0;
`;

const PagerCount = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: baseline;
  gap: 6px;
  line-height: 1;
`;

const CurrentPage = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const TotalPage = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const ProgressTrack = styled.div`
  position: relative;
  flex: 1;
  min-width: 140px;
  height: 4px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.gradients.violetBlue};
  transition: width 240ms ease;
`;

const PagerButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    opacity ${({ theme }) => theme.motion.fast};

  &:hover:not(:disabled) .pager-icon-right {
    transform: translateX(4px);
  }

  &:hover:not(:disabled) .pager-icon-left {
    transform: translateX(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.38;
    cursor: default;
  }
`;

function PagerChevronIcon({ direction = 'right' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform={direction === 'left' ? 'rotate(180 8 8)' : undefined}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.12588 2.13558C5.16568 2.0926 5.21296 2.0585 5.26501 2.03524C5.31707 2.01198 5.37287 2 5.42923 2C5.48559 2 5.54139 2.01198 5.59344 2.03524C5.6455 2.0585 5.69278 2.0926 5.73258 2.13558L10.8741 7.67339C10.914 7.71626 10.9457 7.76718 10.9673 7.82325C10.9889 7.87932 11 7.93942 11 8.00012C11 8.06082 10.9889 8.12093 10.9673 8.17699C10.9457 8.23306 10.914 8.28398 10.8741 8.32685L5.73258 13.8647C5.65213 13.9513 5.54301 14 5.42923 14C5.31545 14 5.20633 13.9513 5.12588 13.8647C5.04542 13.778 5.00022 13.6605 5.00022 13.5379C5.00022 13.4154 5.04542 13.2979 5.12588 13.2112L9.96493 8.00012L5.12588 2.78904C5.08598 2.74617 5.05432 2.69525 5.03272 2.63918C5.01112 2.58312 5 2.52301 5 2.46231C5 2.40161 5.01112 2.3415 5.03272 2.28544C5.05432 2.22937 5.08598 2.17845 5.12588 2.13558Z"
          fill="#9FA8FF"
          fillOpacity="0.5"
        />
        <path
          d="M5.42969 1.90039C5.50003 1.90046 5.56926 1.91553 5.63379 1.94434C5.69839 1.97321 5.757 2.01491 5.80566 2.06738L10.9473 7.60547C10.996 7.65786 11.0345 7.71955 11.0605 7.78711C11.0866 7.85473 11.0996 7.92718 11.0996 8C11.0996 8.07285 11.0866 8.14524 11.0605 8.21289C11.0345 8.28046 10.996 8.34212 10.9473 8.39453L5.80566 13.9326C5.70724 14.0386 5.57229 14.0995 5.42969 14.0996C5.2869 14.0996 5.15127 14.0387 5.05273 13.9326C4.95446 13.8268 4.90043 13.6848 4.90039 13.5381C4.90039 13.3914 4.95451 13.2494 5.05273 13.1436L9.82812 8L5.05273 2.85742C5.00391 2.80496 4.96552 2.74247 4.93945 2.6748C4.91346 2.60722 4.90039 2.53468 4.90039 2.46191C4.90044 2.38918 4.91343 2.31656 4.93945 2.24902C4.96552 2.18152 5.00401 2.11973 5.05273 2.06738C5.1014 2.0149 5.16 1.97321 5.22461 1.94434C5.28929 1.91546 5.35917 1.90039 5.42969 1.90039Z"
          stroke="#9FA8FF"
          strokeOpacity="0.5"
          strokeWidth="0.2"
        />
      </g>
    </svg>
  );
}

function SectionArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.12588 2.13558C5.16568 2.0926 5.21296 2.0585 5.26501 2.03524C5.31707 2.01198 5.37287 2 5.42923 2C5.48559 2 5.54139 2.01198 5.59344 2.03524C5.6455 2.0585 5.69278 2.0926 5.73258 2.13558L10.8741 7.67339C10.914 7.71626 10.9457 7.76718 10.9673 7.82325C10.9889 7.87932 11 7.93942 11 8.00012C11 8.06082 10.9889 8.12093 10.9673 8.17699C10.9457 8.23306 10.914 8.28398 10.8741 8.32685L5.73258 13.8647C5.65213 13.9513 5.54301 14 5.42923 14C5.31545 14 5.20633 13.9513 5.12588 13.8647C5.04542 13.778 5.00022 13.6605 5.00022 13.5379C5.00022 13.4154 5.04542 13.2979 5.12588 13.2112L9.96493 8.00012L5.12588 2.78904C5.08598 2.74617 5.05432 2.69525 5.03272 2.63918C5.01112 2.58312 5 2.52301 5 2.46231C5 2.40161 5.01112 2.3415 5.03272 2.28544C5.05432 2.22937 5.08598 2.17845 5.12588 2.13558Z"
        fill="#9FA8FF"
        fillOpacity="0.5"
      />
      <path
        d="M5.42969 1.90039C5.50003 1.90046 5.56926 1.91553 5.63379 1.94434C5.69839 1.97321 5.757 2.01491 5.80566 2.06738L10.9473 7.60547C10.996 7.65786 11.0345 7.71955 11.0605 7.78711C11.0866 7.85473 11.0996 7.92718 11.0996 8C11.0996 8.07285 11.0866 8.14524 11.0605 8.21289C11.0345 8.28046 10.996 8.34212 10.9473 8.39453L5.80566 13.9326C5.70724 14.0386 5.57229 14.0995 5.42969 14.0996C5.2869 14.0996 5.15127 14.0387 5.05273 13.9326C4.95446 13.8268 4.90043 13.6848 4.90039 13.5381C4.90039 13.3914 4.95451 13.2494 5.05273 13.1436L9.82812 8L5.05273 2.85742C5.00391 2.80496 4.96552 2.74247 4.93945 2.6748C4.91346 2.60722 4.90039 2.53468 4.90039 2.46191C4.90044 2.38918 4.91343 2.31656 4.93945 2.24902C4.96552 2.18152 5.00401 2.11973 5.05273 2.06738C5.1014 2.0149 5.16 1.97321 5.22461 1.94434C5.28929 1.91546 5.35917 1.90039 5.42969 1.90039Z"
        stroke="#9FA8FF"
        strokeOpacity="0.5"
        strokeWidth="0.2"
      />
    </svg>
  );
}

export default function CategorySection({
  title,
  viewLabel,
  products,
  columns = 4,
  onClickViewAll,
  enablePagination = false,
  itemsPerPage = 6,
  resetKey,
  cardMinHeight,
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  useEffect(() => {
    setPage(1);
  }, [resetKey, products.length]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const visibleProducts = useMemo(() => {
    if (!enablePagination) return products;

    const startIndex = (page - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [enablePagination, itemsPerPage, page, products]);

  const progressPercent = totalPages === 1 ? 100 : (page / totalPages) * 100;

  const sectionRef = useRef(null);

  const scrollToSectionTop = () => {
    if (!sectionRef.current) return;

    const offset = 120;
    const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  return (
    <SectionBlock ref={sectionRef}>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionLinkButton type="button" onClick={onClickViewAll}>
          {viewLabel}
          <ArrowIconWrap className="section-arrow-icon">
            <SectionArrowIcon />
          </ArrowIconWrap>
        </SectionLinkButton>
      </SectionHeader>

      <ProductGrid columns={columns}>
        {visibleProducts.map((product, index) => (
          <BaseProductCard
            key={product.id}
            product={product}
            variantIndex={index}
            cardMinHeight={cardMinHeight}
          />
        ))}
      </ProductGrid>

      {enablePagination && (
        <PaginationBar>
          <PagerButton
            type="button"
            onClick={() => {
              setPage((prev) => prev - 1);
              requestAnimationFrame(() => {
                scrollToSectionTop();
              });
            }}
            disabled={page === 1}
            aria-label="이전 페이지"
          >
            <PagerIconWrap className="pager-icon-left">
              <PagerChevronIcon direction="left" />
            </PagerIconWrap>
          </PagerButton>

          <ProgressTrack>
            <ProgressFill percent={progressPercent} />
          </ProgressTrack>
          <PagerCount>
            <CurrentPage>{String(page).padStart(2, '0')}</CurrentPage>
            <TotalPage>/ {String(totalPages).padStart(2, '0')}</TotalPage>
          </PagerCount>

          <PagerButton
            type="button"
            onClick={() => {
              setPage((prev) => prev + 1);
              requestAnimationFrame(() => {
                scrollToSectionTop();
              });
            }}
            disabled={page === totalPages}
            aria-label="다음 페이지"
          >
            <PagerIconWrap className="pager-icon-right">
              <PagerChevronIcon direction="right" />
            </PagerIconWrap>
          </PagerButton>
        </PaginationBar>
      )}
    </SectionBlock>
  );
}
