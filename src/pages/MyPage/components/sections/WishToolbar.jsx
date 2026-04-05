import styled from '@emotion/styled';

const FILTER_TABS = ['ALL', 'HEADSET', 'GEAR', 'CONSOLE', 'DROPS'];

export default function WishToolbar({ activeFilter, onFilterChange, count }) {
  return (
    <Toolbar>
      {FILTER_TABS.map((tab) => (
        <FilterBtn
          key={tab}
          type="button"
          $active={activeFilter === tab}
          data-text={tab}
          onClick={() => onFilterChange(tab)}
        >
          {tab}
        </FilterBtn>
      ))}
      <WishCount>{count}개 상품</WishCount>
    </Toolbar>
  );
}

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  gap: 0;
  padding: 6px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary + '88' : theme.colors.cardBorder)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary + '18' : theme.colors.cardBgLight};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  opacity: 0.8;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.16s,
    color 0.16s,
    background 0.16s,
    opacity 0.16s;

  &::after {
    content: attr(data-text);
    height: 0;
    line-height: 0;
    visibility: hidden;
    overflow: hidden;
    display: block;
    font-weight: 700;
    pointer-events: none;
  }

  &:hover {
    opacity: 1;
    border-color: ${({ theme }) => theme.colors.primary + '66'};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const WishCount = styled.span`
  margin-left: auto;
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.7;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-basis: 100%;
    margin-left: 0;
  }
`;
