import styled from '@emotion/styled';
import BaseSparkIcon from '../../../../components/common/BaseSparkIcon';
import BaseBtn from '../../../../components/common/BaseBtn';
import { ArrowIcon } from '../../../../assets/icons/BtnIcon';
import { TONE_BG, TONE_BEAM, BADGE_TONE } from '../../../../utils/toneMap';

const Card = styled.article`
  position: relative;
  overflow: ${({ $hasFlip }) => ($hasFlip ? 'visible' : 'hidden')};
  height: ${({ $height }) => $height || '210px'};
  border-radius: ${({ theme }) => theme.radii.xl};
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  transition:
    transform ${({ theme }) => theme.motion.slow},
    box-shadow ${({ theme }) => theme.motion.slow},
    opacity 320ms ease,
    filter 320ms ease;
  will-change: transform;

  &:hover {
    transform: ${({ $flipped, $isCenter }) =>
      !$isCenter ? 'none' : $flipped ? 'none' : 'translateY(-4px) scale(1.03)'};
    box-shadow: ${({ theme, $tone, $isCenter }) =>
      $isCenter
        ? theme.effects[`hoverShadowCategory${$tone}`] || theme.effects.hoverShadowCategoryBase
        : theme.effects.hoverShadowCategoryBase};
  }

  &:active {
    transform: ${({ $isCenter }) => ($isCenter ? 'scale(0.97)' : 'none')};
    transition: transform 0.1s;
  }

  &:hover .card-img {
    opacity: 1;
    transform: scale(1.08);
  }

  &:hover .card-beam {
    opacity: 1;
    transform: translateX(-50%) scaleY(1.18);
  }

  &:hover .card-spark {
    opacity: ${({ $isCenter }) => ($isCenter ? 1 : 0)};
    transform: ${({ $isCenter }) =>
      $isCenter ? 'translate(-50%, -65%) scale(1.12)' : 'translate(-50%, -65%)'};
  }

  &:hover .card-arrow {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const FlipInner = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  border-radius: inherit;
`;

const FlipFace = styled.div`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  pointer-events: ${({ $flipped }) => ($flipped ? 'none' : 'auto')};
`;

const BackFace = styled(FlipFace)`
  transform: rotateY(180deg);
  pointer-events: ${({ $flipped }) => ($flipped ? 'auto' : 'none')};
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $bg }) => theme.card[$bg]};
`;

const Beam = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 55%;
  height: 70%;
  border-radius: 50% 50% 0 0;
  filter: blur(28px);
  opacity: 0.6;
  transform: translateX(-50%);
  mix-blend-mode: screen;
  background: ${({ theme, $bg }) => theme.effects[$bg]};
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

const SparkContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  opacity: ${({ $isCenter }) => ($isCenter ? 0.72 : 0)};
  transform: translate(-50%, -65%);
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

const BadgeWrap = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  left: ${({ theme }) => theme.spacing[4]};
  z-index: 3;
  pointer-events: ${({ $isCenter }) => ($isCenter ? 'auto' : 'none')};
`;

const ArrowWrap = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  z-index: 3;
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

const Info = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[6]};
  right: ${({ theme }) => theme.spacing[6]};
  bottom: ${({ theme }) => theme.spacing[5]};
  z-index: 2;
`;

const Label = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  line-height: 1.4;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $white, theme }) =>
    $white ? theme.colors.wColor + 'b3' : theme.colors.textSecondary};
`;

const Name = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: ${({ $nameSize, theme }) => $nameSize || theme.fontSize.m};
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${({ $white, theme }) => ($white ? theme.colors.wColor : theme.colors.text)};
  text-shadow: ${({ theme }) =>
    theme.mode === 'light' ? `0 0px 8px rgba(200, 174, 255, 0.4)` : 'none'};
  transition: font-size 300ms ease;
`;

const Count = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ $white, theme }) =>
    $white ? theme.colors.wColor + 'b3' : theme.colors.textSecondary};
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BottomDim = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, transparent 50%);
  pointer-events: none;
