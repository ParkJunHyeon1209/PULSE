import React from 'react';
import styled from '@emotion/styled';
import useAuthStore from '../../../store/useAuthStore';
import BaseSection from '../../../components/common/BaseSection';
import { theme } from '../../../styles/theme';
import BaseBtn from '../../../components/common/BaseBtn';
import CategoryRender from './CategoryRender';

export default function MyInfo({ setCategory, logout }) {
  const user = useAuthStore((state) => state.user);
  const handleProfile = () => {
    return setCategory('profile');
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <MyInfoWrap>
      <Profile>
        <InitialName>
          <span>{user?.name?.charAt(0) || 'K'}</span>
        </InitialName>
        <UserInfo>
          <BaseSection
            label="PULSE MEMBER"
            colorTitle={user?.name || '게스트'}
            sub={`${user?.email || 'pulse@pulse.kr'}`}
          />
          <GradeBadge>{user?.grade || 'SILVER'}</GradeBadge>
        </UserInfo>
      </Profile>
      <Settings>
        <BaseBtn variant="secondary" icon={false} onClick={handleProfile}>
          프로필 편집
        </BaseBtn>
        <BaseBtn variant="secondary" icon={false} onClick={handleLogout}>
          로그아웃
        </BaseBtn>
      </Settings>
    </MyInfoWrap>
  );
}

const MyInfoWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[15]} ${({ theme }) => theme.spacing[20]};
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
  width: ${({ theme }) => theme.spacing[20]};
  height: ${({ theme }) => theme.spacing[20]};
  position: relative;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.status.new};
    border: 2px solid ${({ theme }) => theme.colors.background};
    border-radius: 50%;
  }
  > span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
const UserInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;
const GradeBadge = styled.p`
  align-self: flex-end;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  background-color: ${theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize.xxs};
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
