import React from 'react';
import OrderList from './OrderList';
import WishList from './WishList';
import Review from './Review';
import Coupon from './Coupon';
import Profile from './Profile';
import Adress from './Address';
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
  flex: 7;
`;
