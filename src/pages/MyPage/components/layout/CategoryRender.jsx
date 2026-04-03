import React from 'react';
import OrderList from '../sections/OrderList';
import WishList from '../sections/WishList';
import Review from '../sections/Review';
import Coupon from '../sections/Coupon';
import Profile from '../sections/Profile';
import Adress from '../sections/Address';
import styled from '@emotion/styled';
import CurrentCategory from './CurrentCategory';

export default function CategoryRender({ category }) {
  return (
    <CategoryWrap>
      <CurrentCategory category={category} />
      {category === 'order' && <OrderList />}
      {category === 'wish' && <WishList />}
      {category === 'review' && <Review />}
      {category === 'coupon' && <Coupon />}
      {category === 'profile' && <Profile />}
      {category === 'address' && <Adress />}
    </CategoryWrap>
  );
}

const CategoryWrap = styled.div`
  flex: 4;
`;
