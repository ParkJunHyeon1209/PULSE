import styled from '@emotion/styled';
import React from 'react';
import ShowBtn from '../common/ShowBtn';
import BaseTooltip from '../../../../components/common/BaseTooltip';
import BaseBtn from '../../../../components/common/BaseBtn';
import { Check, Close } from '../common/CommonSvg';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing[4]} 0 2px;
  width: 100%;
  position: relative;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 2;
`;

const LabelRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  min-height: 20px;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: help;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover .pw-tooltip,
  &:focus-within .pw-tooltip {
    opacity: 1;
    transform: translateX(calc(-50% + var(--tooltip-shift-x, 0px))) translateY(0) scale(1);
    pointer-events: auto;
  }

  &:hover .pw-tooltip > *,
  &:focus-within .pw-tooltip > * {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${({ theme, $pwError, $isMatcError }) =>
      $pwError || $isMatcError ? theme.colors.error : theme.tones.blue.activeBorder};
  transition: border-bottom-color 0.4s ease-in-out;
  padding: 2px 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text + 'cc'};
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const ErrorMessage = styled.p`
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 11px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  animation: fadeIn 0.4s ease-in-out forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SuccessMessage = styled.p`
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  width: 100%;
  color: ${({ theme }) => theme.colors.success};
  font-size: 11px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  animation: fadeIn 0.4s ease-in-out forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MatchMessage = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  color: ${({ $isMatcError, theme }) => ($isMatcError ? theme.colors.success : theme.colors.error)};
  font-size: 11px;
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
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const MessageContainer = styled.div`
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  width: 100%;
  pointer-events: none;
`;

const getActiveColor = ({ $score, theme }) => {
  if ($score >= 3) return theme.status.info;
  if ($score >= 2) return theme.colors.primary;
  if ($score >= 1) return theme.colors.error;
  return theme.colors.primary + '80';
};

const StrengthBar = styled.div`
  flex: 1;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primary + '18'};
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
    width: ${({ $score }) => ($score >= 1 ? '100%' : '0%')};
    transition-delay: 0s;
  }

  &.medium::after {
    width: ${({ $score }) => ($score >= 2 ? '100%' : '0%')};
    transition-delay: ${({ $score }) => ($score >= 2 ? '0.1s' : '0s')};
  }

  &.strong::after {
    width: ${({ $score }) => ($score >= 3 ? '100%' : '0%')};
    transition-delay: ${({ $score }) => ($score >= 3 ? '0.2s' : '0s')};
  }
`;

export default function SignUpPasswordInput({
  pw,
  setPw,
  pwConfirm,
  setPwConfirm,
  pwError,
  setPwError,
  pwScore,
  setPwScore,
  showPw,
  setShowPw,
  showPwConfirm,
  setShowPwConfirm,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    setPw(value);

    const isLengthValid = value.length >= 8 && value.length <= 15;
    const hasDigit = /\d/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasSpecial = /[!@#$%^&*+=-]/.test(value);

    let score = 0;
    if (isLengthValid) {
      if (hasDigit) score++;
      if (hasUppercase) score++;
      if (hasSpecial) score++;
    }

    setPwScore(score);
    setPwError(null);
  };

  const handleBlur = () => {
    if (pw.length === 0) {
      setPwError(null);
      return;
    }

    const isValid =
      pw.length >= 8 &&
      pw.length <= 15 &&
      /\d/.test(pw) &&
      /[A-Z]/.test(pw) &&
      /[!@#$%^&*+=-]/.test(pw);

    setPwError(!isValid);
  };

  const handleConfirmChange = (e) => {
    setPwConfirm(e.target.value);
  };

  return (
    <>
      {/* 비밀번호 입력란 */}
      <InputGroup>
        <LabelRow>
          <InputLabel className="password-label">PASSWORD</InputLabel>
          <Tooltip className="pw-trigger">
            <BaseBtn variant="ic-btn" size="16px" padding="4px" className="pw-info">
              ?
            </BaseBtn>
            <BaseTooltip className="pw-tooltip" position="bottom" mobileShift="48px">
              <span>• 8글자 이상 15글자 이하</span>
              <span>• 영대문자, 숫자, 특수문자 포함</span>
            </BaseTooltip>
          </Tooltip>
        </LabelRow>
        <div style={{ position: 'relative' }}>
          <Input
            id="password"
            name="password"
            type={showPw ? 'text' : 'password'}
            value={pw}
            placeholder="비밀번호 입력"
            $pwError={pwError}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowBtn showPw={showPw} setShowPw={setShowPw} />
        </div>
        {/* 비밀번호 안전도 게이지바 */}
        <StrengthContainer>
          <StrengthBar className="weak" $score={pwScore} />
          <StrengthBar className="medium" $score={pwScore} />
          <StrengthBar className="strong" $score={pwScore} />
        </StrengthContainer>
        <MessageContainer>
          {pwError === true && (
            <ErrorMessage>
              <Close /> 8~15자의 영대문자, 숫자, 특수문자만을 포함하여 만드세요.
            </ErrorMessage>
          )}
          {pwError === false && (
            <SuccessMessage>
              <Check />
              사용 가능한 비밀번호입니다.
            </SuccessMessage>
          )}
        </MessageContainer>
      </InputGroup>
      {/* 비밀번호 재입력란 */}
      <InputGroup>
        <InputLabel>CONFIRM PASSWORD</InputLabel>
        <div style={{ position: 'relative' }}>
          <Input
            type={showPwConfirm ? 'text' : 'password'}
            value={pwConfirm}
            placeholder="비밀번호 재입력"
            $isMatcError={pw && pwConfirm && pw !== pwConfirm}
            onChange={handleConfirmChange}
          />
          <ShowBtn showPw={showPwConfirm} setShowPw={setShowPwConfirm} />
        </div>
        {pw && pwConfirm && (
          <MatchMessage $isMatchError={pw === pwConfirm}>
            {pw === pwConfirm ? (
              <SuccessMessage>
                <Check /> 비밀번호가 일치합니다.
              </SuccessMessage>
            ) : (
              <ErrorMessage>
                <Close /> 비밀번호가 일치하지 않습니다.
              </ErrorMessage>
            )}
          </MatchMessage>
        )}
      </InputGroup>
    </>
  );
}
