import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

      // 상품 체크 여부 다루기
      onChange: (id) =>
        set((state) => {
          return {
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, checked: !item.checked } : item
            ),
          };
        }),

      // 전체선택 다루기
      handleAllChange: () =>
        set((state) => {
          // 모든 아이템이 이미 체크되어 있는지 확인
          const isAllChecked = state.cart.every((item) => item.checked);
          // 모두 체크되어 있으면 전체 해제, 아니면 전체 선택
          return {
            cart: state.cart.map((item) => ({ ...item, checked: !isAllChecked })),
          };
        }),

      // 장바구니 추가 및 수량 올리기
      addToCart: (product, qty = 1) =>
        set((state) => {
          const isExist = state.cart.find((item) => item.id === product.id);
          if (isExist) {
            if (isExist.quantity + qty > product.stock) {
              alert('재고가 모자랍니다. 죄송합니다.');
              return { cart: state.cart };
            }
            // 이미 있으면 해당 상품의 수량(quantity)만 올림
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
              ),
            };
          }
          // 없으면 수량 1을 추가해서 새로 넣음
          return { cart: [...state.cart, { ...product, quantity: qty, checked: true }] };
        }),

      // 수량 줄이기
      decreaseQuantity: (product) =>
        set((state) => {
          if (product.quantity <= 1) {
            alert('최소 1개 이상 선택해주세요.');
            return { cart: state.cart };
          }
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          };
        }),

      // 해당하는 아이템 삭제
      removeCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== id),
        })),

      // 선택삭제
      removeSelected: () =>
        set((state) => ({
          cart: state.cart.filter((product) => !product.checked),
        })),

      // 카트 전체 초기화
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shopping-cart',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);

export default useCartStore;
