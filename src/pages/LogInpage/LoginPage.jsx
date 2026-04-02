import { useState } from 'react';
import SignInForm from './components/Signin/SignInForm';
import SignUpForm from './components/Signup/SignUpForm';
import styled from '@emotion/styled';
import AuthLeftPanel from './components/common/AuthLeftPanel';
import TabNavigation from './components/common/TabNavigation';
import AppLogo from '../../components/common/AppLogo';
import logoDark from '../../assets/Logo-dark.svg';
import logoLight from '../../assets/Logo-wite.svg';
import { useTheme } from '@emotion/react';

const LogInPageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  /* Chrome 테마가 인풋 배경을 덮지 않도록 배경색으로 고정 */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text + 'cc'};
    caret-color: ${({ theme }) => theme.colors.text + 'cc'};
    -webkit-box-shadow: 0 0 0 40px ${({ theme }) => theme.colors.background} inset;
    box-shadow: 0 0 0 40px ${({ theme }) => theme.colors.background} inset;
    -webkit-transition:
      background-color 120s ease-out 0s,
      color 120s ease-out 0s,
      box-shadow 0.2s ease;
    transition:
      background-color 120s ease-out 0s,
      color 120s ease-out 0s,
      box-shadow 0.2s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }
`;

const LogoWrap = styled.div`
  position: absolute;
  top: calc(${({ theme }) => theme.spacing[4]} + ${({ theme }) => theme.spacing[5]});
  left: max(
    ${({ theme }) => theme.grid.margin},
    calc((100vw - ${({ theme }) => theme.grid.max}) / 2 + ${({ theme }) => theme.grid.margin})
  );
  z-index: 3;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

// 왼쪽 섹션
const LeftSection = styled.div`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

// 오른쪽 섹션
const RightSection = styled.div`
  flex: 0 0 50%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: ${({ theme }) => theme.grid.margin};
  padding-right: max(
    ${({ theme }) => theme.grid.margin},
    calc((100vw - ${({ theme }) => theme.grid.max}) / 2 + ${({ theme }) => theme.grid.margin})
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1;
    background: ${({ theme }) => theme.colors.background};

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${({ theme }) => theme.gradients.bgMesh};
      opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.6 : 0.4)};
      mix-blend-mode: ${({ theme }) => (theme.mode === 'dark' ? 'screen' : 'multiply')};
      pointer-events: none;
    }
  }

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
  const theme = useTheme();

  return (
    <LogInPageContainer>
      <LogoWrap>
        <AppLogo size="120px" src={theme.mode === 'dark' ? logoDark : logoLight} alt="PULSE" />
      </LogoWrap>
      {/* --- 왼쪽 영역 --- */}
      <LeftSection>
        <AuthLeftPanel mode={activeTab} />
      </LeftSection>

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
