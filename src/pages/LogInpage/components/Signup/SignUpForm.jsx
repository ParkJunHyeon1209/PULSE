import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../../components/common/BaseBtn';
import SignUpNameInput from '../Signup/SignUpNameInput';
import SignUpEamilInput from '../Signup/SignUpEmailInput';
import SignUpPasswordInput from '../Signup/SignUpPasswordInput';
import SignUpAgree from '../Signup/SignUpAgree';
import SocialBtn from '../common/SocialBtn';
import { signupApi } from '../../../../data/authApi';
import SignModal from '../common/SignModal';

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 100%;

  .signup-btn {
    font-weight: 400;
    margin: 20px 0;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  margin-top: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
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
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
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
  const [pwError, setPwError] = useState(null);
  const [pwScore, setPwScore] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [agreement, setAgreement] = useState({
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    const isFilled = email && pw && firstName && lastName;
    const isAgreed = agreement.agreeTerms && agreement.agreePrivacy;
    const isNoError =
      !emailError && !pwError && !firstNameError && !lastNameError && isUnique === true;

    if (isFilled && isAgreed && isNoError) {
      try {
        const submitData = {
          id: email,
          password: pw,
          name: `${lastName}${firstName}`,
          agreeTerms: agreement.agreeTerms,
          agreePrivacy: agreement.agreePrivacy,
          agreeMarketing: agreement.agreeMarketing,
        };

        const res = await signupApi(submitData);

        if (res.success) {
          setModalMessage('가입이 성공적으로 이루어졌습니다.');
          setIsModalOpen(true);
        }
      } catch (error) {
        setModalMessage(error.message || '회원가입 처리 중 오류가 발생했습니다.');
        setIsModalOpen(true);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    if (modalMessage.includes('성공')) {
      navigate('/');
    }
  };

  return (
    <SignUpContainer>
      <StyledForm onSubmit={handleJoin}>
        <Title>신호를 시작하세요.</Title>
        <SubText>PULSE 계정을 만들고 드롭 알림을 받아보세요.</SubText>
        <SignUpNameInput
          isFirst
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          firstNameError={firstNameError}
          lastNameError={lastNameError}
          setFirstNameError={setFirstNameError}
          setLastNameError={setLastNameError}
        />
        <SignUpEamilInput
          email={email}
          setEmail={setEmail}
          emailError={emailError}
          setEmailError={setEmailError}
          isUnique={isUnique}
          setIsUnique={setIsUnique}
        />
        <SignUpPasswordInput
          pw={pw}
          setPw={setPw}
          pwConfirm={pwConfirm}
          setPwConfirm={setPwConfirm}
          pwError={pwError}
          setPwError={setPwError}
          pwScore={pwScore}
          setPwScore={setPwScore}
          showPw={showPw}
          setShowPw={setShowPw}
          showPwConfirm={showPwConfirm}
          setShowPwConfirm={setShowPwConfirm}
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
          disabled={
            !email ||
            !pw ||
            emailError ||
            pwError ||
            firstNameError ||
            lastNameError ||
            isUnique !== true ||
            !agreement.agreeTerms ||
            !agreement.agreePrivacy
          }
        >
          CREATE ACCOUNT
        </BaseBtn>
        <DividerWrapper>
          <Divider />
          <DividerText>or sign up with</DividerText>
          <Divider />
        </DividerWrapper>
      </StyledForm>
      <SocialBtn />
      <Switch>
        이미 계정이 있으신가요?
        <SwitchButton onClick={onClick} type="button">
          로그인
        </SwitchButton>
      </Switch>
      <SignModal isOpen={isModalOpen} onClose={handleModalClose} message={modalMessage} />
    </SignUpContainer>
  );
}
