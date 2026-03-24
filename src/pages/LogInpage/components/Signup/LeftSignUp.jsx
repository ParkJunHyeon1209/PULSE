import styled from '@emotion/styled';
import BaseSection from '../../../../components/common/BaseSection';

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  width: 100%;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const MainHeading = styled.h2`
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 3px;

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

export default function LeftSignUp() {
  return (
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
  );
}
