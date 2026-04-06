import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useOverlayStore from './useOverlayStore';

const getCartItemKey = (product) =>
  `${product.id}-${JSON.stringify(product.optionSummary ?? [])}-${JSON.stringify(product.careTitle ?? 'none')}`;
const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      
      getTotalPrice: () => {
        return get()
          .cart.filter((item) => item.checked)
          .reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      
      getCheckedItems: () => {
        return get().cart.filter((item) => item.checked);
      },

      
      toggleItemChecked: (product) =>
        set((state) => {
          const targetKey = getCartItemKey(product);

          return {
            cart: state.cart.map((item) =>
              getCartItemKey(item) === targetKey ? { ...item, checked: !item.checked } : item
            ),
          };
        }),

      
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

      
      increaseQuantity: (product) =>
        set((state) => {
          const targetKey = getCartItemKey(product);

          return {
            cart: state.cart.map((item) =>
              getCartItemKey(item) === targetKey ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }),

      
      removeCart: (product) =>
        set((state) => {
          const targetKey = getCartItemKey(product);

          return {
            cart: state.cart.filter((item) => getCartItemKey(item) !== targetKey),
          };
        }),

      
      removeSelected: () =>
        set((state) => ({
          cart: state.cart.filter((item) => !item.checked),
        })),

      
      clearCheckedItems: () =>
        set((state) => ({
          cart: state.cart.filter((item) => !item.checked),
        })),

      
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
