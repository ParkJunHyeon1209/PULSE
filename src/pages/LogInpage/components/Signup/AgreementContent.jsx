import styled from '@emotion/styled';
import React from 'react';
import BaseBtn from '../../../../components/common/BaseBtn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AllAgreeBox = styled.div`
  background: ${({ theme }) => theme.tones.violet.containerBg};
  box-shadow: ${({ theme }) => theme.tones.violet.activeShadow};
  border: 1px solid ${({ theme }) => theme.tones.violet.activeBorder};
  padding: 16px;
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
      font-size: 13px;
      color: ${({ theme }) => theme.colors.text};
    }

    .sub-text {
      font-size: 12px;
      margin-top: 2px;
      color: ${({ theme }) => theme.colors.textSecondary};
      text-decoration: underline;
    }
  }
`;
const CustomCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.checkbox.border};
  background: ${(props) => (props.checked ? props.theme.tones.violet.tabActiveBg : 'transparent')};
  box-shadow: ${({ theme }) => theme.checkbox.shadow};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-group {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.text};
  }
`;
const AllAgreeCheckbox = styled(CustomCheckbox)`
  background: ${(props) => (props.checked ? props.theme.checkbox.bg : 'transparent')};
  border: 1px solid ${({ theme }) => theme.checkbox.border};
  box-shadow: ${({ theme }) => theme.checkbox.shadow};
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.Line};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Badge = styled.span`
  font-size: 12px;
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
  font-size: 16px;
`;

const ViewBtn = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.btn.secondaryBorder};
  cursor: pointer;
  text-decoration: underline;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const CloseBtn = styled.button`
  width: 79px;
  background: ${({ theme }) => theme.tabs.itemHoverBg};
  border: 1px solid ${({ theme }) => theme.Line};
  color: ${({ theme }) => theme.tabs.itemColor};
  padding: 14px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function AgreementContent({ agreement, setAgreement, onClose }) {
  const isAllAgreed = agreement.agreeTerms && agreement.agreePrivacy && agreement.agreeMarketing;
  const canSubmit = agreement.agreeTerms && agreement.agreePrivacy;

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
          <CheckSection onClick={() => handleCheck('agreeTerms')}>
            <CustomCheckbox checked={agreement.agreeTerms}>
              {agreement.agreeTerms && <span>✔</span>}
            </CustomCheckbox>
            <Badge isRequired>필수</Badge>
            <LabelText $checked={agreement.agreeTerms}>서비스 이용약관</LabelText>
          </CheckSection>
          <ViewBtn>보기 &gt;</ViewBtn>
        </ItemWrapper>

        <Divider />

        <ItemWrapper>
          <CheckSection onClick={() => handleCheck('agreePrivacy')}>
            <CustomCheckbox checked={agreement.agreePrivacy}>
              {agreement.agreePrivacy && <span>✔</span>}
            </CustomCheckbox>
            <Badge isRequired>필수</Badge>
            <LabelText $checked={agreement.agreePrivacy}>개인정보처리방침</LabelText>
          </CheckSection>
          <ViewBtn>보기 &gt;</ViewBtn>
        </ItemWrapper>

        <Divider />

        <ItemWrapper>
          <CheckSection onClick={() => handleCheck('agreeMarketing')}>
            <CustomCheckbox checked={agreement.agreeMarketing}>
              {agreement.agreeMarketing && <span>✔</span>}
            </CustomCheckbox>
            <Badge>선택</Badge>
            <LabelText $checked={agreement.agreeMarketing}>마케팅 정보 수신 동의</LabelText>
          </CheckSection>
          <ViewBtn>보기 &gt;</ViewBtn>
        </ItemWrapper>
      </ListContainer>

      <Divider />

      <ButtonGroup>
        <CloseBtn onClick={onClose}>닫기</CloseBtn>
        <BaseBtn height="49px" flex="4" disabled={!canSubmit} onClick={onClose}>
          동의하고 시작하기
        </BaseBtn>
      </ButtonGroup>
    </Container>
  );
}
