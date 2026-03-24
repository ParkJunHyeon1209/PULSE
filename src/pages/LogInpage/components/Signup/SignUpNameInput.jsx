import styled from '@emotion/styled';
import React from 'react';

const InputNameGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`;

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
export default function SignupNameInput({
  firstName,
  lastName,
  handleFirstNameChange,
  handleLastNameChange,
}) {
  return (
    <>
      {/* 이름 입력란 */}
      <InputNameGroup>
        <InputGroup>
          <InputLabel>FIRST NAME</InputLabel>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="이름"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>LAST NAME</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="성"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </InputGroup>
      </InputNameGroup>
    </>
  );
}
