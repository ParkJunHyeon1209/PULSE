import styled from '@emotion/styled';
import React, { useState } from 'react';
import BaseBtn from '../../../../components/common/BaseBtn';
import { ChevronRight, ChevronDown } from '../common/CommonSvg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  max-height: 85vh;
  flex: 1;
`;

const AllAgreeBox = styled.div`
  background: ${({ theme }) => theme.tabs.itemHoverBg};
  box-shadow: ${({ theme }) => theme.tones.violet.activeShadow};
  border: 1px solid ${({ theme }) => theme.tones.violet.activeBorder};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .text-group {
    margin-left: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    .main-text {
      font-size: ${({ theme }) => theme.fontSize.xxs};
      color: ${({ theme }) => theme.colors.text};
    }

    .sub-text {
      font-size: ${({ theme }) => theme.fontSize.xxxs};
      margin-top: 2px;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;
const CustomCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.checkbox.border};
  background: ${(props) => (props.checked ? props.theme.gradients.navActive : 'transparent')};
  /* box-shadow: ${({ theme }) => theme.checkbox.shadow}; */
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-group {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 10px;
    color: ${({ theme }) => theme.colors.wColor};
  }
`;
const AllAgreeCheckbox = styled(CustomCheckbox)`
  width: 18px;
  height: 18px;
  background: ${(props) => (props.checked ? props.theme.gradients.navActive : 'transparent')};
  border: 1px solid ${({ theme }) => theme.checkbox.border};
  /* box-shadow: ${({ theme }) => theme.checkbox.shadow}; */
  border-radius: 4px;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.Line};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[2]} 0;
`;
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CheckSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
`;

const Badge = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  padding: 2px 6px;
  border-radius: 10px;
  background: ${(props) =>
    props.isRequired ? props.theme.tones.violet.tabActiveBg : props.theme.tabs.itemHoverBg};
  color: ${(props) =>
    props.isRequired ? props.theme.tones.violet.color : props.theme.colors.textSecondary};
  border: 1px solid
    ${(props) => (props.isRequired ? props.theme.tones.violet.containerBorder : props.theme.Line)};
