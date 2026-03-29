import { useMemo, useRef, useState } from 'react';
import useOverlayStore from '../../store/useOverlayStore';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { SearchIcon } from '../../assets/icons/BtnIcon';
import usePanel from '../../hooks/usePanel';
import BaseBtn from './BaseBtn';

const categories = ['HEADSET', 'KEYBOARD', 'MOUSE', 'MIC', 'DROPS'];

const links = [
  { title: '신제품 보기', sub: '2026 S/S 컬렉션', to: '/categories/' },
  { title: 'DROPS 한정 발매', sub: '이번 주 수량 12개', to: '/categories/drops' },
  {
    title: '브랜드 스토리',
    sub: 'SIGNAL / GEAR / PLAY', // 모달 띄우기
  },
];

const dummySearch = [
  { name: 'PULSE AURA X', meta: 'Wireless Headset', price: '₩219,000' },
  { name: 'DROP SIGNAL', meta: 'Limited Edition', price: 'LIVE' },
  { name: 'BLUE GRID 75', meta: 'Mechanical Keyboard', price: '₩169,000' },
];

const initialSearch = ['HEADSET', 'DROPS', 'KEYBOARD'];

const SearchButton = styled(BaseBtn)`
  background: ${({ $open, theme }) =>
    $open ? `rgba(${theme.colors.primaryRgb},.12)` : 'transparent'};
  border-color: ${({ $open, theme }) =>
    $open ? `rgba(${theme.colors.primaryRgb},.35)` : 'transparent'};
`;

const SearchPanel = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  z-index: 99;
  height: ${({ $open }) => ($open ? '80px' : '0')};
  overflow: hidden;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  background: ${({ theme }) => theme.colors.navBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: opacity 0.24s ease;
`;

const SearchInner = styled.div`
  max-width: ${({ theme }) => theme.grid.max};
  height: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[20]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.grid.margin};
  }
`;

const SearchIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) =>
    theme.mode === 'light'
      ? `rgba(${theme.colors.primaryRgb},.07)`
      : `rgba(${theme.colors.primaryRgb},.1)`};
  border: 1px solid ${({ theme }) => `rgba(${theme.colors.primaryRgb},.2)`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 400;
  letter-spacing: -0.01em;
  padding: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SearchKbd = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  flex-shrink: 0;

  span {
    padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[2]}`};
    border-radius: ${({ theme }) => theme.radii.sm};
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) =>
      theme.mode === 'light' ? `rgba(${theme.colors.primaryRgb},.04)` : 'rgba(255,255,255,.03)'};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-family: ${({ theme }) => theme.fontFamily.mono};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    letter-spacing: 0.08em;
  }
`;

const SearchCancel = styled.button`
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[1]}`};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    opacity: 0.65;
  }
`;

const SearchDropdown = styled.div`
  position: fixed;
  top: 180px;
  left: 0;
  right: 0;
  z-index: 98;
  height: ${({ $open }) => ($open ? '420px' : '0')};
  overflow: hidden;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    height 0.34s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.24s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: ${({ $open }) => ($open ? 'auto' : '0')};
  }
`;

const SearchDropdownInner = styled.div`
  max-width: ${({ theme }) => theme.grid.max};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[20]} ${theme.spacing[6]}`};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => `${theme.spacing[6]} ${theme.grid.margin} ${theme.spacing[6]}`};
  }
`;

const SearchLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.2em;
  font-weight: 700;
  text-transform: uppercase;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
`;

const SearchLabelInline = styled(SearchLabel)`
  margin-bottom: 0;
  flex: 1;
`;

const ResultsWrap = styled.div`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ResultItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[2]} 10px`};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-align: left;

  &:hover {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.08)`};
  }
`;

const ResultThumb = styled.span`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.12)`};
  border: 1px solid ${({ theme }) => `rgba(${theme.colors.primaryRgb},.18)`};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ResultInfo = styled.span`
  flex: 1;
  min-width: 0;
`;

const ResultName = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
`;

const ResultMeta = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.05em;
`;

const ResultPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 600;
`;

const SearchDefault = styled.div`
  display: ${({ $hidden }) => ($hidden ? 'none' : 'grid')};
  grid-template-columns: 1fr 1fr;
  gap: 0 ${({ theme }) => theme.spacing[16]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const RecentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  grid-column: 1 / -1;
  padding-bottom: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const RecentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  justify-content: space-between;
`;

const RecentClear = styled.button`
  margin-left: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.1em;

  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RecentChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const RecentChip = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) =>
    theme.mode === 'light' ? `rgba(${theme.colors.primaryRgb},.04)` : 'rgba(255,255,255,.04)'};
  border: 1px solid
    ${({ theme }) =>
      theme.mode === 'light' ? `rgba(${theme.colors.primaryRgb},.1)` : 'rgba(255,255,255,.08)'};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};

  &:hover {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.1)`};
    border-color: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.3)`};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ChipList = RecentChips;

const ChipButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} 14px`};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ $point, theme }) =>
    `rgba(${$point ? theme.colors.accentRgb : theme.colors.primaryRgb},.08)`};
  border: 1px solid
    ${({ $point, theme }) =>
      `rgba(${$point ? theme.colors.accentRgb : theme.colors.primaryRgb},${$point ? '.22' : '.16'})`};
  color: ${({ $point, theme }) => ($point ? theme.colors.accent : theme.colors.text)};
  font-weight: 500;

  &:hover {
    background: ${({ $point, theme }) =>
      `rgba(${$point ? theme.colors.accentRgb : theme.colors.primaryRgb},.16)`};
    border-color: ${({ $point, theme }) =>
      `rgba(${$point ? theme.colors.accentRgb : theme.colors.primaryRgb},${$point ? '.45' : '.4'})`};
    transform: translateY(-1px);
  }
`;

const SearchLinks = ResultList;

const SearchLink = ResultItem;

const SearchLinkIcon = styled(ResultThumb)`
  background: ${({ $point, theme }) =>
    `rgba(${$point ? theme.colors.accentRgb : theme.colors.primaryRgb},.1)`};
  border: 1px solid
    ${({ $point, theme }) =>
      `rgba(${$point ? theme.colors.accentRgb : theme.colors.primaryRgb},${$point ? '.18' : '.15'})`};
  color: ${({ $point, theme }) => ($point ? theme.colors.accent : theme.colors.primary)};
`;

const SearchLinkContent = ResultInfo;
const SearchLinkSub = ResultMeta;

const SearchLinkArrow = styled.span`
  opacity: 0.4;
`;

const SearchDim = styled.div`
  position: fixed;
  inset: 0;
  top: 100px;
  z-index: 97;
  background: ${({ theme }) => theme.colors.dimBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.32s ease;
`;

export default function AppHeaderSearch() {
  const open = useOverlayStore((state) => state.searchOpen);
  const openSearch = useOverlayStore((state) => state.openSearch);
  const closeSearch = useOverlayStore((state) => state.closeSearch);
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState(initialSearch);
  const inputRef = useRef(null);
  const handleClose = () => {
    closeSearch();
    setQuery('');
  };

  usePanel({ open, onClose: handleClose, focusRef: inputRef, outsideClick: false });

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return dummySearch.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const hasQuery = Boolean(query.trim());

  return (
    <>
      <SearchButton
        variant="ic-btn"
        size="42px"
        aria-label="검색"
        $open={open}
        onClick={open ? handleClose : openSearch}
      >
        <SearchIcon />
      </SearchButton>

      {createPortal(
        <>
          <SearchPanel $open={open}>
            <SearchInner>
              <SearchIconWrap>
                <SearchIcon />
              </SearchIconWrap>
              <SearchInput
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어를 입력해 주세요..."
              />
              <SearchKbd>
                <span>ESC</span>
              </SearchKbd>
              <SearchCancel type="button" onClick={handleClose}>
                취소
              </SearchCancel>
            </SearchInner>
          </SearchPanel>

          <SearchDropdown $open={open}>
            <SearchDropdownInner>
              <ResultsWrap $visible={hasQuery}>
                <SearchLabel>검색 결과</SearchLabel>
                <ResultList>
                  {results.map((item) => (
                    <ResultItem key={item.name} type="button">
                      <ResultThumb>{item.name[0]}</ResultThumb>
                      <ResultInfo>
                        <ResultName>{item.name}</ResultName>
                        <ResultMeta>{item.meta}</ResultMeta>
                      </ResultInfo>
                      <ResultPrice>{item.price}</ResultPrice>
                    </ResultItem>
                  ))}
                </ResultList>
              </ResultsWrap>

              <SearchDefault $hidden={hasQuery}>
                <RecentWrap>
                  <RecentHeader>
                    <SearchLabelInline>최근 검색</SearchLabelInline>
                    <RecentClear type="button" onClick={() => setRecent([])}>
                      전체 삭제
                    </RecentClear>
                  </RecentHeader>
                  <RecentChips>
                    {recent.length > 0 ? (
                      recent.map((item) => (
                        <RecentChip key={item} type="button" onClick={() => setQuery(item)}>
                          <span>⌕</span>
                          {item}
                        </RecentChip>
                      ))
                    ) : (
                      <ResultMeta>최근 검색 기록이 없어요.</ResultMeta>
                    )}
                  </RecentChips>
                </RecentWrap>

                <SearchSection>
                  <SearchLabel>카테고리</SearchLabel>
                  <ChipList>
                    {categories.map((chip) => (
                      <ChipButton key={chip} type="button" $point={chip === 'DROPS'}>
                        {chip}
                      </ChipButton>
                    ))}
                  </ChipList>
                </SearchSection>

                <SearchSection>
                  <SearchLabel>추천</SearchLabel>
                  <SearchLinks>
                    {links.map((item) => (
                      <SearchLink key={item.title} type="button">
                        <SearchLinkIcon $point={item.title.includes('DROPS')}>
                          {item.title[0]}
                        </SearchLinkIcon>
                        <SearchLinkContent>
                          <ResultName>{item.title}</ResultName>
                          <SearchLinkSub>{item.sub}</SearchLinkSub>
                        </SearchLinkContent>
                        <SearchLinkArrow>→</SearchLinkArrow>
                      </SearchLink>
                    ))}
                  </SearchLinks>
                </SearchSection>
              </SearchDefault>
            </SearchDropdownInner>
          </SearchDropdown>

          <SearchDim aria-hidden="true" $open={open} onClick={handleClose} />
        </>,
        document.getElementById('nav-root')
      )}
    </>
  );
}
