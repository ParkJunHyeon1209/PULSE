import React from 'react';
import useCartStore from '../../../store/useCartStore';
import styled from '@emotion/styled';
import { DelIcon, MinusIcon, QtyPlusIcon } from '../../../assets/icons/BtnIcon';
import BaseBtn from '../../../components/common/BaseBtn';
import { CATEGORY_TONE } from '../../../utils/toneMap';
import useThemeStore from '../../../store/useThemeStore';
import useOverlayStore from '../../../store/useOverlayStore';
import BaseModal from '../../../components/common/BaseModal';
import { Link } from 'react-router-dom';

function AlertModal() {
  const isOpen = useOverlayStore((state) => Boolean(state.modals.alert));
  const closeModal = useOverlayStore((state) => state.closeModal);
  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE PLATFORM"
      onClose={() => closeModal('alert')}
      title="최소 1개 이상 선택해주세요."
    >
      <p>
        최소 1개 이상의 상품이 필요합니다. 상품을 <br />
        제거하려면 삭제 버튼을 이용해 주세요.
      </p>
    </BaseModal>
  );
}

export default function ListContent() {
  const cart = useCartStore((state) => state.cart);
  const removeCart = useCartStore((state) => state.removeCart);
  const onChange = useCartStore((state) => state.toggleItemChecked);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const increaseQuantity = useCartStore((state) => state.addToCart);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const handleToggleChecked = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(item);
  };

  const handleRemoveCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    removeCart(item);
  };

  const handleDecreaseQuantity = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQuantity(item);
  };

  const handleIncreaseQuantity = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    increaseQuantity(item);
  };

  return (
    <List isDarkMode={isDarkMode}>
      {cart.map((item) => (
        <ListItem
          key={`${item.id}${item.optionSummary ? `-${item.optionSummary}` : ''}${item.isCareChecked ? '-care' : ''}`}
          $isSelected={item.checked}
        >
          <ContentInfo to={`/product/${item.id}`}>
            <GradientCheckbox
              type="checkbox"
              checked={item.checked}
              onClick={(e) => handleToggleChecked(e, item)}
              onChange={(e) => handleToggleChecked(e, item)}
            />
            <img src={item.image} alt={item.title} />
            <div className="primary-info">
              <div className="top-row">
                <CategoryBadge
                  variant="badge"
                  tone={CATEGORY_TONE[item.category] ?? 'col'}
                  icon={false}
                  height="auto"
                  flex="0 0 auto"
                  padding="6px 12px"
                >
                  {item.type}
                </CategoryBadge>
                {/* <button className="del-btn" onClick={() => removeCart(item.id)}>
                  <DelIcon />
                </button> */}

                <CloseBtn
                  variant="ic-btn"
                  onClick={(e) => handleRemoveCart(e, item)}
                  icon={false}
                  flex="0"
                  size="28px"
                  aria-label="닫기"
                >
                  <DelIcon size={14} />
                </CloseBtn>
              </div>
              <div className="title-group">
                <h3 className="item-title">{item.title}</h3>
                {item.optionSummary ? (
                  <p>
                    {item.optionSummary}
                    {item.isCareChecked ? ` / +${item.careTitle}` : null}
                  </p>
                ) : (
                  <p>{item.meta}</p>
                )}
              </div>
              <div className="bottom-row">
                <p>{(item.price * item.quantity).toLocaleString()}원</p>
                <div className="qty">
                  <button onClick={(e) => handleDecreaseQuantity(e, item)}>
                    <MinusIcon />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={(e) => handleIncreaseQuantity(e, item)}>
                    <QtyPlusIcon />
                  </button>
                </div>
              </div>
            </div>
          </ContentInfo>
        </ListItem>
      ))}
      <AlertModal />
    </List>
  );
}

const List = styled.ul`
  background-color: ${({ isDarkMode }) => (isDarkMode ? null : '#ffffff30')};
`;

const ListItem = styled.li`
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
  display: flex;
  position: relative;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.colors.primary + '09' : 'inherit'};
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.checkbox.border + '35'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: ${(props) => (props.$isSelected ? '1' : '0')};
  }
`;

