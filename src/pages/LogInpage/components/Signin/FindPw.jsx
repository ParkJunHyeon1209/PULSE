import React, { useState } from 'react';
import BaseModal from '../../../../components/common/BaseModal';
import BaseBtn from '../../../../components/common/BaseBtn';
import SignInEmailInput from './SignInEmailInput';
import styled from '@emotion/styled';
import SignModal from '../common/SignModal';
import { useNavigate } from 'react-router-dom';

const FindLink = styled.a`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  text-decoration: none;
  align-self: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  margin-top: 14px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  font-weight: 700;
  line-height: 1.65;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export default function FindPw({ findEmail, setFindEmail, isFindPwOpen, setIsFindPwOpen }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const isEmailValid = /^(?=[^@]*[a-zA-Z])[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(
    findEmail
  );

  const handleOpenFindPw = (e) => {
    e.preventDefault();
    setIsFindPwOpen(true);
  };

  const handleCloseFindPw = () => {
    setIsFindPwOpen(false);
    setFindEmail('');
  };

  const handleSendTempPw = () => {
    setSuccessMsg(`${findEmail}로 \n 임시 비밀번호를 발송했습니다.`);
    setIsSuccessModalOpen(true);

    setIsFindPwOpen(false);
    setFindEmail('');
  };

  const handleConfirmNavigate = () => {
    setIsSuccessModalOpen(false);
    navigate('/login');
  };

  return (
    <>
      <FindLink onClick={handleOpenFindPw}>비밀번호 찾기</FindLink>
      <BaseModal
        isOpen={isFindPwOpen}
        onClose={handleCloseFindPw}
        label={`PULSE PLATFORM`}
        closable={false}
        width="450px"
        padding="40px"
        title={<span style={{ lineHeight: '18px', fontSize: '24px' }}>비밀번호 찾기</span>}
      >
        <div style={{ marginBottom: '32px' }}>
          <SubText>
            비밀번호를 잊으셨나요? <br />
            가입하신 이메일을 입력하시면 임시 비밀번호를 보내드립니다.
          </SubText>
          <SignInEmailInput email={findEmail} setEmail={setFindEmail} />
        </div>
        <ButtonGroup>
          <BaseBtn variant="secondary" onClick={handleCloseFindPw} flex="1">
            닫기
          </BaseBtn>
          <BaseBtn type="button" disabled={!isEmailValid} onClick={handleSendTempPw} flex="3">
            임시 비밀번호 발송
          </BaseBtn>
        </ButtonGroup>
      </BaseModal>

      <SignModal isOpen={isSuccessModalOpen} onClose={handleConfirmNavigate} message={successMsg} />
    </>
  );
}
