import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // 상품 체크 여부 다루기
      onChange: (id) =>
        set((state) => {
          return {
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, checked: !item.checked } : item
            ),
          };
        }),

      handleAllChange: () =>
        set((state) => {
          // 하나라도 false인 checked가 있는지 확인
          const isAllChecked = Boolean(state.cart.filter((item) => item.checked === false).length);
          //   모두 체크되어있으면 모두 false로 바꿈
          if (!isAllChecked) {
            return {
              cart: state.cart.map((item) => ({ ...item, checked: false })),
            };
          } else {
            // 모두 체크헤제되어있으면 모두 true로 바꿈
            return { cart: state.cart.map((item) => ({ ...item, checked: true })) };
          }
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

      // 해당하는 아이템 삭제
      removeCart: (id) =>
        set((state) => {
          if (confirm('정말로 삭제하시겠습니까? ')) {
            return { cart: state.cart.filter((product) => product.id !== id) };
          } else return { cart: state.cart };
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
