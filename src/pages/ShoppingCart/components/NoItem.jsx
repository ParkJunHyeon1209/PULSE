import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoItemWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  background-color: #ffffff04;
  > img {
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    width: 330px;
  }
  > p {
    text-align: center;
  }
  > p:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  > p:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

export default function NoItem() {
  const navigate = useNavigate();

  return (
    <NoItemWrap>
      <img
        src="https://media.discordapp.net/attachments/1464925291099979892/1483333149764358204/2.png?ex=69ba3525&is=69b8e3a5&hm=f97f3445adc4f5d320f133c82ef02af722a5b92f81426599a3639dc6e96c5ea6&=&format=webp&quality=lossless&width=2200&height=1228"
        alt="랜덤이미지1"
      />
      <p>카트가 비어 있습니다.</p>
      <p>{`아직 추가된 장비가 없습니다. \n당신의 PULSE를 찾아보세요.`}</p>
      <button onClick={() => navigate('/')}>EXPLORE GEAR</button>
    </NoItemWrap>
  );
}
