import styled from '@emotion/styled';

export const PageContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.text};
`;

export const PageInner = styled.div`
  /* width: min(${({ theme }) => theme.grid.max}, calc(100% - 48px)); */
  padding-inline: ${({ theme }) => theme.grid.margin};
  margin: 0 auto;
  /* padding: ${({ theme }) => theme.spacing[8]} 0 ${({ theme }) => theme.spacing[20]}; */

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: min(100%, calc(100% - 32px));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: calc(100% - 24px);
    /* padding: ${({ theme }) => theme.spacing[6]} 0 ${({ theme }) => theme.spacing[16]}; */
  }
`;
