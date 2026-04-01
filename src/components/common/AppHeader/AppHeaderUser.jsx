import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../BaseBtn';
import {
  UserIcon,
  CartIcon,
  LoginIcon,
  LogoutIcon,
  SunIcon,
  MoonIcon,
  HeartIcon,
} from '../../../assets/icons/BtnIcon';
import usePanel from '../../../hooks/usePanel';
import useCartStore from '../../../store/useCartStore';
import useOverlayStore from '../../../store/useOverlayStore';
import useThemeStore from '../../../store/useThemeStore';
import useAuthStore from '../../../store/useAuthStore';

const AvatarButton = styled(BaseBtn)`
  overflow: visible;
`;

const AvatarStatus = styled.span`
  position: absolute;
  right: -12px;
  top: -12px;
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.status.new};
  border: 2px solid ${({ theme }) => theme.colors.background};
`;

const DropWrap = styled.div`
  position: relative;
`;

const Drop = styled.div`
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.dropdown.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.dropdown.bg};
  backdrop-filter: ${({ theme }) => theme.effects.blurDropdown};
  color: ${({ theme }) => theme.colors.text};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transform: ${({ $open }) => ($open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(.97)')};
  transform-origin: top right;
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
  box-shadow: ${({ theme }) => theme.dropdown.shadow};
  z-index: 500;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 17px;
    width: 10px;
    height: 10px;
    background: ${({ theme }) => theme.dropdown.bg};
    border-top: 1px solid ${({ theme }) => theme.dropdown.border};
    border-left: 1px solid ${({ theme }) => theme.dropdown.border};
    transform: rotate(45deg);
  }
`;

const DropLabel = styled.div`
  padding: ${({ theme }) => `${theme.spacing[3]} 13px 8px`};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const DropItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} 13px`};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-align: left;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.error : theme.colors.text)};
  font-size: ${({ theme }) => theme.fontSize.xxxs};

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    color: ${({ $danger, theme }) => ($danger ? theme.colors.error : theme.colors.primary)};
  }

  &:hover {
    background: ${({ $danger, theme }) =>
      $danger ? theme.dropdown.hoverDanger : theme.dropdown.hoverBg};
  }
`;

const ThemeRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} 13px`};
  border-radius: ${({ theme }) => theme.radii.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.dropdown.hoverBg};
  }
`;

const ThemeText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CartButton = styled(BaseBtn)`
  overflow: visible;
  position: relative;
  color: ${({ theme }) => theme.colors.primary};

  &::after {
    content: attr(data-count);
    position: absolute;
    top: -6px;
    right: -6px;
    min-width: 22px;
    height: 22px;
    padding: 0 ${({ theme }) => theme.spacing[1]};
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 2px solid ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.gradients.navActive};

    color: ${({ theme }) => theme.colors.wColor};
    display: flex;
    align-items: center;
    justify-content: center;
    /* font-family: ${({ theme }) => theme.fontFamily.mono}; */
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 600;
    box-sizing: border-box;
  }
`;

const DropDivider = styled.div`
  height: 1px;
  margin: ${({ theme }) => theme.spacing[1]} 0;
  background: ${({ theme }) => theme.colors.border};
`;

const DropProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[3]} 13px 10px`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const DropProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.gradients.navActive};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
`;

const DropProfileInfo = styled.div`
  min-width: 0;
`;

const DropProfileName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DropProfileEmail = styled.div`
  margin-top: 2px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.04em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const AvatarCircle = styled(BaseBtn)`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 700;
  color: #fff;

  &:hover {
    box-shadow: 0 0 0 4px ${({ theme }) => `rgba(${theme.colors.primaryRgb},.12)`};
  }
`;

const ToggleDeco = styled.span`
  position: absolute;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);
  font-size: 5px;
  letter-spacing: 4px;
  line-height: 1;
  color: ${({ theme }) => theme.tones.violet.subtleColor};
  opacity: 1;
  pointer-events: none;
  transition: opacity ${({ theme }) => theme.motion.slow};

  ${({ theme, $on }) =>
    $on &&
    theme.mode === 'light' &&
    `
      right: auto;
      left: 7px;
    `}
`;

const ToggleIcon = styled.span`
  position: absolute;
  top: 7px;
  left: ${({ $on }) => ($on ? '30px' : '8px')};
  transition: left 100ms ease-out;
  width: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary};
  pointer-events: none;

  svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }
`;

