import { useEffect } from 'react';
import styled from '@emotion/styled';
import { NavLink, useNavigate } from 'react-router-dom';
import useOverlayStore from '../../../store/useOverlayStore';
import useAuthStore from '../../../store/useAuthStore';
import useCartStore from '../../../store/useCartStore';
import useThemeStore from '../../../store/useThemeStore';
import {
  LoginIcon,
  LogoutIcon,
  OrderIcon,
  CartIcon,
  HeartIcon,
  SunIcon,
  MoonIcon,
  UserIcon,
  DelIcon,
} from '../../../assets/icons/BtnIcon';
import { navItems } from './navConstants';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 110;
  background: ${({ theme }) => theme.colors.dimBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.28s ease;
`;

const Panel = styled.div`
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 111;
  width: min(320px, 85vw);
  background: ${({ theme }) => theme.colors.navBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transform: ${({ $open }) => ($open ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
`;

const PanelHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PanelTitle = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
`;

const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
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
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing[4]};

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.2)`};
    border-radius: 2px;
  }
`;

const SectionLabel = styled.div`
  /* font-family: ${({ theme }) => theme.fontFamily.mono}; */
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 700;
  letter-spacing: 0.18em;
  opacity: 0.7;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[2]} ${theme.spacing[2]}`};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const MenuNavItem = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== '$isDrops',
})`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[2]}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $isDrops, theme }) =>
    $isDrops ? `rgba(${theme.colors.accentRgb},.8)` : theme.colors.textSecondary};
  transition:
    background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover,
  &.active {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.08)`};
    color: ${({ $isDrops, theme }) => ($isDrops ? theme.colors.accent : theme.colors.text)};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => `${theme.spacing[2]} 0`};
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[2]}`};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ $danger, theme }) => ($danger ? theme.colors.error : theme.colors.text)};
  transition: background ${({ theme }) => theme.motion.fast};

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: ${({ $danger, theme }) => ($danger ? theme.colors.error : theme.colors.primary)};
  }

  &:hover {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.08)`};
  }
`;

const MenuItemRight = styled.span`
  margin-left: auto;
  min-width: 20px;
  height: 20px;
  padding: 0 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.12)`};
  border: 1px solid ${({ theme }) => `rgba(${theme.colors.primaryRgb},.2)`};
  display: flex;
  align-items: center;
  justify-content: center;
  /* font-family: ${({ theme }) => theme.fontFamily.mono}; */
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const PanelFoot = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export default function AppHeaderMobileMenu() {
  const open = useOverlayStore((state) => state.mobileMenuOpen);
  const close = useOverlayStore((state) => state.closeMobileMenu);
  const { isLogin, logout } = useAuthStore();
  const cart = useCartStore((state) => state.cart);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const navigate = useNavigate();
  const go = (path) => {
    close();
    navigate(path);
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Overlay $open={open} onClick={close} />
      <Panel $open={open}>
        <PanelHead>
          <PanelTitle>MENU</PanelTitle>
          <CloseBtn onClick={close} aria-label="Close menu">
            <DelIcon size={18} />
          </CloseBtn>
        </PanelHead>

        <PanelBody>
          <SectionLabel>카테고리</SectionLabel>
          <NavList>
            {navItems.map((item) => (
              <MenuNavItem
                key={item.to}
                to={item.to}
                end={item.end}
                $isDrops={item.isDrops}
                onClick={close}
              >
                {item.label}
              </MenuNavItem>
            ))}
          </NavList>

          <Divider />
          <SectionLabel>계정</SectionLabel>
          {isLogin ? (
            <>
              <MenuItem type="button" onClick={() => go('/mypage')}>
                <UserIcon />
                마이페이지
              </MenuItem>
              <MenuItem type="button" onClick={() => go('/mypage?tab=order')}>
                <OrderIcon />
                주문 내역
              </MenuItem>
              <MenuItem type="button" onClick={() => go('/mypage?tab=wishlist')}>
                <HeartIcon strokeWidth="1.8" />
                찜목록
              </MenuItem>
            </>
          ) : (
            <MenuItem type="button" onClick={() => go('/login')}>
              <LoginIcon />
              로그인 / 회원가입
            </MenuItem>
          )}

          <MenuItem type="button" onClick={() => go('/shoppingcart')}>
            <CartIcon strokeWidth="1.25" />
            장바구니
            {cart.length > 0 && <MenuItemRight>{cart.length}</MenuItemRight>}
          </MenuItem>

          <Divider />
          <MenuItem type="button" onClick={toggleTheme}>
            {isDarkMode ? <MoonIcon strokeWidth="2" /> : <SunIcon strokeWidth="2" />}
            THEME
          </MenuItem>
        </PanelBody>

        {isLogin && (
          <PanelFoot>
            <MenuItem
              type="button"
              $danger
              onClick={() => {
                logout();
                go('/');
              }}
            >
              <LogoutIcon />
              로그아웃
            </MenuItem>
          </PanelFoot>
        )}
      </Panel>
    </>
  );
}
