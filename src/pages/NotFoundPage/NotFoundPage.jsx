import useThemeStore from '../../store/useThemeStore';
import AppLogo from '../../components/common/AppLogo';
import darkBg from '../../assets/img/404_dark_1.webp';
import darkBeam from '../../assets/img/404_dark_2.webp';
import lightBg from '../../assets/img/404_light_1.webp';
import lightBeam from '../../assets/img/404_light_2.webp';
import NotFoundBeamSvg from './components/NotFoundBeamSvg';
import NotFoundStars from './components/NotFoundStars';
import NotFoundParticles from './components/NotFoundParticles';
import {
  Arrow,
  BackgroundLayer,
  BeamGlow,
  Description,
  ErrorCode,
  FooterMeta,
  HomeLink,
  LightModeOverlay,
  LogoBar,
  LogoLink,
  NoiseOverlay,
  PageContent,
  PageRoot,
  Title,
} from './styles/NotFoundPage';

const notFoundFooterItems = ['ERR_PAGE_NOT_FOUND', 'PULSE · 2026', 'STATUS · 404'];
const notFoundTheme = {
  dark: {
    background: darkBg,
    beam: darkBeam,
    palette: {
      white: '255,248,255',
      soft: '200,145,255',
      lav: '167,139,250',
      mid: '140,60,255',
      violet: '110,40,220',
      deep: '80,20,200',
    },
  },
  light: {
    background: lightBg,
    beam: lightBeam,
    palette: {
      white: ' 60,0,160',
      soft: ' 80,10,190',
      lav: ' 100,30,210',
      mid: ' 124,58,237',
      violet: ' 140,70,250',
      deep: ' 160,90,255',
    },
  },
};

export default function NotFoundPage() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const { background, beam, palette } = notFoundTheme[isDarkMode ? 'dark' : 'light'];

  return (
    <PageRoot>
      <BackgroundLayer $bgImage={background} $beamImage={beam} />

      <NotFoundStars isDark={isDarkMode} />
      <BeamGlow $isDarkMode={isDarkMode} $beamPalette={palette} />
      <NotFoundBeamSvg beamPalette={palette} />
      <NotFoundParticles isDark={isDarkMode} />
      <LightModeOverlay $isDarkMode={isDarkMode} />
      <NoiseOverlay $isDarkMode={isDarkMode} />

      <LogoBar>
        <LogoLink to="/">
          <AppLogo linked={false} />
        </LogoLink>
      </LogoBar>

      <PageContent>
        <ErrorCode $isDarkMode={isDarkMode}>404</ErrorCode>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Description>
          이 신호는 더 이상 존재하지 않거나
          <br />
          다른 주파수로 이동했을 수 있습니다.
        </Description>
        <HomeLink to="/" $isDarkMode={isDarkMode}>
          <span>홈으로 돌아가기</span>
          <Arrow aria-hidden="true">→</Arrow>
        </HomeLink>
        <FooterMeta>
          {notFoundFooterItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </FooterMeta>
      </PageContent>
    </PageRoot>
  );
}
