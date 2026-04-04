import styled from '@emotion/styled';
import { checkIdApi } from '../../../../data/authApi';
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

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${({ theme, $emailError }) =>
      $emailError ? theme.colors.error : theme.tones.blue.activeBorder};
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

const InputRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CheckBtn = styled.button`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 500;
  border-radius: 12px;
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast};

  color: ${({ theme }) => theme.tones.blue.color};
  background: ${({ theme }) => theme.tones.blue.containerBg};
  border: 1px solid ${({ theme }) => theme.tones.blue.containerBorder};
  box-shadow:
    0 0 0 2px rgba(147, 197, 253, 0.08),
    0 0 12px rgba(56, 130, 255, 0.05);

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.tones.blue.activeBorder};
    box-shadow:
      0 0 0 2px rgba(147, 197, 253, 0.22),
      0 0 14px rgba(56, 130, 255, 0.4);
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(1);
    box-shadow: none;
    transform: none;
  }
`;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
export default function SignUpEamilInput({
  email,
  setEmail,
  emailError,
  setEmailError,
  isUnique,
  setIsUnique,
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsUnique(null);
    if (emailError) setEmailError(false);
  };

  const handleBlur = () => {
    const isValid = emailRegex.test(email);
    setEmailError(!isValid && email.length > 0);
  };

  const handleCheckId = async () => {
    if (emailError || !emailRegex.test(email) || email.length === 0) {
      return;
    }

    try {
      console.log('API 요청 시작:', email);
      const res = await checkIdApi(email);
      console.log('API 응답 결과:', res);

      if (res.success) {
        setIsUnique(true);
      } else {
        setIsUnique(false);
      }
    } catch (error) {
      if (error.message.includes('409')) {
        console.log('중복 확인 결과: 사용 불가');
        setIsUnique(false);
      }
    }
  };
  return (
    <>
      {/* 이메일 입력란 */}
      <InputGroup>
        <InputRow>
          <InputWrap>
            <InputLabel>EMAIL</InputLabel>
            <Input
              id="id"
              name="id"
              type="email"
              value={email}
              placeholder="signal@pulse.kr"
              $emailError={emailError}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </InputWrap>
          <CheckBtn type="button" disabled={emailError || !email} onClick={handleCheckId}>
            중복 확인
          </CheckBtn>
        </InputRow>
        <>
          {!emailError && isUnique === true && (
            <SuccessMessage>
              <Check />
              사용 가능한 아이디입니다.
            </SuccessMessage>
          )}
          {(emailError || isUnique === false) && (
            <ErrorMessage>
              <Close />
              {emailError ? '이메일 형식이 올바르지 않습니다.' : '이미 사용중인 아이디입니다.'}
            </ErrorMessage>
          )}
        </>
      </InputGroup>
    </>
  );
}
