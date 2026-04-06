import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import BaseBtn from '../../../../components/common/BaseBtn';
import BaseModal from '../../../../components/common/BaseModal';
import useAuthStore from '../../../../store/useAuthStore';
import useOrderStore from '../../../../store/useOrderStore';
import useOverlayStore from '../../../../store/useOverlayStore';
import { getGradeByTotalOrderPrice, gradeToneMap } from '../../../../utils/myPageMap';
import MyPageEmptyState from '../shared/MyPageEmptyState';

const STATUS_MAP = {
  결제완료: 'pending',
  배송중: 'shipping',
  배송완료: 'delivered',
};

const { GOLD, VIP, SILVER } = gradeToneMap;
const statusStyles = {
  pending: { bg: GOLD.bg, color: GOLD.lightColor, border: `${GOLD.lightColor}88` },
  shipping: { bg: SILVER.bg, color: SILVER.lightColor, border: `${SILVER.lightColor}88` },
  delivered: { bg: VIP.bg, color: VIP.lightColor, border: `${VIP.lightColor}88` },
};

function getAutoStatus(order) {
  if (order.status === '주문취소') return '주문취소';
  const elapsed = Date.now() - new Date(order.createdAt).getTime();
  const hours = elapsed / (1000 * 60 * 60);
  if (hours >= 24) return '배송완료';
  if (hours >= 4) return '배송중';
  return '결제완료';
}

const formatOrderDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const addHours = (baseDate, hours) => {
  return new Date(baseDate.getTime() + hours * 60 * 60 * 1000);
};

const getTrackingStatusLabel = (status) => {
  if (status === '배송완료') return '배송 완료';
  if (status === '배송중') return '배송중';
  return '상품 준비중';
};

const getTrackingSteps = (createdAt, status) => {
  const orderedAt = new Date(createdAt);

  if (Number.isNaN(orderedAt.getTime())) {
    return [];
  }

  if (status === '배송완료') {
    const deliveredAt = addHours(orderedAt, 42);

    return [
      {
        title: '배송 완료',
        description: '상품이 안전하게 배송 완료되었습니다.',
        timeLabel: formatOrderDate(deliveredAt.toISOString()),
        active: true,
      },
    ];
  }

  if (status === '배송중') {
    const steps = [
      {
        title: '주문 접수',
        description: '결제가 확인되어 주문이 정상 접수되었습니다.',
        time: orderedAt,
      },
      {
        title: '상품 준비중',
        description: '상품 검수 및 포장 준비가 진행되고 있습니다.',
        time: addHours(orderedAt, 4),
      },
      {
        title: '배송중',
        description: '배송 기사님이 고객님 주소지로 이동 중입니다.',
        time: addHours(orderedAt, 18),
      },
    ];

    return steps.map((step) => ({
      ...step,
      active: true,
      timeLabel: formatOrderDate(step.time.toISOString()),
    }));
  }

  const steps = [
    {
      title: '주문 접수',
      description: '결제가 확인되어 주문이 정상 접수되었습니다.',
      time: orderedAt,
    },
    {
      title: '상품 준비중',
      description: '상품 검수 및 포장 준비가 진행되고 있습니다.',
      time: addHours(orderedAt, 4),
    },
  ];

  return steps.map((step) => ({
    ...step,
    active: true,
    timeLabel: formatOrderDate(step.time.toISOString()),
  }));
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
    gap: ${({ theme }) => theme.spacing[4]};
    border: 1px solid ${({ theme }) => theme.colors.primary + '33'};
    border-radius: ${({ theme }) => theme.radii.lg};
    background-color: ${({ theme }) => theme.colors.cardBgLight};
    cursor: pointer;
    transition:
      transform ${({ theme }) => theme.motion.fast},
      border-color ${({ theme }) => theme.motion.fast},
      box-shadow ${({ theme }) => theme.motion.fast};

    &:hover {
      transform: translateY(-2px);
      border-color: ${({ theme }) => theme.colors.primary + '55'};
      box-shadow:
        inset 0 1px 0 ${({ theme }) => theme.colors.text + '08'},
        0 16px 30px ${({ theme }) => theme.colors.shadow};
    }
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
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const ActionBtn = styled(BaseBtn)`
  height: 32px;
  padding: 0 14px;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`;

const DetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[4]};
    padding-inline: ${({ theme }) => theme.spacing[3]};
  }
`;

const DetailMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const DetailMetaCard = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBg};

  > p:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  > p:last-of-type {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
  }
`;

const DetailItems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  max-height: min(360px, 42vh);
  overflow-y: auto;
  padding: 0;
  scrollbar-gutter: stable;
  padding-inline: ${({ theme }) => theme.spacing[2]};
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.2)`};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-height: min(320px, 40vh);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[4]};
    max-height: min(300px, 42vh);
  }
`;

