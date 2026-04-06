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
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const MainLeft = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const SummaryWrap = styled.div`
  width: min(100%, 400px);
  flex: 0 0 min(100%, 400px);
  min-width: 0;
  position: -webkit-sticky;
  position: sticky;
  top: 120px;
  align-self: flex-start;
  height: max-content;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 100%;
    flex-basis: auto;
    position: static;
    top: auto;
  }
`;

const RecommendWrap = styled.div`
  min-width: 0;
`;

const CartList = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing[10]};
  justify-content: ${({ isEmpty }) => (isEmpty ? 'center' : 'flex-start')};
  align-items: ${({ isEmpty }) => (isEmpty ? 'center' : 'stretch')};
  border: 1px solid ${({ theme }) => theme.checkbox.border + '35'};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 1px 20px ${({ theme }) => theme.checkbox.border + '20'};
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
          <RecommendWrap>
            <Recommend />
          </RecommendWrap>
        </MainLeft>
        <SummaryWrap>
          <Summary />
        </SummaryWrap>
      </MainWrap>
      
    </ShoppingCartWrap>
  );
}
