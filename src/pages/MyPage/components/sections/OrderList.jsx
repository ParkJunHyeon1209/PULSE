import { useEffect } from 'react';
import styled from '@emotion/styled';
import BaseBtn from '../../../../components/common/BaseBtn';
import useAuthStore from '../../../../store/useAuthStore';
import useOrderStore from '../../../../store/useOrderStore';
import { getGradeByTotalOrderPrice } from '../../../../utils/myPageMap';
import { gradeToneMap } from '../../../../utils/myPageMap';

import MyPageEmptyState from '../shared/MyPageEmptyState';

const STATUS_MAP = {
  결제완료: 'pending',
  배송중: 'shipping',
  배송완료: 'delivered',
};

function getAutoStatus(order) {
  if (order.status === '주문취소') return '주문취소';
  const elapsed = Date.now() - new Date(order.createdAt).getTime();
  const hours = elapsed / (1000 * 60 * 60);
  if (hours >= 24) return '배송완료';
  if (hours >= 4) return '배송중';
  return '결제완료';
}

const { GOLD, VIP, SILVER } = gradeToneMap;
const statusStyles = {
  pending: { bg: GOLD.bg, color: GOLD.lightColor, border: `${GOLD.lightColor}88` },
  shipping: { bg: SILVER.bg, color: SILVER.lightColor, border: `${SILVER.lightColor}88` },
  delivered: { bg: VIP.bg, color: VIP.lightColor, border: `${VIP.lightColor}88` },
};

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${({ $variant }) => statusStyles[$variant]?.bg};
  color: ${({ $variant }) => statusStyles[$variant]?.color};
  border: 1px solid ${({ $variant }) => statusStyles[$variant]?.border};
`;

const StatusDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
  flex-shrink: 0;
`;

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
    box-shadow:
      inset 0 1px 0 ${({ theme }) => theme.colors.text + '08'},
      0 8px 24px ${({ theme }) => theme.colors.shadow};
    padding: ${({ theme }) => theme.spacing[5]};
    display: flex;
    justify-content: space-between;
    border: 1px solid ${({ theme }) => theme.colors.primary + '33'};
    border-radius: ${({ theme }) => theme.radii.lg};
    background-color: ${({ theme }) => theme.colors.cardBgLight};
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};

  > p:nth-of-type(1) {
    opacity: 0.75;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 700;
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
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-weight: 700;

  > span {
    font-family: ${({ theme }) => theme.fontFamily.mono};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ShippingBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ActionBtn = styled(BaseBtn)`
  height: 32px;
  padding: 0 14px;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`;

export default function OrderList() {
  const orders = useOrderStore((state) => state.orders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    orders.forEach((order) => {
      const auto = getAutoStatus(order);
      if (auto !== order.status) {
        updateOrderStatus(order.id, auto);
      }
    });
  }, []);

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
          orders.map((order) => {
            const variant = STATUS_MAP[order.status] || 'pending';
            return (
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
                    합계: <span>{order.totalPrice.toLocaleString()}원</span>
                  </PriceSection>
                </ItemInfo>

                <ShippingInfo>
                  <StatusBadge $variant={variant}>
                    <StatusDot />
                    {order.status}
                  </StatusBadge>

                  <ShippingBtns>
                    {(order.status === '배송중' || order.status === '배송완료') && (
                      <ActionBtn type="button" icon={false} variant="secondary">
                        배송 조회
                      </ActionBtn>
                    )}

                    {(order.status === '결제완료' || order.status === '배송중') && (
                      <ActionBtn
                        type="button"
                        icon={false}
                        variant="secondary"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        주문 취소
                      </ActionBtn>
                    )}

                    {order.status === '배송완료' && (
                      <ActionBtn type="button" icon={false} variant="secondary">
                        교환/반품
                      </ActionBtn>
                    )}
                  </ShippingBtns>
                </ShippingInfo>
              </li>
            );
          })
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