const DetailItem = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBg};

  > img {
    width: 88px;
    height: 112px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.radii.md};
    flex-shrink: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: ${({ theme }) => theme.spacing[3]};

    > img {
      width: 72px;
      height: 92px;
    }
  }
`;

const DetailItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};

  > p:first-of-type {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 700;
  }

  > h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  > p,
  > ul > li {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    line-height: 1.5;
  }

  > strong {
    margin-top: auto;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fontFamily.mono};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const DetailSummary = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.primary + '22'};
  background: ${({ theme }) => theme.colors.cardBgLight};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};

  > p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  > p span:last-of-type {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fontFamily.mono};
    font-weight: 700;
  }

  > p:last-of-type {
    padding-top: ${({ theme }) => theme.spacing[3]};
    border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.xxs};
    font-weight: 700;
  }

  > p:last-of-type span:last-of-type {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const TrackingLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  /* padding-inline: ${({ theme }) => theme.spacing[2]}; */

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-inline: ${({ theme }) => theme.spacing[3]};
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const TrackingHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.primary + '22'};
  background: ${({ theme }) => theme.colors.cardBgLight};

  > p:first-of-type {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  > h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  > p:last-of-type {
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fontFamily.mono};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    font-weight: 700;
  }
`;

const TrackingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const TrackingItem = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: 20px 1fr auto;
  gap: ${({ theme }) => theme.spacing[3]};
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary + '44' : theme.colors.cardBorder)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary + '08' : theme.colors.cardBg};

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    top: calc(${({ theme }) => theme.spacing[4]} + 20px);
    left: calc(${({ theme }) => theme.spacing[4]} + 9px);
    width: 2px;
    height: calc(100% - ${({ theme }) => theme.spacing[4]});
    background: ${({ theme }) => theme.colors.cardBorder};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 18px 1fr;

    > p:last-of-type {
      grid-column: 2;
    }
  }
`;

const TrackingDot = styled.span`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme, $active }) =>
    $active ? theme.gradients.navActive : theme.colors.cardBgLight};
  border: 1px solid ${({ theme, $active }) => ($active ? 'transparent' : theme.colors.cardBorder)};
  box-shadow: ${({ theme, $active }) =>
    $active ? `0 0 0 4px rgba(${theme.colors.primaryRgb}, 0.12)` : 'none'};
  z-index: 1;
`;

const TrackingBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};

  > strong {
    color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.text)};
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }

  > p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    line-height: 1.5;
  }
`;

const TrackingTime = styled.p`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  white-space: nowrap;
`;

