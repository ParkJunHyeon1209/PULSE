import styled from '@emotion/styled';
import useOverlayStore from '../../../../store/useOverlayStore';
import useAuthStore from '../../../../store/useAuthStore';
import useReviewStore from '../../../../store/useReviewStore';
import useWishlistStore from '../../../../store/useWishlistStore';
import useOrderStore from '../../../../store/useOrderStore';
import {
  AddressIcon,
  CartIcon,
  CouponIcon,
  HeartIcon,
  LogoutIcon,
  ReviewIcon,
  UserIcon,
} from '../../../../assets/icons/BtnIcon';

const ensureArray = (value) => (Array.isArray(value) ? value : []);


export default function MyPageCategory({ category, setCategory }) {
  const openModal = useOverlayStore((state) => state.openModal);
  const isActive = (itemCategory) => category === itemCategory;
  const user = useAuthStore((state) => state.user);
  const reviews = useReviewStore((state) => state.reviews);
  const wishlistCount = useWishlistStore((state) => state.wishlistIds).length;
  const orderCount = useOrderStore((state) => state.orders.length);
  const reviewCount =
    ensureArray(reviews).length > 0
      ? ensureArray(reviews).length
      : ensureArray(user?.reviewList).length;

  return (
    <CategoryList>
      <li>
        <h4>내 계정</h4>
        <ul>
          <CategoryType $isActive={isActive('order')} onClick={() => setCategory('order')}>
            <div className="icontext">
              <CartIcon width={16} height={16} />
              주문내역
            </div>
            <span>{orderCount || 0}</span>
          </CategoryType>
          <CategoryType $isActive={isActive('wish')} onClick={() => setCategory('wish')}>
            <div className="icontext">
              <HeartIcon width={16} height={16} />찜 목록
            </div>
            <span>{wishlistCount || 0}</span>
          </CategoryType>
          <CategoryType $isActive={isActive('review')} onClick={() => setCategory('review')}>
            <div className="icontext">
              <ReviewIcon />
              작성 리뷰
            </div>
            <span>{reviewCount}</span>
          </CategoryType>
          <CategoryType $isActive={isActive('coupon')} onClick={() => setCategory('coupon')}>
            <div className="icontext">
              <CouponIcon />
              <DotDividerText>
                <span>혜택</span>
                <span>쿠폰</span>
              </DotDividerText>
            </div>
            <span>{user?.coupons?.length || 0}</span>
          </CategoryType>
        </ul>
      </li>
      <li>
        <h4>설정</h4>
        <ul>
          <CategoryType $isActive={isActive('profile')} onClick={() => setCategory('profile')}>
            <div className="icontext">
              <UserIcon />
              프로필 편집
            </div>
          </CategoryType>
          <CategoryType $isActive={isActive('address')} onClick={() => setCategory('address')}>
            <div className="icontext">
              <AddressIcon />
              배송지 관리
            </div>
          </CategoryType>
        </ul>
      </li>
      <li>
        <div className="icontext">
          <button onClick={() => openModal('logout')}>
            <LogoutIcon />
            로그아웃
          </button>
        </div>
      </li>
    </CategoryList>
  );
}

const CategoryList = styled.ul`
  /* min-width: 240px; */
  flex: 1;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};

  .icontext {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    > button {
      display: flex;
      gap: ${({ theme }) => theme.spacing[2]};
      align-items: center;
    }
  }

  > li {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    h4 {
      padding-top: ${({ theme }) => theme.spacing[2]};
      font-size: ${({ theme }) => theme.fontSize.xxxs};
      color: ${({ theme }) => theme.colors.textSecondary};
    }
    > ul {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing[1]};
    }
  }
  > li:not(:last-child) {
    padding-bottom: ${({ theme }) => theme.spacing[4]};
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.primary + '33'};
  }
  > li:last-child {
    padding-left: ${({ theme }) => theme.spacing[2]};
    border-left: 1px solid transparent;
    > div {
      padding-top: ${({ theme }) => theme.spacing[2]};
    }
    button {
      text-align: left;
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.colors.error};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: 100%;
    width: 100%;
    padding-left: 0;
    order: 2;
    gap: 0;

    > li {
      display: none;
    }
  }
`;

const CategoryType = styled.li`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'inherit')};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary + '15' : 'transparent'};
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  border-left: 1px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : 'transparent')};
  transition:
    color 0.2s,
    background-color 0.2s,
    border-color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary + '15'};
  }

  > span {
    box-sizing: border-box;
    min-width: 26px;
    height: 24px;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radii.pill};

    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;

    color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.wColor : theme.colors.textSecondary};

    background: ${({ theme, $isActive }) =>
      $isActive
        ? `linear-gradient(135deg, ${theme.colors.primary}55, ${theme.colors.primary}22)`
        : `linear-gradient(180deg, rgba(232, 186, 255, 0.1),${theme.colors.btn2Bg})`};

    border: 1px solid
      ${({ theme, $isActive }) => ($isActive ? theme.colors.primary + '66' : theme.colors.border)};

    box-shadow: ${({ theme, $isActive }) =>
      $isActive
        ? `0 4px 12px ${theme.colors.primary}22, 0 0 14px ${theme.colors.primary}1a`
        : `0 2px 6px ${theme.colors.primary}10`};

    backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
    transition:
      color 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }
`;

const DotDividerText = styled.span`
  display: inline-flex;
  align-items: center;

  > span + span {
    position: relative;
    margin-left: ${({ theme }) => theme.spacing[4]};
  }

  > span + span::before {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(${({ theme }) => theme.spacing[2]} * -1.25);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    transform: translateY(-50%);
  }
`;
