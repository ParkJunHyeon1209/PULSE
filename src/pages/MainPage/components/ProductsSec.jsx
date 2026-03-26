import styled from '@emotion/styled';
import BaseSection from '../../../components/common/BaseSection';
import BaseProductCard from '../../../components/common/BaseProductCard';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0`};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const items = [
  {
    title: 'PULSE Pro H1',
    meta: '7.1ch 서라운드 + 초저지연 ANC',
    price: 249000,
    badge: 'NEW',
    category: 'headset',
  },
  {
    title: 'PULSE Key K2',
    meta: '광축 스위치 + 커스텀 RGB 모드',
    price: 179000,
    badge: 'HOT',
    category: 'gear',
  },
  {
    title: 'PULSE Click M3',
    meta: '26K DPI 센서 + 초경량 58g',
    price: 189000,
    badge: 'BEST',
    category: 'console',
  },
  {
    title: 'PULSE SETUP',
    meta: '아티스트 시그니처 한정 50개',
    price: 299000,
    badge: 'COLLAB',
    category: 'bundle',
  },
];

export default function ProductsSec() {
  return (
    <SectionWrap>
      <BaseSection
        label="New Arrivals"
        title="2026 COLLECTION"
        sub="게임과 작업 문화를 위한 PULSE 2026 S/S 기어 라인업."
      />
      <Grid>
        {items.map((item) => (
          <BaseProductCard key={item.title} product={item} />
        ))}
      </Grid>
    </SectionWrap>
  );
}
