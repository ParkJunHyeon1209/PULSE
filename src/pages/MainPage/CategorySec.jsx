import styled from '@emotion/styled';
import BaseSection from '../../components/common/BaseSection';
import BaseToneCard from './BaseToneCard';

const SectionWrap = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => `${theme.spacing[24]} 0`};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};

  & > article:first-of-type {
    grid-column: span 2;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    & > article:first-of-type {
      grid-column: span 1;
    }
  }
`;

const items = [
  { label: 'Category 01', name: 'LINEUP', count: '12 Products', tone: 'violet' },
  { label: 'Category 02', name: 'HEADSET', count: '8 Products', tone: 'blue' },
  { label: 'Category 03', name: 'GEAR', count: '6 Products', tone: 'pink' },
  { label: 'Category 04', name: 'CONSOLE', count: '4 Products', tone: 'mint' },
  { label: 'Category 05', name: 'DROPS', count: 'Limited Edition', tone: 'indigo' },
];

export default function CategorySec() {
  return (
    <SectionWrap>
      <BaseSection
        label="Categories"
        title="BROWSE"
        sub="플레이 스타일에 맞는 기어 컬렉션을 찾아보세요."
      />
      <Grid>
        {items.map((item) => (
          <BaseToneCard
            key={item.name}
            label={item.label}
            name={item.name}
            count={item.count}
            tone={item.tone}
          />
        ))}
      </Grid>
    </SectionWrap>
  );
}
