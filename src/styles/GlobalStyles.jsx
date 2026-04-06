import { Global, css } from '@emotion/react';

const styles = (theme) => css`
  
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: 300 800;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Syncopate';
    src: url('/fonts/Syncopate-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url('/fonts/BebasNeue-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'IBM Plex Mono';
    src: url('/fonts/IBMPlexMono-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'IBM Plex Mono';
    src: url('/fonts/IBMPlexMono-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'IBM Plex Mono';
    src: url('/fonts/IBMPlexMono-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  :root {
    color-scheme: ${theme.mode};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  img,
  ul,
  ol,
  li,
  form,
  fieldset,
  label,
  legend,
  input,
  textarea,
  button,
  table,
  caption,
  tbody,
  thead,
  tfoot,
  tr,
  th,
  td,
  article,
  aside,
  section,
  header,
  main,
  nav,
  footer {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: inherit;
  }

  html,
  body {
    font-family: ${theme.fontFamily.body};
  }

  html {
    min-height: 100dvh;
    scroll-behavior: smooth;
  }

  body,
  p,
  li,
  input,
  textarea,
  button,
  select {
    font-family: ${theme.fontFamily.body};
  }

  h2 {
    font-family: ${theme.fontFamily.hero};
    font-weight: 400;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }

  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.fontFamily.body};
    font-weight: 600;
    line-height: 1.2;
  }

  small,
  code,
  pre,
  kbd,
  samp {
    font-family: ${theme.fontFamily.mono};
  }

  body {
    min-height: 100vh;
    min-height: 100dvh;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.5;
    
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
    font-family: ${theme.fontFamily.body};
    transition:
      background ${theme.motion.normal},
      color ${theme.motion.normal};
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: ${theme.colors.glowOp};
    background: ${theme.gradients.bgMesh};
    transition: opacity ${theme.motion.slow};
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n1)' opacity='.04'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  #root {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100%;
  }

  input,
  button,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
  }

  textarea {
    resize: none;
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-size: ${theme.fontSize.xxxs};
    font-weight: 700;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  code {
    white-space: pre-wrap;
  }

  ::selection {
    background: rgba(124, 58, 237, 0.22);
    color: ${theme.colors.text};
  }
`;

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
