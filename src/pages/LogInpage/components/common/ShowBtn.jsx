import styled from '@emotion/styled';
import React from 'react';

const ShowButton = styled.button`
  position: absolute;
  bottom: 10px;
  background: none;
  border: none;
  display: flex;
  align-items: center;

  right: 10px;
  top: 60%;
  transform: translateY(-50%);

  svg {
    width: 18px;
    height: 18px;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    opacity: 0.4;
  }
`;

export default function ShowBtn({ showPw, setShowPw }) {
  return (
    <>
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
    </>
  );
}
