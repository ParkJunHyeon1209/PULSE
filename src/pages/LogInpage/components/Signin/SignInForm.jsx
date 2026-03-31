import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../../components/common/BaseBtn';
import SignInEmailInput from '../Signin/SignInEmailInput';
import SignInPasswordInput from '../Signin/SignInPasswordInput';
import SocialBtn from '../common/SocialBtn';
import useAuthStore from '../../../../store/useAuthStore';
import { loginApi } from '../../../../data/authApi';

const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;

  .signin-btn {
    font-weight: 400;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const FindLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  text-decoration: none;
  align-self: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.primary};
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.Line};
`;

const DividerText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.input.placeholder};
  white-space: nowrap;
`;

const Switch = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  gap: ${({ theme }) => theme.spacing[2]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function SignInForm({ onClick }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { login: storeLogin } = useAuthStore.getState();

    try {
      const res = await loginApi(email, pw);

      if (res.success) {
        localStorage.setItem('accessToken', res.token);

        const userData = {
          id: email,
          password: pw,
          name: res.userInfo.name,
        };

        storeLogin(userData);

        alert(`${userData.name}님, 환영합니다!`);
        navigate('/');
      }
    } catch (error) {
      console.error('로그인 에러:', error.message);
      alert('아이디 또는 비밀번호를 확인해주세요.');
    }
  };
  const handleFillAdmin = () => {
    setEmail('myadmin1@pulse.com');
    setPw('password123!');
  };
  return (
    <SignInContainer>
      <StyledForm onSubmit={handleLogin}>
        <Title>다시 돌아왔군요.</Title>
        <SubText>계정에 로그인해 드롭을 놓치지 마세요.</SubText>
        {/* 이메일 입력창 */}
        <SignInEmailInput email={email} setEmail={setEmail} />
        {/* 비밀번호 입력창 */}
        <SignInPasswordInput pw={pw} setPw={setPw} showPw={showPw} setShowPw={setShowPw} />
        {/* 비밀번호 찾기 일단 클릭만 되게끔 */}
        <FindLink href="#">비밀번호 찾기</FindLink>
        <BaseBtn type="button" onClick={handleFillAdmin}>
          테스트 계정으로 채우기 (Admin)
        </BaseBtn>

        <BaseBtn
          className="signin-btn"
          variant="primary"
          tone="violet"
          padding="8px 16px"
          type="submit"
          height="42px"
          flex="none"
          icon={false}
        >
          SIGN IN
        </BaseBtn>
        <DividerWrapper>
          <Divider />
          <DividerText>or continue with</DividerText>
          <Divider />
        </DividerWrapper>
      </StyledForm>
      <SocialBtn />
      <Switch>
        계정이 없으신가요? <SwitchButton onClick={onClick}>지금 가입하기</SwitchButton>
      </Switch>
    </SignInContainer>
  );
}
