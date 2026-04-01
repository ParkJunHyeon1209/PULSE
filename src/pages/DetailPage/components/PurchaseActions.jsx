import React from 'react';
import styled from '@emotion/styled';
import useAuthStore from '../../../store/useAuthStore';
import useOrderStore from '../../../store/useOrderStore';
import useOverlayStore from '../../../store/useOverlayStore';
import OrderConfirmModal from '../../../components/common/modals/OrderConfirmModal';

const BUY_NOW_MODAL_ID = 'detail-buy-now-confirm';

export default function PurchaseActions({ product, quantity = 1, onAddToCart, onRequireLogin }) {
  const isLogin = useAuthStore((state) => state.isLogin);
  const addOrder = useOrderStore((state) => state.addOrder);
  const openModal = useOverlayStore((state) => state.openModal);

  const handleBuyNow = () => {
    if (!isLogin) {
      onRequireLogin?.();
      return;
    }

    openModal(BUY_NOW_MODAL_ID);
  };

  // 구매하기
  const handleConfirmBuyNow = () => {
    if (!product) {
      return;
    }

    addOrder({
      items: [
        {
          ...product,
          quantity,
          checked: true,
        },
      ],
      status: '결제완료',
    });
  };

  return (
    <>
      <ButtonGroup>
        <CartButton type="button" onClick={onAddToCart}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.625 3.125L2.5 0.625H10L11.875 3.125M0.625 3.125V11.875C0.625 12.2065 0.756696 12.5245 0.991116 12.7589C1.22554 12.9933 1.54348 13.125 1.875 13.125H10.625C10.9565 13.125 11.2745 12.9933 11.5089 12.7589C11.7433 12.5245 11.875 12.2065 11.875 11.875V3.125M0.625 3.125H11.875M8.75 5.625C8.75 6.28804 8.48661 6.92393 8.01777 7.39277C7.54893 7.86161 6.91304 8.125 6.25 8.125C5.58696 8.125 4.95107 7.86161 4.48223 7.39277C4.01339 6.92393 3.75 6.28804 3.75 5.625"
              stroke="white"
              strokeWidth="1.25"
            />
          </svg>
          장바구니 담기
        </CartButton>

        <BuyButton type="button" onClick={handleBuyNow}>
          바로 구매
        </BuyButton>
      </ButtonGroup>

      <OrderConfirmModal id={BUY_NOW_MODAL_ID} onConfirm={handleConfirmBuyNow} />
    </>
  );
}

const ButtonGroup = styled.div`
  margin-top: ${({ theme }) => theme.spacing[5]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  flex: 1;

  min-height: 38px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 800;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    background-color ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing[2]}`} 0;
    height: auto;
  }
`;

const CartButton = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.wColor};
  background: ${({ theme }) => theme.tones.violet.bg};
  box-shadow: ${({ theme }) => theme.tones.violet.shadow};

  &:hover {
    background: ${({ theme }) => theme.tones.violet.hoverBg};
    box-shadow: ${({ theme }) => theme.tones.violet.hoverShadow};
  }
`;

const BuyButton = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.btn.secondaryBg};
  color: ${({ theme }) => theme.btn.secondaryColor};
  border: 1px solid ${({ theme }) => theme.btn.secondaryBorder};
  box-shadow: ${({ theme }) => theme.btn.secondaryShadow};

  &:hover {
    background: ${({ theme }) => theme.btn.secondaryHoverBg};
    color: ${({ theme }) => theme.btn.secondaryHoverColor};
    border-color: ${({ theme }) => theme.btn.secondaryHoverBorder};
    box-shadow: ${({ theme }) => theme.btn.secondaryHoverShadow};
  }
`;
