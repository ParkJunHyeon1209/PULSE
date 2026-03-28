import styled from '@emotion/styled';
import React from 'react';
import ShowBtn from '../common/ShowBtn';

const InputLabel = styled.label`
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
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: 14px;
  }
`;

export default function SignInPasswordInput({ pw, setPw, showPw, setShowPw }) {
  return (
    <>
      {/* 비밀번호 입력창 */}
      <InputLabel>PASSWORD</InputLabel>
      <InputGroup>
        <Input
          id="password"
          name="password"
          type={showPw ? 'text' : 'password'}
          placeholder="••••••••"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <ShowBtn showPw={showPw} setShowPw={setShowPw} />
      </InputGroup>
    </>
  );
}
