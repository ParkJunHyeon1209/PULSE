import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../../store/useAuthStore';
import AddressModal from './AddressModal';

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

const AddressWrap = styled.div`
  width: 100%;
`;

const AddressLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AddressCard = styled.article`
  height: 180px;
  border: 1px solid
    ${({ theme, $isDefault }) => ($isDefault ? theme.colors.primary : theme.colors.cardBorder)};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
  background: ${({ theme, $isDefault }) =>
    $isDefault
      ? `linear-gradient(180deg, rgba(${theme.colors.primaryRgb}, 0.08) 0%, rgba(255,255,255,0.02) 100%)`
      : theme.colors.cardBg};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
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
    height: 32px;
    padding: 0 ${({ theme }) => theme.spacing[3]};
    border-radius: ${({ theme }) => theme.radii.pill};
    border: 1px solid rgba(${({ theme }) => theme.colors.primaryRgb}, 0.4);
    background: rgba(${({ theme }) => theme.colors.primaryRgb}, 0.16);
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 600;
    white-space: nowrap;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[2]};

    h3 {
      font-size: ${({ theme }) => theme.fontSize.xxs};
    }

    span {
      height: 28px;
      padding: 0 ${({ theme }) => theme.spacing[2]};
    }
  }
`;

const AddressMiddle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  flex: 1;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 500;
  line-height: 1.4;
  font-family: ${({ theme }) => theme.fontFamily.body};
`;

const ActionArea = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing[3]};
  border-top: 1px solid ${({ theme }) => theme.Line};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
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
    font-weight: 500;
    color: inherit;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 100px;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

export default function Address() {
  const user = useAuthStore((state) => state.user);
  const storageKey = `pulse-addresses-${user?.id || 'guest'}`;

  const [editingId, setEditingId] = useState(null);
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setAddresses(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(addresses));
  }, [storageKey, addresses]);

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
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
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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
    setIsModalOpen(true);
  };

  const handleAddAddress = () => {
    if (!form.name || !form.phone || !form.address1 || !form.address2) return;

    setAddresses((prev) => {
      const isFirstAddress = prev.length === 0;

      if (editingId) {
        const updated = prev.map((item) => {
          if (item.id === editingId) return { ...item, ...form };
          if (form.isDefault) return { ...item, isDefault: false };
          return item;
        });

        return sortDefaultFirst(updated);
      }

      const newAddress = createAddress({
        ...form,
        isDefault: isFirstAddress ? true : form.isDefault,
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
          onClose={handleCloseModal}
          onChangeForm={handleChangeForm}
          onSubmit={handleAddAddress}
        />
      )}
    </AddressWrap>
  );
}
