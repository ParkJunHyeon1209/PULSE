import styled from '@emotion/styled';
import BaseSection from '../../../../components/common/BaseSection';
import { keyframes } from '@emotion/react';

const CenterArea = styled.div`
  width: 480px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: ${({ theme }) => theme.spacing[12]};
  width: 100%;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainHeading = styled.h2`
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 3px;
  margin-top: 2px;

  span {
    color: ${({ theme }) => theme.colors.infoSoft};
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  line-height: 1.6;
  white-space: pre-line;
  margin-top: 11px;
`;

const DataWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[14]};
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing[10]};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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
`;

const DataLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  letter-spacing: 1px;
`;
const pulseBeat = keyframes`
  0%, 100% { transform: scale(0.98); opacity: 0.7; }
  10% { transform: scale(1.1); opacity: 1; } 
  20% { transform: scale(1); opacity: 0.9; }
`;
const waveFlow = keyframes`
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
`;

const PulseWrapper = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${pulseBeat} 1.5s ease-in-out infinite;
`;

const Circle = styled.div`
  position: absolute;
  border: 1px solid rgba(96, 165, 250, 0.45);
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  opacity: ${(props) => props.opacity};
`;

const Glow = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(0, 195, 255, 0.6) 0%, transparent 70%);
  filter: blur(10px);
  z-index: 1;
`;

const WavePath = styled.svg`
  position: absolute;
  width: 260px;
  height: 120px;
  z-index: 2;
  stroke: #60a5fa;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 1000;
  animation: ${waveFlow} 4s linear infinite;
`;

export default function LeftSignUp() {
  return (
    <div className="left-content-wrapper">
      <CenterArea>
        <PulseWrapper>
          <Circle size={240} opacity={0.1} />
          <Circle size={180} opacity={0.2} />
          <Circle size={124} opacity={0.4} />
          <Circle size={80} opacity={0.6} />
          <Glow />
          <WavePath viewBox="0 0 400 40">
            <path
              d="
                M0,20 L20,20 
                L30,0 L40,40 L50,0 L60,40 L70,20 
                L110,20 
                L120,0 L130,40 L140,0 L150,40 L160,20 
                L200,20 
                L210,0 L220,40 L230,0 L240,40 L250,20 
                L290,20 
                L300,0 L310,40 L320,0 L330,40 L340,20 
                L380,20 L390,0 L400,40"
            />
          </WavePath>
        </PulseWrapper>
      </CenterArea>
      <BottomContent>
        <TextGroup>
          <BaseSection label={`NEW SIGNAL • 지금 시작하세요`} />
          <MainHeading>
            당신의 플레이
            <br />
            방식대로 <span>설정</span>하세요.
          </MainHeading>
          <Description>
            {'드롭 알림부터 위시리스트까지.\n PULSE 멤버만의 신호가 시작됩니다.'}
          </Description>
        </TextGroup>
        <DataWrapper>
          <DataBox>
            <DataStat>FREE</DataStat>
            <DataLabel>회원가입</DataLabel>
          </DataBox>
          <DataBox>
            <DataStat>24H</DataStat>
            <DataLabel>드롭 알림</DataLabel>
          </DataBox>
          <DataBox>
            <DataStat>∞</DataStat>
            <DataLabel>위시리스트</DataLabel>
          </DataBox>
        </DataWrapper>
      </BottomContent>
    </div>
  );
}
