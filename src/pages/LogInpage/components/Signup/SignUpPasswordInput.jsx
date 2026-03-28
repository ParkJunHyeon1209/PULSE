import styled from '@emotion/styled';
import React from 'react';
import CloseSvg from '../common/CloseSvg';
import ShowBtn from '../common/ShowBtn';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  letter-spacing: 1px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$pwError || props.$isMatcError ? props.theme.colors.error : '#333')};
  padding: ${({ theme }) => theme.spacing[3]} 0;
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
`;
const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const MatchMessage = styled.p`
  color: ${(props) => (props.$isMatcError ? props.theme.colors.success : props.theme.colors.error)};
  font-size: 12px;
  margin-top: 5px;
  font-weight: 500;
  transition: color 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StrengthContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
  height: 4px;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const getActiveColor = (props) => {
  const { $score, theme } = props;
  if ($score >= 3) return theme.status.info;
  if ($score >= 2) return theme.colors.primary;
  if ($score >= 1) return theme.colors.error;
  return '#333';
};

const StrengthBar = styled.div`
  flex: 1;
  border-radius: 2px;
  background-color: #333;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0%;
    background-color: ${(props) => getActiveColor(props)};
    transition: width 0.3s ease-in-out;
  }

  &.weak::after {
    width: ${(props) => (props.$score >= 1 ? '100%' : '0%')};
    transition-delay: 0s;
  }
  &.medium::after {
    width: ${(props) => (props.$score >= 2 ? '100%' : '0%')};
    transition-delay: ${(props) => (props.$score >= 2 ? '0.1s' : '0s')};
  }
  &.strong::after {
    width: ${(props) => (props.$score >= 3 ? '100%' : '0%')};
    transition-delay: ${(props) => (props.$score >= 3 ? '0.2s' : '0s')};
  }
`;

export default function SignUpPasswordInput({
  pw,
  pwConfirm,
  setPwConfirm,
  pwError,
  showPw,
  setShowPw,
  showPwConfirm,
  setShowPwConfirm,
  pwScore,
  isPwValid,
}) {
  return (
    <>
      {/* 비밀번호 입력란 */}
      <InputGroup>
        <InputLabel>PASSWORD</InputLabel>

        <Input
          id="password"
          name="password"
          type={showPw ? 'text' : 'password'}
          value={pw}
          placeholder="8자 이상"
          $pwError={pwError}
          onChange={(e) => isPwValid(e.target.value)}
        />
        <div className="message-container">
          {pwError && (
            <ErrorMessage>
              <CloseSvg />
              8~15자의 영대문자, 숫자, 특수문자만을 포함하여 만드세요.
            </ErrorMessage>
          )}
          {!pwError && pw.length > 0 && (
            <SuccessMessage>사용 가능한 비밀번호입니다.</SuccessMessage>
          )}
        </div>
        <ShowBtn showPw={showPw} setShowPw={setShowPw} />
      </InputGroup>
      {/* 비밀번호 안전도 게이지바 */}
      <StrengthContainer>
        <StrengthBar className="weak" $score={pwScore} />
        <StrengthBar className="medium" $score={pwScore} />
        <StrengthBar className="strong" $score={pwScore} />
      </StrengthContainer>
      {/* 비밀번호 재입력란 */}
      <InputGroup>
        <InputLabel>CONFIRM PASSWORD</InputLabel>

        <Input
          type={showPwConfirm ? 'text' : 'password'}
          value={pwConfirm}
          placeholder="비밀번호 재입력"
          $isMatcError={pw && pwConfirm && pw !== pwConfirm}
          onChange={(e) => setPwConfirm(e.target.value)}
        />

        {pw && pwConfirm && (
          <MatchMessage $isMatcError={pw === pwConfirm}>
            {pw !== pwConfirm && <CloseSvg />}
            {pw === pwConfirm ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
          </MatchMessage>
        )}
        <ShowBtn showPw={showPwConfirm} setShowPw={setShowPwConfirm} />
      </InputGroup>
    </>
  );
}
