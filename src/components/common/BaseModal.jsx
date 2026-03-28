import { useState } from 'react';
import { createPortal } from 'react-dom';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import BaseBtn from './BaseBtn';
import StarIcon, { LavStarIcon, DelIcon } from '../../assets/icons/BtnIcon';
import usePanel from '../../hooks/usePanel';

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(.4); }
  to   { opacity: 1; transform: scale(1); }
`;

const scaleOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(.4); }
`;

const overlayIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const overlayOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.dimBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurNav};
  animation: ${({ $closing }) => ($closing ? overlayOut : overlayIn)} 0.3s ease forwards;
`;

const ModalWrap = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: ${({ $width }) => $width || '360px'};
  border-radius: ${({ theme }) => theme.radii.xxl};
  padding: ${({ theme }) => theme.spacing[8]};
  font-family: ${({ theme }) => theme.fontFamily.body};
  background: ${({ theme }) => theme.colors.modalBg};
  border: 1px solid ${({ theme }) => theme.colors.modalBorder};
  box-shadow: ${({ theme }) => theme.colors.modalShadow};
  opacity: 0;
  transform: scale(0.4);
  animation: ${({ $closing }) => ($closing ? scaleOut : scaleIn)}
    ${({ $closing }) => ($closing ? '0.25s ease' : '0.55s cubic-bezier(0.34,1.56,0.64,1)')} forwards;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: ${({ theme }) => theme.colors.dividerStrong};
  }

  > * {
    opacity: 0;
    transform: translateY(6px);
    animation: ${fadeUp} 0.4s ease forwards;
  }

  > *:nth-of-type(2) {
    animation-delay: 0.05s;
  }
  > *:nth-of-type(3) {
    animation-delay: 0.1s;
  }
`;

const CloseBtn = styled(BaseBtn)`
  && {
    background: transparent;
    box-shadow: none;
    border-color: transparent;
    color: ${({ theme }) => theme.iconBtn.wish.color};
  }
  transition:
    background ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal},
    color ${({ theme }) => theme.motion.normal};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.iconBtn.wish.hoverBg};
    border-color: ${({ theme }) => theme.iconBtn.wish.hoverBorder};
    box-shadow: 0 0 10px ${({ theme }) => theme.iconBtn.wish.hoverColor + 'cc'};
    color: ${({ theme }) => theme.iconBtn.wish.hoverColor};
  }
`;

const ModalLabel = styled.p`
  display: flex;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ModalTitle = styled.h2`
  font-size: ${({ $titleSize, theme }) => $titleSize || theme.fontSize.s};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ModalBody = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-top: ${({ theme }) => theme.spacing[5]};
  line-height: 1.65;
`;

// props: isOpen, onClose, children
// label — 타이틀 위 뱃지 텍스트 (선택)
// title — 모달 제목 (선택)
// titleSize — 제목 폰트 사이즈 (선택, 기본 theme.fontSize.s)
// width — 최대 너비 (선택, 기본 360px)
// closable — X버튼 표시 여부 (선택, 기본 true)
export default function BaseModal({ isOpen, onClose, children, ...props }) {
  const { label, title, titleSize, width, closable = true } = props;
  const [mounted, setMounted] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setMounted(true);
    setClosing(!isOpen);
  }

  const handleClose = () => {
    setClosing(true);
    onClose();
  };

  usePanel({ open: isOpen, onClose: handleClose, outsideClick: false });

  if (!mounted) return null;

  return createPortal(
    <Overlay
      $closing={closing}
      onAnimationEnd={() => {
        if (closing) setMounted(false);
      }}
    >
      <ModalWrap $closing={closing} $width={width} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <div>
            {label && (
              <ModalLabel>
                <LavStarIcon>✦</LavStarIcon>
                {label}
              </ModalLabel>
            )}
            {title && <ModalTitle $titleSize={titleSize}>{title}</ModalTitle>}
          </div>
          {closable && (
            <CloseBtn
              variant="ic-btn"
              size="28px"
              icon={false}
              flex="0"
              onClick={handleClose}
              aria-label="닫기"
            >
              <DelIcon size={14} />
            </CloseBtn>
          )}
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalWrap>
    </Overlay>,
    document.body
  );
}
