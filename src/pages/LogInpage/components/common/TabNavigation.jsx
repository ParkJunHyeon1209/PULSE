import React from 'react';
import styled from '@emotion/styled';

const TabWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[1]};
  background: ${({ theme, $mode }) => (theme.tones[$mode] || theme.tones.violet).containerBg};
  border: 1px solid
    ${({ theme, $mode }) => (theme.tones[$mode] || theme.tones.violet).containerBorder};
  border-radius: 10px;
  width: 100%;
  max-width: 340px;
  margin-bottom: ${({ theme }) => theme.spacing[10]};
  box-shadow: ${({ theme, $mode }) => (theme.tones[$mode] || theme.tones.violet).containerShadow};
  transition: all 0.3s ease;
`;

const TabButton = styled.button`
  flex: 1;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  background: ${({ theme, $active, $mode }) =>
    $active ? (theme.tones[$mode] || theme.tones.violet).tabActiveBg : 'transparent'};

  color: ${({ theme, $active, $mode }) =>
    $active ? (theme.tones[$mode] || theme.tones.violet).activeColor : '#555'};

  border-bottom: ${({ theme, $active, $mode }) =>
    $active
      ? `3px solid ${(theme.tones[$mode] || theme.tones.violet).activeBorder}`
      : '3px solid transparent'};

  box-shadow: ${({ theme, $active, $mode }) =>
    $active ? (theme.tones[$mode] || theme.tones.violet).activeShadow : 'none'};

  &:hover {
    color: ${({ theme, $mode }) => (theme.tones[$mode] || theme.tones.violet).hoverColor};
  }
`;

export default function TabNavigation({ activeTab, setActiveTab }) {
  const currentMode = activeTab === 'signup' ? 'blue' : 'violet';

  return (
    <TabWrapper $mode={currentMode}>
      <TabButton
        $active={activeTab === 'signin'}
        $mode="violet"
        onClick={() => setActiveTab('signin')}
      >
        SIGN IN
      </TabButton>
      <TabButton
        $active={activeTab === 'signup'}
        $mode="blue"
        onClick={() => setActiveTab('signup')}
      >
        SIGN UP
      </TabButton>
    </TabWrapper>
  );
}
