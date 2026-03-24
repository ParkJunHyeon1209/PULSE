import styled from '@emotion/styled';
import React from 'react';

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  width: 100%;
  position: relative;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
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

const StrengthBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing[3]};
  border-radius: 2px;
  overflow: hidden;
`;

const Gauge = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
  transition: all 0.3s ease;
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

const ShowButton = styled.button`
  position: absolute;
  bottom: 10px;
  background: none;
  border: none;
  color: #fff;
  padding: 0;
  display: flex;
  align-items: center;

  right: 10px;
  top: 60%;
  transform: translateY(-50%);

  svg {
    width: 18px;
    height: 18px;
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
`;

export default function SignUpPasswordInput({
  pw,
  pwConfirm,
  setPwConfirm,
  pwError,
  showPw,
  setShowPw,
  validatePw,
  showPwConfirm,
  setShowPwConfirm,
}) {
  const getGaugeStyle = () => {
    if (!pwConfirm) return { width: '0%', color: '#333' };
    if (pw === pwConfirm) return { width: '100%', color: '#2ecc71' };
    return { width: '50%', color: '#ff4d4f' };
  };
  return (
    <>
      {/* 비밀번호 입력란 */}
      <InputGroup>
        <InputLabel>PASSWORD</InputLabel>

        <Input
          id="password"
          name="password"
          type={showPw ? 'text' : 'password'}
          placeholder="8자 이상"
          value={pw}
          onChange={(e) => validatePw(e.target.value)}
        />
        {pwError && (
          <ErrorMessage>8~15자의 영대문자, 숫자, 특수문자만을 포함하여 만드세요.</ErrorMessage>
        )}
        <ShowButton type="button" onClick={() => setShowPw(!showPw)}>
          {showPw ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-.722-3.25" />
              <path d="M2 8a10.645 10.645 0 0 0 20 0" />
              <path d="m20 15-1.726-2.05" />
              <path d="m4 15 1.726-2.05" />
              <path d="m9 18 .722-3.25" />
            </svg>
          )}
        </ShowButton>
      </InputGroup>

      {/* 비밀번호 일치 게이지 바 */}
      <StrengthBarContainer>
        <Gauge width={getGaugeStyle().width} color={getGaugeStyle().color} />
      </StrengthBarContainer>
      {pw && pwConfirm && (
        <p
          style={{
            color: pw === pwConfirm ? '#2ecc71' : '#ff4d4f',
            fontSize: '12px',
            marginTop: '5px',
          }}
        >
          {pw === pwConfirm ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'}
        </p>
      )}
      {/* 비밀번호 재입력란 */}
      <InputGroup>
        <InputLabel>CONFIRM PASSWORD</InputLabel>

        <Input
          type={showPwConfirm ? 'text' : 'password'}
          value={pwConfirm}
          placeholder="비밀번호 재입력"
          onChange={(e) => setPwConfirm(e.target.value)}
        />
        <ShowButton type="button" onClick={() => setShowPwConfirm(!showPwConfirm)}>
          {showPwConfirm ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-.722-3.25" />
              <path d="M2 8a10.645 10.645 0 0 0 20 0" />
              <path d="m20 15-1.726-2.05" />
              <path d="m4 15 1.726-2.05" />
              <path d="m9 18 .722-3.25" />
            </svg>
          )}
        </ShowButton>
      </InputGroup>
    </>
  );
}
