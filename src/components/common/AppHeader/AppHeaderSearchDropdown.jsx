import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { searchCategories as categories, searchLinks as links } from './navConstants';

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
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[20]}`};
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => `${theme.spacing[6]} ${theme.grid.margin}`};
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
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  max-height: 340px;
  overflow-y: auto;
  padding-bottom: ${({ theme }) => theme.spacing[6]};

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.2)`};
    border-radius: 2px;
  }
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
  transition: background ${({ theme }) => theme.motion.fast};

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
  overflow: hidden;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  transition: color ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.error};
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
  transition:
    background ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.1)`};
    border-color: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.3)`};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ChipDeleteBtn = styled.span`
  display: flex;
  align-items: center;
  opacity: 0.4;
  font-size: 10px;
  margin-left: 2px;
  transition:
    opacity ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.error};
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
  transition:
    background ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

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

export default function AppHeaderSearchDropdown({
  open,
  hasQuery,
  results,
  query,
  onHistoryClick,
  onClose,
  onOpenModal,
}) {
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);

  const handleClickLink = (item) => {
    onClose();
    if (item.modal) onOpenModal(item.modal);
    else if (item.to) navigate(item.to);
  };

  return (
    <SearchDropdown $open={open}>
      <SearchDropdownInner>
        {hasQuery && <SearchLabel>검색 결과</SearchLabel>}
        <ResultsWrap $visible={hasQuery}>
          <ResultList>
            {results.length === 0 ? (
              <ResultMeta>검색 결과가 없어요.</ResultMeta>
            ) : (
              results.map((item) => (
                <ResultItem
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSearchHistory((prev) => {
                      const trimmed = query.trim();
                      if (!trimmed || prev.includes(trimmed)) return prev;
                      return [trimmed, ...prev].slice(0, 8);
                    });
                    onClose();
                    navigate(`/product/${item.id}`);
                  }}
                >
                  <ResultThumb>{item.title?.[0]}</ResultThumb>
                  <ResultInfo>
                    <ResultName>{item.title}</ResultName>
                    <ResultMeta>{item.meta}</ResultMeta>
                  </ResultInfo>
                  <ResultPrice>₩{item.price?.toLocaleString()}</ResultPrice>
                </ResultItem>
              ))
            )}
          </ResultList>
        </ResultsWrap>

        <SearchDefault $hidden={hasQuery}>
          <RecentWrap>
            <RecentHeader>
              <SearchLabelInline>최근 검색</SearchLabelInline>
              <RecentClear type="button" onClick={() => setSearchHistory([])}>
                전체 삭제
              </RecentClear>
            </RecentHeader>
            <RecentChips>
              {searchHistory.length > 0 ? (
                searchHistory.map((item) => (
                  <RecentChip key={item} type="button" onClick={() => onHistoryClick(item)}>
                    <span>⌕</span>
                    {item}
                    <ChipDeleteBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchHistory((prev) => prev.filter((r) => r !== item));
                      }}
                    >
                      ✕
                    </ChipDeleteBtn>
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
              {categories.map((cat) => (
                <ChipButton
                  key={cat.label}
                  type="button"
                  $point={cat.isDrops}
                  onClick={() => {
                    onClose();
                    navigate(cat.to);
                  }}
                >
                  {cat.label}
                </ChipButton>
              ))}
            </ChipList>
          </SearchSection>

          <SearchSection>
            <SearchLabel>추천</SearchLabel>
            <SearchLinks>
              {links.map((item) => (
                <SearchLink key={item.title} type="button" onClick={() => handleClickLink(item)}>
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
  );
}
