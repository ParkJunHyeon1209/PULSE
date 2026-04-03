import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import useReviewStore from '../../../store/useReviewStore';
import useAuthStore from '../../../store/useAuthStore';
import MyPageEmptyState from './MyPageEmptyState';
import BaseBtn from '../../../components/common/BaseBtn';
import useOverlayStore from '../../../store/useOverlayStore';
import BaseModal from '../../../components/common/BaseModal';

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};

  > li {
    position: relative;
    padding: ${({ theme }) => theme.spacing[5]};
    display: flex;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing[5]};
    border: 1px solid ${({ theme }) => theme.colors.primary + '22'};
    border-radius: ${({ theme }) => theme.radii.xl};
    background: linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.cardBg} 0%,
      ${({ theme }) => theme.colors.cardBg}ee 100%
    );
    box-shadow:
      inset 0 1px 0 ${({ theme }) => theme.colors.text + '08'},
      0 8px 24px ${({ theme }) => theme.colors.shadow};
  }

  > li.empty-item {
    padding: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    > li {
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing[4]};
    }
  }
`;

const ReviewMain = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  flex: 1;
`;

const ReviewThumb = styled.div`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.primary + '20'};
  background:
    radial-gradient(
      circle at 30% 30%,
      ${({ theme }) => theme.colors.primary + '18'},
      transparent 60%
    ),
    ${({ theme }) => theme.colors.cardBg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.cardBorder};

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > span {
    font-size: 28px;
    opacity: 0.72;
  }
`;

const ReviewContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding-top: ${({ theme }) => theme.spacing[1]};
  padding-right: ${({ theme }) => theme.spacing[24]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-right: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const ProductName = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Rating = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #f6c63b;
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const ReviewDate = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.85;
`;

const ReviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.75;
  word-break: keep-all;
`;

const ReviewActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  position: absolute;
  top: ${({ theme }) => theme.spacing[5]};
  right: ${({ theme }) => theme.spacing[5]};

  > button {
    min-width: 56px;
    height: 32px;
    padding: 6px 12px;
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: static;
    justify-content: flex-start;
  }
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};

  > textarea {
    min-height: 140px;
    padding: ${({ theme }) => theme.spacing[4]};
    border: 1px solid ${({ theme }) => theme.colors.primary + '18'};
    border-radius: ${({ theme }) => theme.radii.lg};
    background: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const StarButton = styled(BaseBtn)`
  && {
    min-width: 0;
    padding: 0;
    border: 0;
    background: transparent;
    box-shadow: none;
    font-size: ${({ theme }) => theme.fontSize.s};
    color: ${({ $active, theme }) => ($active ? '#f6c63b' : theme.colors.textSecondary)};
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const getReviewId = (review, index) => review.id ?? `${review.productId ?? 'review'}-${index}`;

const getReviewTitle = (review) =>
  review.productTitle || review.title || review.productName || review.name || 'PULSE Product';

const getReviewImage = (review) =>
  review.productImage || review.image || review.thumbnail || review.product?.image || '';

const getReviewDate = (review) =>
  review.updatedAt || review.createdAt || review.date || review.reviewedAt || null;

const getReviewRating = (review) => {
  const rating = Number(review.rating ?? review.score ?? review.stars ?? 0);

  if (Number.isNaN(rating) || rating <= 0) {
    return 5;
  }

  return Math.max(1, Math.min(5, Math.round(rating)));
};

const getReviewContent = (review) =>
  review.content ||
  review.description ||
  review.comment ||
  review.text ||
  '리뷰 내용이 아직 없습니다.';

const formatDate = (value) => {
  if (!value) {
    return '2026. 04. 03';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\.\s/g, '. ')
    .replace(/\.$/, '');
};

const renderStars = (count) =>
  Array.from({ length: 5 }, (_, index) => (index < count ? '★' : '☆')).join(' ');

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const previewReviews = [
  {
    id: 'preview-review-1',
    productTitle: 'PULSE Arcade Stick Pro',
    rating: 5,
    createdAt: '2026-03-28',
    content: '버튼 반응이 빠르고 그립감도 좋아서 대전 게임 할 때 만족도가 높아요.',
  },
  {
    id: 'preview-review-2',
    productTitle: 'Neon Wireless Pad X',
    rating: 4,
    createdAt: '2026-03-18',
    content: '무선 연결이 안정적이고 배터리도 오래가서 거실용으로 편하게 쓰고 있어요.',
  },
  {
    id: 'preview-review-3',
    productTitle: 'Retro Pocket Console',
    rating: 5,
    createdAt: '2026-03-07',
    content: '휴대성이 좋아서 이동 중에도 플레이하기 좋고 화면 색감도 기대 이상이에요.',
  },
];

const REVIEW_EDIT_MODAL_ID = 'reviewEdit';

function ReviewEditModal({
  isOpen,
  review,
  content,
  rating,
  onChangeContent,
  onChangeRating,
  onClose,
  onSubmit,
}) {
  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE REVIEW"
      title={review ? `${getReviewTitle(review)} 리뷰 수정` : '리뷰 수정'}
      width="520px"
      onClose={onClose}
    >
      <ReviewForm onSubmit={onSubmit}>
        <FieldLabel>
          평점
          <RatingRow>
            {Array.from({ length: 5 }, (_, index) => {
              const nextRating = index + 1;
              return (
                <StarButton
                  key={nextRating}
                  type="button"
                  icon={false}
                  variant="secondary"
                  $active={nextRating <= rating}
                  onClick={() => onChangeRating(nextRating)}
                >
                  {nextRating <= rating ? '★' : '☆'}
                </StarButton>
              );
            })}
          </RatingRow>
        </FieldLabel>

        <FieldLabel>
          리뷰 내용
          <textarea
            value={content}
            onChange={(event) => onChangeContent(event.target.value)}
            placeholder="리뷰 내용을 입력해주세요."
          />
        </FieldLabel>

        <ModalActions>
          <BaseBtn type="button" variant="secondary" icon={false} onClick={onClose}>
            취소
          </BaseBtn>
          <BaseBtn type="submit" icon={false}>
            저장
          </BaseBtn>
        </ModalActions>
      </ReviewForm>
    </BaseModal>
  );
}

export default function Review() {
  const reviews = useReviewStore((state) => state.reviews);
  const updateReview = useReviewStore((state) => state.updateReview);
  const deleteReview = useReviewStore((state) => state.deleteReview);
  const userReviewList = useAuthStore((state) => state.user?.reviewList);
  const openModal = useOverlayStore((state) => state.openModal);
  const closeModal = useOverlayStore((state) => state.closeModal);
  const isEditModalOpen = useOverlayStore((state) => Boolean(state.modals[REVIEW_EDIT_MODAL_ID]));

  const [previewReviewList, setPreviewReviewList] = useState(previewReviews);
  const [userReviewDrafts, setUserReviewDrafts] = useState(ensureArray(userReviewList));
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [draftContent, setDraftContent] = useState('');
  const [draftRating, setDraftRating] = useState(5);

  useEffect(() => {
    setUserReviewDrafts(ensureArray(userReviewList));
  }, [userReviewList]);

  const reviewSource = useMemo(() => {
    if (ensureArray(reviews).length > 0) {
      return { type: 'store', list: ensureArray(reviews) };
    }

    if (userReviewDrafts.length > 0) {
      return { type: 'user', list: userReviewDrafts };
    }

    return { type: 'preview', list: previewReviewList };
  }, [previewReviewList, reviews, userReviewDrafts]);

  const reviewList = reviewSource.list;
  const selectedReview = reviewList.find((review, index) => getReviewId(review, index) === selectedReviewId);

  const handleOpenEditModal = (review, index) => {
    setSelectedReviewId(getReviewId(review, index));
    setDraftContent(getReviewContent(review));
    setDraftRating(getReviewRating(review));
    openModal(REVIEW_EDIT_MODAL_ID);
  };

  const handleCloseEditModal = () => {
    closeModal(REVIEW_EDIT_MODAL_ID);
    setSelectedReviewId(null);
  };

  const handleDeleteReview = (reviewId) => {
    if (!window.confirm('이 리뷰를 삭제하시겠습니까?')) {
      return;
    }

    if (reviewSource.type === 'store') {
      deleteReview(reviewId);
      return;
    }

    if (reviewSource.type === 'user') {
      setUserReviewDrafts((prev) =>
        prev.filter((review, index) => getReviewId(review, index) !== reviewId)
      );
      return;
    }

    setPreviewReviewList((prev) => prev.filter((review, index) => getReviewId(review, index) !== reviewId));
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    if (!selectedReview) {
      return;
    }

    const nextReview = {
      ...selectedReview,
      content: draftContent.trim() || '리뷰 내용이 아직 없습니다.',
      rating: draftRating,
      updatedAt: new Date().toISOString(),
    };

    if (reviewSource.type === 'store') {
      updateReview(nextReview);
    } else if (reviewSource.type === 'user') {
      setUserReviewDrafts((prev) =>
        prev.map((review, index) =>
          getReviewId(review, index) === selectedReviewId ? nextReview : review
        )
      );
    } else {
      setPreviewReviewList((prev) =>
        prev.map((review, index) =>
          getReviewId(review, index) === selectedReviewId ? nextReview : review
        )
      );
    }

    handleCloseEditModal();
  };

  return (
    <CategoryWrap>
      <ReviewList>
        {reviewList.length > 0 ? (
          reviewList.map((review, index) => {
            const reviewId = getReviewId(review, index);
            const rating = getReviewRating(review);

            return (
              <li key={reviewId}>
                <ReviewMain>
                  <ReviewThumb>
                    {getReviewImage(review) ? (
                      <img src={getReviewImage(review)} alt={getReviewTitle(review)} />
                    ) : (
                      <span aria-hidden="true">🎮</span>
                    )}
                  </ReviewThumb>

                  <ReviewContent>
                    <ReviewHeader>
                      <ProductName>{getReviewTitle(review)}</ProductName>
                      <ReviewMeta>
                        <Rating aria-label={`별점 ${rating}점`}>{renderStars(rating)}</Rating>
                        <ReviewDate>{formatDate(getReviewDate(review))}</ReviewDate>
                      </ReviewMeta>
                    </ReviewHeader>

                    <ReviewText>{getReviewContent(review)}</ReviewText>
                  </ReviewContent>
                </ReviewMain>

                <ReviewActions>
                  <BaseBtn
                    variant="secondary"
                    type="button"
                    icon={false}
                    onClick={() => handleOpenEditModal(review, index)}
                  >
                    수정
                  </BaseBtn>
                  <BaseBtn
                    variant="secondary"
                    type="button"
                    icon={false}
                    onClick={() => handleDeleteReview(reviewId)}
                  >
                    삭제
                  </BaseBtn>
                </ReviewActions>
              </li>
            );
          })
        ) : (
          <li className="empty-item">
            <MyPageEmptyState
              category="review"
              title="작성한 리뷰가 없습니다."
              description={`구매한 제품에 대한 첫 리뷰를 남겨보세요.\n당신의 플레이 경험이 다음 선택에 도움이 됩니다.`}
              buttonLabel="SHOP NOW"
            />
          </li>
        )}
      </ReviewList>
      <ReviewEditModal
        isOpen={isEditModalOpen}
        review={selectedReview}
        content={draftContent}
        rating={draftRating}
        onChangeContent={setDraftContent}
        onChangeRating={setDraftRating}
        onClose={handleCloseEditModal}
        onSubmit={handleSubmitEdit}
      />
    </CategoryWrap>
  );
}
