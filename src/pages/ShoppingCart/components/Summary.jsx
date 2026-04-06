import styled from '@emotion/styled';
import React, { useState } from 'react';
import useCartStore from '../../../store/useCartStore';
import useOrderStore from '../../../store/useOrderStore';
import useOverlayStore from '../../../store/useOverlayStore';
import useAuthStore from '../../../store/useAuthStore';
import BaseBtn from '../../../components/common/BaseBtn';
import BaseSection from '../../../components/common/BaseSection';
import BaseTooltip from '../../../components/common/BaseTooltip';
import AddressRequiredModal from '../../../components/common/modals/AddressRequiredModal';
import OrderConfirmModal from '../../../components/common/modals/OrderConfirmModal';
import { getGradeByTotalOrderPrice, rewardsRate } from '../../../utils/myPageMap';
import {
  VisaIcon,
  MasterCardIcon,
  KakaoPayIcon,
  NaverPayIcon,
} from '../../../assets/icons/BtnIcon';

const SummaryWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[8]}
    clamp(${({ theme }) => theme.spacing[5]}, 4vw, ${({ theme }) => theme.spacing[10]});
  max-height: max-content;
  background-color: ${({ theme }) => theme.colors.cardBgLight};
  border: 1px solid ${({ theme }) => theme.checkbox.border + '35'};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 1px 20px ${({ theme }) => theme.checkbox.border + '20'};
  backdrop-filter: ${({ theme }) => theme.effects.blurPromo};

  .shipping-info {
    cursor: help;
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }
  .shipping-info:hover {
    opacity: 0.6;
  }

  .price {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    > h3 {
      font-size: ${({ theme }) => theme.fontSize.xs};
      margin-bottom: ${({ theme }) => theme.spacing[5]};
    }
    > p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: ${({ theme }) => theme.spacing[3]};
      font-size: ${({ theme }) => theme.fontSize.xxxs};
      font-weight: 700;
      > span.miniPrice {
        opacity: 0.6;
      }
      > span.shipping {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => `calc(${theme.spacing[1]} + 2px)`};
        position: relative;
        font-size: ${({ theme }) => theme.fontSize.xxxs};
        color: ${({ theme }) => theme.colors.textSecondary};

        .shipping-trigger {
          position: relative;
          display: inline-flex;

          &:hover .shipping-tooltip,
          &:focus-within .shipping-tooltip {
            opacity: 1;
            transform: translateX(calc(-50% + var(--tooltip-shift-x, 0px))) translateY(0) scale(1);
            pointer-events: auto;
          }

          &:hover .shipping-tooltip > *,
          &:focus-within .shipping-tooltip > * {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
      > span {
        color: ${({ theme }) => theme.colors.text};
        font-size: ${({ theme }) => theme.fontSize.xs};
      }
      > span.free {
        color: ${({ theme }) => theme.colors.success};
      }
      > span.discount {
        color: ${({ theme }) => theme.colors.accent};
      }
    }

    > p:nth-of-type(3) {
      padding-bottom: ${({ theme }) => theme.spacing[5]};
      border-bottom: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '08'};
      margin-bottom: ${({ theme }) => theme.spacing[5]};
    }
    > p:last-of-type {
      display: flex;
      align-items: center;
      font-size: ${({ theme }) => theme.fontSize.xs};
      color: ${({ theme }) => theme.colors.primary};
      margin-top: 0;
      margin-bottom: ${({ theme }) => theme.spacing[8]};
      > span {
        font-size: ${({ theme }) => theme.fontSize.sm};
        font-weight: 600;
      }
    }
  }
  .coupon {
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[2]};
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    > input {
      flex: 3;
      min-width: 0;
      padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[5]};
      border: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '07'};
      border-radius: ${({ theme }) => theme.radii.pill};
      background-color: ${({ theme }) => theme.colors.cardBgLight};
      color: ${({ theme }) => theme.colors.text};
      font-size: ${({ theme }) => theme.fontSize.xxs};
      transition: font-size 0.3s ease;
      box-shadow: 0 0 2px ${({ theme }) => theme.colors.shadow};
      transition:
        box-shadow 0.3s ease,
        font-size 0.3s ease;

      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary + '20'};
      }

      &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
        opacity: 0.6;
        font-weight: 600;
        font-size: ${({ theme }) => theme.fontSize.xxs};
        transition: font-size 0.3s ease;
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xxxs};
        &::placeholder {
          font-size: ${({ theme }) => theme.fontSize.xxxs};
        }
      }
    }
    > .coupon-btn {
      flex: 1;
      border: 1px solid ${({ theme }) => theme.colors.primary + '20'};
      background-color: ${({ theme }) => theme.colors.primary + '15'};
    }
  }
  .order-btn {
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing[5]};
  }
  .center-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > ul {
      display: flex;
      gap: ${({ theme }) => theme.spacing[2]};
      > li {
        padding: ${({ theme }) => theme.spacing[2]};
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '07'};
        background-color: ${({ theme }) => theme.colors.cardBg};
        border-radius: ${({ theme }) => theme.radii.full};
      }
    }
  }
