import styled from '@emotion/styled';
import { LavStarIcon } from '../../assets/icons/BtnIcon';

const SectionHeadRoot = styled.div`
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
`;

const SectionLabel = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.28em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  margin: 0 0 ${({ theme, $hasSub }) => ($hasSub ? theme.spacing[2] : '0')};
  font-family: ${({ theme, $font }) => $font || theme.fontFamily.hero};
  font-size: ${({ theme, $size }) => $size || theme.fontSize.xl};
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  text-transform: uppercase;
`;

const SectionSub = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
  padding-top: ${({ theme }) => theme.spacing[2]};
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
export default function BaseSection({
  label,
  title,
  sub,
  align = 'left',
  titleFont,
  titleSize,
  star = false,
}) {
  const isCenter = align === 'center';

  return (
    <SectionHeadRoot $center={isCenter}>
      <SectionLabel $center={isCenter}>
        <LavStarIcon $animate={false}>✦</LavStarIcon>
        {label}
        {star && <LavStarIcon $animate={false}>✦</LavStarIcon>}
      </SectionLabel>
      <SectionTitle $hasSub={Boolean(sub)} $font={titleFont} $size={titleSize}>
        {title}
      </SectionTitle>
      {sub ? <SectionSub>{sub}</SectionSub> : null}
    </SectionHeadRoot>
  );
}
