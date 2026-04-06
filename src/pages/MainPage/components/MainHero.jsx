import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSlider from '../../../hooks/useSlider';
import { LavStarIcon } from '../../../assets/icons/BtnIcon';
import SlotText from '../../../components/common/SlotText';
import HeroBannerSlide from './HeroBannerSlide';
import PulseLineSvg from './HeroPulseSvg';
import * as S from './styles/MainHero';
import useOverlayStore from '../../../store/useOverlayStore';


const HERO_SLIDES = [
  {
    id: '1',
    label: 'PULSE',
    introLabel: 'Energy · Signal · Glow',
    title: 'ENTER',
    titleGrad: 'THE PULSE',
    copy: '다크 네온 글라스 감성의 게이밍 기어 플랫폼.',

    stats: [
      { value: '05g', label: '신호의 종류' },
      { value: '1ms', label: '반응의 순간' },
      { value: 'RGB', label: '빛의 언어' },
    ],
  },
  {
    id: '2',
    label: 'DROPS',
    introLabel: 'Exclusive · Limited · Now',
    title: 'FEEL',
    titleGrad: 'THE DROP',
    copy: '한정 수량 드롭. 지금 바로 소장하세요.',

    stats: [
      { value: '24H', label: '한정 판매' },
      { value: '99+', label: '신규 아이템' },
      { value: 'VIP', label: '우선 구매' },
    ],
  },
  {
    id: '3',
    label: 'COLLAB',
    introLabel: 'Collab · Special · Edition',
    title: 'RIDE',
    titleGrad: 'THE WAVE',
    copy: '브랜드 협업 스페셜 에디션 컬렉션.',

    stats: [
      { value: '3X', label: '협업 브랜드' },
      { value: 'NEW', label: '익스클루시브' },
      { value: 'S/S', label: '시즌 한정' },
    ],
  },
];

export default function MainHero({ interval = 4000 }) {
  const openModal = useOverlayStore((state) => state.openModal);
  const navigate = useNavigate();
  const count = HERO_SLIDES.length;
  const [slideIndex, setSlideIndex] = useState(1);
  const [useMotion, setUseMotion] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const isMovingRef = useRef(false);
  const timerRef = useRef(null);
  const slideIndexRef = useRef(1);

  const resetLoopSlide = useCallback((nextIndex) => {
    clearTimeout(timerRef.current);
    slideIndexRef.current = nextIndex;
    setUseMotion(false);
    setSlideIndex(nextIndex);
    timerRef.current = setTimeout(() => {
      setUseMotion(true);
      isMovingRef.current = false;
    }, 40);
  }, []);

  const moveTo = useCallback((nextIndex) => {
    if (isMovingRef.current) return;
    isMovingRef.current = true;
    slideIndexRef.current = nextIndex;
    setTextVisible(false);
    setSlideIndex(nextIndex);
  }, []);

  const moveSlide = useCallback((direction) => moveTo(slideIndexRef.current + direction), [moveTo]);

  const tickForward = useCallback(() => moveSlide(1), [moveSlide]);
  const { activeIndex, setActiveIndex, setIsPaused } = useSlider(count, interval, tickForward);

  const goToSlide = useCallback(
    (index) => {
      if (index !== (slideIndexRef.current - 1 + count) % count) {
        setActiveIndex(index);
        moveTo(index + 1);
      }
    },
    [count, moveTo, setActiveIndex]
  );

  const handleTransitionEnd = useCallback(() => {
    const idx = slideIndexRef.current;
    if (idx === 0) resetLoopSlide(count);
    else if (idx === count + 1) resetLoopSlide(1);
    else isMovingRef.current = false;
    const newIndex = (idx - 1 + count * 10) % count;
    setTextIndex(newIndex);
    setActiveIndex(newIndex);
    setTextVisible(true);
  }, [count, resetLoopSlide, setActiveIndex]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const slide = HERO_SLIDES[textIndex];

  return (
    <S.FullInner>
      <HeroBannerSlide
        slideIndex={slideIndex}
        useMotion={useMotion}
        onPrev={() => moveSlide(-1)}
        onNext={() => moveSlide(1)}
        onTransitionEnd={handleTransitionEnd}
      />
      <S.HeroSection>
        <S.HeroWrap onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          
          <S.HeroDec variant="secondary" spark={true} flex="0" icon={false}>
            <LavStarIcon $animate={true} className="btn-spark" aria-hidden="true">
              ✦
            </LavStarIcon>
            2026 S/S · GAMING GEAR PLATFORM
            <S.LavStarEnd $animate={true} className="btn-spark" aria-hidden="true">
              ✦
            </S.LavStarEnd>
          </S.HeroDec>

          
          <S.HeroTextGroup $visible={textVisible}>
            <Fragment key={textIndex}>
              <S.AnimIntroLabel $delay={0}>{slide.introLabel}</S.AnimIntroLabel>
              <S.AnimHeroTitle $delay={60}>
                {slide.title} <S.HeroTitleGrad>{slide.titleGrad}</S.HeroTitleGrad>
              </S.AnimHeroTitle>
              <S.AnimHeroCopy style={{ fontWeight: 'bold' }} $delay={120}>
                {slide.copy}
              </S.AnimHeroCopy>
              <S.AnimHeroActions $delay={170}>
                <S.HeroButton onClick={() => navigate('/categories/drops')}>
                  컬렉션 보기
                </S.HeroButton>
                <S.HeroButton variant="secondary" onClick={() => openModal('dropAlert')}>
                  드롭 알림 신청
                </S.HeroButton>
              </S.AnimHeroActions>
              
              <S.AnimHeroStats $delay={220}>
                {slide.stats.map((stat, i) => (
                  <S.HeroStat key={stat.value}>
                    <S.HeroStatValue>
                      <SlotText value={stat.value} delay={i * 200} />
                    </S.HeroStatValue>
                    <S.HeroStatLabel>
                      <span>{stat.label}</span>
                    </S.HeroStatLabel>
                  </S.HeroStat>
                ))}
              </S.AnimHeroStats>
            </Fragment>
          </S.HeroTextGroup>

          <PulseLineSvg />
        </S.HeroWrap>
      </S.HeroSection>

      
      <S.SlideNavRail>
        {HERO_SLIDES.map((s, index) => (
          <S.SlideNavItem
            key={s.id}
            type="button"
            $active={index === activeIndex}
            onClick={() => goToSlide(index)}
          >
            {s.label}
          </S.SlideNavItem>
        ))}
      </S.SlideNavRail>
    </S.FullInner>
  );
}
