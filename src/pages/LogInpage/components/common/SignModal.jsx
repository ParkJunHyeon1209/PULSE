import React from 'react';
import BaseModal from '../../../../components/common/BaseModal';
import BaseBtn from '../../../../components/common/BaseBtn';
import styled from '@emotion/styled';

const MessageContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[5]} 0;
`;

const Message = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.s};
  white-space: pre-wrap;
  text-align: center;
`;

export default function SignModal({ isOpen, onClose, message }) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      label="PULSE PLATFORM"
      closable={true}
      width="400px"
    >
      <MessageContainer>
        <Message>{message}</Message>
      </MessageContainer>
    </BaseModal>
  );
}
