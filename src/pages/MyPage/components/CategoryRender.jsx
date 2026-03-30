import React from 'react';
import OrderList from './OrderList';
import WishList from './WishList';
import Review from './Review';
import Coupon from './Coupon';
import Profile from './Profile';
import Adress from './Adress';
import styled from '@emotion/styled';

export default function CategoryRender({ category }) {
  return (
    <CategoryWrap>
      {category ? null : <h2>카테고리를 선택해주세요.</h2>}
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
