import styled from '@emotion/styled';
import React from 'react';

const categoryTitleMap = {
  order: '주문 내역',
  wish: '찜 목록',
  review: '작성 리뷰',
  coupon: '혜택 쿠폰',
  profile: '프로필 편집',
  address: '배송지 관리',
};

export default function CurrentCategory({ category }) {
  return (
    <CurrentRoute>
      <h2>MY ACCOUNT</h2>
      {category && (
        <h3>
          {category === 'coupon' ? (
            <DotDividerText>
              <span>혜택</span>
              <span>쿠폰</span>
            </DotDividerText>
          ) : (
            categoryTitleMap[category]
          )}
        </h3>
      )}
    </CurrentRoute>
  );
}

const CurrentRoute = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding-bottom: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.primary + '33'};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  > h2 {
    transform: translateX(2px);
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  > h3 {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text + 'cc'};
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const DotDividerText = styled.span`
  display: inline-flex;
  align-items: center;

  > span + span {
    position: relative;
    margin-left: ${({ theme }) => theme.spacing[4]};
  }

  > span + span::before {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(${({ theme }) => theme.spacing[2]} * -1.25);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: currentColor;
    transform: translateY(-50%);
  }
`;
