import styled from '@emotion/styled';
import React from 'react';
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

export default function SignInPasswordInput({ pw, setPw, showPw, setShowPw }) {
  return (
    <>
      {/* 비밀번호 입력창 */}
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
      </InputGroup>
    </>
  );
}
