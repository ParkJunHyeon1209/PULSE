import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import { createPortal } from 'react-dom';
import AppLogo from '../AppLogo';
import AppHeaderSearch from './AppHeaderSearch';
import AppHeaderUser from './AppHeaderUser';
import AppHeaderMobileMenu from './AppHeaderMobileMenu';
import useOverlayStore from '../../../store/useOverlayStore';
import { navItems } from './navConstants';
import { HamburgerIcon } from '../../../assets/icons/BtnIcon';

const NavWrap = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  min-height: 100px;
  padding-top: ${({ theme }) => theme.spacing[4]};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.border}; */

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${({ theme }) => theme.colors.navBg};
    backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  }
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
  transition: gap ${({ theme }) => theme.motion.normal};
  @media (max-width: 900px) {
    gap: ${({ theme }) => theme.spacing[4]};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
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

const DesktopOnly = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.08)`};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

export default function AppHeader() {
  const closeSearch = useOverlayStore((state) => state.closeSearch);
  const openMobileMenu = useOverlayStore((state) => state.openMobileMenu);

  return createPortal(
    <>
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
                onClick={closeSearch}
              >
                {item.label}
              </NavItem>
            ))}
          </NavLinks>

          <NavRight>
            <AppHeaderSearch />
            <DesktopOnly>
              <AppHeaderUser />
            </DesktopOnly>
            <HamburgerBtn aria-label="menu-open" onClick={openMobileMenu}>
              <HamburgerIcon />
            </HamburgerBtn>
          </NavRight>
        </NavInner>
      </NavWrap>
      <AppHeaderMobileMenu />
    </>,
    document.getElementById('nav-root')
  );
}
