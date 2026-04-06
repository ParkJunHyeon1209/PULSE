import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const TabSection = styled.section`
  margin-bottom: ${({ theme, $inHero }) => ($inHero ? '0' : theme.spacing[12])};
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
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
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing[3]} 0;
  gap: ${({ theme }) => theme.tabs.gap};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`;

const SlidingIndicator = styled.div`
  margin-top: ${({ theme }) => theme.spacing[3]};
  position: absolute;
  top: 0;
  left: 0;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.tones.violet.activeBorder};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.tones.violet.tabActiveBg};
  box-shadow: ${({ theme }) => theme.tones.violet.activeShadow};
  pointer-events: none;
  z-index: 0;
  transition:
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
    width 260ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 180ms ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const CategoryTabButton = styled.button`
  position: relative;
  z-index: 1;
  min-width: 96px;
  height: 36px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.tones.violet.activeColor : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: ${({ isFocused }) => (isFocused ? 700 : 500)};
  cursor: pointer;
  transition:
    color ${({ theme }) => theme.motion.fast},
    font-weight ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function CategoryTabs({ tabs, activeTab, onClickTab, inHero = false }) {
  const listRef = useRef(null);
  const buttonRefs = useRef({});
  const [hoveredTab, setHoveredTab] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    x: 0,
    width: 0,
    visible: false,
  });

  const focusedTab = hoveredTab || activeTab;

  const updateIndicator = (tab) => {
    requestAnimationFrame(() => {
      const listEl = listRef.current;
      const buttonEl = buttonRefs.current[tab];

      if (!listEl || !buttonEl) {
        setIndicatorStyle((prev) => ({ ...prev, visible: false }));
        return;
      }

      const listRect = listEl.getBoundingClientRect();
      const buttonRect = buttonEl.getBoundingClientRect();

      setIndicatorStyle({
        x: buttonRect.left - listRect.left,
        width: buttonRect.width,
        visible: true,
      });
    });
  };

  useEffect(() => {
    updateIndicator(focusedTab);
  }, [focusedTab, tabs]);

  useEffect(() => {
    const handleResize = () => updateIndicator(focusedTab);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [focusedTab]);

  return (
    <TabSection $inHero={inHero}>
      <SectionDivider />

      <CategoryTabList ref={listRef} onMouseLeave={() => setHoveredTab(null)}>
        <SlidingIndicator
          visible={indicatorStyle.visible}
          style={{
            width: `${indicatorStyle.width}px`,
            transform: `translateX(${indicatorStyle.x}px)`,
          }}
        />

        {tabs.map((tab) => {
          const isFocused = focusedTab === tab;

          return (
            <CategoryTabButton
              key={tab}
              ref={(el) => {
                buttonRefs.current[tab] = el;
              }}
              type="button"
              isFocused={isFocused}
              onMouseEnter={() => setHoveredTab(tab)}
              onFocus={() => setHoveredTab(tab)}
              onBlur={() => setHoveredTab(null)}
              onClick={() => onClickTab(tab)}
            >
              {tab}
            </CategoryTabButton>
          );
        })}
      </CategoryTabList>

      <SectionDivider />
    </TabSection>
  );
}
