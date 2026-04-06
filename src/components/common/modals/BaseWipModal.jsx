import useOverlayStore from '../../../store/useOverlayStore';
import BaseModal from '../BaseModal';
import BaseBtn from '../BaseBtn';







export default function BaseWipModal({ id, label, title }) {
  const isOpen = useOverlayStore((state) => Boolean(state.modals[id]));
  const closeModal = useOverlayStore((state) => state.closeModal);
  return (
    <BaseModal
      isOpen={isOpen}
      label={label}
      width="360px"
      title={title}
      onClose={() => closeModal(id)}
    >
      <p>
        {title} 페이지는 현재 개발 중이에요. <br />
        조금만 기다려 주세요.
      </p>
      <BaseBtn
        padding="12px 32px"
        style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
        onClick={() => closeModal(id)}
      >
        확인
      </BaseBtn>
    </BaseModal>
  );
}
