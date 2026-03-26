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
  width: 100%;
  margin-top: ${({ theme }) => `calc(${theme.spacing[40]} + 20px)`};
  padding-inline: ${({ theme }) => theme.grid.margin};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.grid.gap};
`;

const CurrentRoute = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs} - '3px';
  }
`;

const MainWrap = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const MainLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const CartList = styled.div`
  display: flex;
  justify-content: ${({ isEmpty }) => (isEmpty ? 'center' : 'flex-start')};
  align-items: ${({ isEmpty }) => (isEmpty ? 'center' : 'stretch')};
  border: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '08'};
  border-radius: ${({ theme }) => theme.radii.lg};
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
        <BaseSection label={`SHOPPING CART • ${cart.length || 0} items`} title="YOUR PULSE" />
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
