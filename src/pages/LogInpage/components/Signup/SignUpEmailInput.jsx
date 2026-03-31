import styled from '@emotion/styled';
import CloseSvg from '../common/CloseSvg';
import { checkIdApi } from '../../../../data/authApi';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
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

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$emailError ? props.theme.colors.error : props.theme.input.lineBorder)};
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

const CheckBtn = styled.button`
  width: 100px;
  height: 45px;
  padding: 8px 16px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 12px;
  cursor: 'pointer';
  transition: all 0.2s ease;

  color: ${({ theme }) => theme.tones.blue.color};
  background: ${({ theme }) => theme.tones.blue.containerBg};
  border: 1px solid ${({ theme }) => theme.tones.blue.containerBorder};
  box-shadow: ${({ theme }) => theme.tones.blue.containerShadow};

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.tones.blue.activeBorder};
    box-shadow: ${({ theme }) => theme.tones.blue.hoverShadow};
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
        <InputLabel>EMAIL</InputLabel>
        <div style={{ display: 'flex', gap: '10px' }}>
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
          <CheckBtn type="button" disabled={emailError || !email} onClick={handleCheckId}>
            중복 확인
          </CheckBtn>
        </div>
        <div className="message-container">
          {!emailError && isUnique === true && (
            <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>
          )}
          {(emailError || isUnique === false) && (
            <ErrorMessage>
              <CloseSvg />
              {emailError ? '이메일 형식이 올바르지 않습니다.' : '이미 사용중인 아이디입니다.'}
            </ErrorMessage>
          )}
        </div>
      </InputGroup>
    </>
  );
}
