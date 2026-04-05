import { useNavigate } from 'react-router-dom';
import BaseBtn from '../BaseBtn';
import BaseModal from '../BaseModal';
import useOverlayStore from '../../../store/useOverlayStore';

export default function AddressRequiredModal({ id }) {
  const navigate = useNavigate();
  const isOpen = useOverlayStore((state) => Boolean(state.modals[id]));
  const closeModal = useOverlayStore((state) => state.closeModal);

  const handleMoveToAddress = () => {
    closeModal(id);
    navigate('/mypage?tab=address');
  };

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE DELIVERY"
      width="360px"
      title="배송지 등록이 필요해요."
      onClose={() => closeModal(id)}
    >
      <p>
        결제를 진행하려면 기본 배송지를 <br />
        먼저 등록해주세요.
      </p>

      <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <BaseBtn
          variant="secondary"
          icon={false}
          padding="12px 24px"
          onClick={() => closeModal(id)}
        >
          취소
        </BaseBtn>
        <BaseBtn padding="12px 24px" onClick={handleMoveToAddress}>
          확인
        </BaseBtn>
      </div>
    </BaseModal>
  );
}
