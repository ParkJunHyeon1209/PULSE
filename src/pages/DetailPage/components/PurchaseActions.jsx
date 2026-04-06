import React from 'react';
import styled from '@emotion/styled';
import useAuthStore from '../../../store/useAuthStore';
import useOrderStore from '../../../store/useOrderStore';
import useOverlayStore from '../../../store/useOverlayStore';
import AddressRequiredModal from '../../../components/common/modals/AddressRequiredModal';
import OrderConfirmModal from '../../../components/common/modals/OrderConfirmModal';
import BaseBtn from '../../../components/common/BaseBtn';
import { CartIcon } from '../../../assets/icons/BtnIcon';
import { getGradeByTotalOrderPrice, rewardsRate } from '../../../utils/myPageMap';

const BUY_NOW_MODAL_ID = 'detail-buy-now-confirm';
const ADDRESS_REQUIRED_MODAL_ID = 'detail-address-required';

export default function PurchaseActions({ product, quantity = 1, onAddToCart, onRequireLogin }) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.login);
  const addOrder = useOrderStore((state) => state.addOrder);
  const openModal = useOverlayStore((state) => state.openModal);
  const defaultAddress =
    user?.defaultAddress ||
    user?.addresses?.find((address) => address.isDefault) ||
    null;

  const handleBuyNow = () => {
    if (!isLogin) {
      onRequireLogin?.();
      return;
    }

    if (!defaultAddress) {
      openModal(ADDRESS_REQUIRED_MODAL_ID);
      return;
    }

    openModal(BUY_NOW_MODAL_ID);
  };

  
  const handleConfirmBuyNow = () => {
    if (!product) {
      return;
    }

    const estimatedTotalPrice =
      ((Number(product.price) || 0) + (Number(product.carePrice) || 0)) * quantity;
    const rewardRate = rewardsRate[user?.grade || 'MEMBER'] || 0;
    const rewardPoint = Math.floor(estimatedTotalPrice * rewardRate);

    const createdOrder = addOrder({
      items: [
        {
          ...product,
          quantity,
          checked: true,
        },
      ],
      status: '결제완료',
      totalPrice: estimatedTotalPrice,
      earnedPoint: rewardPoint,
      discountInfo: {
        subtotal: estimatedTotalPrice,
        shippingFee: 0,
        discountAmount: 0,
        couponCode: '',
      },
    });

    if (!createdOrder || !user) return;
    const nextTotalOrderPrice = (user.totalOrderPrice || 0) + createdOrder.totalPrice;
    const nextGrade = getGradeByTotalOrderPrice(nextTotalOrderPrice);

    setUser({
      ...user,
      orders: [createdOrder, ...(user.orders || [])],
      isHaveOrdered: true,
      totalOrderPrice: nextTotalOrderPrice,
      grade: nextGrade,
      point: (user.point || 0) + rewardPoint,
    });
  };

  return (
    <>
      <ButtonGroup>
        <BaseBtn variant="primary" tone="violet" padding="10px 16px" flex="1" onClick={onAddToCart}>
          <BtnInner>
            <CartIcon strokeWidth="1.2" width={16} height={16} />
            장바구니 담기
          </BtnInner>
        </BaseBtn>

        <BaseBtn
          variant="secondary"
          tone="violet"
          padding="10px 16px"
          flex="1"
          onClick={handleBuyNow}
        >
          바로 구매
        </BaseBtn>
      </ButtonGroup>

      <OrderConfirmModal id={BUY_NOW_MODAL_ID} onConfirm={handleConfirmBuyNow} />
      <AddressRequiredModal id={ADDRESS_REQUIRED_MODAL_ID} />
    </>
  );
}

const BtnInner = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing[5]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;
