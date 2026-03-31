import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import MyInfo from './components/MyInfo';
import Statistics from './components/Statistics';
import MainMyPage from './components/MainMyPage';
import MyPageCategory from './components/MyPageCategory';
import CategoryRender from './components/CategoryRender';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import useOverlayStore from '../../store/useOverlayStore';
import BaseModal from '../../components/common/BaseModal';
import BaseBtn from '../../components/common/BaseBtn';

function LoginModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.login));
  const closeModal = useOverlayStore((state) => state.closeModal);
  const navigate = useNavigate();

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => {
        closeModal('login');
        navigate('/login', { replace: true });
      }}
      title="로그인 후 이용해주세요."
    >
      <p>로그인 후 이용해주세요. 로그인 페이지로 이동합니다.</p>
      <BaseBtn
        padding="12px 32px"
        style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
        onClick={() => {
          closeModal('login');
          navigate('/login', { replace: true });
        }}
      >
        확인
      </BaseBtn>
    </BaseModal>
  );
}

export default function MyPage() {
  const [category, setCategory] = useState('');
  const isLoggedIn = useAuthStore((state) => state.isLogin);
  const openModal = useOverlayStore((state) => state.openModal);
  const closeModal = useOverlayStore((state) => state.closeModal);

  useEffect(() => {
    if (!isLoggedIn) {
      openModal('login');
    } else {
      closeModal('login');
    }
  }, [isLoggedIn, openModal, closeModal]);

  return (
    <MyPageWrap>
      <MyInfo setCategory={setCategory} />
      <Statistics />
      <MainMyPage>
        <MyPageCategory category={category} setCategory={setCategory} />
        <CategoryRender category={category} />
      </MainMyPage>
      <LoginModal />
    </MyPageWrap>
  );
}

const MyPageWrap = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;
