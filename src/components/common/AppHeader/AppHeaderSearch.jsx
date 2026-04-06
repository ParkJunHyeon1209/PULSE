import { useEffect, useRef, useState } from 'react';
import useOverlayStore from '../../../store/useOverlayStore';
import styled from '@emotion/styled';
import { SearchIcon } from '../../../assets/icons/BtnIcon';
import usePanel from '../../../hooks/usePanel';
import BaseBtn from '../BaseBtn';
import AppHeaderSearchDropdown from './AppHeaderSearchDropdown';
import { searchProducts } from '../../../data/mainApi';

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
  const openModal = useOverlayStore((state) => state.openModal);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const handleClose = () => {
    closeSearch();
    setQuery('');
  };

  usePanel({ open, onClose: handleClose, focusRef: inputRef, outsideClick: false });

  const hasQuery = Boolean(query.trim());

  useEffect(() => {
    if (!hasQuery) return;
    
    const timer = setTimeout(async () => {
      try {
        const data = await searchProducts(query.trim());
        setResults(data ?? []);
      } catch {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, hasQuery]);

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

      <AppHeaderSearchDropdown
        open={open}
        hasQuery={hasQuery}
        results={results}
        query={query}
        onHistoryClick={(item) => setQuery(item)}
        onClose={handleClose}
        onOpenModal={openModal}
      />

      <SearchDim aria-hidden="true" $open={open} onClick={handleClose} />
    </>
  );
}
