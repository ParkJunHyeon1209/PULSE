import styled from '@emotion/styled';
import BaseBtn from './BaseBtn';
import {
  LavStarIcon,
  TwitterIcon,
  KakaoIcon,
  YoutubeIcon,
  InstaIcon,
} from '../../assets/icons/BtnIcon';
import AppLogo from './AppLogo';
import useOverlayStore from '../../store/useOverlayStore';
import BaseWipModal from './modals/BaseWipModal';
import { useNavigate } from 'react-router-dom';

const SNS_ITEMS = [
  { id: 'snsTwitter', label: 'SNS', title: 'X (Twitter)', icon: TwitterIcon },
  { id: 'snsKakao', label: 'SNS', title: 'KakaoTalk', icon: KakaoIcon },
  { id: 'snsYoutube', label: 'SNS', title: 'YouTube', icon: YoutubeIcon },
  { id: 'snsInstagram', label: 'SNS', title: 'Instagram', icon: InstaIcon },
];

const FOOTER_COLS = [
  {
    title: 'Explore',
    items: [
      { id: 'exploreNew', label: 'EXPLORE', title: '신제품' },
      { id: 'exploreBest', label: 'EXPLORE', title: '베스트셀러' },
      { id: 'exploreDrop', label: 'EXPLORE', title: '한정 드롭' },
      { id: 'exploreSchedule', label: 'EXPLORE', title: '드롭 일정' },
      { id: 'exploreCommunity', label: 'EXPLORE', title: '커뮤니티' },
    ],
  },
  {
    title: 'Brand',
    items: [
      { id: 'brandStory', label: 'PULSE BRAND', title: '브랜드 스토리' },
      { id: 'brandDesign', label: 'PULSE BRAND', title: '디자인 시스템' },
      { id: 'brandPress', label: 'PULSE BRAND', title: 'Press Kit' },
      { id: 'brandContact', label: 'PULSE BRAND', title: 'Contact' },
      { id: 'brandPrivacy', label: 'PULSE BRAND', title: 'Privacy' },
    ],
  },
];

const GLOBAL_WIP_ITEMS = [
  { id: 'orderExchangeReturn', label: 'ORDER SERVICE', title: '교환·반품' },
];

const ALL_WIP_ITEMS = [...SNS_ITEMS, ...FOOTER_COLS.flatMap((col) => col.items), ...GLOBAL_WIP_ITEMS];

const FootScope = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${({ theme }) => theme.spacing[20]};
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: ${({ theme }) => theme.spacing[12]};
  }
`;

const FootPlanet = styled.div`
  position: relative;
  width: 100%;
  height: clamp(130px, 13vw, 180px);

  &::before {
    content: '';
    position: absolute;
    top: clamp(40px, 4vw, 60px);
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: clamp(220px, 26vw, 360px);

    border-radius: 50%;
    background: ${({ theme }) => theme.foot.backGlow};
    filter: ${({ theme }) => theme.effects.blurCard};
    z-index: -2;
  }
`;

const DecoBox = styled.div`
  position: absolute;

  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: clamp(100px, 9vw, 130px);
  border-top-left-radius: 100% 130%;
  border-top-right-radius: 100% 130%;
  background: ${({ theme }) => theme.foot.decoBand};

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;

    right: 0;
    bottom: -1px;
    border-top-left-radius: 100% 140%;
    border-top-right-radius: 100% 140%;
    background: ${({ theme }) => theme.colors.background};
  }
`;

const FootWrap = styled.footer`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  font-weight: 600;
`;

const FootInner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: ${({ theme }) => theme.grid.max};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[20]} 36px`};
  box-sizing: border-box;

  & > *:not(:first-of-type) {
    justify-self: end;
  }
  & > *:nth-of-type(3) {
    transform: translateX(17px);
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      transform: translateX(0);
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[8]}`};
    /* padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[12]} 36px`}; */

    & > *:first-of-type {
      grid-column: 1 / -1;
      padding-bottom: ${({ theme }) => theme.spacing[8]};
      border-bottom: 1px solid transparent;
      border-image: ${({ theme }) => theme.foot.divider} 1;
    }

    & > *:nth-of-type(2) {
      justify-self: start;
    }

    & > *:nth-of-type(3) {
      justify-self: center;
    }

    & > *:nth-of-type(4) {
      justify-self: end;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing[10]} ${theme.grid.margin} ${theme.spacing[8]}`};
    gap: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[5]} ${theme.spacing[6]}`};
    gap: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[3]}`};
    & > *:nth-of-type(2),
    & > *:nth-of-type(3),
    & > *:nth-of-type(4) {
      justify-self: center;
    }
  }
`;

const FootBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    align-items: start;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FootDec = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  max-width: 220px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  white-space: pre-line;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 1 / -1;
    grid-row: 2;
    margin-top: ${({ theme }) => theme.spacing[3]};
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: center;
    max-width: 220px;
    margin-top: ${({ theme }) => theme.spacing[3]};
  }
`;

const FootSns = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: ${({ theme }) => theme.spacing[6]} 0;

  svg {
    opacity: 0.6;
    transition: opacity ${({ theme }) => theme.motion.normal};
  }

  button:hover svg {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
    align-self: start;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: ${({ theme }) => theme.spacing[4]} auto 0;
  }
`;

const FootCol = styled.div`
  min-width: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    text-align: center;
  }
`;

const FootColTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    font-size ${({ theme }) => theme.motion.normal},
    letter-spacing ${({ theme }) => theme.motion.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    letter-spacing: 0.14em;
  }
`;

const FootColBtn = styled.button`
  display: block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 500;
  opacity: 0.8;
  transition:
    color ${({ theme }) => theme.motion.normal},
    transform ${({ theme }) => theme.motion.normal};
  text-align: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    transform: translateX(4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
  }
`;

const FootBottom = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.grid.max};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[20]}`};
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
    gap: ${({ theme }) => theme.spacing[3]};

    padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[10]}`};
  }
`;

const FootNote = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.06em;
`;

const FootNoteHide = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;
const FootBadge = styled(FootNote)`
  padding-left: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.tones.violet.subtleColor};
`;

export default function AppFooter() {
  const openModal = useOverlayStore((state) => state.openModal);
  const navigate = useNavigate();
  const handleFooterItemClick = (item) => {
    if (item.id === 'brandStory') {
      navigate('/brand');
      return;
    }

    openModal(item.id);
  };

  return (
    <FootScope>
      <FootPlanet aria-hidden="true">
        <DecoBox />
      </FootPlanet>

      <FootWrap>
        <FootInner>
          <FootBrand>
            <AppLogo />
            <FootDec>{'네온이 번지는 순간,\n당신의 플레이가 시작된다.'}</FootDec>
            <FootSns>
              {SNS_ITEMS.map((sns) => (
                <BaseBtn
                  key={sns.id}
                  variant="ic-btn"
                  aria-label={sns.title}
                  size="36px"
                  onClick={() => openModal(sns.id)}
                >
                  <sns.icon />
                </BaseBtn>
              ))}
            </FootSns>
          </FootBrand>

          <FootCol>
            <FootColTitle>
              <LavStarIcon>✦</LavStarIcon>Products
            </FootColTitle>
            <FootColBtn type="button" onClick={() => navigate('/categories')}>
              LineUp Series
            </FootColBtn>
            <FootColBtn type="button" onClick={() => navigate('/categories/headset')}>
              Headset Series
            </FootColBtn>
            <FootColBtn type="button" onClick={() => navigate('/categories/gear')}>
              Gear Series
            </FootColBtn>
            <FootColBtn type="button" onClick={() => navigate('/categories/console')}>
              Console Series
            </FootColBtn>
            <FootColBtn type="button" onClick={() => navigate('/categories/drops')}>
              Drops Series
            </FootColBtn>
          </FootCol>

          {FOOTER_COLS.map((col) => (
            <FootCol key={col.title}>
              <FootColTitle>
                <LavStarIcon>✦</LavStarIcon>
                {col.title}
              </FootColTitle>
              {col.items.map((item) => (
                <FootColBtn key={item.id} type="button" onClick={() => handleFooterItemClick(item)}>
                  {item.title}
                </FootColBtn>
              ))}
            </FootCol>
          ))}
        </FootInner>

        <FootBottom>
          <FootNote>
            © 2026 PULSE · Gaming Gear Platform<FootNoteHide> · Brand Concept Project</FootNoteHide>
          </FootNote>
          <FootBadge>
            <LavStarIcon $animate={true}>✦</LavStarIcon>
            Play Your Signal · 2026 S/S
          </FootBadge>
        </FootBottom>
      </FootWrap>
      {ALL_WIP_ITEMS.map((item) => (
        <BaseWipModal key={item.id} id={item.id} label={item.label} title={item.title} />
      ))}
    </FootScope>
  );
}
