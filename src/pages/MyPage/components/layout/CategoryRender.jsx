import React from 'react';
import OrderList from '../sections/OrderList';
import WishList from '../sections/WishList';
import Review from '../sections/Review';
import Coupon from '../sections/Coupon';
import Profile from '../sections/Profile';
import Adress from '../sections/Address';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(10px); filter: blur(2px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0px); }
`;
import CurrentCategory from './CurrentCategory';

const SECTION_MAP = {
  order: OrderList,
  wish: WishList,
  review: Review,
  coupon: Coupon,
  profile: Profile,
  address: Adress,
};

export default function CategoryRender({ category }) {
  const Section = SECTION_MAP[category];

  return (
    <CategoryWrap>
      <CurrentCategory category={category} />
      {Section && (
        <SectionWrap key={category}>
          <Section />
        </SectionWrap>
      )}
    </CategoryWrap>
  );
}

const CategoryWrap = styled.div`
  flex: 3;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1;
    width: 100%;
  }
`;

const SectionWrap = styled.div`
  animation: ${fadeSlideIn} 0.44s cubic-bezier(0.22, 1, 0.36, 1) both;
`;
