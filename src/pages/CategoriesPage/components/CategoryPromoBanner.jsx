import styled from '@emotion/styled';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';
import BaseBtn from '../../../components/common/BaseBtn';
import { useNavigate } from 'react-router-dom';
import useOverlayStore from '../../../store/useOverlayStore';

export default function CategoryPromoBanner({
  sectionTitle = 'PROMOTION',
  subtitle,
  title,
  description,
  price,
  backgroundImage = 'https://i.ibb.co/b5c2fS1B/6893d733d0a2f60f.webp',
}) {
  const navigate = useNavigate();
  const openModal = useOverlayStore((s) => s.openModal);

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
            <BaseBtn type="button" icon={false} onClick={() => navigate('/categories/')}>컬렉션 보기</BaseBtn>
            <BaseBtn variant="secondary" type="button" onClick={() => openModal('dropAlert')}>드롭 알림 신청</BaseBtn>
          </PromoButtonRow>
        </PromoTextArea>
      </PromoBanner>
    </SectionBlock>
  );
}

const SectionBlock = styled.section`
  margin-top: ${({ theme }) => theme.spacing[24]};
  margin-bottom: ${({ theme }) => theme.spacing[20]};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.m};
  /* font-weight: 600; */
  color: ${({ theme }) => theme.colors.text};
  transition: font-size ${({ theme }) => theme.motion.normal};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 18px;
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-height: 280px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 240px;
    justify-content: center;
  }
`;

const PromoOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background}ee 10%,
    ${({ theme }) => theme.colors.background}bb 30%,
    ${({ theme }) => theme.colors.background}55 40%,
    transparent 100%
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background}ee 0%,
      ${({ theme }) => theme.colors.background}bb 40%,
      ${({ theme }) => theme.colors.background}55 100%,
      transparent 100%
    );
  }
`;

const PromoTextArea = styled.div`
  position: relative;
  z-index: 1;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }
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
  transition: font-size ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const PromoDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  transition: font-size ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const PromoPrice = styled.strong`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 800;
  transition: font-size ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const PromoButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[3]};
`;


const SectionTitleWithStar = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const TitleStar = styled(LavStarIcon)`
  flex-shrink: 0;
`;
