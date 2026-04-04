import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import BaseSection from '../../../../components/common/BaseSection';
import BaseBtn from '../../../../components/common/BaseBtn';
import BaseModal from '../../../../components/common/BaseModal';
import useReviewStore from '../../../../store/useReviewStore';
import useAuthStore from '../../../../store/useAuthStore';

const ReviewSectionWrap = styled.section`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[20]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const ComposerCard = styled.div`
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.cardBgLight};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.text + '08'},
    0 8px 24px ${({ theme }) => theme.colors.shadow};
`;

const ComposerHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};

  > p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const StarButton = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  color: ${({ $active, theme }) => ($active ? '#f6c63b' : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.fontSize.s};
  line-height: 1;
  transition:
    color ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  &:hover {
    color: #f6c63b;
    transform: translateY(-1px);
  }
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.primary + '18'};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.cardBgLight};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
  resize: none;
`;

const ComposerFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  display: flex;
  justify-content: flex-end;
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ReviewItem = styled.li`
  position: relative;
  padding: ${({ theme }) => theme.spacing[5]};
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[5]};
  border: 1px solid ${({ theme }) => theme.colors.primary + '22'};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.cardBgLight};
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.text + '08'},
    0 8px 24px ${({ theme }) => theme.colors.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const ReviewMain = styled.div`
  min-width: 0;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  flex: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;

const ReviewThumb = styled.div`
  width: 90px;
  height: 90px;
  align-self: flex-start;
  flex-shrink: 0;
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
  justify-content: center;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.cardBorder};

  > img {
    align-self: flex-start;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: contents;
    word-break: keep-all;
    padding-right: 0;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: calc(100% - 90px - ${({ theme }) => theme.spacing[4]});
  }
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

const ReviewAuthor = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`;

const ReviewText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.75;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex: 0 0 100%;
    width: 100%;
  }
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

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const FieldLabel = styled.div`
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
    resize: none;
  }
`;

const FieldTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  > textarea {
    resize: none;
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const formatDate = (value) => {
  if (!value) {
    return '';
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

const getReviewId = (review, index) => review.id ?? `${review.productId ?? 'review'}-${index}`;

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

const maskKoreanName = (name) => {
  if (name.length <= 2) {
    return `${name[0]}*`;
  }

  const middleMask = '*'.repeat(Math.max(name.length - 2, 1));
  return `${name[0]}${middleMask}${name[name.length - 1]}`;
};

const maskEnglishName = (name) => {
  if (name.length <= 4) {
    const visibleLength = Math.ceil(name.length / 2);
    return `${name.slice(0, visibleLength)}${'*'.repeat(name.length - visibleLength)}`;
  }

  return `${name.slice(0, 4)}${'*'.repeat(name.length - 4)}`;
};

const getMaskedAuthor = (review) => {
  const author = String(review.author || '').trim();

  if (!author) {
    return 'PULSE MEMBER';
  }

  if (review.authorType === 'nickname') {
    return author;
  }

  const compactAuthor = author.replace(/\s/g, '');

  if (/^[가-힣]+$/.test(compactAuthor)) {
    return maskKoreanName(compactAuthor);
  }

  if (/^[a-zA-Z]+$/.test(compactAuthor)) {
    return maskEnglishName(compactAuthor);
  }

  return author;
};

const buildMockReviews = (product) => [
  {
    id: `mock-review-${product?.id || 'item'}-1`,
    productId: product?.id,
    productTitle: product?.title,
    productImage: product?.image,
    rating: 4,
    content:
      '디자인이 깔끔하고 실제 사용감도 좋아요. 케이블 정리만 조금 더 편하면 더 좋을 것 같아요.',
    createdAt: '2026-04-01',
    author: 'ARCADE KID',
    authorType: 'nickname',
    authorId: 'arcade-kid',
  },
  {
    id: `mock-review-${product?.id || 'item'}-2`,
    productId: product?.id,
    productTitle: product?.title,
    productImage: product?.image,
    rating: 5,
    content:
      '패키징부터 완성도 있었고 실제 플레이할 때 손에 익는 느낌이 좋아서 재구매 의사 있습니다.',
    createdAt: '2026-03-29',
    author: 'NEON CAT',
    authorType: 'nickname',
    authorId: 'neon-cat',
  },
];

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
      title={review ? `${review.productTitle || '리뷰'} 수정` : '리뷰 수정'}
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

export default function ProductReviewSection({ product, onRequireLogin }) {
  const reviews = useReviewStore((state) => state.reviews);
  const addReview = useReviewStore((state) => state.addReview);
  const updateReview = useReviewStore((state) => state.updateReview);
  const deleteReview = useReviewStore((state) => state.deleteReview);
  const isLogin = useAuthStore((state) => state.isLogin);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.login);

  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [draftContent, setDraftContent] = useState('');
  const [draftRating, setDraftRating] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [previewReviews, setPreviewReviews] = useState(buildMockReviews(product));

  useEffect(() => {
    setPreviewReviews(buildMockReviews(product));
  }, [product]);

  const userReviewList = ensureArray(user?.reviewList);

  const productReviews = useMemo(() => {
    const storeProductReviews = ensureArray(reviews).filter(
      (review) => String(review.productId) === String(product?.id)
    );

    const userOnlyReviews = userReviewList.filter(
      (review) =>
        String(review.productId) === String(product?.id) &&
        !storeProductReviews.some((storeReview) => storeReview.id === review.id)
    );

    return [...storeProductReviews, ...userOnlyReviews, ...previewReviews];
  }, [product?.id, previewReviews, reviews, userReviewList]);

  const selectedReview = productReviews.find(
    (review, index) => getReviewId(review, index) === selectedReviewId
  );
  const pendingDeleteReview = productReviews.find(
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLogin) {
      onRequireLogin?.();
      return;
    }

    if (!content.trim()) {
      return;
    }

    const newReview = {
      id: `review-${product.id}-${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      rating,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      author: user?.nickname || user?.name || 'PULSE MEMBER',
      authorType: user?.nickname ? 'nickname' : user?.name ? 'name' : 'nickname',
      authorId: user?.id || '',
    };

    addReview(newReview);
    syncUserReviewList([newReview, ...userReviewList]);
    setRating(5);
    setContent('');
  };

  const handleOpenEditModal = (review, index) => {
    setSelectedReviewId(getReviewId(review, index));
    setDraftContent(getReviewContent(review));
    setDraftRating(getReviewRating(review));
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedReviewId(null);
  };

  const handleOpenDeleteModal = (reviewId) => {
    setPendingDeleteId(reviewId);
  };

  const handleCloseDeleteModal = () => {
    setPendingDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) {
      return;
    }

    const hasStoreReview = ensureArray(reviews).some((review) => review.id === pendingDeleteId);

    if (hasStoreReview) {
      deleteReview(pendingDeleteId);
    } else {
      setPreviewReviews((prev) => prev.filter((review) => review.id !== pendingDeleteId));
    }

    const nextUserReviewList = userReviewList.filter((review) => review.id !== pendingDeleteId);
    syncUserReviewList(nextUserReviewList);
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

    const hasStoreReview = ensureArray(reviews).some((review) => review.id === nextReview.id);

    if (hasStoreReview) {
      updateReview(nextReview);
    } else {
      setPreviewReviews((prev) =>
        prev.map((review) => (review.id === nextReview.id ? nextReview : review))
      );
    }

    const hasUserReview = userReviewList.some((review) => review.id === nextReview.id);
    if (hasUserReview) {
      syncUserReviewList(
        userReviewList.map((review) => (review.id === nextReview.id ? nextReview : review))
      );
    }

    handleCloseEditModal();
  };

  return (
    <ReviewSectionWrap>
      <BaseSection
        label="PLAYER REVIEW"
        title="WRITE"
        colorTitle="REVIEW"
        sub="구매 경험과 플레이 감각을 남겨보세요"
        titleSize="xl"
        inline
        solidColor
      />

      <ComposerCard>
        <ComposerHeader>
          <p>{product.title}에 대한 당신의 경험을 들려주세요.</p>
        </ComposerHeader>

        <form onSubmit={handleSubmit}>
          <RatingRow>
            {Array.from({ length: 5 }, (_, index) => {
              const nextRating = index + 1;

              return (
                <StarButton
                  key={nextRating}
                  type="button"
                  $active={nextRating <= rating}
                  onClick={() => setRating(nextRating)}
                  aria-label={`${nextRating}점 선택`}
                >
                  {nextRating <= rating ? '★' : '☆'}
                </StarButton>
              );
            })}
          </RatingRow>

          <ReviewTextarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="실사용 기준으로 좋았던 점, 아쉬웠던 점을 자유롭게 남겨주세요."
            aria-label="리뷰 작성"
          />

          <ComposerFooter>
            <BaseBtn type="submit" icon={false}>
              리뷰 작성
            </BaseBtn>
          </ComposerFooter>
        </form>
      </ComposerCard>

      {productReviews.length > 0 ? (
        <ReviewList>
          {productReviews
            .slice()
            .reverse()
            .map((review, index) => {
              const reviewId = getReviewId(review, index);
              const isMyReview = review.authorId && review.authorId === user?.id;

              return (
                <ReviewItem key={reviewId}>
                  <ReviewMain>
                    <ReviewThumb>
                      <img src={review.productImage} alt={review.productTitle || product.title} />
                    </ReviewThumb>

                    <ReviewContent>
                      <ReviewHeader>
                        <ProductName>{review.productTitle || product.title}</ProductName>
                        <ReviewMeta>
                          <Rating aria-label={`별점 ${getReviewRating(review)}점`}>
                            {renderStars(getReviewRating(review))}
                          </Rating>
                          <ReviewDate>{formatDate(getReviewDate(review))}</ReviewDate>
                          <ReviewAuthor>{getMaskedAuthor(review)}</ReviewAuthor>
                        </ReviewMeta>
                      </ReviewHeader>

                      <ReviewText>{getReviewContent(review)}</ReviewText>
                    </ReviewContent>
                  </ReviewMain>

                  {isMyReview && (
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
                        onClick={() => handleOpenDeleteModal(reviewId)}
                      >
                        삭제
                      </BaseBtn>
                    </ReviewActions>
                  )}
                </ReviewItem>
              );
            })}
        </ReviewList>
      ) : (
        <EmptyState>아직 작성된 리뷰가 없습니다. 첫 리뷰를 남겨보세요.</EmptyState>
      )}

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
        reviewTitle={pendingDeleteReview?.productTitle || product?.title || ''}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </ReviewSectionWrap>
  );
}