const ToggleButton = styled.div`
  position: relative;
  width: 48px;
  height: 26px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.toggle.trackBorder};
  background: ${({ theme }) => theme.toggle.trackBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurButton};
  box-shadow: ${({ theme }) => theme.toggle.trackShadow};
  transition:
    background ${({ theme }) => theme.motion.slow},
    border-color ${({ theme }) => theme.motion.slow},
    box-shadow ${({ theme }) => theme.motion.slow};

  &:hover {
    border-color: ${({ theme }) => theme.toggle.trackHoverBorder};
    box-shadow: ${({ theme }) => theme.toggle.trackHoverShadow};
  }

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: ${({ theme }) => theme.radii.full};
    background: ${({ theme }) => theme.toggle.thumbBg};
    box-shadow: ${({ theme }) => theme.toggle.thumbShadow};
    transform: ${({ $on }) => ($on ? 'translateX(22px)' : 'translateX(0)')};
    transition:
      transform ${({ theme }) => theme.motion.normal},
      box-shadow ${({ theme }) => theme.motion.slow};
  }
`;

export default function AppHeaderUser() {
  const open = useOverlayStore((state) => state.loginOpen);
  const onOpen = useOverlayStore((state) => state.openLogin);
  const closeLogin = useOverlayStore((state) => state.closeLogin);
  const cart = useCartStore((state) => state.cart);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const onThemeToggle = useThemeStore((state) => state.toggleTheme);
  const wrapRef = usePanel({ open, onClose: closeLogin });
  const { isLogin, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const initial = user?.nickname?.[0]?.toUpperCase() ?? user?.name?.[0]?.toUpperCase() ?? 'P';
  const handleLogout = () => {
    logout();
    closeLogin();
    navigate('/');
  };

  return (
    <>
      <DropWrap ref={wrapRef}>
        {isLogin ? (
          <AvatarCircle aria-label="User menu" onClick={onOpen}>
            {initial}
          </AvatarCircle>
        ) : (
          <AvatarButton height={'42px'} variant="ic-btn" aria-label="User menu" onClick={onOpen}>
            <UserIcon />
            <AvatarStatus />
          </AvatarButton>
        )}

        <Drop $open={open}>
          {isLogin ? (
            <>
              <DropProfile>
                <DropProfileAvatar>{initial}</DropProfileAvatar>
                <DropProfileInfo>
                  <DropProfileName>{user?.name ?? 'PULSE USER'}</DropProfileName>
                  <DropProfileEmail>{user?.email ?? ''}</DropProfileEmail>
                </DropProfileInfo>
              </DropProfile>
              <DropItem
                type="button"
                onClick={() => {
                  closeLogin();
                  navigate('/mypage');
                }}
              >
                <UserIcon />
                마이페이지
              </DropItem>
              <DropItem
                type="button"
                onClick={() => {
                  closeLogin();
                  navigate('/mypage?tab=order');
                }}
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                주문 내역
              </DropItem>
              <DropItem
                type="button"
                onClick={() => {
                  closeLogin();
                  navigate('/mypage?tab=wish');
                }}
              >
                <HeartIcon strokeWidth="1.8" />찜 목록
              </DropItem>
              <ThemeRow type="button" onClick={onThemeToggle}>
                <ThemeText>THEME</ThemeText>
                <ToggleButton $on={!isDarkMode} aria-hidden="true">
                  <ToggleIcon $on={!isDarkMode}>
                    {isDarkMode ? <MoonIcon strokeWidth="2" /> : <SunIcon strokeWidth="2" />}
                  </ToggleIcon>
                  <ToggleDeco $on={!isDarkMode}>···</ToggleDeco>
                </ToggleButton>
              </ThemeRow>
              <DropDivider />
              <DropItem type="button" $danger onClick={handleLogout}>
                <LogoutIcon />
                로그아웃
              </DropItem>
            </>
          ) : (
            <>
              <DropLabel>PULSE ACCOUNT</DropLabel>
              <DropItem
                type="button"
                onClick={() => {
                  closeLogin();
                  navigate('/login');
                }}
              >
                <LoginIcon />
                로그인 / 회원가입
              </DropItem>
              <ThemeRow type="button" onClick={onThemeToggle}>
                <ThemeText>THEME</ThemeText>
                <ToggleButton $on={!isDarkMode} aria-hidden="true">
                  <ToggleIcon $on={!isDarkMode}>
                    {isDarkMode ? <MoonIcon strokeWidth="2" /> : <SunIcon strokeWidth="2" />}
                  </ToggleIcon>
                  <ToggleDeco $on={!isDarkMode}>···</ToggleDeco>
                </ToggleButton>
              </ThemeRow>
            </>
          )}
        </Drop>
      </DropWrap>

      <CartButton
        height={'42px'}
        variant="ic-btn"
        aria-label="Cart"
        data-count={`${cart.length}`}
        onClick={() => navigate('/shoppingcart')}
      >
        <CartIcon strokeWidth="1" />
      </CartButton>
    </>
  );
}
