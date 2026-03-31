import useOverlayStore from '../../../store/useOverlayStore';
import BaseModal from '../BaseModal';
import BaseBtn from '../BaseBtn';

// 사용법:
// ex) <BaseWipModal id="brandStory" label="PULSE BRAND" title="브랜드 스토리" />

// id — 모달 키 (openModal(id) / closeModal(id)) 사용처에 맞게 아이디 바꿔주기
// label — 모달 상단 라벨 (선택 - 대문자로 각 사용처에 맞게 라벨 바꿔주기, 예: PULSE BRAND)
// title — 모달 타이틀
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
