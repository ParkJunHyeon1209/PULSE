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
  color: ${({ theme }) => theme.colors.infoSoft};
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
  const [pwScore, setPwScore] = useState(0);

  const navigate = useNavigate();

  // 이메일 유효성 검사
  const checkEmail = (email) => {
    setEmail(email);
    setIsUnique(null);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

    const isEmailValid = emailRegex.test(email);
    setEmailError(!isEmailValid && email.length > 0);
  };

  const handleCheckId = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    if (emailError || !emailRegex.test(email) || email.length === 0) {
      return;
    }

    const result = email !== 'user@test.com';
    setIsUnique(result);
  };

  // 비밀번호 유효성 검사
  const isPwValid = (pw) => {
    setPw(pw);

    const hasDigit = /\d/.test(pw);
    const hasUppercase = /[A-Z]/.test(pw);
    const hasSpecial = /[!@#$%^&*+=-]/.test(pw);
    const isLengthValid = pw.length >= 8 && pw.length <= 15;

    let score = 0;
    if (isLengthValid) {
      if (hasDigit) score++;
      if (hasUppercase) score++;
      if (hasSpecial) score++;
    }

    setPwScore(score);

    const isValid = isLengthValid && hasDigit && hasUppercase && hasSpecial;
    setPwError(!isValid && pw.length > 0);
  };
  const isPwMatching = pw === pwConfirm && pw.length > 0;

  // 성 + 이름 유효성 검사
  const nameRegex = /^[가-힣]+$/;

  const isNameValid = () => {
    const fullName = lastName + firstName;

    return (
      lastName.length >= 1 &&
      firstName.length >= 1 &&
      fullName.length >= 2 &&
      fullName.length <= 20 &&
      nameRegex.test(fullName)
    );
  };

  const firstNameError = firstName.length > 0 && !nameRegex.test(firstName);
  const lastNameError = lastName.length > 0 && !nameRegex.test(lastName);

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) setLastName(value);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 19) setFirstName(value);
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
          firstNameError={firstNameError}
          lastNameError={lastNameError}
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
          isPwValid={isPwValid}
          setPwConfirm={setPwConfirm}
          showPwConfirm={showPwConfirm}
          setShowPwConfirm={setShowPwConfirm}
          pwScore={pwScore}
          isPwMatching={isPwMatching}
        />
        <SignUpAgree agreement={agreement} setAgreement={setAgreement} />
        <BaseBtn
          className="signup-btn"
          variant="primary"
          tone="blue"
          padding="8px 16px"
          type="submit"
          height="42px"
          flex="none"
          icon={false}
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
