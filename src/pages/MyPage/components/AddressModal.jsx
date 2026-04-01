import React from 'react';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.dimBg};
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  z-index: 9999;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-end;
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 520px;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.modalBorder};
  background: ${({ theme }) => theme.colors.modalBg};
  box-shadow: ${({ theme }) => theme.colors.modalShadow};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.fontFamily.body};

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing[4]};
    border-radius: ${({ theme }) => theme.radii.lg};

    h2 {
      font-size: ${({ theme }) => theme.fontSize.xxs};
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.body};
`;

const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const FormInput = styled.input`
  width: 100%;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.input.lineBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.body};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.tones.violet.focusBorder};
    box-shadow: ${({ theme }) => theme.tones.violet.focusShadow};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 44px;
  border: 1px solid ${({ theme }) => theme.input.lineBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.body};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }

  &:focus {
    border-color: ${({ theme }) => theme.tones.violet.focusBorder};
    box-shadow: ${({ theme }) => theme.tones.violet.focusShadow};
  }
`;

const CheckboxRow = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  width: fit-content;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.body};
  cursor: pointer;

  input {
    margin: 0;
    flex: 0 0 auto;
  }
`;

const BasePillButton = styled.button`
  height: 31px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 500;
  font-family: ${({ theme }) => theme.fontFamily.body};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 34px;
    padding: 0 ${({ theme }) => theme.spacing[2]};
  }
`;

const ModalButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ModalSecondaryButton = styled(BasePillButton)`
  border: 1px solid ${({ theme }) => theme.btn.secondaryBorder};
  background: ${({ theme }) => theme.btn.secondaryBg};
  color: ${({ theme }) => theme.btn.secondaryColor};
  box-shadow: ${({ theme }) => theme.btn.secondaryShadow};
`;

const ModalPrimaryButton = styled(BasePillButton)`
  border: none;
  background: ${({ theme }) => theme.tones.violet.bg};
  color: ${({ theme }) => theme.colors.wColor};
  box-shadow: ${({ theme }) => theme.tones.violet.shadow};
`;

export default function AddressModal({ editingId, form, onClose, onChangeForm, onSubmit }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <h2>{editingId ? '배송지 수정' : '배송지 추가'}</h2>

        <FormGroup>
          <FieldLabel>
            받는 분
            <FormInput
              name="name"
              value={form.name}
              onChange={onChangeForm}
              placeholder="이름을 입력하세요"
            />
          </FieldLabel>

          <FieldLabel>
            연락처
            <FormInput
              name="phone"
              value={form.phone}
              onChange={onChangeForm}
              placeholder="010-0000-0000"
            />
          </FieldLabel>

          <FieldLabel>
            기본 주소
            <FormInput
              name="address1"
              value={form.address1}
              onChange={onChangeForm}
              placeholder="기본 주소를 입력하세요"
            />
          </FieldLabel>

          <FieldLabel>
            상세 주소
            <FormTextarea
              name="address2"
              value={form.address2}
              onChange={onChangeForm}
              placeholder="상세 주소를 입력하세요"
            />
          </FieldLabel>

          <CheckboxRow>
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={onChangeForm}
            />
            기본 배송지로 설정
          </CheckboxRow>
        </FormGroup>

        <ModalButtonRow>
          <ModalSecondaryButton type="button" onClick={onClose}>
            닫기
          </ModalSecondaryButton>
          <ModalPrimaryButton type="button" onClick={onSubmit}>
            {editingId ? '수정' : '저장'}
          </ModalPrimaryButton>
        </ModalButtonRow>
      </ModalCard>
    </ModalOverlay>
  );
}
