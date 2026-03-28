import styled from '@emotion/styled';
import CloseSvg from '../common/CloseSvg';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
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
  border-bottom: 2px solid ${(props) => (props.$emailError ? props.theme.colors.error : '#333')};
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

export default function SignUpEamilInput({
  email,
  emailError,
  isUnique,
  handleCheckId,
  checkEmail,
  setIsUnique,
}) {
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
            onChange={(e) => {
              checkEmail(e.target.value);
            }}
          />
          <CheckBtn type="button" disabled={emailError || !email} onClick={handleCheckId}>
            중복 확인
          </CheckBtn>
        </div>
        <div className="message-container">
          {!emailError && isUnique === true && (
            <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>
          )}
          {emailError && (
            <ErrorMessage>
              <CloseSvg />
              사용이 불가능한 아이디입니다.
            </ErrorMessage>
          )}
        </div>
      </InputGroup>
    </>
  );
}