export default function OrderList() {
  const EXCHANGE_WIP_MODAL_ID = 'orderExchangeReturn';
  const orders = useOrderStore((state) => state.orders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const removeOrder = useOrderStore((state) => state.removeOrder);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const openModal = useOverlayStore((state) => state.openModal);
  const [pendingCancelOrderId, setPendingCancelOrderId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || null;
  const trackingOrder = orders.find((order) => order.id === trackingOrderId) || null;
  const trackingSteps = trackingOrder
    ? getTrackingSteps(trackingOrder.createdAt, trackingOrder.status)
    : [];
  const trackingStatusLabel = trackingOrder ? getTrackingStatusLabel(trackingOrder.status) : '';

  useEffect(() => {
    orders.forEach((order) => {
      const auto = getAutoStatus(order);
      if (auto !== order.status) {
        updateOrderStatus(order.id, auto);
      }
    });
  }, [orders, updateOrderStatus]);

  const handleCancelOrder = (orderId) => {
    const canceledOrder = orders.find((order) => order.id === orderId);

    if (!canceledOrder) {
      setPendingCancelOrderId(null);
      return;
    }

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

  const handleOpenCancelModal = (orderId) => {
    setPendingCancelOrderId(orderId);
  };

  const handleCloseCancelModal = () => {
    setPendingCancelOrderId(null);
  };

  const handleConfirmCancelOrder = () => {
    if (!pendingCancelOrderId) return;
    handleCancelOrder(pendingCancelOrderId);
    handleCloseCancelModal();
  };

  const handleOpenOrderDetail = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseOrderDetail = () => {
    setSelectedOrderId(null);
  };

  const handleOpenTrackingModal = (orderId) => {
    setTrackingOrderId(orderId);
  };

  const handleCloseTrackingModal = () => {
    setTrackingOrderId(null);
  };

  return (
    <CategoryWrap>
      <OrderedList>
        {orders.length > 0 ? (
          orders.map((order) => {
            const variant = STATUS_MAP[order.status] || 'pending';

            return (
              <li key={order.id} onClick={() => handleOpenOrderDetail(order.id)}>
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
                      <ActionBtn
                        type="button"
                        icon={false}
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenTrackingModal(order.id);
                        }}
                      >
                        배송 조회
                      </ActionBtn>
                    )}

                    {(order.status === '결제완료' || order.status === '배송중') && (
                      <ActionBtn
                        type="button"
                        icon={false}
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCancelModal(order.id);
                        }}
                      >
                        주문 취소
                      </ActionBtn>
                    )}

                    {order.status === '배송완료' && (
                      <ActionBtn
                        type="button"
                        icon={false}
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(EXCHANGE_WIP_MODAL_ID);
                        }}
                      >
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

      <BaseModal
        isOpen={Boolean(pendingCancelOrderId)}
        label="PULSE ORDER"
        title="주문을 취소할까요?"
        width="360px"
        onClose={handleCloseCancelModal}
      >
        <p>
          선택한 주문은 취소 처리됩니다.
          <br />
          계속 진행하시겠어요?
        </p>

        <div
          style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
        >
          <BaseBtn
            variant="secondary"
            icon={false}
            padding="12px 24px"
            onClick={handleCloseCancelModal}
          >
            취소
          </BaseBtn>
          <BaseBtn padding="12px 24px" onClick={handleConfirmCancelOrder}>
            확인
          </BaseBtn>
        </div>
      </BaseModal>

      <BaseModal
        isOpen={Boolean(selectedOrder)}
        label={selectedOrder?.orderNumber || 'ORDER DETAIL'}
        title="주문내역"
        width="720px"
        onClose={handleCloseOrderDetail}
      >
        {selectedOrder && (
          <DetailLayout>
            <DetailMeta>
              <DetailMetaCard>
                <p>주문 일시</p>
                <p>{formatOrderDate(selectedOrder.createdAt)}</p>
              </DetailMetaCard>
              <DetailMetaCard>
                <p>주문 상태</p>
                <p>{selectedOrder.status}</p>
              </DetailMetaCard>
            </DetailMeta>

            <DetailItems>
              {selectedOrder.items.map((item, index) => {
                const unitPrice = (Number(item.price) || 0) + (Number(item.carePrice) || 0);
                const itemTotal = unitPrice * (Number(item.quantity) || 1);

                return (
                  <DetailItem key={`${selectedOrder.id}-${item.id}-${index}`}>
                    <img src={item.image} alt={item.title || '주문 상품 이미지'} />
                    <DetailItemInfo>
                      <p>{item.type || item.category || 'ORDER ITEM'}</p>
                      <h4>{item.title}</h4>
                      <p>{item.meta}</p>
                      {item.optionSummary?.length > 0 && (
                        <OptionList>
                          {item.optionSummary.map((option, optionIndex) => (
                            <li key={`${selectedOrder.id}-${item.id}-option-${optionIndex}`}>
                              {option}
                            </li>
                          ))}
                        </OptionList>
                      )}
                      {item.careTitle && <p>케어 옵션: {item.careTitle}</p>}
                      <p>
                        수량 {item.quantity}개 · 개당 {unitPrice.toLocaleString()}원
                      </p>
                      <strong>{itemTotal.toLocaleString()}원</strong>
                    </DetailItemInfo>
                  </DetailItem>
                );
              })}
            </DetailItems>

            <DetailSummary>
              <p>
                <span>상품 금액</span>
                <span>
                  {(
                    selectedOrder.discountInfo?.subtotal || selectedOrder.totalPrice
                  ).toLocaleString()}
                  원
                </span>
              </p>
              <p>
                <span>배송비</span>
                <span>{(selectedOrder.discountInfo?.shippingFee || 0).toLocaleString()}원</span>
              </p>
              <p>
                <span>할인</span>
                <span>
                  -{(selectedOrder.discountInfo?.discountAmount || 0).toLocaleString()}원
                  {selectedOrder.discountInfo?.couponCode
                    ? ` (${selectedOrder.discountInfo.couponCode})`
                    : ''}
                </span>
              </p>
              <p>
                <span>총 결제 금액</span>
                <span>{selectedOrder.totalPrice.toLocaleString()}원</span>
              </p>
            </DetailSummary>
          </DetailLayout>
        )}
      </BaseModal>

      <BaseModal
        isOpen={Boolean(trackingOrder)}
        label={trackingOrder?.orderNumber}
        title="배송 조회"
        width="640px"
        onClose={handleCloseTrackingModal}
      >
        {trackingOrder && (
          <TrackingLayout>
            <TrackingHeader>
              <p>현재 배송 상태</p>
              <h4>{trackingStatusLabel}</h4>
              <p>CJ대한통운 6874-21{trackingOrder.id.slice(0, 4).toUpperCase()}</p>
            </TrackingHeader>

            <TrackingList>
              {trackingSteps.map((step, index) => (
                <TrackingItem key={`${trackingOrder.id}-tracking-${index}`} $active={step.active}>
                  <TrackingDot $active={step.active} />
                  <TrackingBody $active={step.active}>
                    <strong>{step.title}</strong>
                    <p>{step.description}</p>
                  </TrackingBody>
                  <TrackingTime $active={step.active}>{step.timeLabel}</TrackingTime>
                </TrackingItem>
              ))}
            </TrackingList>
          </TrackingLayout>
        )}
      </BaseModal>
    </CategoryWrap>
  );
}
