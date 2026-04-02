import { useState } from 'react';
import BaseModal from '../../../../components/common/BaseModal';
import AgreementContent from './AgreementContent';
import styled from '@emotion/styled';

const AgreeInput = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ theme }) => theme.spacing[1]} 0;

  span {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  input {
    appearance: none;
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid ${({ theme }) => theme.tones.blue.lineBorder};

    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:checked {
      background-color: ${({ theme }) => theme.tones.blue.color};
      border-color: ${({ theme }) => theme.tones.blue.color};
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
