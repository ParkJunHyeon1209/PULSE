import styled from '@emotion/styled';
import BaseModal from '../../../../components/common/BaseModal';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
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
  height: 42px;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.input.state.errorBorder : theme.input.lineBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text + 'cc'};
  padding: 0 ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  font-family: ${({ theme }) => theme.fontFamily.body};
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }

  &:hover:not(:focus) {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.input.state.errorBorder : theme.tones.violet.focusBorder + '80'};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.tones.violet.focusBorder};
    box-shadow: ${({ theme, $hasError }) =>
      $hasError
        ? `0 0 0 3px ${theme.colors.error}14`
        : `${theme.tones.violet.focusShadow}, 0 0 0 3px ${theme.colors.primary}30, inset 0 2px 8px rgba(0,0,0,0.12)`};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 44px;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.input.state.errorBorder : theme.input.lineBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text + 'cc'};
  padding: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.body};
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }

  &:hover:not(:focus) {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.input.state.errorBorder : theme.tones.violet.focusBorder + '80'};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.error : theme.tones.violet.focusBorder};
    box-shadow: ${({ theme, $hasError }) =>
      $hasError
        ? `0 0 0 3px ${theme.colors.error}14`
        : `${theme.tones.violet.focusShadow}, 0 0 0 3px ${theme.colors.primary}30, inset 0 2px 8px rgba(0,0,0,0.12)`};
  }
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 600;
  line-height: 1.4;
`;

const CheckboxRow = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  align-self: flex-start;
  width: fit-content;
  margin-left: ${({ theme }) => theme.spacing[1]};
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.body};
  cursor: pointer;
`;

const GradientCheckbox = styled.input`
  flex-shrink: 0;
  appearance: none;
  position: relative;
  width: 16px;
  height: 16px;
  border: 1px solid ${({ theme }) => theme.checkbox.border};
  border-radius: 4px;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primary + '18'};
  transition:
    border-color 0.18s,
    background 0.18s,
    box-shadow 0.18s;

  &:hover:not(:checked) {
    border-color: ${({ theme }) => theme.colors.primary + '88'};
    background: ${({ theme }) => theme.colors.primary + '28'};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary + '18'};
  }

  &:checked {
    background: ${({ theme }) => theme.gradients.navActive};
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.colors.primary},
      0 0 0 4px ${({ theme }) => theme.colors.primary + '30'};
    border: none;
  }

  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -58%);
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.wColor};
  }
`;

const BasePillButton = styled.button`
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 500;
  font-family: ${({ theme }) => theme.fontFamily.body};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 34px;
    padding: 0 ${({ theme }) => theme.spacing[2]};
  }
`;

const ModalButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ModalSecondaryButton = styled(BasePillButton)`
  border: 1px solid ${({ theme }) => theme.btn.secondaryBorder};
  background: ${({ theme }) => theme.btn.secondaryBg};
  color: ${({ theme }) => theme.btn.secondaryColor};
  box-shadow: ${({ theme }) => theme.btn.secondaryShadow};
  cursor: pointer;
  transition:
    border-color 0.18s,
    background 0.18s,
    box-shadow 0.18s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary + '66'};
    background: ${({ theme }) => theme.colors.primary + '10'};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const ModalPrimaryButton = styled(BasePillButton)`
  border: none;
  background: ${({ theme }) => theme.tones.violet.bg};
  color: ${({ theme }) => theme.colors.wColor};
  box-shadow: ${({ theme }) => theme.tones.violet.shadow};
  cursor: pointer;
  transition:
    filter 0.18s,
    box-shadow 0.18s,
    transform 0.12s;

  &:hover {
    filter: brightness(1.12);
    box-shadow: ${({ theme }) => theme.tones.violet.shadow},
      0 0 0 3px ${({ theme }) => theme.colors.primary + '30'};
  }

  &:active {
    transform: translateY(1px);
    filter: brightness(0.96);
  }
`;

export default function AddressModal({ editingId, form, errors, onClose, onChangeForm, onSubmit }) {
  return (
    <BaseModal
      isOpen
      onClose={onClose}
      title={editingId ? '배송지 수정' : '배송지 추가'}
      width="520px"
      closable={false}
    >
      <FormGroup>
        <FieldLabel>
          받는 분
          <FormInput
            name="name"
            value={form.name}
            onChange={onChangeForm}
            placeholder="이름을 입력하세요"
            $hasError={Boolean(errors.name)}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </FieldLabel>

        <FieldLabel>
          연락처
          <FormInput
            name="phone"
            value={form.phone}
            onChange={onChangeForm}
            placeholder="010-0000-0000"
            $hasError={Boolean(errors.phone)}
          />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
        </FieldLabel>

        <FieldLabel>
          기본 주소
          <FormInput
            name="address1"
            value={form.address1}
            onChange={onChangeForm}
            placeholder="기본 주소를 입력하세요"
            $hasError={Boolean(errors.address1)}
          />
          {errors.address1 && <ErrorText>{errors.address1}</ErrorText>}
        </FieldLabel>

        <FieldLabel>
          상세 주소
          <FormTextarea
            name="address2"
            value={form.address2}
            onChange={onChangeForm}
            placeholder="상세 주소를 입력하세요"
            $hasError={Boolean(errors.address2)}
          />
          {errors.address2 && <ErrorText>{errors.address2}</ErrorText>}
        </FieldLabel>

        <CheckboxRow>
          <GradientCheckbox
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
    </BaseModal>
  );
}
