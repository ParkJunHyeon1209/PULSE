import React from 'react';
import styled from '@emotion/styled';
import useAuthStore from '../../../store/useAuthStore';
import BaseSection from '../../../components/common/BaseSection';
import BaseBtn from '../../../components/common/BaseBtn';

export default function MyInfo({ setCategory }) {
  const user = useAuthStore((state) => state.user);
  const handleProfile = (category) => {
    return setCategory(category);
  };

  return (
    <MyInfoWrap>
      <Profile>
        <InitialName>
          <span>
            {user?.nickname?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'P'}
          </span>
        </InitialName>
        <UserInfo>
          <BaseSection
            label="PULSE MEMBER"
            colorTitle={user?.name || 'PULSE USER'}
            sub={`${user?.id || 'pulse@pulse.kr'}`}
          />
          <GradeBadge>{user?.grade || 'MEMBER'}</GradeBadge>
        </UserInfo>
      </Profile>
      <Settings>
        <SettingBtn variant="secondary" icon={false} onClick={() => handleProfile('profile')}>
          프로필 편집
        </SettingBtn>
        <SettingBtn variant="secondary" icon={false} onClick={() => handleProfile('address')}>
          배송지관리
        </SettingBtn>
      </Settings>
    </MyInfoWrap>
  );
}

const MyInfoWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[14]} ${({ theme }) => theme.spacing[20]};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[6]};
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[5]};
  }

  @media (max-width: 400px) {
    padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[3]};
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;
const InitialName = styled.div`
  max-width: 128px;
  width: clamp(64px, 7.5vw, 88px);
  height: clamp(64px, 7.5vw, 88px);
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 0;
    flex: 1;
  }

  > div:first-of-type > div:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }

  > div:first-of-type h2 {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    font-size: clamp(28px, 3vw, 38px);
  }

  > div:first-of-type p {
    padding-top: 0;
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-family: ${({ theme }) => theme.fontFamily.mono};
    line-height: 1.35;
  }
`;
const GradeBadge = styled.p`
  align-self: flex-end;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fontFamily.mono};
`;
const Settings = styled.div`
  position: relative;
  align-self: flex-end;
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  > button {
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.tones.violet.hoverColor + '04'};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    align-self: stretch;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const SettingBtn = styled(BaseBtn)`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 calc(50% - 12px);
    min-width: 0;
  }

  @media (max-width: 400px) {
    flex-basis: 100%;
  }

  > span {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }
`;
