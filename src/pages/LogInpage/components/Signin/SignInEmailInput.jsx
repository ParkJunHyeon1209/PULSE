import styled from '@emotion/styled';
import React from 'react';

const InputLabel = styled.label`
  color: #fff;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  letter-spacing: 1px;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #333;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  color: #fff;
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: 14px;
  }
`;

export default function SignInEmailInput({ email, setEmail }) {
  return (
    <>
      {/* 이메일 입력창 */}
      <InputLabel>EMAIL</InputLabel>
      <Input
        id="id"
        name="id"
        type="email"
        placeholder="signal@pulse.kr"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </>
  );
}
