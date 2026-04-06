import styled from '@emotion/styled';
import React from 'react';

const InputGroup = styled.div`
  position: relative;
  margin: ${({ theme, $isFirst }) => ($isFirst ? '0 0 2px' : `${theme.spacing[4]} 0 2px`)};
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 2;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.input.lineBorder};
  padding: 2px 0;
  line-height: 1.5;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

export default function SignInEmailInput({ email, setEmail, isFirst = false }) {
  return (
    <>
      <InputGroup $isFirst={isFirst}>
        
        <InputLabel>EMAIL</InputLabel>
        <Input
          id="id"
          name="id"
          type="text"
          placeholder="signal@pulse.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
    </>
  );
}
