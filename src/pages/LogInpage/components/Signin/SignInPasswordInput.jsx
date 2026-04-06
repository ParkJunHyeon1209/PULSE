import styled from '@emotion/styled';
import ShowBtn from '../common/ShowBtn';

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 2;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin: ${({ theme }) => theme.spacing[4]} 0 2px;
`;

const Input = styled.input`
  background: transparent;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.input.lineBorder};
  padding: 2px 0;
  line-height: 1.5;
  outline: none;
  width: 100%;

  &::placeholder {
    font-family: ${({ theme }) => theme.fontFamily.mono};
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
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  gap: 2px;

  opacity: 0;
  transition: all ${({ theme }) => theme.motion.slow};
  ${(props) =>
    props.$show &&
    `
    opacity: 1;
    transition-delay: ${props.$isModalOpen ? '1.1s' : '0.3s'};
  `}
`;

export default function SignInPasswordInput({
  pw,
  setPw,
  showPw,
  setShowPw,
  errorMsg,
  $isModalOpen,
}) {
  return (
    <>
      
      <InputGroup>
        <InputLabel>PASSWORD</InputLabel>
        <div style={{ position: 'relative' }}>
          <Input
            id="password"
            name="password"
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••••"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <ShowBtn showPw={showPw} setShowPw={setShowPw} />
        </div>
        <ErrorMessage $show={!!errorMsg} $isModalOpen={$isModalOpen}>
          {errorMsg}
        </ErrorMessage>
      </InputGroup>
    </>
  );
}
