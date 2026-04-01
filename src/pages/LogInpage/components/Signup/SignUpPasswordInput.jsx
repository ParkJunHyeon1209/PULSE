import styled from '@emotion/styled';
import React from 'react';
import ShowBtn from '../common/ShowBtn';
import BaseTooltip from '../../../../components/common/BaseTooltip';
import BaseBtn from '../../../../components/common/BaseBtn';
import { Close } from '../common/CommonSvg';

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
  line-height: 1;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-flex;
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
    ${(props) =>
      props.$pwError || props.$isMatcError
        ? props.theme.colors.error
        : props.theme.input.lineBorder};
  padding: ${({ theme }) => theme.spacing[2]} 0;
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <InputLabel className="password-label">PASSWORD</InputLabel>

          {/* 툴팁 트리거를 라벨 옆으로 분리 */}
          <Tooltip className="pw-trigger">
            <BaseBtn variant="ic-btn" size={'16px'} padding={'4px'} className="pw-info">
              ?
            </BaseBtn>
            <BaseTooltip className="pw-tooltip" position="bottom" mobileShift="48px">
              <span>• 8글자 이상 15글자 이하</span>
              <span>• 영대문자, 숫자, 특수문자 포함</span>
            </BaseTooltip>
          </Tooltip>
        </div>
        <div style={{ position: 'relative' }}>
          <Input
            id="password"
            name="password"
            type={showPw ? 'text' : 'password'}
            value={pw}
            placeholder="8자 이상"
            $pwError={pwError}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ShowBtn showPw={showPw} setShowPw={setShowPw} />
        </div>
      </InputGroup>
      {/* 비밀번호 안전도 게이지바 */}
      <StrengthContainer>
        <StrengthBar className="weak" $score={pwScore} />
        <StrengthBar className="medium" $score={pwScore} />
        <StrengthBar className="strong" $score={pwScore} />
      </StrengthContainer>
      <div className="message-container">
        {pwError === true && (
          <ErrorMessage>
            <Close /> 8~15자의 영대문자, 숫자, 특수문자만을 포함하여 만드세요.
          </ErrorMessage>
        )}
        {pwError === false && <SuccessMessage>사용 가능한 비밀번호입니다.</SuccessMessage>}
      </div>
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
          <MatchMessage $isMatcError={pw === pwConfirm}>
            {pw !== pwConfirm && <Close />}
            {pw === pwConfirm ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
          </MatchMessage>
        )}
      </InputGroup>
    </>
  );
}
