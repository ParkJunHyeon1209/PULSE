import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../../components/common/BaseBtn';
import SignUpNameInput from '../Signup/SignUpNameInput';
import SignUpEamilInput from '../Signup/SignUpEmailInput';
import SignUpPasswordInput from '../Signup/SignUpPasswordInput';
import SignUpAgree from '../Signup/SignUpAgree';
import SocialBtn from '../common/SocialBtn';

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;

  .signup-btn {
    font-weight: 400;
  }
`;

const Title = styled.h2`
  color: #fff;
  font-size: 24px;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
`;

const DividerText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: rgba(200, 205, 255, 0.3);
  white-space: nowrap;
`;

const Switch = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  display: flex;
  gap: 8px;
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
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export default function SignUpForm({ onClick }) {
  const [email, setEmail] = useState('');
  const [isUnique, setIsUnique] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwError, setPwError] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [agreement, setAgreement] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const navigate = useNavigate();

  // 이메일 유효성 검사
  const checkEmail = (email) => {
    const cleanEmail = email.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    setEmail(cleanEmail);

    // 이메일 정규식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isEmailValid = emailRegex.test(email);
    setEmailError(!isEmailValid && cleanEmail.length > 0);
  };

  const handleCheckId = () => {
    if (emailError) return;
    const result = email !== 'user@test.com';
    setIsUnique(result);
  };
  // 비밀번호 유효성 검사
  const validatePw = (pw) => {
    setPw(pw);
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*+=-])[A-Za-z\d!@#$%^*+=-]{8,15}$/;

    const isPwValid = regex.test(pw);
    setPwError(!isPwValid && pw.length > 0);
  };

  const isPwMatching = pw === pwConfirm && pw.length > 0;

  // 성 + 이름 유효성 검사
  const handleLastNameChange = (e) => {
    const value = e.target.value.replace(/[^ㄱ-힣]/g, '');
    if (value.length <= 10) {
      setLastName(value);
    }
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value.replace(/[^ㄱ-힣]/g, '');
    if (value.length <= 19) {
      setFirstName(value);
    }
  };
  const isNameValid = () => {
    const fullName = lastName + firstName;
    const nameRegex = /^[가-힣]+$/;

    return (
      lastName.length >= 1 &&
      firstName.length >= 1 &&
      fullName.length <= 20 &&
      nameRegex.test(fullName)
    );
  };

  const handleAllAgree = (e) => {
    const { checked } = e.target;
    setAgreement({
      agreeTerms: checked,
      agreePrivacy: checked,
      agreeMarketing: checked,
    });
  };

  const isRequiredAgreed = agreement.agreeTerms && agreement.agreePrivacy;

  const handleJoin = (e) => {
    e.preventDefault();
    if (email && pw && isNameValid() && agreement) {
      alert('가입이 성공적으로 이루어졌습니다.');
      navigate('/');
    }
  };

  return (
    <SignUpContainer>
      <StyledForm onSubmit={handleJoin}>
        <Title>신호를 시작하세요.</Title>
        <SubText>PULSE 계정을 만들고 드롭 알림을 받아보세요.</SubText>
        <SignUpNameInput
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
        />
        <SignUpEamilInput
          email={email}
          emailError={emailError}
          isUnique={isUnique}
          checkEmail={checkEmail}
          handleCheckId={handleCheckId}
          setIsUnique={setIsUnique}
        />
        <SignUpPasswordInput
          pw={pw}
          pwConfirm={pwConfirm}
          pwError={pwError}
          showPw={showPw}
          setShowPw={setShowPw}
          validatePw={validatePw}
          setPwConfirm={setPwConfirm}
          showPwConfirm={showPwConfirm}
          setShowPwConfirm={setShowPwConfirm}
        />
        <SignUpAgree
          agreement={agreement}
          setAgreement={setAgreement}
          handleAllAgree={handleAllAgree}
        />
        <BaseBtn
          className="signup-btn"
          variant="primary"
          tone="blue"
          padding="8px 16px"
          type="submit"
          height="42px"
          flex="none"
          disabled={
            emailError ||
            !email ||
            !isUnique ||
            !isNameValid() ||
            pwError ||
            !isPwMatching ||
            !isRequiredAgreed
          }
        >
          CREATE ACCOUNT
        </BaseBtn>
        <DividerWrapper>
          <Line />
          <DividerText>or sign up with</DividerText>
          <Line />
        </DividerWrapper>
      </StyledForm>
      <SocialBtn />
      <Switch>
        이미 계정이 있으신가요?
        <SwitchButton onClick={onClick} type="button">
          로그인
        </SwitchButton>
      </Switch>
    </SignUpContainer>
  );
}
