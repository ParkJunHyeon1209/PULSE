import { useState } from 'react';
import SignInForm from './components/Signin/SignInForm';
import SignUpForm from './components/Signup/SignUpForm';
import styled from '@emotion/styled';
import AuthLeftPanel from './components/common/AuthLeftPanel';
import TabNavigation from './components/common/TabNavigation';
import AppLogo from '../../components/common/AppLogo';
import BaseWipModal from '../../components/common/modals/BaseWipModal';
import logoDark from '../../assets/Logo-dark.svg';
import logoLight from '../../assets/Logo-wite.svg';
import { useTheme } from '@emotion/react';

const LogInPageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  
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
  top: calc(${({ theme }) => theme.spacing[4]} + ${({ theme }) => theme.spacing[6]});
  left: max(
    ${({ theme }) => theme.grid.margin},
    calc((100vw - ${({ theme }) => theme.grid.max}) / 2 + ${({ theme }) => theme.grid.margin})
  );
  z-index: 3;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;


const LeftSection = styled.div`
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  min-height: 100dvh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;


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
      
      <LeftSection>
        <AuthLeftPanel mode={activeTab} />
      </LeftSection>

      
      <RightSection>
        
        <div className="form-area">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'signin' ? (
            <SignInForm onClick={() => setActiveTab('signup')} />
          ) : (
            <SignUpForm setActiveTab={setActiveTab} onClick={() => setActiveTab('signin')} />
          )}
        </div>
      </RightSection>
      <BaseWipModal id="googleLoginWip" label="SOCIAL LOGIN" title="Google 로그인" />
      <BaseWipModal id="naverLoginWip" label="SOCIAL LOGIN" title="네이버 로그인" />
    </LogInPageContainer>
  );
}
