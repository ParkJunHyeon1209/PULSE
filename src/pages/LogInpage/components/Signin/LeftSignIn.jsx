import styled from '@emotion/styled';
import BaseSection from '../../../../components/common/BaseSection';

const BottomContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  width: 100%;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainHeading = styled.h2`
  font-size: 30px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 3px;
  margin-bottom: ${({ theme }) => theme.spacing[4]};

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

export default function LeftSignIn() {
  return (
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
  );
}
