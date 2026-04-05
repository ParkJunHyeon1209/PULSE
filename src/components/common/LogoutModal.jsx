import { useNavigate } from 'react-router-dom';
import BaseModal from './BaseModal';
import BaseBtn from './BaseBtn';
import useOverlayStore from '../../store/useOverlayStore';
import useAuthStore from '../../store/useAuthStore';

export default function LogoutModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.logout));
  const closeModal = useOverlayStore((state) => state.closeModal);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => closeModal('logout')}
      title="로그아웃 하시겠습니까?"
    >
      <p>정말 로그아웃 하시겠습니까?</p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
        <BaseBtn
          padding="12px 32px"
          variant="secondary"
          icon={false}
          onClick={() => closeModal('logout')}
        >
          취소
        </BaseBtn>
        <BaseBtn
          padding="12px 32px"
          onClick={() => {
            logout();
            closeModal('logout');
            navigate('/', { replace: true });
          }}
        >
          확인
        </BaseBtn>
      </div>
    </BaseModal>
  );
}
