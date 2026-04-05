import { useState } from 'react';
import styled from '@emotion/styled';
import useAuthStore from '../../../../store/useAuthStore';
import BaseBtn from '../../../../components/common/BaseBtn';
import { AddressIcon, EditIcon, MailIcon, LavStarIcon } from '../../../../assets/icons/BtnIcon';
import getUserInitial from '../../../../utils/getUserInitial';
import { gradeToneMap } from '../../../../utils/myPageMap';
import ProfileIconPicker from '../../../../components/common/ProfileIconPicker';
import { PROFILE_ICONS } from '../../../../assets/icons/profileIcons/profileIconsData';

export default function MyInfo({ setCategory }) {
  const user = useAuthStore((state) => state.user);
  const profileIcon = useAuthStore((state) => state.profileIcon);
  const setProfileIcon = useAuthStore((state) => state.setProfileIcon);
  const [pickerOpen, setPickerOpen] = useState(false);
  const handleProfile = (category) => setCategory(category);
  const initial = getUserInitial(user);

  const iconSrc = profileIcon
    ? PROFILE_ICONS.find((i) => i.id === profileIcon)?.src
    : null;

  return (
    <MyInfoWrap>
      {pickerOpen && (
        <ProfileIconPicker
          activeId={profileIcon}
          onSelect={setProfileIcon}
          onClose={() => setPickerOpen(false)}
        />
      )}
      <Profile>
        <ProfileAvatar
          icon={false}
          aria-label="프로필 아이콘 변경"
          onClick={() => setPickerOpen(true)}
          $hasIcon={Boolean(iconSrc)}
        >
          {iconSrc ? <img src={iconSrc} alt="프로필 아이콘" /> : initial}
        </ProfileAvatar>
        <UserInfo>
          <SectionBox>
            <ProfileLabel>
              <LavStarIcon>✦</LavStarIcon>
              PULSE MEMBER
            </ProfileLabel>
            <ProfileName>
              {user?.name || 'PULSE USER'}
              <GradeBadge $grade={user?.grade || 'MEMBER'}>{user?.grade || 'MEMBER'}</GradeBadge>
            </ProfileName>
          </SectionBox>
          <ProfileMeta>
            <ProfileEmail>
              <MailIcon aria-hidden="true" />
              {user?.id || 'pulse@pulse.kr'}
            </ProfileEmail>
          </ProfileMeta>
        </UserInfo>
      </Profile>
      <Settings>
        <SettingBtn
          variant="secondary"
          icon={false}
          height="36px"
          padding="8px 24px"
          onClick={() => handleProfile('profile')}
        >
          <EditIcon aria-hidden="true" />
          프로필 편집
        </SettingBtn>
        <SettingBtn
          variant="secondary"
          icon={false}
          onClick={() => handleProfile('address')}
          height="36px"
          padding="8px 24px"
        >
          <AddressIcon width={13} height={13} aria-hidden="true" />
          배송지관리
        </SettingBtn>
      </Settings>
    </MyInfoWrap>
  );
}

const MyInfoWrap = styled.div`
  position: relative;
  overflow: hidden;
  padding: 64px 0 48px;
  padding-inline: ${({ theme }) => theme.grid.margin};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid transparent;
  border-image: ${({ theme }) => theme.colors.dividerStrong} 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 60% 100% at 50% 0%,
      rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    /* padding: ${({ theme }) => theme.spacing[10]} ${({ theme }) => theme.spacing[6]}; */
    /* ${({ theme }) => theme.spacing[8]}; */
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[5]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    /* padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[3]}; */
    /* ${({ theme }) => theme.spacing[6]}; */
    /* gap: ${({ theme }) => theme.spacing[4]}; */
  }
`;

const Profile = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  transition: gap ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const ProfileAvatar = styled(BaseBtn)`
  flex: 0 0 auto;
  width: clamp(76px, 7vw, 98px);
  height: clamp(76px, 7vw, 98px);
  min-width: 0;
  padding: ${({ $hasIcon }) => ($hasIcon ? '10px' : '0')};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 3px solid ${({ theme }) => theme.colors.primary + '59'};
  box-shadow:
    0 0 0 6px ${({ theme }) => theme.colors.primary + '1a'},
    0 0 40px ${({ theme }) => theme.colors.primary + '4d'};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: clamp(28px, 3vw, 36px);
  line-height: 1;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.wColor};
  cursor: pointer;
  overflow: hidden;
  transition:
    width ${({ theme }) => theme.motion.normal},
    height ${({ theme }) => theme.motion.normal},
    font-size ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal},
    border-color 0.18s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow:
      0 0 0 6px ${({ theme }) => theme.colors.primary + '28'},
      0 0 40px ${({ theme }) => theme.colors.primary + '66'};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-width: 0;
    flex: 1;
  }
`;

const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileLabel = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.28em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
`;

const ProfileName = styled.h2`
  position: relative;
  /* padding-bottom: ${({ theme }) => theme.spacing[5]}; */
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.text} 0%,
    rgba(167, 139, 250, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProfileMeta = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
`;

const GradeBadge = styled.p`
  position: absolute;
  left: calc(100% + 18px);
  bottom: 1px;
  -webkit-text-fill-color: initial;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 0.1em;
  background: ${({ $grade }) => gradeToneMap[$grade]?.bg ?? gradeToneMap.MEMBER.bg};
  border: 1px solid ${({ $grade }) => gradeToneMap[$grade]?.border ?? gradeToneMap.MEMBER.border};
  color: ${({ $grade, theme }) =>
    theme.mode === 'dark'
      ? (gradeToneMap[$grade]?.color ?? gradeToneMap.MEMBER.color)
      : (gradeToneMap[$grade]?.lightColor ?? gradeToneMap.MEMBER.lightColor)};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-weight: 700;
  white-space: nowrap;

  &::before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ $grade, theme }) =>
      theme.mode === 'dark'
        ? (gradeToneMap[$grade]?.color ?? gradeToneMap.MEMBER.color)
        : (gradeToneMap[$grade]?.lightColor ?? gradeToneMap.MEMBER.lightColor)};
    flex-shrink: 0;
  }
`;

const ProfileEmail = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  letter-spacing: 0.04em;

  svg {
    opacity: 0.6;
    flex-shrink: 0;
    stroke-width: 3.3;
  }
`;

const Settings = styled.div`
  position: relative;
  z-index: 1;
  align-self: flex-end;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  padding-bottom: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    align-self: stretch;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`;

const SettingBtn = styled(BaseBtn)`
  display: flex;
  align-items: center;

  > span {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
  }
  font-family: ${({ theme }) => theme.fontFamily.mono};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};

  transition:
    border-color 0.22s,
    color 0.22s,
    background 0.22s;

  &:hover {
    border-color: rgba(167, 139, 250, 0.35);
    color: ${({ theme }) => theme.colors.primary};
    background: rgba(124, 58, 237, 0.08);
  }

  > span {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  svg {
    flex-shrink: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 calc(50% - 12px);
    min-width: 0;
    justify-content: center;
  }

  /* @media (max-width: 400px) {
    flex-basis: 100%;
  } */
`;
