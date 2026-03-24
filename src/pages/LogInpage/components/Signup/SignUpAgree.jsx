import styled from '@emotion/styled';
import React from 'react';

// 동의란 임시로 작성, 수정 예정

const AgreementLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: #777;
  cursor: pointer;
`;

export default function SignUpAgree({ agreement, setAgreement, handleAllAgree }) {
  return (
    <div>
      <AgreementLabel>
        <input
          type="checkbox"
          onChange={handleAllAgree}
          checked={agreement.agreeTerms && agreement.agreePrivacy && agreement.agreeMarketing}
        />
        전체 동의하기
      </AgreementLabel>
      <AgreementLabel>
        <input
          type="checkbox"
          checked={agreement.agreeTerms}
          onChange={(e) => setAgreement({ ...agreement, agreeTerms: e.target.checked })}
        />
        이용약관에 동의합니다. (필수)
      </AgreementLabel>
      <AgreementLabel>
        <input
          type="checkbox"
          checked={agreement.agreePrivacy}
          onChange={(e) => setAgreement({ ...agreement, agreePrivacy: e.target.checked })}
        />
        개인정보처리방침에 동의합니다. (필수)
      </AgreementLabel>
      <AgreementLabel>
        <input
          type="checkbox"
          checked={agreement.agreeMarketing}
          onChange={(e) => setAgreement({ ...agreement, agreeMarketing: e.target.checked })}
        />
        마케팅 정보 수신에 동의합니다. (선택)
      </AgreementLabel>
    </div>
  );
}
