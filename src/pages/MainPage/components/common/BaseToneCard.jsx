import styled from '@emotion/styled';
import BaseSparkIcon from '../../../../components/common/BaseSparkIcon';
import BaseBtn from '../../../../components/common/BaseBtn';
import { ArrowIcon } from '../../../../assets/icons/BtnIcon';
import { TONE_BG, TONE_BEAM, BADGE_TONE } from '../../../../utils/toneMap';

const Card = styled.article`
  position: relative;
  overflow: hidden;
  height: ${({ $height }) => $height || '210px'};
  border-radius: ${({ theme }) => theme.radii.xl};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.effects.hoverShadowCategoryBase};
  transition:
    transform ${({ theme }) => theme.motion.slow},
    box-shadow ${({ theme }) => theme.motion.slow},
    opacity 320ms ease,
    filter 320ms ease,
    box-shadow 320ms ease;
  will-change: transform;

  &:hover {
    transform: scale(1.03);
    box-shadow: ${({ theme, $tone }) =>
      theme.effects[`hoverShadowCategory${$tone}`] || theme.effects.hoverShadowCategoryBase};
  }

  &:active {
    transform: scale(0.97);
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
    opacity: 1;
    transform: translate(-50%, -65%) scale(1.12);
  }

  &:hover .card-arrow {
    opacity: 1;
    transform: translateY(0px);
  }
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
  opacity: 0.72;
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
  bottom: ${({ theme }) => theme.spacing[5]};
  z-index: 2;
`;

const Label = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  line-height: 1;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Name = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.hero};
  font-size: ${({ theme }) => theme.fontSize.m};
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme }) =>
    theme.mode === 'light' ? `0 0px 8px rgba(200, 174, 255, 0.4)` : 'none'};
`;

const Count = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const BrowseImg = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${({ $img }) => ($img ? `url(${$img})` : 'none')};
  background-size: cover;
  background-position: center;
  opacity: ${({ $imgOpacity }) => $imgOpacity ?? 0.6};
  transform: scale(1);
  transition:
    opacity ${({ theme }) => theme.motion.slow},
    transform ${({ theme }) => theme.motion.slow};
`;

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
  beamOver = false,
  ...props
}) {
  return (
    <Card $tone={tone} $height={height} {...props}>
      <Inner $bg={TONE_BG[tone]} />
      {beamOver ? (
        <>
          <BrowseImg className="card-img" $img={img} $imgOpacity={imgOpacity} />
          <Beam className="card-beam" $bg={TONE_BEAM[tone]} />
        </>
      ) : (
        <>
          <Beam className="card-beam" $bg={TONE_BEAM[tone]} />
          <BrowseImg className="card-img" $img={img} $imgOpacity={imgOpacity} />
        </>
      )}
      <SparkContainer className="card-spark">
        <BaseSparkIcon tone={tone} />
      </SparkContainer>

      {badge && (
        <BadgeWrap>
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
        <Label>{label}</Label>
        <Name>{name}</Name>
        <Count>{count}</Count>
      </Info>
    </Card>
  );
}
