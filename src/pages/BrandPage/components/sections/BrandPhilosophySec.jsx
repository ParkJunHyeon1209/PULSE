import React from 'react';
import styled from '@emotion/styled';
import { layoutSection, storyCards } from '../../brandPageData';
import BrandImageSlot from '../shared/BrandImageSlot';
import { BrandSectionHeading, getSoftPanelBackground } from '../shared/brandPageShared';
import { getAccent } from '../../brandAccents';

const SectionBlock = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(20px, 3vw, 40px);
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SurfaceCard = styled.div`
  position: relative;
  padding-top: ${({ theme }) => theme.spacing[5]};
  /* 
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: max(20%, 80px);
    top: 0;
    height: 1px;
    background: ${({ theme }) => theme.gradients.Headline};
    opacity: 0.9;
  } */
`;

const BodyText = styled.p`
  margin: ${({ theme }) => theme.spacing[5]} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: 1.9;
`;

const DetailList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const DetailItem = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme, $accent }) => getAccent(theme, $accent).containerBorder};
  background: ${({ theme }) => getSoftPanelBackground(theme)};
  transition:
    transform ${({ theme }) => theme.motion.normal},
    border-color ${({ theme }) => theme.motion.normal},
    box-shadow ${({ theme }) => theme.motion.normal};

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme, $accent }) => getAccent(theme, $accent).activeBorder};
    box-shadow: ${({ theme, $accent }) => getAccent(theme, $accent).itemHoverShadow};
  }
`;

const DetailTitle = styled.strong`
  display: block;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const DetailDesc = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  line-height: 1.75;
`;

const StoryVisualColumn = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export default function BrandPhilosophySec() {
  return (
    <SectionBlock>
      <PanelGrid>
        <SurfaceCard>
          <BrandSectionHeading {...layoutSection.section} />
          <BodyText>{layoutSection.body}</BodyText>

          <DetailList>
            {layoutSection.details.map((item) => (
              <DetailItem key={item.title} $accent={item.accent}>
                <DetailTitle>{item.title}</DetailTitle>
                <DetailDesc>{item.description}</DetailDesc>
              </DetailItem>
            ))}
          </DetailList>
        </SurfaceCard>

        <StoryVisualColumn>
          {storyCards.map((card) => (
            <BrandImageSlot
              key={card.label}
              label={card.label}
              hint={card.hint}
              ratio="16 / 9"
              accent={card.accent}
              media={card.media}
              objectPosition={card.objectPosition}
              eyebrow={card.eyebrow}
              sparkTone={card.sparkTone}
            />
          ))}
        </StoryVisualColumn>
      </PanelGrid>
    </SectionBlock>
  );
}
