import styled from '@emotion/styled';
import useAuthStore from '../../../../store/useAuthStore';
import { rewardsRate } from '../../../../utils/myPageMap';

const formatKoreanDate = (dateValue) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return '-';

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

  return formattedDate.replace(/\.$/, '');
};

const getCouponCode = (coupon) => {
  if (coupon.code) return coupon.code;
  if (coupon.couponCode) return coupon.couponCode;
  return `${coupon.type.split('_')[0]}${Math.round((coupon.value || 0) * 100)}`;
};

const toPercent = (value) => Math.round((value || 0) * 100);

export default function Coupon() {
  const user = useAuthStore((state) => state.user);
  const coupons = user?.coupons || [];
  const sortedCoupons = [...coupons].sort((a, b) => (b.value || 0) - (a.value || 0));
  const maxCoupon = sortedCoupons[0]?.value || 0;
  const couponTones = ['violet', 'pink', 'blue'];

  return (
    <CouponWrap>
      <HaveList>
        <SummaryCard
          $glow="rgba(59,130,246,0.38)"
          $glowLight="rgba(37,99,235,0.22)"
          $val="#3b82f6"
          $valLight="#2563eb"
        >
          <h3>보유 포인트</h3>
          <h4>
            <strong>{(user?.point || 0).toLocaleString('ko-KR')}</strong>
            <em>P</em>
          </h4>
          <p>적립률 {rewardsRate[user?.grade || 'MEMBER'] * 100}%</p>
        </SummaryCard>

        <CouponCard
          $glow="rgba(139,92,246,0.38)"
          $glowLight="rgba(109,40,217,0.22)"
          $val="#8b5cf6"
          $valLight="#7c3aed"
        >
          <h3>보유 쿠폰</h3>
          <h4>
            <strong>{coupons.length}</strong>
            <em>장</em>
          </h4>
          <p>최대 {toPercent(maxCoupon)}% 할인 쿠폰 보유 중</p>
        </CouponCard>
      </HaveList>

      <CouponTitle>보유 쿠폰</CouponTitle>

      <CouponList>
        {sortedCoupons.length > 0 ? (
          sortedCoupons.map((coupon, index) => (
            <CouponItem
              key={`${coupon.label}-${coupon.type}-${index}`}
              $tone={couponTones[index % 3]}
            >
              <Discount>{toPercent(coupon.value)}%</Discount>
              <CouponBody>
                <Name>{coupon.label}</Name>
                <Expiry>{formatKoreanDate(coupon.upToDate)} 만료</Expiry>
              </CouponBody>
              <CouponCode>{getCouponCode(coupon)}</CouponCode>
            </CouponItem>
          ))
        ) : (
          <EmptyText>보유한 쿠폰이 없습니다.</EmptyText>
        )}
      </CouponList>
    </CouponWrap>
  );
}

const CouponWrap = styled.section`
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const HaveList = styled.div`
  display: grid;
  padding: ${({ theme }) => theme.spacing[4]} 0;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[7]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.article`
  position: relative;
  overflow: hidden;
  min-height: 168px;
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[7]};
  border-radius: 28px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background:
    radial-gradient(
      circle at top right,
      ${({ theme, $glow, $glowLight }) => (theme.mode === 'light' ? $glowLight : $glow)},
      transparent 45%
    ),
    ${({ theme }) => theme.colors.cardBgLight};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  backdrop-filter: ${({ theme }) => theme.effects.blurCard};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 800;

    color: ${({ theme }) => theme.colors.text + 'bb'};
  }

  h4 {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    font-family: ${({ theme }) => theme.fontFamily.mono};
    font-size: clamp(42px, 3.2vw, 56px);
    line-height: 1.08;
    display: flex;
    align-items: baseline;
    gap: 8px;

    > strong {
      background: ${({ theme, $val, $valLight }) =>
        theme.mode === 'light'
          ? `linear-gradient(180deg, ${$valLight}, ${$val}99)`
          : `linear-gradient(180deg, #fff, ${$val})`};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  h4 > em {
    font-style: normal;
    font-size: 0.58em;
    font-weight: 800;
    transform: translateY(-1px);
    color: ${({ theme }) => theme.colors.textSecondary};
    -webkit-text-fill-color: initial;
  }

  p {
    /* font-family: ${({ theme }) => theme.fontFamily.mono}; */
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 600;
    letter-spacing: 0.03em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const CouponCard = styled(SummaryCard)``;

const CouponTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 0.12em;
  /* margin-top: ${({ theme }) => theme.spacing[8]}; */
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CouponList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const CouponItem = styled.li`
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border-top-left-radius: ${({ theme }) => theme.radii.md};
  border-bottom-left-radius: ${({ theme }) => theme.radii.md};
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.cardBgLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    justify-items: start;
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[5]};
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const Discount = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: clamp(34px, 2.4vw, 44px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
`;

const CouponBody = styled.div`
  min-width: 0;
`;

const Name = styled.span`
  display: block;
  margin-bottom: 2px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text + 'dd'};
`;

const Expiry = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.01em;
  font-weight: 600;
`;

const CouponCode = styled.code`
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.btn2Bg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
`;

const EmptyText = styled.p`
  padding: ${({ theme }) => theme.spacing[6]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;
