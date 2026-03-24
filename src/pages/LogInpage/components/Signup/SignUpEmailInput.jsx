import styled from '@emotion/styled';
import BaseBtn from '../../../../components/common/BaseBtn';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  width: 100%;
  position: relative;
`;

const InputLabel = styled.label`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  letter-spacing: 1px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #333;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
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
            placeholder="signal@pulse.kr"
            value={email}
            onChange={(e) => {
              checkEmail(e.target.value);
              setIsUnique(null);
            }}
          />
          <BaseBtn
            className="check-btn"
            variant="primary"
            tone="blue"
            padding="8px 16px"
            type="button"
            height="42px"
            flex="none"
            onClick={handleCheckId}
            disabled={emailError || !email}
            style={{ cursor: emailError || !email ? 'not-allowed' : 'pointer' }}
          >
            중복 확인
          </BaseBtn>
        </div>
        {emailError && <ErrorMessage>사용이 불가능한 아이디입니다.</ErrorMessage>}

        {isUnique && (
          <span style={{ color: '#2ecc71', fontSize: '12px', marginTop: '5px' }}>
            사용 가능한 아이디입니다.
          </span>
        )}
      </InputGroup>
    </>
  );
}
