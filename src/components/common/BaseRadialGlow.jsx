import styled from '@emotion/styled';

const BaseRadialGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ $opacity }) => $opacity ?? 0.4};
  background: ${({ theme }) => `
    radial-gradient(circle at 18% 24%, ${theme.tones.blue.subtleColor}, transparent 28%),
    radial-gradient(circle at 82% 18%, rgba(${theme.colors.accentRgb}, 0.2), transparent 24%),
    radial-gradient(circle at 52% 76%, rgba(${theme.colors.primaryRgb}, 0.18), transparent 32%)
  `};
`;

export default BaseRadialGlow;
