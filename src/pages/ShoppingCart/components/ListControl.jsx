import React from 'react';
import useCartStore from '../../../store/useCartStore';
import styled from '@emotion/styled';

const ListControlWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.tones.violet.hoverColor + '04'};
  backdrop-filter: ${({ theme }) => theme.effects.blurPromo};

  > .check-box {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
  }
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

const GradientCheckbox = styled.input`
  appearance: none;
  position: relative;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '33'};
  border-radius: 4px;
  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.gradients.navActive};
    box-shadow:
      0 0 0 1px #7c3aed,
      0 0 0 4px #7c3aed30;
    border: none;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -58%);
    font-size: 14px;
    font-weight: 700;
    color: white;
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
        <GradientCheckbox
          id="select-all"
          type="checkbox"
          checked={isAllChecked}
          onChange={handleAllChange}
        />
        <label htmlFor="select-all">전체 선택</label>
      </div>
      <div className="deletes">
        <button onClick={removeSelected}>선택삭제</button>
        <button onClick={resetCart}>전체삭제</button>
      </div>
    </ListControlWrap>
  );
}