const ContentInfo = styled(Link)`
  flex: 1;
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
  transition: gap 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[3]};
  }

  > img {
    width: ${({ theme }) => theme.spacing[24]};
    height: 120px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radii.sm};
    flex-shrink: 0;
    transition:
      width 0.3s ease,
      height 0.3s ease,
      margin-right 0.3s ease;

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      width: 64px;
      height: 80px;
      margin-right: ${({ theme }) => theme.spacing[1]};
    }
  }

  > .primary-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
    min-width: 0;
  }

  > .primary-info > .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  > .primary-info > .title-group {
    > .item-title {
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-weight: bold;
      margin-bottom: ${({ theme }) => theme.spacing[1]};
      transition: font-size 0.3s ease;

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        font-size: ${({ theme }) => theme.fontSize.xxs};
      }
    }

    > p {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: ${({ theme }) => theme.fontSize.xxxs};
      font-weight: 700;
    }
  }

  > .primary-info > .bottom-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;

    > p {
      color: ${({ theme }) => theme.colors.primary};
      font-size: ${({ theme }) => theme.fontSize.xs};
      font-family: ${({ theme }) => theme.fontFamily.mono};
      font-weight: 600;
    }

    > .qty {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing[2]};
      font-size: ${({ theme }) => theme.fontSize.xxs};
      transition: gap 0.3s ease;
      background-color: ${({ theme }) => theme.colors.cardBg};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.radii.pill};
      overflow: hidden;

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        gap: ${({ theme }) => theme.spacing[1]};
      }

      > button {
        height: 36px;
        display: flex;
        align-items: center;
        padding: ${({ theme }) => theme.spacing[2]};
        transition:
          background 0.2s ease,
          transform 0.15s ease,
          height 0.3s ease,
          padding 0.3s ease;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
          height: 28px;
          padding: ${({ theme }) => theme.spacing[1]};
        }

        > svg {
          color: ${({ theme }) => theme.colors.textSecondary};
          transition:
            color 0.2s ease,
            transform 0.15s ease;
        }
      }

      > button:first-of-type {
        border-radius: ${({ theme }) => theme.radii.pill} 0 0 ${({ theme }) => theme.radii.pill};
        padding-left: ${({ theme }) => theme.spacing[3]};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
          padding-left: ${({ theme }) => theme.spacing[2]};
        }
      }

      > button:last-of-type {
        border-radius: 0 ${({ theme }) => theme.radii.pill} ${({ theme }) => theme.radii.pill} 0;
        padding-right: ${({ theme }) => theme.spacing[3]};

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
          padding-right: ${({ theme }) => theme.spacing[2]};
        }
      }

      > button:hover {
        background: ${({ theme }) => theme.colors.primary + '15'};

        > svg {
          color: ${({ theme }) => theme.colors.primary};
        }
      }

      > button:active > svg {
        transform: scale(0.88);
      }

      > span {
        min-width: 18px;
        text-align: center;
        font-weight: bold;
        font-variant-numeric: tabular-nums;
        transition: font-size 0.3s ease;

        @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
          font-size: ${({ theme }) => theme.fontSize.xxxs};
        }
      }
    }
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
    transform: none;
    background: ${({ theme }) => theme.iconBtn.wish.hoverBg};
    border-color: ${({ theme }) => theme.iconBtn.wish.hoverBorder};
    box-shadow: 0 0 10px ${({ theme }) => theme.iconBtn.wish.hoverColor + 'cc'};
    color: ${({ theme }) => theme.iconBtn.wish.hoverColor};
  }
  &:active:not(:disabled) {
    transform: scale(0.93);
  }
`;
const CategoryBadge = styled(BaseBtn)`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 10px;
  }
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
  background: ${({ theme }) => theme.colors.primary}18;

  &:checked {
    background: ${({ theme }) => theme.gradients.navActive};
    box-shadow:
      0 0 0 1px #7c3aed,
      0 0 0 4px #7c3aed30;
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
    color: white;
  }
`;
