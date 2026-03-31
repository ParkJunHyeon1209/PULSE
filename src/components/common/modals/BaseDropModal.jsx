import useOverlayStore from '../../../store/useOverlayStore';
import BaseModal from '../BaseModal';
import BaseBtn from '../BaseBtn';

export default function BaseDropModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.dropAlert));
  const closeModal = useOverlayStore((state) => state.closeModal);
  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE DROP"
      width="360px"
      title="드롭 알림 받기"
      closable={false}
    >
      <p>
        드롭 알림이 신청되었습니다. <br />
        한정 수량 오픈 시 가장 먼저 알려드릴게요.
      </p>
      <BaseBtn
        padding="12px 32px"
        style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
        onClick={() => closeModal('dropAlert')}
      >
        알림 신청하기
      </BaseBtn>
    </BaseModal>
  );
}
