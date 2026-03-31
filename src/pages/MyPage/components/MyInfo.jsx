import React from 'react';
import styled from '@emotion/styled';
import useAuthStore from '../../../store/useAuthStore';
import BaseSection from '../../../components/common/BaseSection';
import { theme } from '../../../styles/theme';
import BaseBtn from '../../../components/common/BaseBtn';
import CategoryRender from './CategoryRender';
import useOverlayStore from '../../../store/useOverlayStore';
import { useNavigate } from 'react-router-dom';
import BaseModal from '../../../components/common/BaseModal';

function ConfirmLogoutModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.confirmlogout));
  const closeModal = useOverlayStore((state) => state.closeModal);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => {
        closeModal('confirmlogout');
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
            closeModal('confirmlogout');
            navigate('/', { replace: true });
          }}
        >
          확인
        </BaseBtn>
        <BaseBtn
          padding="12px 32px"
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={() => {
            closeModal('confirmlogout');
          }}
        >
          취소
        </BaseBtn>
      </div>
    </BaseModal>
  );
}

export default function MyInfo({ setCategory }) {
  const user = useAuthStore((state) => state.user);
  const openModal = useOverlayStore((state) => state.openModal);
  const handleProfile = () => {
    return setCategory('profile');
  };

  return (
    <MyInfoWrap>
      <Profile>
        <InitialName>
          <span>
            {user?.nickname?.charAt(0).toUpperCase() ?? user?.name?.charAt(0).toUpperCase() ?? 'P'}
          </span>
        </InitialName>
        <UserInfo>
          <BaseSection
            label="PULSE MEMBER"
            colorTitle={user?.name || 'PULSE USER'}
            sub={`${user?.id || 'pulse@pulse.kr'}`}
          />
          <GradeBadge>{user?.grade || 'SILVER'}</GradeBadge>
        </UserInfo>
      </Profile>
      <Settings>
        <BaseBtn variant="secondary" icon={false} onClick={handleProfile}>
          프로필 편집
        </BaseBtn>
        <BaseBtn variant="secondary" icon={false} onClick={() => openModal('logout')}>
          로그아웃
        </BaseBtn>
      </Settings>
      <ConfirmLogoutModal />
    </MyInfoWrap>
  );
}

const MyInfoWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[14]} ${({ theme }) => theme.spacing[20]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
`;
const InitialName = styled.div`
  max-width: 128px;
  width: ${({ theme }) => theme.fontSize.xxl};
  height: ${({ theme }) => theme.fontSize.xxl};
  position: relative;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
const UserInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;
const GradeBadge = styled.p`
  align-self: flex-end;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  border-radius: ${({ theme }) => theme.radii.pill};
`;
const Settings = styled.div`
  position: relative;
  align-self: flex-end;
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  > button {
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${theme.tones.violet.hoverColor + '04'};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  }
`;
