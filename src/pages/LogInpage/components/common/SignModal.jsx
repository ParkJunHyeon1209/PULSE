import React from 'react';
import BaseModal from '../../../../components/common/BaseModal';
import BaseBtn from '../../../../components/common/BaseBtn';
import styled from '@emotion/styled';

const MessageContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[5]} 0;
`;

const Message = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
`;

export default function SignModal({ isOpen, onClose, message }) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      label="PULSE PLATFORM"
      closable={false}
      width="350px"
    >
      <MessageContainer>
        <Message>{message}</Message>
        <BaseBtn onClick={onClose} style={{ width: '100%', height: '45px' }}>
          확인
        </BaseBtn>
      </MessageContainer>
    </BaseModal>
  );
}
