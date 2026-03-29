import styled from '@emotion/styled';
import useOverlayStore from '../../store/useOverlayStore';
import MainHero from './components/MainHero';
import HeroBand from './components/HeroBand';
import ShowcaseSec from './components/ShowcaseSec';
import CollectionSec from './components/CollectionSec';
import CategorySec from './components/CategorySec';
import DropSec from './components/DropSec';
import BrandPromiseSec from './components/BrandPromiseSec';
import BaseModal from '../../components/common/BaseModal';
import BaseBtn from '../../components/common/BaseBtn';

const PageWrap = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  padding-inline: ${({ theme }) => theme.grid.margin};
`;

const Full = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
`;

const HeroWrap = styled(Full)`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  aspect-ratio: 16 / 9;
`;

function DropAlertModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.dropAlert));
  const closeModal = useOverlayStore((state) => state.closeModal);
  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE DROP ALERT"
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

function TestModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.test));
  const closeModal = useOverlayStore((state) => state.closeModal);
  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => closeModal('test')}
      title="PULSE 타이틀"
    >
      <p>
        테스트 문구에요. 일단 만들었긴했는데 모르겠으면 물어봐주세욤... 위에 라벨은 안써도되요 이건
        약관동의 용도로 추가해둔 친구입니다
      </p>
      <BaseBtn style={{ marginTop: '28px' }} onClick={() => closeModal('test')}>
        test 닫기
      </BaseBtn>
    </BaseModal>
  );
}

export default function MainPage() {
  const openModal = useOverlayStore((state) => state.openModal);

  return (
    <PageWrap>
      <HeroWrap>
        <MainHero />
        <HeroBand />
      </HeroWrap>

      <ShowcaseSec />
      <CollectionSec />
      <DropSec />
      <CategorySec />
      <Full>
        <BrandPromiseSec />
      </Full>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BaseBtn onClick={() => openModal('test')}>모달 테스트</BaseBtn>
      </div>

      <DropAlertModal />
      <TestModal />
    </PageWrap>
  );
}
