import styled from '@emotion/styled';
import CategoryProductCard from './CategoryProductCard';
import arrowIcon from '../../../assets/arrow.png';

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
  color: ${({ theme }) => theme.variants.violet.color};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: color ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.variants.violet.hoverColor};
  }
  &:hover img {
    transform: translateX(2px);
  }
`;

const ArrowIcon = styled.img`
  display: block;
  object-fit: contain;
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

export default function CategorySection({
  title,
  viewLabel,
  products,
  columns = 4,
  onClickViewAll,
}) {
  return (
    <SectionBlock>
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionLinkButton type="button" onClick={onClickViewAll}>
          {viewLabel}
          <ArrowIcon src={arrowIcon} alt="" aria-hidden="true" />
        </SectionLinkButton>
      </SectionHeader>

      <ProductGrid columns={columns}>
        {products.map((product, index) => (
          <CategoryProductCard key={product.id} product={product} variantIndex={index} />
        ))}
      </ProductGrid>
    </SectionBlock>
  );
}
