import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../../store/useAuthStore';
import AddressModal from '../modals/AddressModal';

const createAddress = (data) => ({
  id: crypto.randomUUID(),
  ...data,
});

const EMPTY_FORM = {
  name: '',
  phone: '',
  address1: '',
  address2: '',
  isDefault: false,
};

const EMPTY_ERRORS = {
  name: '',
  phone: '',
  address1: '',
  address2: '',
};

const AddressWrap = styled.div`
  width: 100%;
`;

const AddressLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AddressCard = styled.article`
  border: 1px solid
    ${({ theme, $isDefault }) => ($isDefault ? theme.colors.primary : theme.colors.cardBorder)};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 20px 22px;
  background: ${({ theme, $isDefault }) =>
    $isDefault
      ? `linear-gradient(180deg, rgba(${theme.colors.primaryRgb}, 0.08) 0%, transparent 100%)`
      : theme.colors.cardBg};

  display: flex;
  flex-direction: column;
`;

const AddressTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.body};

  h3 {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: 700;
  }

  span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 3px 10px;
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.4);
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.1);
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fontFamily.mono};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 700;
    /* letter-spacing: -0.1em; */
    text-transform: uppercase;
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[2]};

    h3 {
      font-size: ${({ theme }) => theme.fontSize.xxs};
    }
  }
`;

const AddressMiddle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  line-height: 1.6;
  font-family: ${({ theme }) => theme.fontFamily.body};
  > p + p {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    line-height: 1.5;
    font-weight: 600;
  }
  > p:nth-of-type(2) {
    margin-top: ${({ theme }) => theme.spacing[3]};
  }
`;

const ActionArea = styled.div`
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const BasePillButton = styled.button`
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-family: ${({ theme }) => theme.fontFamily.body};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 34px;
    padding: 0 ${({ theme }) => theme.spacing[2]};
  }
`;

const ActionButton = styled(BasePillButton)`
  border: 1px solid
    ${({ theme, $isDefault }) => ($isDefault ? theme.btn.secondaryBorder : theme.colors.cardBorder)};
  background: ${({ theme, $isDefault }) =>
    $isDefault ? theme.btn.secondaryBg : theme.colors.cardBg};
  color: ${({ theme, $isDefault }) =>
    $isDefault ? theme.btn.secondaryColor : theme.colors.textSecondary};
