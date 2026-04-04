import React from 'react';
import styled from '@emotion/styled';
import { useSectionReveal } from '../hooks/useSectionReveal';

const RevealWrap = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0px)' : 'translateY(36px)')};
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: ${({ $delay }) => $delay ?? '0ms'};
  will-change: opacity, transform;
`;

export default function SectionReveal({ children, delay, threshold, rootMargin }) {
  const [ref, visible] = useSectionReveal({ threshold, rootMargin });
  return (
    <RevealWrap ref={ref} $visible={visible} $delay={delay}>
      {children}
    </RevealWrap>
  );
}
