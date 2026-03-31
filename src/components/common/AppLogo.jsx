import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import logoDark from '../../assets/Logo-dark.svg';
import logoLight from '../../assets/Logo-wite.svg';

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
`;

const LogoImg = styled.img`
  width: ${({ $size }) => $size || '120px'};
  height: auto;
`;

export default function AppLogo({ size, ...props }) {
  const theme = useTheme();
  return (
    <LogoLink to="/" {...props}>
      <LogoImg
        $size={size}
        src={theme.mode === 'dark' ? logoDark : logoLight}
        alt="PULSE"
      />
    </LogoLink>
  );
}