`;

const AddCardButton = styled.button`
  min-height: 120px;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px dashed rgba(${({ theme }) => theme.colors.primaryRgb}, 0.28);
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fontFamily.body};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    border-color: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.45);
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.04);
    color: ${({ theme }) => theme.colors.primary};
  }

  div {
    width: 38px;
    height: 38px;
    border-radius: ${({ theme }) => theme.radii.full};
    border: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSize.s};
    color: inherit;
  }

  span {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: inherit;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 100px;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

/* 연락처는 숫자만 남겨서 검사 */
const normalizePhone = (value) => value.replace(/[^\d]/g, '');

/* 연락처 입력 시 자동 하이픈 포맷 */
const formatPhone = (value) => {
  const numbers = normalizePhone(value).slice(0, 11);

  /* 휴대폰 번호 포맷 */
  if (numbers.startsWith('01')) {
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  }
  /* 일반 지역번호 / 회사번호 포맷 */
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  if (numbers.length <= 10)
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
};

/* 필드별 유효성 검사 */
const validateField = (name, value) => {
  switch (name) {
    case 'name': {
      const trimmed = value.trim();
      if (!trimmed) return '받는 분 이름을 입력해주세요.';
      if (trimmed.length < 2) return '이름은 2자 이상 입력해주세요.';
      if (!/^[가-힣a-zA-Z\s]+$/.test(trimmed)) {
        return '이름은 한글 또는 영문만 입력해주세요.';
      }
      return '';
    }

    case 'phone': {
      const phoneNumbers = normalizePhone(value);
      if (!phoneNumbers) return '연락처를 입력해주세요.';
      /* 휴대폰 번호 검사 */
      const mobileRegex = /^01[0-9]\d{7,8}$/;
      /* 일반 지역번호 / 회사번호 검사 */
      const localRegex = /^0[3-9][0-9]\d{7,8}$/;
      if (!mobileRegex.test(phoneNumbers) && !localRegex.test(phoneNumbers)) {
        return '올바른 연락처를 입력해주세요.';
      }
      return '';
    }

    case 'address1':
      return value.trim() ? '' : '기본 주소를 입력해주세요.';

    case 'address2':
      return value.trim() ? '' : '상세 주소를 입력해주세요.';

    default:
      return '';
  }
};

/* 저장/수정 버튼 클릭 시 전체 검사 */
const validateForm = (form) => ({
  name: validateField('name', form.name),
  phone: validateField('phone', form.phone),
  address1: validateField('address1', form.address1),
  address2: validateField('address2', form.address2),
});

export default function Address() {
  const user = useAuthStore((state) => state.user);
  const storageKey = `pulse-addresses-${user?.id || 'guest'}`;

  return <AddressContent key={storageKey} storageKey={storageKey} user={user} />;
}

function AddressContent({ storageKey, user }) {
  const login = useAuthStore((state) => state.login);

  const [editingId, setEditingId] = useState(null);
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      return JSON.parse(saved);
    }

    return Array.isArray(user?.addresses) ? user.addresses : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [isSubmitted, setIsSubmitted] = useState(false); // 저장 버튼 누른 뒤부터 실시간 재검사용

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(addresses));
  }, [storageKey, addresses]);

  useEffect(() => {
    if (!user) return;

    const defaultAddress = addresses.find((item) => item.isDefault) || null;
    const hasSameAddresses = JSON.stringify(user.addresses || []) === JSON.stringify(addresses);
    const hasSameDefaultAddress =
      JSON.stringify(user.defaultAddress || null) === JSON.stringify(defaultAddress);

    if (hasSameAddresses && hasSameDefaultAddress) {
      return;
    }

    login({
      ...user,
      addresses,
      defaultAddress,
    });
  }, [addresses, user, login]);

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors(EMPTY_ERRORS);
    setIsSubmitted(false);
  };

  const sortDefaultFirst = (list) => {
    const defaultItem = list.find((item) => item.isDefault);
    return defaultItem ? [defaultItem, ...list.filter((item) => item.id !== defaultItem.id)] : list;
  };

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleChangeForm = (e) => {
    const { name, value, type, checked } = e.target;
    let nextValue = type === 'checkbox' ? checked : value;

    if (name === 'phone') {
      nextValue = formatPhone(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    /* 저장 시도 후에는 수정하는 필드만 실시간 재검사 */
    if (isSubmitted && name !== 'isDefault') {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, nextValue),
      }));
    }
  };

  const handleEditAddress = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      phone: item.phone,
      address1: item.address1,
      address2: item.address2,
      isDefault: item.isDefault,
    });
    setErrors(EMPTY_ERRORS);
    setIsSubmitted(false);
    setIsModalOpen(true);
  };

  const handleAddAddress = () => {
    setIsSubmitted(true);

    const nextErrors = validateForm(form);
    const hasError = Object.values(nextErrors).some(Boolean);

    if (hasError) {
      setErrors(nextErrors);
      return;
    }

    const cleanedForm = {
      ...form,
      name: form.name.trim(),
      phone: formatPhone(form.phone),
      address1: form.address1.trim(),
      address2: form.address2.trim(),
    };

    setAddresses((prev) => {
      const isFirstAddress = prev.length === 0;

      if (editingId) {
        const updated = prev.map((item) => {
          if (item.id === editingId) return { ...item, ...cleanedForm };
          if (cleanedForm.isDefault) return { ...item, isDefault: false };
          return item;
        });

        return sortDefaultFirst(updated);
      }

      const newAddress = createAddress({
        ...cleanedForm,
        isDefault: isFirstAddress ? true : cleanedForm.isDefault,
      });

      const updated = newAddress.isDefault
        ? [...prev.map((item) => ({ ...item, isDefault: false })), newAddress]
        : [...prev, newAddress];

      return sortDefaultFirst(updated);
    });

    resetForm();
    setIsModalOpen(false);
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      sortDefaultFirst(
        prev.map((item) => ({
          ...item,
          isDefault: item.id === id,
        }))
      )
    );
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => {
      const updated = prev.filter((item) => item.id !== id);

      if (updated.length === 1) {
        return [{ ...updated[0], isDefault: true }];
      }

      const hasDefault = updated.some((item) => item.isDefault);

      if (!hasDefault && updated.length > 0) {
        return [{ ...updated[0], isDefault: true }, ...updated.slice(1)];
      }

      return updated;
    });
  };

  return (
    <AddressWrap>
      <AddressLayout>
        {addresses.map((item) => (
          <AddressCard key={item.id} $isDefault={item.isDefault}>
            <AddressTop>
              <h3>{item.name}</h3>
              {item.isDefault && <span>기본 배송지</span>}
            </AddressTop>

            <AddressMiddle>
              <p>{item.phone}</p>
              <p>{item.address1}</p>
              <p>{item.address2}</p>
            </AddressMiddle>

            <ActionArea>
              <ActionRow>
                <ActionButton
                  type="button"
                  $isDefault={item.isDefault}
                  onClick={() => handleEditAddress(item)}
                >
                  편집
                </ActionButton>

                {!item.isDefault && (
                  <ActionButton
                    type="button"
                    $isDefault={item.isDefault}
                    onClick={() => handleSetDefault(item.id)}
                  >
                    기본으로
                  </ActionButton>
                )}

                <ActionButton
                  type="button"
                  $isDefault={item.isDefault}
                  onClick={() => handleDeleteAddress(item.id)}
                >
                  삭제
                </ActionButton>
              </ActionRow>
            </ActionArea>
          </AddressCard>
        ))}

        <AddCardButton type="button" onClick={handleOpenModal}>
          <div>＋</div>
          <span>배송지 추가</span>
        </AddCardButton>
      </AddressLayout>

      {isModalOpen && (
        <AddressModal
          editingId={editingId}
          form={form}
          errors={errors}
          onClose={handleCloseModal}
          onChangeForm={handleChangeForm}
          onSubmit={handleAddAddress}
        />
      )}
    </AddressWrap>
  );
}
