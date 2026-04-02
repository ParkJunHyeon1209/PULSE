import styled from '@emotion/styled';
import React from 'react';
import { Close } from '../common/CommonSvg';

const InputNameGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  position: relative;
`;

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
  border-bottom: 2px solid
    ${(props) =>
      props.$firstNameError || props.$lastNameError
        ? props.theme.colors.error
        : props.theme.input.lineBorder};
  padding: ${({ theme }) => theme.spacing[2]} 0;
  outline: none;
  width: 100%;

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  margin-top: ${({ theme }) => theme.spacing[1]};
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 2px;
`;
const nameRegex = /^[가-힣]+$/;

export default function SignupNameInput({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  firstNameError,
  lastNameError,
  setFirstNameError,
  setLastNameError,
}) {
  const handleLastNameBlur = () => {
    const isInvalid = lastName.length > 0 && !nameRegex.test(lastName);
    setLastNameError(isInvalid);
  };

  const handleFirstNameBlur = () => {
    const isInvalid = firstName.length > 0 && !nameRegex.test(firstName);
    setFirstNameError(isInvalid);
  };
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
            onChange={(e) => {
              if (e.target.value.length <= 10) setFirstName(e.target.value);
              if (firstNameError) setFirstNameError(false);
            }}
            onBlur={handleFirstNameBlur}
          />
          {firstNameError && (
            <ErrorMessage>
              <Close />
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
            onChange={(e) => {
              if (e.target.value.length <= 10) setLastName(e.target.value);
              if (lastNameError) setLastNameError(false);
            }}
            onBlur={handleLastNameBlur}
          />
          {lastNameError && (
            <ErrorMessage>
              <Close />
              한글만 입력 가능합니다.
            </ErrorMessage>
          )}
        </InputGroup>
      </InputNameGroup>
    </>
  );
}
