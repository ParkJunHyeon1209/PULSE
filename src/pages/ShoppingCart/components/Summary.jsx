import styled from '@emotion/styled';
import React from 'react';
import useCartStore from '../../../store/useCartStore';

const SummaryWrap = styled.div`
  flex: 1;
  background-color: #ffffff04;
  backdrop-filter: ${({ theme }) => theme.effects.blurPromo};
`;

export default function Summary() {
  const totalPrice = useCartStore((state) => state.getTotalPrice);

  return (
    <SummaryWrap>
      <div className="price">
        <h3>ORDER SUMMARY</h3>
        <p>
          상품 합계 <span>{totalPrice() ? totalPrice().toLocaleString() : 0}원</span>
        </p>
        <p>
          배송비 <span>FREE</span>
        </p>
        <p>
          할인 <span>-0원</span>
        </p>
        <p>
          TOTAL <span>{totalPrice() ? totalPrice().toLocaleString() : 0}원</span>
        </p>
      </div>
      <div className="coupon">
        <input type="text" placeholder="코드를 입력해주세요" />
        <button>APPLY</button>
      </div>
      <button>주문하기</button>
      <span>TRUSTED</span>
      <span>SECURE</span>
      <ul className="payment-method">
        <li>visa</li>
        <li>master-card</li>
        <li>kakao-pay</li>
        <li>naver-pay</li>
      </ul>
    </SummaryWrap>
  );
}
