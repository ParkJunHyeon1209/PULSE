import styled from '@emotion/styled';
import React from 'react';
import ShowBtn from '../common/ShowBtn';

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  letter-spacing: 1px;
  line-height: 1;
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
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
            placeholder="••••••••"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <ShowBtn showPw={showPw} setShowPw={setShowPw} />
        </div>
      </InputGroup>
    </>
  );
}
