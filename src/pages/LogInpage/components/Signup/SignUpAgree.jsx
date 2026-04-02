import { useState } from 'react';
import BaseModal from '../../../../components/common/BaseModal';
import AgreementContent from './AgreementContent';
import styled from '@emotion/styled';

const AgreeInput = styled.div`
  margin-top: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding:  ${({ theme }) => theme.spacing[2]} 0 ${({ theme }) => theme.spacing[1]} 0;

  span {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  input {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    border: 1px solid ${({ theme }) => theme.tones.blue.containerBorder};
    background: ${({ theme }) => theme.tones.blue.tabActiveBg};
    border-radius: 4px;
    transition:
      background ${({ theme }) => theme.motion.fast},
      border-color ${({ theme }) => theme.motion.fast},
      box-shadow ${({ theme }) => theme.motion.fast},
      transform ${({ theme }) => theme.motion.fast};
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: ${({ theme }) => theme.tones.blue.activeBorder};
      background: ${({ theme }) => theme.tones.blue.containerBg};
      box-shadow: 0 6px 16px
        ${({ theme }) =>
          theme.mode === 'dark' ? 'rgba(96,165,250,.12)' : 'rgba(59,130,246,.08)'};
    }

    &:focus-visible {
      outline: none;
      box-shadow:
        0 0 0 1px ${({ theme }) => theme.tones.blue.activeColor},
        0 0 0 4px
          ${({ theme }) =>
            theme.mode === 'dark' ? 'rgba(147,197,253,.16)' : 'rgba(59,130,246,.12)'};
    }

    &:checked {
      background: ${({ theme }) => theme.tones.blue.activeLine};
      border-color: ${({ theme }) => theme.tones.blue.activeColor};
      box-shadow:
        0 0 0 1px ${({ theme }) => theme.tones.blue.activeColor},
        0 0 0 3px
          ${({ theme }) =>
            theme.mode === 'dark' ? 'rgba(147,197,253,.16)' : 'rgba(59,130,246,.12)'};
    }

    &:checked::after {
      content: '✔';
      font-size: ${({ theme }) => theme.fontSize.xxxs};
      color: ${({ theme }) => theme.colors.wColor};
    }
  }
`;
const Blue = styled.span`
  color: ${({ theme }) => theme.tones.blue.color};
`;

export default function SignUpAgree({ agreement, setAgreement }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAllRequiredChecked = agreement.agreeTerms && agreement.agreePrivacy;

  const handleLabelClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <AgreeInput onClick={handleLabelClick}>
        <input type="checkbox" checked={isAllRequiredChecked} readOnly />
        <span>
          <Blue>이용약관</Blue> 및 <Blue>개인정보처리방침</Blue>에 동의합니다.
        </span>
      </AgreeInput>

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        label={`PULSE PLATFORM`}
        width="480px"
        closable={false}
        title={
          <span style={{ lineHeight: '32px', fontSize: '24px' }}>
            서비스 이용을 위해
            <br />
            약관에 동의해 주세요
          </span>
        }
      >
        <AgreementContent
          agreement={agreement}
          setAgreement={setAgreement}
          onClose={() => setIsModalOpen(false)}
        />
      </BaseModal>
    </>
  );
}
