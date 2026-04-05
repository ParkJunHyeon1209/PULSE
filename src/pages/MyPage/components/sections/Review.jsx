import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useReviewStore from '../../../../store/useReviewStore';
import useAuthStore from '../../../../store/useAuthStore';
import MyPageEmptyState from '../shared/MyPageEmptyState';
import BaseBtn from '../../../../components/common/BaseBtn';
import useOverlayStore from '../../../../store/useOverlayStore';
import BaseModal from '../../../../components/common/BaseModal';

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ReviewToolbar = styled.div`
  align-self: flex-end;
  display: flex;
  justify-content: flex-end;

  > button {
    margin-right: ${({ theme }) => theme.spacing[2]};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.accent + '96'};
    transition: color ${({ theme }) => theme.motion.fast} ease;
  }

  > button:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};

  > li {
    position: relative;
    padding: ${({ theme }) => theme.spacing[5]};
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.cardBgLight};
    gap: ${({ theme }) => theme.spacing[5]};
    border: 1px solid ${({ theme }) => theme.colors.primary + '22'};
    border-radius: ${({ theme }) => theme.radii.lg};
    background-color: ${({ theme }) => theme.colors.cardBgLight};
    box-shadow:
      inset 0 1px 0 ${({ theme }) => theme.colors.text + '08'},
      0 8px 24px ${({ theme }) => theme.colors.shadow};
  }

  > li:hover {
    background: ${({ theme }) => theme.colors.cardBg + 'ee'};
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
  cursor: pointer;
`;

const ReviewThumb = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  align-self: center;
  border-radius: ${({ theme }) => theme.radii.md};
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
  gap: ${({ theme }) => theme.spacing[2]};
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
  letter-spacing: 0.08em;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const Star = styled.span`
  color: ${({ $filled, theme }) => ($filled ? '#f6c63b' : theme.colors.textSecondary)};
  opacity: ${({ $filled }) => ($filled ? 1 : 0.4)};
`;

const ReviewDate = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.85;
`;

const ReviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
  gap: ${({ theme }) => theme.spacing[6]};
`;

const FieldLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};

  > textarea {
    min-height: 140px;
    padding: ${({ theme }) => theme.spacing[4]};
    border: 1px solid ${({ theme }) => theme.colors.primary + '18'};
    border-radius: ${({ theme }) => theme.radii.lg};
    background: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.text + 'cc'};
    line-height: 1.6;
  }
`;

const FieldTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const StarButton = styled.button`
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 1;
  color: ${({ $active, theme }) => ($active ? '#f6c63b' : theme.colors.textSecondary)};
  transition:
    color ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  &:hover {
    color: #f6c63b;
    transform: translateY(-1px);
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[3]};
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
    .replace(/\s/g, '')
    .replace(/\.$/, '');
};

const renderStars = (count) =>
  Array.from({ length: 5 }, (_, index) => (
    <Star key={`star-${index}`} $filled={index < count}>
      {index < count ? '★' : '☆'}
    </Star>
  ));

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const REVIEW_EDIT_MODAL_ID = 'reviewEdit';

function ReviewClearModal({ isOpen, onClose, onConfirm }) {
  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE REVIEW"
      title="전체 삭제 하시겠습니까?"
      width="420px"
      onClose={onClose}
    >
      <p>작성한 리뷰를 모두 삭제합니다.</p>
      <p>삭제한 리뷰는 되돌릴 수 없습니다.</p>
      <ModalActions>
        <BaseBtn
          type="button"
          variant="secondary"
          icon={false}
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={onClose}
        >
          취소
        </BaseBtn>
        <BaseBtn
          type="button"
          icon={false}
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={onConfirm}
        >
          전체 삭제
        </BaseBtn>
      </ModalActions>
    </BaseModal>
  );
}