`;

const LabelText = styled.span`
  color: ${({ $checked, theme }) => ($checked ? theme.colors.text : theme.tabs.itemHoverColor)};
  font-weight: ${({ $checked }) => ($checked ? 600 : 400)};
  transition: all 0.2s ease;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const ViewBtn = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  opacity: 0.6;
  transition: transform 0.2s;
  transform: ${(props) => (props.$isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const AccordionContent = styled.div`
  max-height: ${(props) => (props.$isOpen ? '150px' : '0')};
  overflow-y: auto;
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    padding 0.3s ease,
    margin 0.3s ease;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: #666;
  line-height: 1.6;
  padding: ${(props) => (props.$isOpen ? '16px' : '0 16px')};
  margin-top: ${(props) => (props.$isOpen ? '12px' : '0')};

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgba(${theme.colors.primaryRgb},.2)`};
    border-radius: 2px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: auto;
`;

export default function AgreementContent({ agreement, setAgreement, onClose }) {
  const isAllAgreed = agreement.agreeTerms && agreement.agreePrivacy && agreement.agreeMarketing;
  const canSubmit = agreement.agreeTerms && agreement.agreePrivacy;

  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const handleAllAgree = () => {
    const nextValue = !isAllAgreed;
    setAgreement({
      agreeTerms: nextValue,
      agreePrivacy: nextValue,
      agreeMarketing: nextValue,
    });
  };

  const handleCheck = (key) => {
    setAgreement((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Container>
      <AllAgreeBox onClick={handleAllAgree}>
        <AllAgreeCheckbox checked={isAllAgreed}>{isAllAgreed && <span>✔</span>}</AllAgreeCheckbox>
        <div className="text-group">
          <strong className="main-text">전체 약관 동의</strong>
          <span className="sub-text">필수 및 선택 항목 모두 동의</span>
        </div>
      </AllAgreeBox>

      <Divider />

      <ListContainer>
        <ItemWrapper>
          <TitleRow>
            <CheckSection onClick={() => handleCheck('agreeTerms')}>
              <CustomCheckbox checked={agreement.agreeTerms}>
                {agreement.agreeTerms && <span>✔</span>}
              </CustomCheckbox>
              <Badge isRequired>필수</Badge>
              <LabelText $checked={agreement.agreeTerms}>서비스 이용약관</LabelText>
            </CheckSection>
            <ViewBtn
              onClick={(e) => {
                e.stopPropagation();
                toggleSection('agreeTerms');
              }}
            >
              보기 {openSection === 'agreeTerms' ? <ChevronDown /> : <ChevronRight />}
            </ViewBtn>
          </TitleRow>
          <AccordionContent $isOpen={openSection === 'agreeTerms'}>
            1. 서비스 이용약관 (필수) <br />
            플랫폼 이용 규칙과 회원의 권리/의무를 규정합니다. <br />
            <br />
            제1조 (목적) <br />
            본 약관은 PULSE 플랫폼이 제공하는 게이밍 기어 전자상거래 서비스 및 커뮤니티 이용과
            관련하여 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다. <br />
            <br />
            제2조 (서비스의 제공 및 변경) <br />
            회사는 게이밍 기어 판매, 제품 정보 제공, 구매 대행 및 배송 서비스를 제공합니다. <br />
            품절 또는 기술적 사양의 변경 등의 경우 장차 체결되는 계약에 의해 제공할 서비스의 내용을
            변경할 수 있습니다. <br />
            <br />
            제3조 (회원의 의무) <br />
            회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안 되며, 관리 소홀로 인한
            책임은 회원 본인에게 있습니다. <br />
            타인의 정보를 도용하거나 회사가 게시한 정보를 변경하는 행위는 금지됩니다. <br />
          </AccordionContent>
        </ItemWrapper>

        <Divider />

        <ItemWrapper>
          <TitleRow>
            <CheckSection onClick={() => handleCheck('agreePrivacy')}>
              <CustomCheckbox checked={agreement.agreePrivacy}>
                {agreement.agreePrivacy && <span>✔</span>}
              </CustomCheckbox>
              <Badge isRequired>필수</Badge>
              <LabelText $checked={agreement.agreePrivacy}>개인정보처리방침</LabelText>
            </CheckSection>

            <ViewBtn
              onClick={(e) => {
                e.stopPropagation();
                toggleSection('agreePrivacy');
              }}
            >
              보기 {openSection === 'agreePrivacy' ? <ChevronDown /> : <ChevronRight />}
            </ViewBtn>
          </TitleRow>
          <AccordionContent $isOpen={openSection === 'agreePrivacy'}>
            2. 개인정보처리방침 (필수) <br />
            개인정보 수집 항목과 목적, 보유 기간을 명시합니다. <br />
            <br />
            1. 수집하는 개인정보 항목 <br />
            • 회원가입 시: 성명, 이메일, 비밀번호, 접속 로그, IP 정보 <br />
            • 상품 주문 시: 배송지 주소, 수령인 연락처, 결제 정보 <br />
            <br />
            2. 개인정보 수집 및 이용 목적 <br />
            • 서비스 제공에 따른 본인 식별 및 구매 계약 이행 <br />
            • 배송 서비스 제공 및 대금 결제 처리 <br />
            • 불량 회원의 부정 이용 방지와 비인가 사용 방지 <br />
            <br />
            3. 개인정보의 보유 및 이용 기간 <br />
            • 회원 탈퇴 시까지 보유하는 것을 원칙으로 하되, 관련 법령(상거래법 등)에 의거하여 일정
            기간(최대 5년) 보관할 수 있습니다. <br />
          </AccordionContent>
        </ItemWrapper>

        <Divider />

        <ItemWrapper>
          <TitleRow>
            <CheckSection onClick={() => handleCheck('agreeMarketing')}>
              <CustomCheckbox checked={agreement.agreeMarketing}>
                {agreement.agreeMarketing && <span>✔</span>}
              </CustomCheckbox>
              <Badge>선택</Badge>
              <LabelText $checked={agreement.agreeMarketing}>마케팅 정보 수신 동의</LabelText>
            </CheckSection>

            <ViewBtn
              onClick={(e) => {
                e.stopPropagation();
                toggleSection('agreeMarketing');
              }}
            >
              보기 {openSection === 'agreeMarketing' ? <ChevronDown /> : <ChevronRight />}
            </ViewBtn>
          </TitleRow>
          <AccordionContent $isOpen={openSection === 'agreeMarketing'}>
            3. 마케팅 정보 수신 동의 (선택)
            <br />
            이벤트 및 신제품 혜택 안내를 위한 동의 사항입니다.
            <br />
            <br />
            1. 수집 및 이용 목적
            <br />
            • PULSE 한정판 게이밍 기어 런칭 소식 및 이벤트 알림
            <br />
            • 맞춤형 쿠폰 혜택 제공 및 뉴스레터 발송
            <br />
            <br />
            2. 수집 항목
            <br />
            • 이메일 주소, 휴대전화 번호, 서비스 이용 기록
            <br />
            <br />
            3. 보유 및 이용 기간 <br />
            • 회원 탈퇴 시 또는 동의 철회 시까지 <br />
            <br />
            4. 동의 거부 권리
            <br />
            • 귀하는 본 동의를 거부할 권리가 있습니다. 단, 거부 시 PULSE 플랫폼에서 제공하는 할인
            혜택 및 신제품 사전 예약 알림 서비스 이용이 제한될 수 있습니다.
            <br />
          </AccordionContent>
        </ItemWrapper>
      </ListContainer>

      <Divider />

      <ButtonGroup>
        <BaseBtn variant="secondary" onClick={onClose}>
          닫기
        </BaseBtn>
        <BaseBtn height="49px" flex="4" disabled={!canSubmit} onClick={onClose}>
          동의하고 시작하기
        </BaseBtn>
      </ButtonGroup>
    </Container>
  );
}
