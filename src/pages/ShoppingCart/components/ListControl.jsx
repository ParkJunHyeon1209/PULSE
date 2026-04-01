import React from 'react';
import useCartStore from '../../../store/useCartStore';
import styled from '@emotion/styled';
import useOverlayStore from '../../../store/useOverlayStore';
import BaseBtn from '../../../components/common/BaseBtn';
import BaseModal from '../../../components/common/BaseModal';

function ConfirmModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.confirm));
  const closeModal = useOverlayStore((state) => state.closeModal);
  const resetCart = useCartStore((state) => state.resetCart);

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => closeModal('confirm')}
      title="정말 삭제하시겠습니까?"
    >
      <p>
        정말 장바구니를 초기화 하시겠습니까? <br />
        되돌릴 수 없습니다.
      </p>

      <div className="btn-wrap" style={{ display: 'flex', gap: `16px` }}>
        <BaseBtn
          padding="12px 32px"
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={() => {
            resetCart();
            closeModal('confirm');
          }}
        >
          확인
        </BaseBtn>

        <BaseBtn
          padding="12px 32px"
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={() => closeModal('confirm')}
        >
          취소
        </BaseBtn>
      </div>
    </BaseModal>
  );
}

export default function ListControl() {
  const cart = useCartStore((state) => state.cart);
  const removeSelected = useCartStore((state) => state.removeSelected);
  const handleAllChange = useCartStore((state) => state.toggleAllChecked);
  const isAllChecked = cart.every((item) => item.checked);
  const openModal = useCartStore((state) => state.openResetModal);

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
        <button onClick={openModal}>전체삭제</button>
      </div>
      <ConfirmModal />
    </ListControlWrap>
  );
}
const ListControlWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.cardBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurPromo};
  border-bottom: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '08'};
  > .check-box {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
  }
  > .deletes {
    display: flex;
    gap: ${({ theme }) => theme.spacing[6]};
    > button:first-of-type {
      position: relative;
      color: ${({ theme }) => theme.colors.accent + '96'};
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
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.checkbox.border};
  border-radius: 4px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary}18;

  &:checked {
    background: ${({ theme }) => theme.gradients.navActive};
    box-shadow:
      0 0 0 1px #7c3aed,
      0 0 0 4px #7c3aed30;
    border: none;
  }
  + label {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.xs};
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
