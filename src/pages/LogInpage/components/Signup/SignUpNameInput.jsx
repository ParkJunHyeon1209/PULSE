import styled from '@emotion/styled';
import React from 'react';
import CloseSvg from '../common/CloseSvg';

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
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  letter-spacing: 1px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) =>
      props.$firstNameError || props.$lastNameError ? props.theme.colors.error : '#333'};
  padding: ${({ theme }) => theme.spacing[3]} 0;
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
  margin-top: ${({ theme }) => theme.spacing[1]};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export default function SignupNameInput({
  firstName,
  lastName,
  handleFirstNameChange,
  handleLastNameChange,
  firstNameError,
  lastNameError,
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
            value={firstName}
            placeholder="이름"
            $firstNameError={firstNameError}
            onChange={handleFirstNameChange}
          />
          {firstNameError && (
            <ErrorMessage>
              <CloseSvg />
              한글만 입력 가능합니다.
            </ErrorMessage>
          )}
        </InputGroup>
        <InputGroup>
          <InputLabel>LAST NAME</InputLabel>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            placeholder="성"
            $lastNameError={lastNameError}
            onChange={handleLastNameChange}
          />
          {lastNameError && (
            <ErrorMessage>
              <CloseSvg />
              한글만 입력 가능합니다.
            </ErrorMessage>
          )}
        </InputGroup>
      </InputNameGroup>
    </>
  );
}
