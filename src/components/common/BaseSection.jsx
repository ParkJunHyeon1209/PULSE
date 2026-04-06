import styled from '@emotion/styled';
import { LavStarIcon } from '../../assets/icons/BtnIcon';

const SectionHeadWrap = styled.div`
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
`;

const SectionLabel = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.2em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: 8px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme, $hasSub }) => ($hasSub ? theme.spacing[2] : '0')};
  font-family: ${({ theme, $font }) => theme.fontFamily[$font] || $font || theme.fontFamily.hero};
  font-size: ${({ theme, $size }) => theme.fontSize[$size] || $size || theme.fontSize.xl};
  font-weight: ${({ $weight }) => $weight || 400};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  text-transform: uppercase;
`;

const SectionColorTitle = styled(SectionTitle)`
  margin-bottom: ${({ theme, $hasSub }) => ($hasSub ? theme.spacing[2] : theme.spacing[4])};
  background: ${({ $solid, theme }) => ($solid ? 'none' : theme.gradients.Headline)};
  -webkit-background-clip: ${({ $solid }) => ($solid ? 'unset' : 'text')};
  background-clip: ${({ $solid }) => ($solid ? 'unset' : 'text')};
  color: ${({ $solid, theme }) => ($solid ? theme.colors.primary : 'transparent')};
`;

const TitlePrefix = styled.span`
  font-family: ${({ theme, $font }) => theme.fontFamily[$font] || $font || theme.fontFamily.hero};
  margin-right: 0.1em;
  font-weight: 500;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;

  > h2 {
    margin-bottom: 0;
  }
`;

const SectionSub = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  padding-top: ${({ theme }) => theme.spacing[2]};
  transition: font-size ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding-top: 0;
    font-size: 14px;
  }
`;

/**
 * 섹션 헤딩 컴포넌트
 *
 * label     : 제목 위 작은 레이블 텍스트
 * title     : 메인 제목 (사용X - null)
 * sub       : 제목 아래 보조 설명 (사용X - null)
 * align     : 'left' | 'center' (기본값 'left')
 * titleFont : 타이틀 폰트 변경 (ex: theme.fontFamily.display)
 * titleSize : 타이틀 폰트 크기 변경 (ex: theme.fontSize.xxl)
 * star      : label 오른쪽에 ✦ 추가 여부 (기본값 false)
 */
/**
 * colorTitle : title 아래에 오는 그라디언트 텍스트 라인 (theme.gradients.Headline 사용)
 */
export default function BaseSection({
  label,
  titlePrefix,
  titlePrefixFont,
  title,
  colorTitle,
  sub,
  align = 'left',
  titleFont,
  titleSize,
  titleWeight,
  star = false,
  inline = false,
  solidColor = false,
  className,
}) {
  const isCenter = align === 'center';
  const hasSub = Boolean(sub);

  return (
    <SectionHeadWrap className={className} $center={isCenter}>
      {(label || star) && (
        <SectionLabel $center={isCenter}>
          <LavStarIcon>✦</LavStarIcon>
          {label}
          {star && <LavStarIcon>✦</LavStarIcon>}
        </SectionLabel>
      )}
      {inline && title && colorTitle ? (
        <TitleRow>
          <SectionTitle
            className="base-section-title"
            $hasSub={Boolean(sub)}
            $font={titleFont}
            $size={titleSize}
            $weight={titleWeight}
          >
            {titlePrefix ? (
              <TitlePrefix className="base-section-title-prefix" $font={titlePrefixFont}>
                {titlePrefix}
              </TitlePrefix>
            ) : null}
            {title}
          </SectionTitle>
          <SectionColorTitle
            className="base-section-color-title"
            $hasSub={hasSub}
            $font={titleFont}
            $size={titleSize}
            $weight={titleWeight}
            $solid={solidColor}
          >
            {colorTitle}
          </SectionColorTitle>
        </TitleRow>
      ) : (
        <>
          {title && (
            <SectionTitle
              className="base-section-title"
              $hasSub={Boolean(colorTitle || sub)}
              $font={titleFont}
              $size={titleSize}
              $weight={titleWeight}
            >
              {titlePrefix ? (
                <TitlePrefix className="base-section-title-prefix" $font={titlePrefixFont}>
                  {titlePrefix}
                </TitlePrefix>
              ) : null}
              {title}
            </SectionTitle>
          )}
          {colorTitle && (
            <SectionColorTitle
              className="base-section-color-title"
              $hasSub={hasSub}
              $font={titleFont}
              $size={titleSize}
              $weight={titleWeight}
              $solid={solidColor}
            >
              {colorTitle}
            </SectionColorTitle>
          )}
        </>
      )}
      {sub ? <SectionSub>{sub}</SectionSub> : null}
    </SectionHeadWrap>
  );
}
