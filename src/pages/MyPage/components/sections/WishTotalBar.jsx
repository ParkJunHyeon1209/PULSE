import styled from '@emotion/styled';
import BaseBtn from '../../../../components/common/BaseBtn';
import BaseTooltip from '../../../../components/common/BaseTooltip';

export default function WishTotalBar({ totalPrice, totalPoints, count, onAddAll }) {
  return (
    <TotalBar>
      <div>
        <TotalLabel>
          위시리스트 총액
          <PtsTooltipTrigger>
            <BaseBtn variant="ic-btn" size="14px" padding="3px" aria-label="적립 포인트 안내">
              ?
            </BaseBtn>
            <BaseTooltip className="pts-tooltip" position="bottom" offset="10px" maxWidth="240px">
              <span>PTS 적립 예상</span>
              <span>
                <span className="point">{count}개</span> 상품 기준{' '}
                <span className="point">{totalPoints.toLocaleString()}PTS</span>
              </span>
              <span className="member">
                {' '}
                · MEMBER - 1%
                <br /> · SILVER - 1.5%
                <br /> · GOLD - 3%
                <br /> · VIP - 5%
              </span>
            </BaseTooltip>
          </PtsTooltipTrigger>
        </TotalLabel>
        <TotalVal>{totalPrice.toLocaleString()}원</TotalVal>
      </div>
      <TotalCartBtn type="button" icon={false} flex="none" onClick={onAddAll}>
        전체 담기
      </TotalCartBtn>
    </TotalBar>
  );
}

const TotalLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  /* font-family: ${({ theme }) => theme.fontFamily.mono}; */
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  .point {
    font-weight: 700;
    /* font-size: ${({ theme }) => theme.fontSize.xxs}; */
  }
`;

const PtsTooltipTrigger = styled.span`
  top: -1px;
  position: relative;
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.body};

  &:hover .pts-tooltip,
  &:focus-within .pts-tooltip {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(calc(-50% + var(--tooltip-shift-x, 0px))) translateY(0) scale(1);
  }

  &:hover .pts-tooltip > *,
  &:focus-within .pts-tooltip > * {
    opacity: 1;
    transform: translateY(0);
  }
  > .pts-tooltip > span:nth-of-type(2) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
  > .pts-tooltip > .member {
    margin-top: 8px;
  }
`;

const TotalVal = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.s};

  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const TotalCartBtn = styled(BaseBtn)`
  height: 36px;
  padding: 0 18px;
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 600;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  white-space: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

const TotalBar = styled.div`
  background: ${({ theme }) => theme.colors.cardBgLight};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;
