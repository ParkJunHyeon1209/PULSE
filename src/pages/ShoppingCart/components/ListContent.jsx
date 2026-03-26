import React from 'react';
import useCartStore from '../../../store/useCartStore';
import styled from '@emotion/styled';
import { DelIcon, MinusIcon, QtyPlusIcon } from '../../../assets/icons/BtnIcon';

const List = styled.ul``;

// const CategoryBadge = styled.p`
//   background-color: ${({ $category, theme }) => {
//     switch ($category) {
//       case 'HEADSET':
//         return theme.status.info;
//       case 'GEAR':
//         return theme.status.limited;
//       case 'CONSOLE':
//         return theme.status.goldSoft;
//       case 'DROPS':
//         return theme.colors.primary;
//       default:
//         return theme.colors.border;
//     }
//   }};
// `;

const ListItem = styled.li`
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  display: flex;
  justify-content: space-between;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.colors.primary + '09' : 'inherit'};
  border-left: ${(props) =>
    props.$isSelected ? `2px solid ${props.theme.colors.primary}` : 'none'};
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  > .content-info {
    display: flex;
    gap: ${({ theme }) => theme.spacing[6]};
    align-items: center;
    > .main-content {
      display: flex;
      gap: ${({ theme }) => theme.spacing[5]};
      > img {
        width: ${({ theme }) => theme.spacing[24]};
      }
      > .primary-info > p.category-badge {
        width: 70%;
        padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
        text-align: center;
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: ${({ theme }) => theme.fontSize.xxxs};
        margin-bottom: ${({ theme }) => theme.spacing[3]};
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.radii.pill};
      }
      > .primary-info > p:nth-of-type(2) {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: ${({ theme }) => theme.fontSize.xxxs};
        margin-bottom: ${({ theme }) => theme.spacing[3]};
      }
      > .primary-info > p:last-of-type {
        color: ${({ theme }) => theme.colors.primary};
        font-size: ${({ theme }) => theme.fontSize.xs};
        font-family: ${({ theme }) => theme.fontFamily.mono};
        font-weight: 600;
      }
      .item-title {
        font-size: ${({ theme }) => theme.fontSize.xs};
        font-weight: bold;
        margin-bottom: ${({ theme }) => theme.spacing[1]};
      }
    }
  }
  .control-item {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > button {
      width: ${({ theme }) => theme.spacing[8]};
      height: ${({ theme }) => theme.spacing[8]};
      border-radius: ${({ theme }) => theme.radii.full};
      padding: ${({ theme }) => theme.spacing[2]};
      align-self: flex-end;
      > svg {
        color: ${({ theme }) => theme.colors.textSecondary};
      }
    }
    > button:hover {
      background-color: ${({ theme }) => theme.colors.accent + '1a'};
      color: ${({ theme }) => theme.colors.accent};
    }
    > button:hover > svg {
      color: ${({ theme }) => theme.colors.accent};
    }
    > .qty {
      padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
      display: flex;
      gap: ${({ theme }) => theme.spacing[5]};
      background-color: ${({ theme }) => theme.colors.cardBg};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: ${({ theme }) => theme.radii.pill};
      > button {
        padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
        > svg {
          color: ${({ theme }) => theme.colors.textSecondary};
        }
      }
      > button:hover > svg {
        color: ${({ theme }) => theme.colors.primary};
      }
      > span {
        min-width: 20px;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
    }
  }
`;

const GradientCheckbox = styled.input`
  flex-shrink: 0;
  appearance: none;
  position: relative;
  width: clamp(12px, 1.5vw, 18px);
  height: clamp(12px, 1.5vw, 18px);
  border: 1px solid ${({ theme }) => theme.checkbox.border};
  border-radius: 4px;
  cursor: pointer;

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

export default function ListContent() {
  const cart = useCartStore((state) => state.cart);
  const removeCart = useCartStore((state) => state.removeCart);
  const onChange = useCartStore((state) => state.onChange);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const increaseQuantity = useCartStore((state) => state.addToCart);

  return (
    <List>
      {cart.map((item) => (
        <ListItem key={item.id} $isSelected={item.checked}>
          <div className="content-info">
            <GradientCheckbox
              type="checkbox"
              checked={item.checked}
              onChange={() => onChange(item.id)}
            />
            <div className="main-content">
              <img src={item.image} alt={item.title} />
              <div className="primary-info">
                <p className="category-badge">{item.type}</p>
                <h3 className="item-title">{item.title}</h3>
                {item.meta ? <p>{item.meta}</p> : <span />}
                <p>{(item.price * item.quantity).toLocaleString()}원</p>
              </div>
            </div>
          </div>
          <div className="control-item">
            <button
              onClick={() => {
                removeCart(item.id);
              }}
            >
              <DelIcon />
            </button>
            <div className="qty">
              <button onClick={() => decreaseQuantity(item)}>
                <MinusIcon />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item)}>
                <QtyPlusIcon />
              </button>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