`;

const BrowseImg = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${({ $img }) => ($img ? `url(${$img})` : 'none')};
  background-size: cover;
  background-position: ${({ $imgPosition }) => $imgPosition || 'center'};
  opacity: ${({ $imgOpacity }) => $imgOpacity ?? 0.6};
  transform: scale(1);
  mix-blend-mode: ${({ $imgBlendMode }) => $imgBlendMode || 'normal'};
  filter: ${({ $imgFilter }) => $imgFilter || 'none'};
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

const BackBrowseImg = styled(BrowseImg)`
  filter: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'blur(3px) brightness(0.4) saturate(1.5)'
      : 'blur(3px) brightness(0.7) saturate(1.4)'};

  transform: scale(1.2);
  mix-blend-mode: ${({ theme }) => (theme.mode === 'dark' ? 'screen' : 'multiply')};
`;

const CardInner = ({
  tone,
  img,
  imgOpacity,
  imgPosition,
  beamOver,
  badge,
  arrow,
  white,
  label,
  name,
  count,
  nameSize,
  imgBlendMode,
  imgFilter,
  isCenter,
}) => (
  <>
    <Inner $bg={TONE_BG[tone]} />
    {beamOver ? (
      <>
        <BrowseImg
          className="card-img"
          $img={img}
          $imgOpacity={imgOpacity}
          $imgPosition={imgPosition}
          $imgBlendMode={imgBlendMode}
          $imgFilter={imgFilter}
        />
        <Beam className="card-beam" $bg={TONE_BEAM[tone]} />
      </>
    ) : (
      <>
        <Beam className="card-beam" $bg={TONE_BEAM[tone]} />
        <BrowseImg
          className="card-img"
          $img={img}
          $imgOpacity={imgOpacity}
          $imgPosition={imgPosition}
          $imgBlendMode={imgBlendMode}
          $imgFilter={imgFilter}
        />
      </>
    )}
    {white && <BottomDim />}
    <SparkContainer className="card-spark" $isCenter={isCenter}>
      <BaseSparkIcon tone={tone} />
    </SparkContainer>

    {badge && (
      <BadgeWrap $isCenter={isCenter}>
        <BaseBtn
          variant="c-badge"
          tone={BADGE_TONE[badge]}
          flex="0"
          icon={false}
          padding="8px 16px"
          height="32px"
        >
          {badge}
        </BaseBtn>
      </BadgeWrap>
    )}

    {arrow && (
      <ArrowWrap className="card-arrow">
        <BaseBtn variant="ic-btn" flex="0" icon={false} size="32px">
          <ArrowIcon width={14} height={14} />
        </BaseBtn>
      </ArrowWrap>
    )}

    <Info>
      <Label $white={white}>{label}</Label>
      <Name $white={white} $nameSize={nameSize}>{name}</Name>
      <Count $white={white}>{count}</Count>
    </Info>
  </>
);

export default function BaseToneCard({
  label,
  name,
  count,
  tone = 'violet',
  height,
  badge,
  arrow,
  img,
  imgOpacity,
  imgPosition,
  beamOver = false,
  white = false,
  flipped = false,
  backSlot,
  nameSize,
  imgBlendMode,
  imgFilter,
  isCenter = true,
  ...props
}) {
  const hasFlip = !!backSlot;

  return (
    <Card $tone={tone} $height={height} $hasFlip={hasFlip} $flipped={flipped} $isCenter={isCenter} {...props}>
      {hasFlip ? (
        <FlipInner $flipped={flipped}>
          <FlipFace $flipped={flipped}>
            <CardInner
              tone={tone}
              img={img}
              imgOpacity={imgOpacity}
              imgPosition={imgPosition}
              beamOver={beamOver}
              badge={badge}
              arrow={arrow}
              white={white}
              label={label}
              name={name}
              count={count}
              nameSize={nameSize}
              imgBlendMode={imgBlendMode}
              imgFilter={imgFilter}
              isCenter={isCenter}
            />
          </FlipFace>
          <BackFace $flipped={flipped}>
            <Inner $bg={TONE_BG[tone]} />
            <BackBrowseImg $img={img} $imgOpacity={0.8} $imgPosition="bottom" />
            <Beam $bg={TONE_BEAM[tone]} />
            {backSlot}
          </BackFace>
        </FlipInner>
      ) : (
        <CardInner
          tone={tone}
          img={img}
          imgOpacity={imgOpacity}
          imgPosition={imgPosition}
          beamOver={beamOver}
          badge={badge}
          arrow={arrow}
          white={white}
          label={label}
          name={name}
          count={count}
          nameSize={nameSize}
          imgBlendMode={imgBlendMode}
          imgFilter={imgFilter}
          isCenter={isCenter}
        />
      )}
    </Card>
  );
}
