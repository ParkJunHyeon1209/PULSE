import React from 'react';
import useCartStore from '../../../store/useCartStore';
import styled from '@emotion/styled';

const List = styled.ul`
  > li {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    > .content-info {
      display: flex;
      > img {
        width: ${({ theme }) => theme.spacing[24]};
      }
    }
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
        <li key={item.id}>
          <div className="content-info">
            <input type="checkbox" checked={item.checked} onChange={() => onChange(item.id)} />
            <img src={item.thumbnail} alt={item.title} />
            <div className="primary-info">
              <p>{item.category}</p>
              <h3>{item.title}</h3>
              <p>
                옵션 :{' '}
                {Object.entries(item.options).map(([key, value], index, array) => (
                  <span key={key}>
                    {typeof value === 'boolean' ? key.replace(/^is/, '') : value}
                    {index !== array.length - 1 && ' • '}
                  </span>
                ))}
              </p>
              <p>{item.price.toLocaleString()}원</p>
            </div>
          </div>
          <div className="control-item">
            <button
              onClick={() => {
                removeCart(item.id);
              }}
            >
              X
            </button>
            <div className="qty">
              <button onClick={() => decreaseQuantity(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item)}>+</button>
            </div>
          </div>
        </li>
      ))}
    </List>
  );
}
