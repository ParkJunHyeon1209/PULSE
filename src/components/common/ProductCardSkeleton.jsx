import styled from '@emotion/styled';
import { ProductCardSkeletonItem } from './Skeleton';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 4}, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

export default function ProductCardSkeleton({ count = 4, columns = 4, cardMinHeight }) {
  return (
    <Grid $columns={columns}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeletonItem key={index} cardMinHeight={cardMinHeight} compactPadding />
      ))}
    </Grid>
  );
}