`;

const ORDER_CONFIRM_MODAL_ID = 'cart-order-confirm';
const ADDRESS_REQUIRED_MODAL_ID = 'cart-address-required';

export default function Summary() {
  const totalPrice = useCartStore((state) => state.getTotalPrice);
  const SHIPPING_FEE = 5000;
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountRate, setAppliedDiscountRate] = useState(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.login);

  
  const getCheckedItems = useCartStore((state) => state.getCheckedItems);
  const clearCheckedItems = useCartStore((state) => state.clearCheckedItems);
  const addOrder = useOrderStore((state) => state.addOrder);
  const openModal = useOverlayStore((state) => state.openModal);
  const checkedItems = getCheckedItems();
  const hasCheckedItems = checkedItems.length > 0;
  const subtotal = totalPrice();
  const discountAmount = Math.floor(subtotal * appliedDiscountRate);
  const shippingFee = subtotal > 0 && subtotal < 50000 ? SHIPPING_FEE : 0;
  const finalTotal = Math.max(subtotal - discountAmount + shippingFee, 0);
  const rewardRate = rewardsRate[user?.grade || 'MEMBER'] || 0;
  const rewardPoint = Math.floor(finalTotal * rewardRate);
  const defaultAddress =
    user?.defaultAddress ||
    user?.addresses?.find((address) => address.isDefault) ||
    null;

  const handleOpenOrderModal = () => {
    if (!hasCheckedItems) {
      return;
    }

    if (!defaultAddress) {
      openModal(ADDRESS_REQUIRED_MODAL_ID);
      return;
    }

    openModal(ORDER_CONFIRM_MODAL_ID);
  };

  const handleConfirmOrder = () => {
    const items = getCheckedItems();

    if (!items.length) {
      return;
    }

    const createdOrder = addOrder({
      items,
      status: '결제완료',
      totalPrice: finalTotal,
      earnedPoint: rewardPoint,
      discountInfo: {
        subtotal,
        shippingFee,
        discountAmount,
        couponCode: appliedCouponCode,
      },
    });

    if (!createdOrder) {
      return;
    }

    if (user) {
      const nextCoupons = (user.coupons || []).filter((coupon) => {
        if (!appliedCouponCode) return true;
        const storedCode = (coupon.couponCode || coupon.code || '').trim().toUpperCase();
        return storedCode !== appliedCouponCode;
      });
      const nextOrders = [createdOrder, ...(user.orders || [])];
      const nextTotalOrderPrice = (user.totalOrderPrice || 0) + finalTotal;
      const nextGrade = getGradeByTotalOrderPrice(nextTotalOrderPrice);

      setUser({
        ...user,
        orders: nextOrders,
        isHaveOrdered: true,
        totalOrderPrice: nextTotalOrderPrice,
        grade: nextGrade,
        point: (user.point || 0) + rewardPoint,
        coupons: nextCoupons,
      });
    }

    setAppliedDiscountRate(0);
    setAppliedCouponCode('');
    setCouponCode('');
    clearCheckedItems();
  };

  return (
    <>
      <SummaryWrap>
        <div className="price">
          <h3>ORDER SUMMARY</h3>
          <p>
            상품 합계 <span className="miniPrice">{subtotal.toLocaleString()}원</span>
          </p>
          <p>
            <span className="shipping">
              배송비{' '}
              <span className="shipping-trigger">
                <BaseBtn variant="ic-btn" size={'16px'} padding={'4px'} className="shipping-info">
                  ?
                </BaseBtn>
                <BaseTooltip className="shipping-tooltip" position="bottom" mobileShift="48px">
                  <span>배송비 정보:</span>
                  <span> 5만원 이상 결제 시 배송비 무료</span>
                  <span>5만원 미만 5,000원</span>
                </BaseTooltip>
              </span>
            </span>
            <span className="free">
              {shippingFee > 0 ? `${shippingFee.toLocaleString()}원` : 'Free'}
            </span>
          </p>
          <p>
            할인 <span className="discount">-{discountAmount.toLocaleString()}원</span>
          </p>
          <p>
            TOTAL <span>{finalTotal.toLocaleString()}원</span>
          </p>
        </div>

        <div className="coupon">
          <input
            type="text"
            value={couponCode}
            placeholder="코드를 입력하세요"
            onChange={(e) => setCouponCode(e.target.value)}
          />

          <BaseBtn
            className="coupon-btn"
            variant="secondary"
            tone="violet"
            padding="8px 16px"
            onClick={() => {
              const normalizedCode = couponCode.trim().toUpperCase();
              if (!normalizedCode) return;

              const matchedCoupon = user?.coupons?.find((coupon) => {
                const storedCode = (coupon.couponCode || coupon.code || '').trim().toUpperCase();
                return storedCode === normalizedCode;
              });

              setAppliedDiscountRate(matchedCoupon?.value || 0);
              setAppliedCouponCode(matchedCoupon ? normalizedCode : '');
            }}
          >
            apply
          </BaseBtn>
        </div>
        <BaseBtn
          className="order-btn"
          variant="primary"
          tone="violet"
          padding="8px 16px"
          onClick={handleOpenOrderModal}
          disabled={!hasCheckedItems}
        >
          주문하기
        </BaseBtn>
        <div className="center-content">
          <BaseSection label={'TRUSTED • SECURE'} />
          <ul className="payment-method">
            <li>
              <VisaIcon />
            </li>
            <li>
              <MasterCardIcon />
            </li>
            <li>
              <KakaoPayIcon />
            </li>
            <li>
              <NaverPayIcon />
            </li>
          </ul>
        </div>
      </SummaryWrap>

      <OrderConfirmModal id={ORDER_CONFIRM_MODAL_ID} onConfirm={handleConfirmOrder} />
      <AddressRequiredModal id={ADDRESS_REQUIRED_MODAL_ID} />
    </>
  );
}
