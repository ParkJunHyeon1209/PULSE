import styled from '@emotion/styled';
import useAuthStore from '../../../store/useAuthStore';
import useOrderStore from '../../../store/useOrderStore';
import { getGradeByTotalOrderPrice } from '../../../utils/myPageMap';
import BaseBtn from '../../../components/common/BaseBtn';
import MyPageEmptyState from './MyPageEmptyState';

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
    background-color: ${({ theme }) => theme.colors.cardBg};
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
    background: ${({ theme }) => theme.colors.cardBg};
    border: 2px solid ${({ theme }) => theme.colors.primary + '80'};
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.colors.cardBorder},
      0 8px 18px ${({ theme }) => theme.colors.shadow};
  }

  > p {
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.colors.cardBg};
    border: 2px solid ${({ theme }) => theme.colors.primary + '55'};
    border-radius: ${({ theme }) => theme.radii.md};
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.colors.cardBorder},
      0 8px 18px ${({ theme }) => theme.colors.shadow};
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
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  const handleCancelOrder = (orderId) => {
    const canceledOrder = orders.find((order) => order.id === orderId);
    const nextOrders = orders.filter((order) => order.id !== orderId);
    const nextTotalOrderPrice = nextOrders.reduce(
      (acc, order) => acc + (Number(order.totalPrice) || 0),
      0
    );
    const deductedPoint = Math.max(Number(canceledOrder?.earnedPoint) || 0, 0);

    removeOrder(orderId);

    if (!user) return;

    login({
      ...user,
      orders: nextOrders,
      totalOrderPrice: nextTotalOrderPrice,
      isHaveOrdered: nextOrders.length > 0,
      grade: getGradeByTotalOrderPrice(nextTotalOrderPrice),
      point: Math.max((user.point || 0) - deductedPoint, 0),
    });
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
                    <BaseBtn variant="secondary" onClick={() => handleCancelOrder(order.id)}>
                      주문 취소
                    </BaseBtn>
                  )}

                  {(order.status === '배송중' || order.status === '배송완료') && (
                    <BaseBtn variant="secondary" type="button">
                      배송 조회
                    </BaseBtn>
                  )}

                  {order.status === '배송완료' && (
                    <BaseBtn variant="secondary" type="button">
                      교환,반품
                    </BaseBtn>
                  )}
                </ShippingBtns>
              </ShippingInfo>
            </li>
          ))
        ) : (
          <MyPageEmptyState
            category="order"
            title="주문 내역이 없습니다."
            description={`아직 완료된 주문이 없습니다.\n당신의 첫 번째 PULSE를 찾아보세요.`}
            buttonLabel="SHOP NOW"
          />
        )}
      </OrderedList>
    </CategoryWrap>
  );
}
