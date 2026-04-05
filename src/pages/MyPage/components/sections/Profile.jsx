import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import BaseBtn from '../../../../components/common/BaseBtn';
import useAuthStore from '../../../../store/useAuthStore';
import useOverlayStore from '../../../../store/useOverlayStore';
import BaseModal from '../../../../components/common/BaseModal';

const formatTel = (value = '') => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);

  if (numbers.length < 4) return numbers;
  if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
};

function ProfileUpdateModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.profileUpdate));
  const closeModal = useOverlayStore((state) => state.closeModal);

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => {
        closeModal('profileUpdate');
      }}
      title="프로필이 업데이트되었습니다."
    >
      <p>"프로필이 성공적으로 업데이트되었습니다."</p>
      <BaseBtn
        padding="12px 32px"
        style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
        onClick={() => {
          closeModal('profileUpdate');
        }}
      >
        확인
      </BaseBtn>
    </BaseModal>
  );
}

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.login);
  const openModal = useOverlayStore((state) => state.openModal);

  const [formData, setFormData] = useState({
    name: user?.name,
    nickname: user?.nickname ?? user?.name ?? '',
    email: user?.email || user?.id,
    tel: user?.tel || '',
    currentPassword: '',
    newPassword: '',
    newPasswordCheck: '',
  });

  const isChangingPassword =
    !!formData.currentPassword || !!formData.newPassword || !!formData.newPasswordCheck;

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const passwordErrors = useMemo(() => {
    const errors = {
      currentPassword: '',
      newPassword: '',
      newPasswordCheck: '',
    };

    if (!isChangingPassword) {
      return errors;
    }

    if (!formData.currentPassword) {
      errors.currentPassword = '현재 비밀번호를 입력해주세요.';
    } else if (formData.currentPassword !== user.password) {
      errors.currentPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.newPassword) {
      errors.newPassword = '새 비밀번호를 입력해주세요.';
    } else {
      const hasMinLength = formData.newPassword.length >= 8;
      const hasUpperCase = /[A-Z]/.test(formData.newPassword);
      const hasSpecialChar = /[!@#$%^&*+=-]/.test(formData.newPassword);

      if (!hasMinLength || !hasUpperCase || !hasSpecialChar) {
        errors.newPassword = '8자 이상, 대문자 1개, 특수문자 1개 이상 필요';
      }
    }

    if (!formData.newPasswordCheck) {
      errors.newPasswordCheck = '비밀번호 확인을 입력해주세요.';
    } else if (formData.newPassword !== formData.newPasswordCheck) {
      errors.newPasswordCheck = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
  }, [formData, user.password, isChangingPassword]);

  const isPasswordValid =
    !passwordErrors.currentPassword &&
    !passwordErrors.newPassword &&
    !passwordErrors.newPasswordCheck;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tel' ? formatTel(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (isChangingPassword && !isPasswordValid) {
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      nickname: formData.nickname,
      id: formData.email,
      tel: formData.tel,
      password: formData.newPassword ? formData.newPassword : user.password,
    };

    setUser(updatedUser);

    setFormData({
      name: updatedUser.name,
      nickname: updatedUser.nickname,
      email: updatedUser.id,
      tel: updatedUser.tel,
      currentPassword: '',
      newPassword: '',
      newPasswordCheck: '',
    });

    openModal('profileUpdate');

    setSubmitAttempted(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      nickname: user.nickname ?? user.name,
      email: user.id,
      tel: user.tel,
      currentPassword: '',
      newPassword: '',
      newPasswordCheck: '',
    });

    setSubmitAttempted(false);
  };

  return (
    <ProfileWrap onSubmit={handleSubmit} autoComplete="off">
      {/* 브라우저에 저장한 이메일 및 비밀번호 자동 완성을 방지하기 위한 더미 입력 필드 */}
      <AutoFillTrap aria-hidden="true">
        <input type="text" name="fake-username" autoComplete="username" tabIndex={-1} />
        <input type="password" name="fake-password" autoComplete="new-password" tabIndex={-1} />
      </AutoFillTrap>

      <UserInfo>
        <UserNameWrap>
          <UserName>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              value={formData.name}
              onChange={handleChange}
            />
          </UserName>

          <UserNickname>
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              autoComplete="off"
              value={formData.nickname}
              onChange={handleChange}
            />
          </UserNickname>
        </UserNameWrap>

        <UserEmail>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            disabled
          />
        </UserEmail>

        <UserTel>
          <label htmlFor="tel">전화번호</label>
          <input
            id="tel"
            type="text"
            name="tel"
            autoComplete="off"
            readOnly
            onFocus={(event) => {
              event.target.readOnly = false;
            }}
            value={formData.tel}
            onChange={handleChange}
          />
        </UserTel>
      </UserInfo>

      <UserPw>
        <h3>비밀번호 변경</h3>

        <FieldWrap>
          <LabelRow>
            <label htmlFor="currentPassword">현재 비밀번호</label>
            {submitAttempted && isChangingPassword && passwordErrors.currentPassword && (
              <ErrorText>{passwordErrors.currentPassword}</ErrorText>
            )}
          </LabelRow>
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            autoComplete="off"
            readOnly
            onFocus={(event) => {
              event.target.readOnly = false;
            }}
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </FieldWrap>

        <FieldWrap>
          <LabelRow>
            <label htmlFor="newPassword">새 비밀번호</label>
            {submitAttempted && isChangingPassword && passwordErrors.newPassword && (
              <ErrorText>{passwordErrors.newPassword}</ErrorText>
            )}
          </LabelRow>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            autoComplete="off"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </FieldWrap>

        <FieldWrap>
          <LabelRow>
            <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
            {submitAttempted && isChangingPassword && passwordErrors.newPasswordCheck && (
              <ErrorText>{passwordErrors.newPasswordCheck}</ErrorText>
            )}
          </LabelRow>
          <input
            id="newPasswordCheck"
            type="password"
            name="newPasswordCheck"
            autoComplete="off"
            value={formData.newPasswordCheck}
            onChange={handleChange}
          />
        </FieldWrap>
      </UserPw>

      <BtnWrap>
        <CancelBtn
          height="42px"
          type="button"
          icon={false}
          onClick={handleCancel}
          variant="secondary"
        >
          취소
        </CancelBtn>
        <SubmitBtn height="42px" icon={false} type="submit">
          저장하기
        </SubmitBtn>
      </BtnWrap>
      <ProfileUpdateModal />
    </ProfileWrap>
  );
}

