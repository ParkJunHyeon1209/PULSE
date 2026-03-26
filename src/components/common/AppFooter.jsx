import styled from '@emotion/styled';
import BaseBtn from './BaseBtn';
import {
  LavStarIcon,
  TwitterIcon,
  KakaoIcon,
  InstaIcon,
  YoutubeIcon,
} from '../../assets/icons/BtnIcon';
import AppLogo from './AppLogo';

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

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 360px));
    justify-content: center;
    text-align: center;
    gap: ${({ theme }) => theme.spacing[16]};

    & > *:not(:first-of-type) {
      justify-self: auto;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => `${theme.spacing[10]} ${theme.grid.margin} ${theme.spacing[8]}`};
    & > * {
      width: 50%;
      margin: 0 auto;
    }

    & > *:not(:last-child) {
      padding-bottom: ${({ theme }) => theme.spacing[6]};
      border-bottom: 1px solid transparent;
      border-image: ${({ theme }) => theme.foot.divider} 1;
    }
    gap: ${({ theme }) => theme.spacing[10]};
  }
`;

const FootBrand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    align-items: center;
  }
`;

const FootDec = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  max-width: 220px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  white-space: pre-line;
`;

const FootSns = styled.div`
  display: flex;
  height: 100%;
  max-width: fit-content;
  gap: ${({ theme }) => theme.spacing[3]};
  margin: ${({ theme }) => theme.spacing[6]} 0;

  svg {
    opacity: 0.6;
    transition: opacity ${({ theme }) => theme.motion.normal};
  }

  button:hover svg {
    opacity: 1;
  }
`;

const FootCol = styled.div``;

const FootColTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FootColBtn = styled.button`
  display: block;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 400;
  transition:
    color ${({ theme }) => theme.motion.normal},
    transform ${({ theme }) => theme.motion.normal};
  text-align: start;
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    text-align: center;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    transform: translateX(4px);
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
const FootBadge = styled(FootNote)`
  padding-left: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme }) => theme.tones.violet.subtleColor};
`;

export default function AppFooter() {
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
              <BaseBtn variant="ic-btn" aria-label="X" size="36px">
                <TwitterIcon />
              </BaseBtn>
              <BaseBtn variant="ic-btn" aria-label="Kakao" size="36px">
                <KakaoIcon />
              </BaseBtn>
              <BaseBtn variant="ic-btn" aria-label="YouTube" size="36px">
                <YoutubeIcon />
              </BaseBtn>
              <BaseBtn variant="ic-btn" aria-label="Instagram" size="36px">
                <InstaIcon />
              </BaseBtn>
            </FootSns>
          </FootBrand>

          <FootCol>
            <FootColTitle>
              <LavStarIcon>✦</LavStarIcon>Products
            </FootColTitle>
            <FootColBtn type="button">Headset Series</FootColBtn>
            <FootColBtn type="button">Keyboard Series</FootColBtn>
            <FootColBtn type="button">Mouse Series</FootColBtn>
            <FootColBtn type="button">Mic Series</FootColBtn>
            <FootColBtn type="button">Accessories</FootColBtn>
          </FootCol>

          <FootCol>
            <FootColTitle>
              <LavStarIcon>✦</LavStarIcon>Explore
            </FootColTitle>
            <FootColBtn type="button">신제품</FootColBtn>
            <FootColBtn type="button">베스트셀러</FootColBtn>
            <FootColBtn type="button">한정 드롭</FootColBtn>
            <FootColBtn type="button">드롭 일정</FootColBtn>
            <FootColBtn type="button">커뮤니티</FootColBtn>
          </FootCol>

          <FootCol>
            <FootColTitle>
              <LavStarIcon>✦</LavStarIcon>Brand
            </FootColTitle>
            <FootColBtn type="button">브랜드 스토리</FootColBtn>
            <FootColBtn type="button">디자인 시스템</FootColBtn>
            <FootColBtn type="button">Press Kit</FootColBtn>
            <FootColBtn type="button">Contact</FootColBtn>
            <FootColBtn type="button">Privacy</FootColBtn>
          </FootCol>
        </FootInner>

        <FootBottom>
          <FootNote>© 2026 PULSE · Gaming Gear Platform · Brand Concept Project</FootNote>
          <FootBadge>
            <LavStarIcon $animate={true}>✦</LavStarIcon>
            Play Your Signal · 2026 S/S
          </FootBadge>
        </FootBottom>
      </FootWrap>
    </FootScope>
  );
}
