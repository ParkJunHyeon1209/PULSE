import styled from '@emotion/styled';
import React from 'react';
import BaseBtn from '../../../../components/common/BaseBtn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AllAgreeBox = styled.div`
  background: rgba(124, 58, 237, 0.18);
  border: 1px solid rgba(167, 139, 250, 0.38);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .text-group {
    margin-left: 12px;
    gap: 35px;
    display: flex;
    .main-text {
      font-size: 13px;
      color: rgba(240, 238, 255, 1);
    }
    .sub-text {
      font-size: 11px;
      margin-top: 2px;
      color: rgba(200, 205, 255, 0.45);
      text-decoration: underline;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
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

const CustomCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid ${(props) => (props.checked ? '#9d4edd' : '#444')};
  background: ${(props) => (props.checked ? 'rgba(124, 58, 237, 0.12)' : 'transparent')};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-group {
    display: flex;
    justify-content: space-between;
  }
  span {
    color: #fff;
    font-size: 10px;
  }
`;

const Badge = styled.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  background: ${(props) =>
    props.isRequired ? 'rgba(124, 58, 237, 0.12)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${(props) => (props.isRequired ? 'rgba(196, 181, 253, 1)' : 'rgba(200, 205, 255, 0.45)')};
  border: 1px solid
    ${(props) => (props.isRequired ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255, 255, 255, 0.08)')};
`;

const LabelText = styled.span`
  color: #ccc;
  font-size: 16px;
`;

const ViewBtn = styled.span`
  font-size: 11px;
  color: rgba(167, 139, 250, 0.3);
  cursor: pointer;
  text-decoration: underline;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const CloseBtn = styled.button`
  flex: 1;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(200, 205, 255, 0.45);
  padding: 14px;
  border-radius: 30px;
  cursor: pointer;
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
        <CustomCheckbox checked={isAllAgreed}>{isAllAgreed && <span>✔</span>}</CustomCheckbox>
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
            <LabelText>서비스 이용약관</LabelText>
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
            <LabelText>개인정보처리방침</LabelText>
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
            <LabelText>마케팅 정보 수신 동의</LabelText>
          </CheckSection>
          <ViewBtn>보기 &gt;</ViewBtn>
        </ItemWrapper>
      </ListContainer>

      <Divider />

      <ButtonGroup>
        <CloseBtn
          variant="ic-btn"
          size="28px"
          icon={false}
          flex="0"
          onClick={onClose}
          aria-label="닫기"
        >
          닫기
        </CloseBtn>
        <BaseBtn height="49px" flex="4" disabled={!canSubmit} onClick={onClose}>
          동의하고 시작하기
        </BaseBtn>
      </ButtonGroup>
    </Container>
  );
}
