import styled from '@emotion/styled';
import BaseModal from './BaseModal';
import { PROFILE_ICONS } from '../../assets/icons/profileIcons/profileIconsData';

export { PROFILE_ICONS } from '../../assets/icons/profileIcons/profileIconsData';

export default function ProfileIconPicker({ onSelect, onClose, activeId }) {
  return (
    <BaseModal isOpen onClose={onClose} label="PULSE MEMBER" title="아이콘 선택" width="320px" closeOnOverlay>
      <IconGrid>
        <ResetBtn
          type="button"
          $active={activeId === null}
          onClick={() => {
            onSelect(null);
            onClose();
          }}
        >
          기본
        </ResetBtn>
        {PROFILE_ICONS.map((icon) => (
          <IconBtn
            key={icon.id}
            type="button"
            $active={activeId === icon.id}
            onClick={() => {
              onSelect(icon.id);
              onClose();
            }}
          >
            <img src={icon.src} alt={`프로필 아이콘 ${icon.id}`} />
          </IconBtn>
        ))}
      </IconGrid>
    </BaseModal>
  );
}

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[3]};
  padding-top: ${({ theme }) => theme.spacing[2]};
`;

const ResetBtn = styled.button`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 2px dashed
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.cardBorder)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary + '18' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    border-color 0.18s,
    background 0.18s,
    transform 0.14s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary + '88'};
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.06);
  }
`;

const IconBtn = styled.button`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 2px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.cardBorder)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary + '18' : theme.colors.cardBg};
  box-shadow: ${({ theme, $active }) =>
    $active ? `0 0 0 3px ${theme.colors.primary}30, 0 0 14px ${theme.colors.primary}28` : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  padding: 10px;
  transition:
    border-color 0.18s,
    background 0.18s,
    transform 0.14s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary + '88'};
    background: ${({ theme }) => theme.colors.primary + '14'};
    transform: scale(1.06);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
