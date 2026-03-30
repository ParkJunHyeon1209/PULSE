import styled from '@emotion/styled';
import React from 'react';

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
  border-bottom: 2px solid #333;
  padding: ${({ theme }) => theme.spacing[2]} 0;
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xxs};
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
