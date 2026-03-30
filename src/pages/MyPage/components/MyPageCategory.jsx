import styled from '@emotion/styled';
import React from 'react';
import useOverlayStore from '../../../store/useOverlayStore';
import { useNavigate } from 'react-router-dom';
import BaseModal from '../../../components/common/BaseModal';
import BaseBtn from '../../../components/common/BaseBtn';
import useAuthStore from '../../../store/useAuthStore';

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

export default function MyPageCategory({ setCategory }) {
  const openModal = useOverlayStore((state) => state.openModal);

  return (
    <CategoryList>
      <li>
        <h4>내 계정</h4>
        <ul>
          <li onClick={() => setCategory('order')}>주문내역</li>
          <li onClick={() => setCategory('wish')}>위시리스트</li>
          <li onClick={() => setCategory('review')}>작성 리뷰</li>
          <li onClick={() => setCategory('coupon')}>혜택 • 쿠폰</li>
        </ul>
      </li>
      <li>
        <h4>설정</h4>
        <ul>
          <li onClick={() => setCategory('profile')}>프로필 편집</li>
          <li onClick={() => setCategory('address')}>배송지 관리</li>
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
  gap: ${({ theme }) => theme.spacing[10]};
  > li {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    h4 {
      font-size: 18px;
      font-weight: 600;
    }
    > ul {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing[2]};
      li {
        cursor: pointer;
        font-size: ${({ theme }) => theme.fontSize.s};
        color: ${({ theme }) => theme.colors.textSecondary};
      }
    }
  }
  > li:not(:last-child) {
    padding-bottom: ${({ theme }) => theme.spacing[4]};
    border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
  }
  > li:last-child {
    button {
      padding: 0;
      font-size: ${({ theme }) => theme.fontSize.s};
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;