const ProfileWrap = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};

  label {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  input {
    width: 100%;
    height: 42px;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    border: 1px solid ${({ theme }) => theme.colors.primary + '20'};
    border-bottom: 1.5px solid
      ${({ theme }) => (theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(124,58,237,0.18)')};
    border-top-left-radius: ${({ theme }) => theme.radii.sm};
    border-top-right-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(124,58,237,0.04)'};
    color: ${({ theme }) => theme.colors.text + 'cc'};
    font-size: ${({ theme }) => theme.fontSize.xxs};
    font-weight: 600;
    outline: none;
    box-shadow: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text + 'cc'};

    &:focus {
      border-bottom-color: ${({ theme }) =>
        theme.mode === 'dark' ? 'rgba(167,139,250,0.5)' : 'rgba(109,40,217,0.5)'};
      box-shadow: ${({ theme }) =>
        theme.mode === 'dark'
          ? 'inset 0 2px 8px rgba(0,0,0,0.1)'
          : 'inset 0 2px 12px rgba(127, 66, 226, 0.06)'};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text + 'cc'};
      box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.background + 'f2'} inset;
      transition: background-color 9999s ease-out 0s;
    }
  }
`;

const AutoFillTrap = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
`;

const UserInfo = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.cardBgLight};
  border: 1px solid ${({ theme }) => theme.colors.primary + '33'};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const UserNameWrap = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const UserName = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const UserNickname = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const UserEmail = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};

  input {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textSecondary};
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textSecondary};
    background-color: ${({ theme }) => theme.colors.cardBg};
    opacity: 0.5;
  }
`;

const UserTel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const UserPw = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.cardBgLight};
  border: 1px solid ${({ theme }) => theme.colors.primary + '33'};
  border-radius: ${({ theme }) => theme.radii.lg};

  > h3 {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.6;
    font-weight: 800;
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }
`;

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.error};
  white-space: nowrap;
  opacity: 0.8;
`;

const BtnWrap = styled.div`
  max-width: 40%;
  display: flex;
  align-self: flex-end;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const CancelBtn = styled(BaseBtn)`
  width: 60px;
  /* color: ${({ theme }) => theme.colors.textSecondary}; */
`;

const SubmitBtn = styled(BaseBtn)`
  width: 100px;
`;
