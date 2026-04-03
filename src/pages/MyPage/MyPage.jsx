import styled from '@emotion/styled';
import React, { useEffect, useMemo, useState } from 'react';
import MyInfo from './components/overview/MyInfo';
import Statistics from './components/overview/Statistics';
import GradeProgress from './components/overview/GradeProgress';
import MainMyPage from './components/layout/MainMyPage';
import MyPageCategory from './components/layout/MyPageCategory';
import CategoryRender from './components/layout/CategoryRender';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useOverlayStore from '../../store/useOverlayStore';
import BaseModal from '../../components/common/BaseModal';
import BaseBtn from '../../components/common/BaseBtn';

function LoginModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.login));
  const closeModal = useOverlayStore((state) => state.closeModal);
  const navigate = useNavigate();

  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => {
        closeModal('login');
        navigate('/login', {
          replace: true,
          state: { redirectTo: '/mypage' },
        });
      }}
      title="로그인 후 이용해주세요."
    >
      <p>로그인 후 이용해주세요. 로그인 페이지로 이동합니다.</p>
      <BaseBtn
        padding="12px 32px"
        style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
        onClick={() => {
          closeModal('login');
          navigate('/login', {
            replace: true,
            state: { redirectTo: '/mypage' },
          });
        }}
      >
        확인
      </BaseBtn>
    </BaseModal>
  );
}

const TAB_MAP = {
  wishlist: 'wish',
  order: 'order',
  review: 'review',
  coupon: 'coupon',
  profile: 'profile',
  address: 'address',
};

const DEFAULT_TAB = TAB_MAP.address;

export default function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoggedIn = useAuthStore((state) => state.isLogin);
  const openModal = useOverlayStore((state) => state.openModal);
  const closeModal = useOverlayStore((state) => state.closeModal);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  const getExpireDate = (issuedAt) => {
    const baseDate = new Date(issuedAt);
    baseDate.setFullYear(baseDate.getFullYear() + 2);
    return baseDate.toISOString();
  };

  const tabFromUrl = searchParams.get('tab');

  const initialCategory = useMemo(() => {
    return Object.values(TAB_MAP).includes(tabFromUrl) ? tabFromUrl : DEFAULT_TAB;
  }, [tabFromUrl]);

  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const nextCategory = Object.values(TAB_MAP).includes(tabFromUrl) ? tabFromUrl : DEFAULT_TAB;
    setCategory(nextCategory);
  }, [tabFromUrl]);

  useEffect(() => {
    if (!isLoggedIn) {
      openModal('login');
    } else {
      closeModal('login');
    }
  }, [isLoggedIn, openModal, closeModal]);

  const handleSetCategory = (nextCategory) => {
    setCategory(nextCategory);

    if (!nextCategory || nextCategory === DEFAULT_TAB) {
      setSearchParams({}, { replace: true });
      return;
    }

    setSearchParams({ tab: nextCategory }, { replace: true });
  };
  useEffect(() => {
    if (!user) return;

    if (user.isHaveOrdered) return;
    if (user.hasReceivedFirstOrderCoupon) return;

    const hasFirstOrderCoupon = user.coupons?.some((coupon) => coupon.type === 'FIRST_ORDER');

    if (hasFirstOrderCoupon) return;

    const issuedAt = new Date().toISOString();

    login({
      ...user,
      hasReceivedFirstOrderCoupon: true,
      coupons: [
        ...(user.coupons || []),
        {
          label: '첫 주문 특별 할인 쿠폰',
          value: 0.3,
          type: 'FIRST_ORDER',
          issuedAt,
          couponCode: `FIRST30`,
          upToDate: getExpireDate(issuedAt),
        },
      ],
    });
  }, [user, login]);

  return (
    <MyPageWrap>
      <MyInfo setCategory={handleSetCategory} />
      <Statistics setCategory={handleSetCategory} />
      <GradeProgress />
      <MainMyPage>
        <MyPageCategory category={category} setCategory={handleSetCategory} />
        <CategoryRender category={category} />
      </MainMyPage>
      <LoginModal />
    </MyPageWrap>
  );
}

const MyPageWrap = styled.div`
  margin-top: 100px;
  max-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing[6]};
    margin-top: 88px;
  }

  @media (max-width: 400px) {
    gap: ${({ theme }) => theme.spacing[5]};
    margin-top: 80px;
  }
`;
