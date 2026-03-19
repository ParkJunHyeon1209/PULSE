import React from 'react';
import useCartStore from '../../../store/useCartStore';
import styled from '@emotion/styled';
import { DelIcon, MinusIcon, QtyPlusIcon } from '../../../assets/icons/BtnIcon';

const List = styled.ul``;

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
      > .primary-info > p:first-of-type {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: ${({ theme }) => theme.fontSize.xxxs};
        margin-bottom: ${({ theme }) => theme.spacing[3]};
      }
      > .primary-info > p:nth-of-type(2) {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: ${({ theme }) => theme.fontSize.xxxs};
        margin-bottom: ${({ theme }) => theme.spacing[3]};
      }
      > .primary-info > p:last-of-type {
        color: ${({ theme }) => theme.colors.primary};
        font-size: ${({ theme }) => theme.fontSize.xs};
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
      background-color: ${({ theme }) => theme.tones.violet.hoverColor + '04'};
      border: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '07'};
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
  appearance: none;
  position: relative;
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.tones.violet.hoverColor + '33'};
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
              <img src={item.thumbnail} alt={item.title} />
              <div className="primary-info">
                <p>{item.category}</p>
                <h3 className="item-title">{item.title}</h3>
                {item.options ? (
                  <p>
                    옵션:{' '}
                    {Object.entries(item.options).map(([key, value], index, array) => (
                      <span key={key}>
                        {typeof value === 'boolean' ? key.replace(/^is/, '') : value}
                        {index !== array.length - 1 && ' • '}
                      </span>
                    ))}
                  </p>
                ) : null}
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
