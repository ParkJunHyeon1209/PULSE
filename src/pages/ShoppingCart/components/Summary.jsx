import styled from '@emotion/styled';
import React from 'react';
import useCartStore from '../../../store/useCartStore';
import BaseBtn from '../../../components/common/BaseBtn';
import BaseSection from '../../../components/common/BaseSection';
import BaseTooltip from '../../../components/common/BaseTooltip';
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
  position: sticky;
  top: 120px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: ${({ theme }) => theme.effects.blurPromo};

  .shipping-info {
    cursor: default;
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
      background-color: ${({ theme }) => theme.colors.cardBg};
      font-size: ${({ theme }) => theme.fontSize.xxs};
      transition: font-size 0.3s ease;

      &::placeholder {
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
export default function Summary() {
  const totalPrice = useCartStore((state) => state.getTotalPrice);
  const SHIPPING_FEE = 5000;

  return (
    <SummaryWrap>
      <div className="price">
        <h3>ORDER SUMMARY</h3>
        <p>
          상품 합계{' '}
          <span className="miniPrice">{totalPrice() ? totalPrice().toLocaleString() : 0}원</span>
        </p>
        <p>
          <span className="shipping">
            배송비{' '}
            <span className="shipping-trigger">
              <BaseBtn variant="ic-btn" size={'16px'} padding={'4px'} className="shipping-info">
                ?
              </BaseBtn>
              <BaseTooltip className="shipping-tooltip" position="bottom" mobileShift="48px">
                <span>배송비 정보: 5만원 이상 결제 시 배송비 무료</span>
              </BaseTooltip>
            </span>
          </span>
          <span className="free">
            {totalPrice() && totalPrice() < 50000 ? `${SHIPPING_FEE.toLocaleString()}원` : 'Free'}
          </span>
        </p>
        <p>
          할인 <span className="discount">-0원</span>
        </p>
        <p>
          TOTAL{' '}
          <span>
            {totalPrice() && totalPrice() < 50000
              ? (totalPrice() + SHIPPING_FEE).toLocaleString()
              : totalPrice()?.toLocaleString() || 0}
            원
          </span>
        </p>
      </div>

      <div className="coupon">
        <input type="text" placeholder="코드를 입력하세요" />

        <BaseBtn className="coupon-btn" variant="secondary" tone="violet" padding="8px 16px">
          apply
        </BaseBtn>
      </div>
      <BaseBtn className="order-btn" variant="primary" tone="violet" padding="8px 16px">
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
  );
}
