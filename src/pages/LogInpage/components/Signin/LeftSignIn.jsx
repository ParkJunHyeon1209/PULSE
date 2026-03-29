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
  line-height: 30px;
  letter-spacing: 3px;
  margin-top: 2px;

  span {
    background: ${({ theme }) => theme.gradients.Headline};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  white-space: pre-line;
  margin-top: 11px;
`;

const DataWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[14]};
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 240px;
  animation: ${pulseBeat} 1.5s ease-in-out infinite;
`;

const Circle = styled.div`
  position: absolute;
  border: 1px solid rgba(167, 139, 250, 0.22);
  border-radius: 50%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  opacity: ${(props) => props.opacity};
`;

const Glow = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #bf55ec 0%, transparent 70%);
  filter: blur(10px);
  z-index: 1;
`;
const WavePath = styled.svg`
  position: absolute;
  width: 260px;
  height: 150px;
  z-index: 2;
  stroke: #a78bfa;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 1000;
  animation: ${waveFlow} 4s linear infinite;
`;
export default function LeftSignIn() {
  return (
    <div className="left-content-wrapper">
      <CenterArea>
        <PulseWrapper>
          <Circle size={240} opacity={0.2} />
          <Circle size={180} opacity={0.4} />
          <Circle size={124} opacity={0.6} />
          <Circle size={80} opacity={0.8} />
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
          <BaseSection label={`PLAY YOUR SIGNAL • 2026 S/S`} />
          <MainHeading>
            모든 장비엔
            <br />
            고유한 <span>PULSE</span>가 있다.
          </MainHeading>
          <Description>{'감각을 증폭하는 기어. 당신의 플레이를 \n 정의하는 신호.'}</Description>
        </TextGroup>
        <DataWrapper>
          <DataBox>
            <DataStat>5EAR</DataStat>
            <DataLabel>신호의 종류</DataLabel>
          </DataBox>
          <DataBox>
            <DataStat>1MS</DataStat>
            <DataLabel>반응의 순간</DataLabel>
          </DataBox>
          <DataBox>
            <DataStat>100</DataStat>
            <DataLabel>완전 드롭</DataLabel>
          </DataBox>
        </DataWrapper>
      </BottomContent>
    </div>
  );
}
