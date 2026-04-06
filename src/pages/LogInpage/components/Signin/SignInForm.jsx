import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../../components/common/BaseBtn';
import SignInEmailInput from '../Signin/SignInEmailInput';
import SignInPasswordInput from '../Signin/SignInPasswordInput';
import SocialBtn from '../common/SocialBtn';
import useAuthStore from '../../../../store/useAuthStore';
import { loginApi } from '../../../../data/authApi';
import FindPw from './FindPw';
import SignModal from '../common/SignModal';
import useWishlistStore from '../../../../store/useWishlistStore';
import useOrderStore from '../../../../store/useOrderStore';
import { getGradeByTotalOrderPrice } from '../../../../utils/myPageMap';

const SignInContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;

  .signin-btn {
    font-weight: 400;
    margin: 20px 0;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  margin-top: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const DividerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ theme }) => theme.Line};
`;

const DividerText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.input.placeholder};
  white-space: nowrap;
`;

const Switch = styled.div`
  gap: ${({ theme }) => theme.spacing[2]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function SignInForm({ onClick }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [findEmail, setFindEmail] = useState('');
  const [isFindPwOpen, setIsFindPwOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const wishIdList = useWishlistStore((state) => state.wishlistIds);
  const orders = useOrderStore((state) => state.orders);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !pw) {
      setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const { login: storeLogin, user: persistedUser } = useAuthStore.getState();

    try {
      const res = await loginApi(email, pw);

      if (res.success) {
        localStorage.setItem('accessToken', res.token);
        const totalOrderPrice = orders.reduce(
          (acc, order) => acc + (Number(order.totalPrice) || 0),
          0
        );
        const savedUser = persistedUser?.id === email ? persistedUser : null;

        const userData = {
          id: email,
          password: pw,
          name: res.userInfo.name,
          nickname: '',
          tel: savedUser?.tel || '',
          orders: orders,
          isHaveOrdered: orders.length > 0,
          totalOrderPrice,
          wishIdList: wishIdList,
          point: savedUser?.point || 0,
          reviews: savedUser?.reviews || [],
          reviewList: savedUser?.reviewList || savedUser?.reviews || [],
          grade: getGradeByTotalOrderPrice(totalOrderPrice),
          hasReceivedFirstOrderCoupon: savedUser?.hasReceivedFirstOrderCoupon || false,
          coupons: savedUser?.coupons || [],
        };

        storeLogin(userData);

        setModalMessage(`${userData.name}님, 환영합니다!`);
        setIsSuccess(true);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('로그인 에러:', error.message);
      setModalMessage('이메일 또는 비밀번호를 확인해주세요.');
      setIsModalOpen(true);
      setLoginError('이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <SignInContainer>
      <StyledForm onSubmit={handleLogin}>
        <Title>다시 돌아왔군요.</Title>
        <SubText>계정에 로그인해 드롭을 놓치지 마세요.</SubText>
        
        <SignInEmailInput email={email} setEmail={setEmail} isFirst />
        
        <SignInPasswordInput
          pw={pw}
          setPw={setPw}
          showPw={showPw}
          setShowPw={setShowPw}
          errorMsg={loginError}
          $isModalOpen={isModalOpen}
        />
        <FindPw
          findEmail={findEmail}
          setFindEmail={setFindEmail}
          isFindPwOpen={isFindPwOpen}
          setIsFindPwOpen={setIsFindPwOpen}
        />

        <BaseBtn
          className="signin-btn"
          variant="primary"
          tone="violet"
          padding="8px 16px"
          type="submit"
          height="42px"
          flex="none"
        >
          SIGN IN
        </BaseBtn>
        <DividerWrapper>
          <Divider />
          <DividerText>or continue with</DividerText>
          <Divider />
        </DividerWrapper>
      </StyledForm>
      <SocialBtn />
      <Switch>
        계정이 없으신가요? <SwitchButton onClick={onClick}>지금 가입하기</SwitchButton>
      </Switch>
      <SignModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          if (isSuccess) {
            navigate('/');
            setIsSuccess(false);
          }
        }}
        message={modalMessage}
      />
    </SignInContainer>
  );
}
