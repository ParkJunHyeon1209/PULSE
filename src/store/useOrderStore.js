import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const createOrderNumber = () => {
  return `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
};

const normalizeOrderItem = (item) => {
  const normalizedOptionSummary = Array.isArray(item.optionSummary)
    ? item.optionSummary
    : item.optionSummary
      ? [item.optionSummary]
      : [];

  return {
    id: item.id,
    title: item.title,
    price: Number(item.price) || 0,
    quantity: Number(item.quantity) || 1,
    image: item.image || '',
    meta: item.meta || '',
    category: item.category || '',
    type: item.type || '',
    tag: item.tag || '',
    optionSummary: normalizedOptionSummary,
    careTitle: item.careTitle || '',
    carePrice: Number(item.carePrice) || 0,
    checked: Boolean(item.checked),
  };
};

const calcOrderTotalPrice = (items) => {
  return items.reduce((acc, item) => {
    const basePrice = Number(item.price) || 0;
    const carePrice = Number(item.carePrice) || 0;
    const quantity = Number(item.quantity) || 1;

    return acc + (basePrice + carePrice) * quantity;
  }, 0);
};

const normalizeDiscountInfo = (discountInfo = {}) => {
  return {
    subtotal: Math.max(Number(discountInfo.subtotal) || 0, 0),
    shippingFee: Math.max(Number(discountInfo.shippingFee) || 0, 0),
    discountAmount: Math.max(Number(discountInfo.discountAmount) || 0, 0),
    couponCode: discountInfo.couponCode || '',
  };
};

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: ({
        items = [],
        status = '결제완료',
        totalPrice: finalTotalPrice,
        earnedPoint = 0,
        discountInfo = {},
      }) => {
        if (!Array.isArray(items) || items.length === 0) {
          return null;
        }

        const normalizedItems = items.map(normalizeOrderItem);
        const fallbackTotalPrice = calcOrderTotalPrice(normalizedItems);
        const normalizedDiscountInfo = normalizeDiscountInfo(discountInfo);
        const totalPrice =
          typeof finalTotalPrice === 'number' && Number.isFinite(finalTotalPrice)
            ? Math.max(finalTotalPrice, 0)
            : fallbackTotalPrice;

        const newOrder = {
          id: crypto.randomUUID(),
          orderNumber: createOrderNumber(),
          createdAt: new Date().toISOString(),
          status,
          totalPrice,
          earnedPoint: Math.max(Number(earnedPoint) || 0, 0),
          discountInfo: {
            ...normalizedDiscountInfo,
            subtotal: normalizedDiscountInfo.subtotal || fallbackTotalPrice,
          },
          items: normalizedItems,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, nextStatus) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: nextStatus } : order
          ),
        }));
      },

      removeOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        }));
      },

      clearOrders: () => {
        set({ orders: [] });
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: 'order-storage',
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);

export default useOrderStore;
