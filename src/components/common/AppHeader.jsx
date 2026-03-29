import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import AppLogo from './AppLogo';
import AppHeaderSearch from './AppHeaderSearch';
import AppHeaderUser from './AppHeaderUser';

const navItems = [
  { label: 'Lineup', to: '/categories/', end: true },
  { label: 'Headset', to: '/categories/headset' },
  { label: 'Gear', to: '/categories/gear' },
  { label: 'Console', to: '/categories/console' },
  { label: 'DROPS', to: '/categories/drops', isDrops: true },
];

const NavWrap = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  min-height: 100px;
  padding-top: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.navBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.border}; */
`;

const NavInner = styled.div`
  max-width: ${({ theme }) => theme.grid.max};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[20]}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[6]};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => `${theme.spacing[5]} ${theme.grid.margin}`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    order: 3;
    justify-content: center;
    width: 100%;
    padding-top: ${({ theme }) => theme.spacing[2]};
  }
`;

/* shouldForwardProp: $isDrops가 NavLink → <a> DOM까지 전달되는 것 차단 */
const NavItem = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== '$isDrops',
})`
  position: relative;
  padding-bottom: 3px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 500;
  letter-spacing: 0.14em;
  color: ${({ $isDrops, theme }) =>
    $isDrops
      ? `rgba(${theme.colors.accentRgb},${theme.mode === 'light' ? '.65' : '.7'})`
      : theme.colors.textSecondary};

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    right: 50%;
    bottom: 0;
    height: 1px;
    border-radius: 1px;
    background: ${({ $isDrops, theme }) =>
      $isDrops ? 'linear-gradient(90deg,#ec4899,#f472b6)' : theme.gradients.navActive};
    transition:
      left ${({ theme }) => theme.motion.normal},
      right ${({ theme }) => theme.motion.normal};
  }

  &::before {
    content: attr(data-label);
    display: block;
    font-weight: 700;
    height: 0;
    visibility: hidden;
    overflow: hidden;
    pointer-events: none;
  }

  &:hover,
  &.active {
    color: ${({ $isDrops, theme }) => ($isDrops ? theme.colors.accent : theme.colors.text)};
    font-weight: 700;
  }

  &:hover::after,
  &.active::after {
    left: 0;
    right: 0;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export default function AppHeader() {
  return (
    <NavWrap>
      <NavInner>
        <AppLogo />

        <NavLinks>
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              end={item.end}
              $isDrops={item.isDrops}
              data-label={item.label}
            >
              {item.label}
            </NavItem>
          ))}
        </NavLinks>

        <NavRight>
          <AppHeaderSearch />
          <AppHeaderUser />
        </NavRight>
      </NavInner>
    </NavWrap>
  );
}
