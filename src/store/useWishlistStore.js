import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistIds: [],

      addWishlist: (productId) => {
        const currentIds = get().wishlistIds;

        if (currentIds.includes(productId)) {
          return;
        }

        set({
          wishlistIds: [...currentIds, productId],
        });
      },

      removeWishlist: (productId) => {
        set({
          wishlistIds: get().wishlistIds.filter((id) => id !== productId),
        });
      },

      toggleWishlist: (productId) => {
        const currentIds = get().wishlistIds;
        const isExists = currentIds.includes(productId);

        if (isExists) {
          set({
            wishlistIds: currentIds.filter((id) => id !== productId),
          });
          return false;
        }

        set({
          wishlistIds: [...currentIds, productId],
        });
        return true;
      },

      isInWishlist: (productId) => {
        return get().wishlistIds.includes(productId);
      },

      clearWishlist: () => {
        set({ wishlistIds: [] });
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

export default useWishlistStore;
