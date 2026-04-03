import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useReviewStore = create(
  persist(
    (set) => ({
      reviews: [],

      addReview: (review) => {
        set((state) => ({
          reviews: [...state.reviews, review],
        }));
      },

      updateReview: (updatedReview) => {
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          ),
        }));
      },

      deleteReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.filter((review) => review.id !== reviewId),
        }));
      },

      clearReviews: () => {
        set({ reviews: [] });
      },
    }),

    {
      name: 'review-storage',
    }
  )
);

export default useReviewStore;
