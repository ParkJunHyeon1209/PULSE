import { useNavigate } from 'react-router-dom';
import useOverlayStore from '../../../store/useOverlayStore';
import BaseModal from '../BaseModal';
import BaseBtn from '../BaseBtn';

export default function OrderConfirmModal({ id, onConfirm }) {
  const navigate = useNavigate();
  const isOpen = useOverlayStore((state) => Boolean(state.modals[id]));
  const closeModal = useOverlayStore((state) => state.closeModal);

  const handleConfirm = () => {
    onConfirm?.();
    closeModal(id);
    navigate('/mypage?tab=order');
  };

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE ORDER"
      width="360px"
      title="구매를 완료할까요?"
      onClose={() => closeModal(id)}
    >
      <p>
        주문 내역에 저장됩니다.
        <br />
        계속 진행하시겠어요?
      </p>

      <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <BaseBtn variant="secondary" padding="12px 24px" onClick={() => closeModal(id)}>
          취소
        </BaseBtn>
        <BaseBtn padding="12px 24px" onClick={handleConfirm}>
          확인
        </BaseBtn>
      </div>
    </BaseModal>
  );
}
