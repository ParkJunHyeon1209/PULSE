import styled from '@emotion/styled';
import BaseSection from '../../../../components/common/BaseSection';

export const getPanelBackground = (theme) =>
  `linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.012)), ${theme.colors.cardBgLight}`;

export const getSoftPanelBackground = (theme) =>
  `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)), ${theme.colors.cardBgLight}`;

export const BrandSectionHeading = styled(BaseSection)`
  .base-section-title {
    font-family: ${({ theme }) => theme.fontFamily.body};
    font-weight: 700;
    letter-spacing: 0.02em;
  }
`;
