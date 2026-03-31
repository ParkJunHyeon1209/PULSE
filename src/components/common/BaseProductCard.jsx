import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CardWish, CardBadge, CardAddBtn, CardGlow, CardShim } from './CardParts';
import BaseSparkIcon from './BaseSparkIcon';
import { HeartIcon, PluseIcon } from '../../assets/icons/BtnIcon';
import { BADGE_TONE, TONE_BG } from '../../utils/toneMap';
import useCartStore from '../../store/useCartStore';
import useAuthStore from '../../store/useAuthStore';
import useWishlistStore from '../../store/useWishlistStore';
import BaseModal from './BaseModal';
import BaseBtn from './BaseBtn';

const CardContainer = styled.article`
  position: relative;
  min-height: ${({ $cardMinHeight }) => $cardMinHeight || '372px'};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.xxl};
  background: ${({ $tone, theme }) => theme.card[TONE_BG[$tone]]};
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal},
    border-radius ${({ theme }) => theme.motion.normal};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-radius: ${({ theme }) => theme.radii.xl};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    z-index: 2;
    background: ${({ $tone, theme }) => theme.cardLine[$tone]};
    opacity: 0.7;
    transition:
      opacity 0.4s,
      height 0.4s;
    border-radius: 0 0 ${({ theme }) => theme.radii.xxl} ${({ theme }) => theme.radii.xxl};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ $tone, theme }) => theme.effects[`hoverShadowCategory${$tone}`]};
  }

  &:hover .card-overlay::after {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
    height: 2px;
  }

  &:hover .card-glow {
    opacity: 1;
  }

  &:hover .card-shim {
    opacity: 1;
    transform: translateX(110%);
    transition:
      opacity 0.15s ease-in,
      transform 0.72s cubic-bezier(0.22, 0.8, 0.36, 1);
  }

  &:hover .card-wish {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover .card-bg-img {
    transform: scale(1.08);
    filter: saturate(1.25);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    aspect-ratio: 3 / 4;
    height: auto;
    min-height: unset;
  }
`;

const CardBackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  z-index: 0;
  transform: scale(1);
  filter: saturate(1);
  transition:
    transform ${({ theme }) => theme.motion.slow},
    filter ${({ theme }) => theme.motion.slow};
`;

const CardSparkPos = styled.div`
  position: absolute;
  top: 22%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: ${({ theme }) => theme.colors.cardBgGrad};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.colors.cardBgGradH};
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion.normal};
  }
`;

const CardTop = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[5]};
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  transition: padding ${({ theme }) => theme.motion.normal};

  ${({ $compactPadding, theme }) =>
    $compactPadding &&
    `@media (max-width: 541px) {
      padding: ${theme.spacing[4]};
    }`}
`;

const CardTextGroup = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.wColor};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 800;
  line-height: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.secondary + 'cc'};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardPrice = styled.strong`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.gradients.cardTextG};
  -webkit-background-clip: text;
  background-clip: text;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  color: transparent;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 800;
`;

const ModalButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
`;

const categoryToneMap = {
  gear: 'violet',
  headset: 'blue',
  console: 'pink',
  bundle: 'mint',
  drops: 'indigo',
};

export default function BaseProductCard({ product, cardMinHeight, hideAddBtn, compactPadding }) {
  const navigate = useNavigate();
  const location = useLocation();
  const sparkTone = categoryToneMap[product.category?.toLowerCase()] || 'violet';

  const [isLoginConfirmOpen, setIsLoginConfirmOpen] = useState(false);

  const isLogin = useAuthStore((state) => state.isLogin);
  const handleAddToCart = useCartStore((state) => state.addToCart);

  const wishlistIds = useWishlistStore((state) => state.wishlistIds);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isLiked = useMemo(() => {
    return wishlistIds.includes(product.id);
  }, [wishlistIds, product.id]);

  const handleClickWishlist = (e) => {
    e.stopPropagation();

    if (!isLogin) {
      setIsLoginConfirmOpen(true);
      return;
    }

    toggleWishlist(product.id);
  };

  const handleCloseLoginConfirm = () => {
    setIsLoginConfirmOpen(false);
  };

  const handleMoveLoginPage = () => {
    setIsLoginConfirmOpen(false);

    navigate('/login', {
      state: {
        redirectTo: location.pathname,
      },
    });
  };

  const handleClickAddCart = (e) => {
    e.stopPropagation();
    handleAddToCart(product);
  };

  const handleMoveDetail = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <CardContainer $tone={sparkTone} $cardMinHeight={cardMinHeight} onClick={handleMoveDetail}>
        <CardShim className="card-shim" aria-hidden="true" />

        {product.image ? (
          <CardBackgroundImage className="card-bg-img" src={product.image} alt={product.title} />
        ) : (
          <CardSparkPos>
            <BaseSparkIcon tone={sparkTone} />
          </CardSparkPos>
        )}

        <CardOverlay className="card-overlay" aria-hidden="true" />
        <CardGlow className="card-glow" aria-hidden="true" $tone={sparkTone} />

        <CardTop>
          {product.tag ? (
            <CardBadge variant="c-badge" tone={BADGE_TONE[product.tag]} icon={false} height="32px">
              {product.tag}
            </CardBadge>
          ) : (
            <span />
          )}

          <CardWish
            className="card-wish"
            variant="ic-btn"
            size="32px"
            flex="0 0 auto"
            aria-label="찜하기"
            icon={false}
            onClick={handleClickWishlist}
            $isLiked={isLiked}
          >
            <HeartIcon />
          </CardWish>
        </CardTop>

        <CardContent $compactPadding={compactPadding}>
          <CardTextGroup>
            <CardTitle>{product.title}</CardTitle>
            <CardMeta>{product.meta}</CardMeta>
            <CardPrice>{product.price.toLocaleString()}원</CardPrice>
          </CardTextGroup>
        </CardContent>

        <CardAddBtn
          variant="ic-btn"
          size="36px"
          flex="0 0 auto"
          icon={false}
          type="button"
          onClick={handleClickAddCart}
          $hidden={hideAddBtn}
        >
          <PluseIcon />
        </CardAddBtn>
      </CardContainer>

      <BaseModal
        isOpen={isLoginConfirmOpen}
        label="PULSE PLATFORM"
        onClose={handleCloseLoginConfirm}
        title="로그인이 필요합니다"
      >
        <p>위시리스트에 상품을 담으려면 먼저 로그인해주세요.</p>

        <ModalButtonRow>
          <BaseBtn variant="secondary" onClick={handleCloseLoginConfirm}>
            닫기
          </BaseBtn>
          <BaseBtn onClick={handleMoveLoginPage}>로그인 하러가기</BaseBtn>
        </ModalButtonRow>
      </BaseModal>
    </>
  );
}
