import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useOverlayStore from './useOverlayStore';

const getCartItemKey = (product) =>
  `${product.id}-${JSON.stringify(product.optionSummary ?? [])}-${JSON.stringify(product.careTitle ?? 'none')}`;
const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      // 체크된 상품들 총합 가격 구하기
      getTotalPrice: () => {
        return get()
          .cart.filter((item) => item.checked)
          .reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      // 개별 상품 체크 토글
      toggleItemChecked: (product) =>
        set((state) => {
          const targetKey = getCartItemKey(product);

          return {
            cart: state.cart.map((item) =>
              getCartItemKey(item) === targetKey ? { ...item, checked: !item.checked } : item
            ),
          };
        }),

      // 전체선택 토글
      toggleAllChecked: () =>
        set((state) => {
          const isAllChecked = state.cart.length > 0 && state.cart.every((item) => item.checked);

          return {
            cart: state.cart.map((item) => ({
              ...item,
              checked: !isAllChecked,
            })),
          };
        }),

      // 장바구니 추가 및 수량 올리기
      addToCart: (product, qty = 1) =>
        set((state) => {
          const targetKey = getCartItemKey(product);

          const isExist = state.cart.find((item) => getCartItemKey(item) === targetKey);

          if (isExist) {
            return {
              cart: state.cart.map((item) =>
                getCartItemKey(item) === targetKey
                  ? { ...item, quantity: item.quantity + qty }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: qty, checked: true }],
          };
        }),

      // 수량 줄이기
      decreaseQuantity: (product) => {
        const targetKey = getCartItemKey(product);
        const cart = get().cart;
        const targetItem = cart.find((item) => getCartItemKey(item) === targetKey);

        if (!targetItem) return;

        if (targetItem.quantity <= 1) {
          useOverlayStore.getState().openModal('alert');
          return;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            getCartItemKey(item) === targetKey ? { ...item, quantity: item.quantity - 1 } : item
          ),
        }));
      },

      // 수량 늘리기
      increaseQuantity: (product) =>
        set((state) => {
          const targetKey = getCartItemKey(product);

          return {
            cart: state.cart.map((item) =>
              getCartItemKey(item) === targetKey ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }),

      // 해당 아이템 삭제
      removeCart: (product) =>
        set((state) => {
          const targetKey = getCartItemKey(product);

          return {
            cart: state.cart.filter((item) => getCartItemKey(item) !== targetKey),
          };
        }),

      // 선택삭제
      removeSelected: () =>
        set((state) => ({
          cart: state.cart.filter((item) => !item.checked),
        })),

      // 카트 전체 초기화
      openResetModal: () => {
        useOverlayStore.getState().openModal('confirm');
        return;
      },
      resetCart: () => {
        set(() => ({ cart: [] }));
      },
    }),
    {
      name: 'shopping-cart',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export default useCartStore;
