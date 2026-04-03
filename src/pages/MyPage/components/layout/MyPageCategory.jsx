import styled from '@emotion/styled';
import React from 'react';
import useOverlayStore from '../../../../store/useOverlayStore';
import { useNavigate } from 'react-router-dom';
import BaseModal from '../../../../components/common/BaseModal';
import BaseBtn from '../../../../components/common/BaseBtn';
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

function LogoutModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.logout));
  const closeModal = useOverlayStore((state) => state.closeModal);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => {
        closeModal('logout');
      }}
      title="로그아웃 하시겠습니까?"
    >
      <p>정말 로그아웃 하시겠습니까?</p>
      <div className="btnwrap" style={{ display: 'flex', gap: '12px' }}>
        <BaseBtn
          padding="12px 32px"
          variant="secondary"
          icon={false}
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={() => {
            closeModal('logout');
          }}
        >
          취소
        </BaseBtn>

        <BaseBtn
          padding="12px 32px"
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={() => {
            logout();
            closeModal('logout');
            navigate('/', { replace: true });
          }}
        >
          확인
        </BaseBtn>
      </div>
    </BaseModal>
  );
}

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
              혜택 • 쿠폰
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
      <LogoutModal />
    </CategoryList>
  );
}

const CategoryList = styled.ul`
  min-width: 240px;
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
      gap: ${({ theme }) => theme.spacing[2]};
    }
  }
  > li:not(:last-child) {
    padding-bottom: ${({ theme }) => theme.spacing[4]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
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

    > li:not(:last-child) {
      display: none;
    }

    > li:last-child {
      align-self: flex-end;
      width: auto;
      padding-left: 0;
      border-left: none;
      border-top: 1px solid ${({ theme }) => theme.colors.textSecondary + '33'};

      > div {
        padding-top: ${({ theme }) => theme.spacing[4]};
        justify-content: flex-end;
      }

      button {
        width: auto;
      }
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

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary + '15'};
  }
`;