function ReviewDeleteModal({ isOpen, reviewTitle, onClose, onConfirm }) {
  return (
    <BaseModal
      isOpen={isOpen}
      label="PULSE REVIEW"
      title="리뷰를 삭제하시겠습니까?"
      width="420px"
      onClose={onClose}
    >
      <p>{reviewTitle ? `"${reviewTitle}" 리뷰를 삭제합니다.` : '선택한 리뷰를 삭제합니다.'}</p>
      <p>삭제한 리뷰는 되돌릴 수 없습니다.</p>
      <ModalActions>
        <BaseBtn
          type="button"
          variant="secondary"
          icon={false}
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={onClose}
        >
          취소
        </BaseBtn>
        <BaseBtn
          type="button"
          icon={false}
          style={{ marginTop: '28px', display: 'block', marginLeft: 'auto' }}
          onClick={onConfirm}
        >
          삭제
        </BaseBtn>
      </ModalActions>
    </BaseModal>
  );
}

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
          <FieldTitle>평점</FieldTitle>
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
          <FieldTitle>리뷰 내용</FieldTitle>
          <textarea
            value={content}
            onChange={(event) => onChangeContent(event.target.value)}
            placeholder="리뷰 내용을 입력해주세요."
            aria-label="리뷰 내용"
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
  const navigate = useNavigate();
  const reviews = useReviewStore((state) => state.reviews);
  const updateReview = useReviewStore((state) => state.updateReview);
  const deleteReview = useReviewStore((state) => state.deleteReview);
  const clearReviews = useReviewStore((state) => state.clearReviews);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.login);
  const userReviewList = useAuthStore((state) => state.user?.reviewList);
  const openModal = useOverlayStore((state) => state.openModal);
  const closeModal = useOverlayStore((state) => state.closeModal);
  const isEditModalOpen = useOverlayStore((state) => Boolean(state.modals[REVIEW_EDIT_MODAL_ID]));

  const [userReviewDrafts, setUserReviewDrafts] = useState(ensureArray(userReviewList));
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [draftContent, setDraftContent] = useState('');
  const [draftRating, setDraftRating] = useState(5);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

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

    return { type: 'preview', list: [] };
  }, [reviews, userReviewDrafts]);

  const reviewList = reviewSource.list;
  const selectedReview = reviewList.find(
    (review, index) => getReviewId(review, index) === selectedReviewId
  );
  const pendingDeleteReview = reviewList.find(
    (review, index) => getReviewId(review, index) === pendingDeleteId
  );

  const syncUserReviewList = (nextReviewList) => {
    if (!user) {
      return;
    }

    setUser({
      ...user,
      reviewList: nextReviewList,
      reviews: nextReviewList,
    });
  };

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

  const handleMoveToProduct = (review) => {
    if (!review?.productId) {
      return;
    }

    navigate(`/product/${review.productId}`);
  };

  const handleOpenDeleteModal = (reviewId) => {
    setPendingDeleteId(reviewId);
  };

  const handleCloseDeleteModal = () => {
    setPendingDeleteId(null);
  };

  const handleOpenClearModal = () => {
    setIsClearModalOpen(true);
  };

  const handleCloseClearModal = () => {
    setIsClearModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) {
      return;
    }

    if (reviewSource.type === 'store') {
      deleteReview(pendingDeleteId);
      syncUserReviewList(userReviewList.filter((review) => review.id !== pendingDeleteId));
      handleCloseDeleteModal();
      return;
    }

    if (reviewSource.type === 'user') {
      const nextUserReviews = userReviewDrafts.filter(
        (review, index) => getReviewId(review, index) !== pendingDeleteId
      );
      setUserReviewDrafts(nextUserReviews);
      syncUserReviewList(nextUserReviews);
      handleCloseDeleteModal();
      return;
    }

    handleCloseDeleteModal();
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
      syncUserReviewList(
        userReviewList.map((review) => (review.id === nextReview.id ? nextReview : review))
      );
    } else if (reviewSource.type === 'user') {
      const nextUserReviews = userReviewDrafts.map((review, index) =>
        getReviewId(review, index) === selectedReviewId ? nextReview : review
      );
      setUserReviewDrafts(nextUserReviews);
      syncUserReviewList(nextUserReviews);
    }

    handleCloseEditModal();
  };

  const handleConfirmClear = () => {
    if (reviewSource.type === 'store') {
      clearReviews();
      syncUserReviewList([]);
    } else if (reviewSource.type === 'user') {
      setUserReviewDrafts([]);
      syncUserReviewList([]);
    }

    handleCloseClearModal();
  };

  return (
    <CategoryWrap>
      {reviewList.length > 0 && (
        <ReviewToolbar>
          <button type="button" onClick={handleOpenClearModal}>
            전체 삭제
          </button>
        </ReviewToolbar>
      )}
      <ReviewList>
        {reviewList.length > 0 ? (
          reviewList.map((review, index) => {
            const reviewId = getReviewId(review, index);
            const rating = getReviewRating(review);

            return (
              <li key={reviewId}>
                <ReviewMain
                  role="button"
                  tabIndex={0}
                  onClick={() => handleMoveToProduct(review)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      handleMoveToProduct(review);
                    }
                  }}
                >
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
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenEditModal(review, index);
                    }}
                  >
                    수정
                  </BaseBtn>
                  <BaseBtn
                    variant="secondary"
                    type="button"
                    icon={false}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenDeleteModal(reviewId);
                    }}
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
      <ReviewDeleteModal
        isOpen={Boolean(pendingDeleteId)}
        reviewTitle={pendingDeleteReview ? getReviewTitle(pendingDeleteReview) : ''}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
      <ReviewClearModal
        isOpen={isClearModalOpen}
        onClose={handleCloseClearModal}
        onConfirm={handleConfirmClear}
      />
    </CategoryWrap>
  );
}
