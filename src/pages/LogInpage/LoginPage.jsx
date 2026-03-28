import React, { useState } from 'react';
import SignInForm from './components/Signin/SignInForm';
import SignUpForm from './components/Signup/SignUpForm';
import styled from '@emotion/styled';
import LeftSignIn from './components/Signin/LeftSignIn';
import LeftSignUp from './components/Signup/LeftSignUp';
import TabNavigation from './components/common/TabNavigation';

const LogInPageContainer = styled.div`
  display: flex;
  /* width: 100vw; */
  width: 1280px;
  max-width: 1280px;
  margin-top: 42.5px;
  padding-bottom: 60px;
`;

// 왼쪽 섹션
const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  .left-content-wrapper {
    width: 100%;
    max-width: 480px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;

// 오른쪽 섹션
const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .form-area {
    width: 100%;
    max-width: 340px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <LogInPageContainer>
      {/* --- 왼쪽 영역 --- */}
      <LeftSection>{activeTab === 'signin' ? <LeftSignIn /> : <LeftSignUp />}</LeftSection>

      {/* --- 오른쪽 영역 --- */}
      <RightSection>
        {/* 폼 렌더링 영역 */}
        <div className="form-area">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'signin' ? (
            <SignInForm onClick={() => setActiveTab('signup')} />
          ) : (
            <SignUpForm onClick={() => setActiveTab('signin')} />
          )}
        </div>
      </RightSection>
    </LogInPageContainer>
  );
}
