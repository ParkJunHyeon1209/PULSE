import styled from '@emotion/styled';

const shimmer = `
  @keyframes skeletonShimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const Grid = styled.div`
  ${shimmer}
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

const Card = styled.div`
  min-height: ${({ $cardMinHeight }) => $cardMinHeight || '469px'};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
`;

const ShimmerBlock = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.09) 20%,
    rgba(255, 255, 255, 0.04) 40%
  );
  background-size: 200% 100%;
  animation: skeletonShimmer 1.4s linear infinite;

  ${({ theme }) =>
    theme.mode === 'light' &&
    `
      background: linear-gradient(
        90deg,
        rgba(124, 58, 237, 0.06) 0%,
        rgba(124, 58, 237, 0.12) 20%,
        rgba(124, 58, 237, 0.06) 40%
      );
      background-size: 200% 100%;
    `}
`;

const ImageBox = styled(ShimmerBlock)`
  aspect-ratio: 4 / 5;
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Badge = styled(ShimmerBlock)`
  width: 72px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
`;

const Title = styled(ShimmerBlock)`
  width: 78%;
  height: 20px;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const Desc = styled(ShimmerBlock)`
  width: 58%;
  height: 16px;
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const Price = styled(ShimmerBlock)`
  width: 42%;
  height: 22px;
  margin-top: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

export default function ProductCardSkeleton({ count = 4, columns = 4, cardMinHeight }) {
  return (
    <Grid $columns={columns}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} $cardMinHeight={cardMinHeight}>
          <ImageBox />
          <Content>
            <Badge />
            <Title />
            <Desc />
            <Price />
          </Content>
        </Card>
      ))}
    </Grid>
  );
}
