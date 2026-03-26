import styled from '@emotion/styled';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';

export default function CategoryPromoBanner({
  sectionTitle = 'PROMOTION',
  subtitle,
  title,
  description,
  price,
  backgroundImage = 'https://i.ibb.co/b5c2fS1B/6893d733d0a2f60f.webp',
}) {
  return (
    <SectionBlock>
      <SectionHeader>
        <SectionTitle>
          <SectionTitleWithStar>
            <TitleStar>✦</TitleStar>
            {sectionTitle}
            <TitleStar>✦</TitleStar>
          </SectionTitleWithStar>
        </SectionTitle>
      </SectionHeader>

      <PromoBanner backgroundImage={backgroundImage}>
        <PromoOverlay />

        <PromoTextArea>
          <PromoLabel>{subtitle}</PromoLabel>
          <PromoTitle>{title}</PromoTitle>
          <PromoDescription>{description}</PromoDescription>
          <PromoPrice>{price.toLocaleString()}원</PromoPrice>

          <PromoButtonRow>
            <PrimaryButton type="button">장바구니 담기</PrimaryButton>
            <SecondaryButton type="button">바로 구매</SecondaryButton>
          </PromoButtonRow>
        </PromoTextArea>
      </PromoBanner>
    </SectionBlock>
  );
}

const SectionBlock = styled.section`
  margin-top: ${({ theme }) => theme.spacing[20]};
  margin-bottom: ${({ theme }) => theme.spacing[18]};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.08em;
`;

const PromoBanner = styled.article`
  position: relative;
  overflow: hidden;
  min-height: 360px;
  padding: ${({ theme }) => theme.spacing[10]};
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.xxl};
  background:
    url(${({ backgroundImage }) => backgroundImage}) center / cover no-repeat,
    ${({ theme }) => theme.colors.promoBg};
  box-shadow: 0 18px 48px ${({ theme }) => theme.colors.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ theme }) => theme.spacing[8]};
  }
`;

const PromoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(7, 10, 26, 0.88) 0%,
    rgba(7, 10, 26, 0.72) 35%,
    rgba(7, 10, 26, 0.46) 62%,
    rgba(7, 10, 26, 0.18) 100%
  );
`;

const PromoTextArea = styled.div`
  position: relative;
  z-index: 1;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const PromoLabel = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  letter-spacing: 0.12em;
`;

const PromoTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 800;
  background: ${({ theme }) => theme.gradients.Headline};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`;

const PromoDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const PromoPrice = styled.strong`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
`;

const PromoButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[3]};
`;

const PrimaryButton = styled.button`
  min-width: 136px;
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.tones.violet.bg};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.tones.violet.shadow};
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  min-width: 136px;
  height: 44px;
  padding: 0 ${({ theme }) => theme.spacing[5]};
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.btn2Bg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const SectionTitleWithStar = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TitleStar = styled(LavStarIcon)`
  flex-shrink: 0;
`;
