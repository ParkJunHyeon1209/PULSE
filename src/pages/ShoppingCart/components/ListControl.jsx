import React from 'react';
import useCartStore from '../../../store/useCartStore';
import styled from '@emotion/styled';

const ListControlWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: #ffffff04;
  backdrop-filter: ${({ theme }) => theme.effects.blurPromo};

  > .deletes {
    display: flex;
    gap: ${({ theme }) => theme.spacing[6]};
    > button:first-of-type {
      position: relative;
      color: ${({ theme }) => theme.colors.accent + '35'};
      transition: color ${({ theme }) => theme.motion.fast} ease;
    }
    > button:first-of-type:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
    > button:first-of-type::after {
      content: '';
      width: 1px;
      height: 10px;
      position: absolute;
      top: 50%;
      right: 0;
      margin-right: -12px;
      transform: translate(50%, -50%);
      background-color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

export default function ListControl() {
  const cart = useCartStore((state) => state.cart);
  const removeSelected = useCartStore((state) => state.removeSelected);
  const handleAllChange = useCartStore((state) => state.handleAllChange);
  const isAllChecked = cart.every((item) => item.checked);
  const resetCart = useCartStore((state) => state.clearCart);

  return (
    <ListControlWrap>
      <div className="check-box">
        <label>
          <input type="checkbox" checked={isAllChecked} onChange={handleAllChange} />
          전체 선택
        </label>
      </div>
      <div className="deletes">
        <button onClick={removeSelected}>선택삭제</button>
        <button onClick={resetCart}>전체삭제</button>
      </div>
    </ListControlWrap>
  );
}
