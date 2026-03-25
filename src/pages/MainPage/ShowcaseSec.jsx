import styled from '@emotion/styled';
import BaseSection from '../../components/common/BaseSection';
import BaseToneCard from './BaseToneCard';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[18]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0 ${theme.spacing[20]}`};
`;

const HeadWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.15fr 1fr;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const cards = [
  {
    label: 'Headset',
    name: 'PULSE PRO H1',
    count: '몰입형 공간감과 저지연 무선 사운드',
    tone: 'violet',
    height: '430px',
  },
  {
    label: 'PULSE × VIBE',
    name: 'SIGNAL EDITION',
    count: '한정 100개 드롭 스페셜 글로우',
    tone: 'indigo',
    height: '510px',
    badge: 'col',
    arrow: true,
  },
  {
    label: 'Keyboard',
    name: 'KEY MATRIX',
    count: '75% 배열 커스텀 RGB 셋업',
    tone: 'blue',
    height: '430px',
  },
];

export default function ShowcaseSec() {
  return (
    <SectionWrap>
      <HeadWrap>
        <BaseSection
          label="Real Gear · Real Signal"
          title="PLAYED BY"
          colorTitle="REAL PLAYERS"
          sub="감각에 반응하는 기어. 플레이어가 직접 선택한 PULSE 라인업."
          align="center"
          titleFont="display"
          titleSize="lg"
        />
      </HeadWrap>

      <Grid>
        {cards.map((card) => (
          <BaseToneCard
            key={card.name}
            label={card.label}
            name={card.name}
            count={card.count}
            tone={card.tone}
            height={card.height}
            badge={card.badge}
            arrow={card.arrow}
          />
        ))}
      </Grid>
    </SectionWrap>
  );
}
