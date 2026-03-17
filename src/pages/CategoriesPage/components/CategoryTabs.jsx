import styled from '@emotion/styled';

const TabSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.spacing[3]} 0;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.gradients.violetBlue};
  mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 15%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0.25) 85%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 0, 0, 0.25) 1%,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 0.25) 99%,
    transparent 100%
  );
`;

const CategoryTabList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.tabs.gap};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`;

const CategoryTabButton = styled.button`
  min-width: 96px;
  height: 42px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: 1px solid
    ${({ theme, isActive }) => (isActive ? theme.variants.violet.activeBorder : 'transparent')};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, isActive }) =>
    isActive ? theme.variants.violet.tabActiveBg : 'transparent'};
  color: ${({ theme, isActive }) =>
    isActive ? theme.variants.violet.activeColor : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  box-shadow: ${({ theme, isActive }) => (isActive ? theme.variants.violet.activeShadow : 'none')};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: rgba(255, 255, 255, 0.04);
  }
`;

export default function CategoryTabs({ tabs, activeTab, onClickTab }) {
  return (
    <TabSection>
      <SectionDivider />
      <CategoryTabList>
        {tabs.map((tab) => (
          <CategoryTabButton
            key={tab}
            type="button"
            isActive={activeTab === tab}
            onClick={() => onClickTab(tab)}
          >
            {tab}
          </CategoryTabButton>
        ))}
      </CategoryTabList>
      <SectionDivider />
    </TabSection>
  );
}
