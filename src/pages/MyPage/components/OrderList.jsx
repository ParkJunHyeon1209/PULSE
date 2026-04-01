import styled from '@emotion/styled';
import useOrderStore from '../../../store/useOrderStore';

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const OrderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};

  > li {
    padding: ${({ theme }) => theme.spacing[5]};
    display: flex;
    justify-content: space-between;
    border: 1px solid ${({ theme }) => theme.colors.primary + '33'};
    border-radius: ${({ theme }) => theme.radii.lg};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};

  > p:nth-of-type(1) {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }
`;

const ImgWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  position: relative;

  > img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radii.md};
  }

  > p {
    width: 60px;
    height: 60px;
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ theme }) => theme.radii.md};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PriceSection = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};

  > span {
    font-family: ${({ theme }) => theme.fontFamily.mono};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};

  > p {
    text-align: right;
  }
`;

const ShippingBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};

  > button {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[2]}`};
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;

export default function OrderList() {
  const orders = useOrderStore((state) => state.orders);
  const removeOrder = useOrderStore((state) => state.removeOrder);

  const handleCancelOrder = (orderId) => {
    removeOrder(orderId);
  };

  return (
    <CategoryWrap>
      <OrderedList>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order.id}>
              <ItemInfo>
                <p>{order.orderNumber}</p>

                <ImgWrap>
                  {order.items.slice(0, 2).map((item, index) => (
                    <img
                      key={`${order.id}-${item.id}-${index}`}
                      src={item.image}
                      alt={item.title || '주문 상품 이미지'}
                    />
                  ))}

                  {order.items.length - 2 > 0 ? <p>+{order.items.length - 2}</p> : null}
                </ImgWrap>

                <PriceSection>
                  합계 <span>{order.totalPrice.toLocaleString()}원</span>
                </PriceSection>
              </ItemInfo>

              <ShippingInfo>
                <p>{order.status}</p>

                <ShippingBtns>
                  {order.status === '결제완료' && (
                    <button onClick={() => handleCancelOrder(order.id)}>주문 취소</button>
                  )}

                  {(order.status === '배송중' || order.status === '배송완료') && (
                    <button type="button">배송 조회</button>
                  )}

                  {order.status === '배송완료' && <button type="button">교환,반품</button>}
                </ShippingBtns>
              </ShippingInfo>
            </li>
          ))
        ) : (
          <h2>주문 내역이 없습니다.</h2>
        )}
      </OrderedList>
    </CategoryWrap>
  );
}
