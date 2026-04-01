import styled from '@emotion/styled';
import React from 'react';
import useOverlayStore from '../../../store/useOverlayStore';
import { useNavigate } from 'react-router-dom';
import BaseModal from '../../../components/common/BaseModal';
import BaseBtn from '../../../components/common/BaseBtn';
import useAuthStore from '../../../store/useAuthStore';
import useWishlistStore from '../../../store/useWishlistStore';
import useOrderStore from '../../../store/useOrderStore';

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
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={() => {
            logout();
            closeModal('logout');
            navigate('/', { replace: true });
          }}
        >
          확인
        </BaseBtn>
        <BaseBtn
          padding="12px 32px"
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={() => {
            closeModal('logout');
          }}
        >
          취소
        </BaseBtn>
      </div>
    </BaseModal>
  );
}

export default function MyPageCategory({ category, setCategory }) {
  const openModal = useOverlayStore((state) => state.openModal);
  const isActive = (itemCategory) => category === itemCategory;
  const user = useAuthStore((state) => state.user);
  const wishlistCount = useWishlistStore((state) => state.wishlistIds).length;
  const orderCount = useOrderStore((state) => state.orders.length);

  return (
    <CategoryList>
      <li>
        <h4>내 계정</h4>
        <ul>
          <CategoryType $isActive={isActive('order')} onClick={() => setCategory('order')}>
            주문내역
            <span>{orderCount || 0}</span>
          </CategoryType>
          <CategoryType $isActive={isActive('wish')} onClick={() => setCategory('wish')}>
            위시리스트
            <span>{wishlistCount || 0}</span>
          </CategoryType>
          <CategoryType $isActive={isActive('review')} onClick={() => setCategory('review')}>
            작성 리뷰
            <span>{user?.reviewList?.length || 0}</span>
          </CategoryType>
          <CategoryType $isActive={isActive('coupon')} onClick={() => setCategory('coupon')}>
            혜택 • 쿠폰
            <span>{user?.couponList?.length || 0}</span>
          </CategoryType>
        </ul>
      </li>
      <li>
        <h4>설정</h4>
        <ul>
          <CategoryType $isActive={isActive('profile')} onClick={() => setCategory('profile')}>
            프로필 편집
          </CategoryType>
          <CategoryType $isActive={isActive('address')} onClick={() => setCategory('address')}>
            배송지 관리
          </CategoryType>
        </ul>
      </li>
      <li>
        <button onClick={() => openModal('logout')}>로그아웃</button>
      </li>
      <LogoutModal />
    </CategoryList>
  );
}

const CategoryList = styled.ul`
  min-width: 240px;
  flex: 1;
  flex-shrink: 0;
  padding-left: ${({ theme }) => theme.spacing[20]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};

  > li {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    h4 {
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
    button {
      text-align: left;
      font-size: ${({ theme }) => theme.fontSize.s};
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

const CategoryType = styled.li`
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing[2]};
  display: flex;
  justify-content: space-between;
  position: relative;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.textSecondary};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary + '15' : 'transparent'};
  border-top-right-radius: ${({ theme }) => theme.radii.sm};
  border-bottom-right-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary + '15'};
  }

  &::before {
    content: '';
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radii.sm} 0 0 ${({ theme }) => theme.radii.sm};
  }
`;
