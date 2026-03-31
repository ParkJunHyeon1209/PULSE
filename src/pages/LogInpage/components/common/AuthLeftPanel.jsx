import styled from '@emotion/styled';
import BaseSection from '../../../../components/common/BaseSection';
import SlotText from '../../../../components/common/SlotText';
import { authToneMap } from '../../authToneMap';
import AuthLeftSvg from './AuthLeftSvg';

const PanelShell = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing[20]} 0;
  padding-inline: ${({ theme }) => theme.grid.margin};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme, $tone }) =>
      theme.mode === 'light'
        ? $tone.lightBg
        : `${$tone.darkBg}, ${$tone.darkBase ?? theme.colors.background}`};
    transition: background 1s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: ${({ $tone }) => $tone.gridPattern};
    background-size: ${({ $tone }) => $tone.gridSize};
    opacity: ${({ theme }) => (theme.mode === 'light' ? 0.8 : 0.4)};
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
  }
`;

const Section = styled(BaseSection)`
  div:first-of-type {
    letter-spacing: 1px;
  }
`;
const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: ${({ theme }) => theme.spacing[12]};
  width: 100%;
  position: relative;
  z-index: 2;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainHeading = styled.h2`
  font-size: 30px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 1px;
  margin-top: 2px;

  span {
    background: ${({ $highlight }) => $highlight};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  line-height: 1.6;
  white-space: pre-line;
  margin-top: ${({ theme }) => theme.spacing[3]};
`;

const DataWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[14]};
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing[10]};
  border-top: 1px solid ${({ theme }) => theme.Line};
`;

const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const DataStat = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  line-height: 23px;
  background: ${({ theme }) => theme.gradients.lavBlue};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: ${({ theme }) => theme.fontFamily.hero};
`;

const DataLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  letter-spacing: 1px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
`;

const PANEL_CONFIG = {
  signin: {
    tone: 'violet',
    label: 'PLAY YOUR SIGNAL • 2026 S/S',
    heading: (
      <>
        모든 장비엔
        <br />
        고유한 <span>PULSE</span>가 있다.
      </>
    ),
    description: '감각을 증폭하는 기어. 당신의 플레이를 정의하는 신호.',
    stats: [
      { stat: '5EAR', label: '신호의 종류' },
      { stat: '1MS', label: '반응의 순간' },
      { stat: '100', label: '한정 드롭' },
    ],
  },
  signup: {
    tone: 'blue',
    label: 'NEW SIGNAL • 지금 시작하세요',
    heading: (
      <>
        당신의 플레이
        <br />
        방식대로 <span>설정</span>하세요.
      </>
    ),
    description: '드롭 알림부터 위시리스트까지. PULSE 멤버만의 신호가 시작됩니다.',
    stats: [
      { stat: 'FREE', label: '회원가입' },
      { stat: '24H', label: '드롭 알림' },
      { stat: 'INF', label: '위시리스트' },
    ],
  },
};

export default function AuthLeftPanel({ mode = 'signin' }) {
  const { tone, label, heading, description, stats } = PANEL_CONFIG[mode] || PANEL_CONFIG.signin;
  const toneConfig = authToneMap[tone];

  return (
    <PanelShell className="left-content-wrapper" $tone={toneConfig}>
      <AuthLeftSvg tone={tone} />

      <BottomContent>
        <TextGroup>
          <Section label={label} />
          <MainHeading $highlight={toneConfig.highlight}>{heading}</MainHeading>
          <Description>{description}</Description>
        </TextGroup>
        <DataWrapper>
          {stats.map((item) => (
            <DataBox key={item.label}>
              <DataStat>
                <SlotText value={item.stat} />
              </DataStat>
              <DataLabel>{item.label}</DataLabel>
            </DataBox>
          ))}
        </DataWrapper>
      </BottomContent>
    </PanelShell>
  );
}
