import React from 'react';
import useCartStore from '../../store/useCartStore';
import styled from '@emotion/styled';
import ListContent from './components/ListContent';
import ListControl from './components/ListControl';
import Summary from './components/Summary';
import Recommend from './components/Recommend';
import NoItem from './components/NoItem';
import BaseSection from '../../components/common/BaseSection';

const ShoppingCartWrap = styled.div`
  width: 1280px;
  max-width: 1280px;
  padding: 80px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
`;
const CurrentRoute = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 9px;
  }
  /* > h2 {
    background: linear-gradient(to right, #e2e8f0 0%, #c4b5fd 50%, #a78bfa 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: 400;
    display: inline-block;
    font-size: 64px;
  } */
`;

const MainWrap = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const MainLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const CartList = styled.div`
  flex: 2;
  display: flex;
  justify-content: ${({ isEmpty }) => (isEmpty ? 'center' : 'flex-start')};
  align-items: ${({ isEmpty }) => (isEmpty ? 'center' : 'stretch')};
  border: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '08'};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.cardBg};
  overflow: hidden;
`;

const HaveItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default function ShoppingCart() {
  const cart = useCartStore((state) => state.cart);
  const isEmpty = cart.length === 0;

  return (
    <ShoppingCartWrap>
      <CurrentRoute>
        <BaseSection
          label={`SHOPPING CART • ${cart.length ? cart.length : 0} items`}
          title="YOUR PULSE"
        />
      </CurrentRoute>
      <MainWrap>
        <MainLeft>
          <CartList isEmpty={isEmpty}>
            {!isEmpty ? (
              <HaveItem>
                <ListControl />
                <ListContent />
              </HaveItem>
            ) : (
              <NoItem />
            )}
          </CartList>
          <Recommend />
        </MainLeft>
        <Summary />
      </MainWrap>
      {/* tag가 best인 제품만 추천 */}
    </ShoppingCartWrap>
  );
}
