import styled from '@emotion/styled';


export default function BrandSlotCaption({
  eyebrow,
  label,
  hint,
  lightText,
  lightCaptionShadow,
  lightColor,
}) {
  return (
    <Wrap>
      {eyebrow && (
        <Eyebrow
          $lightText={lightText}
          $lightCaptionShadow={lightCaptionShadow}
          $lightColor={lightColor?.eyebrow}
        >
          {eyebrow}
        </Eyebrow>
      )}
      {label && (
        <Label
          $lightText={lightText}
          $lightCaptionShadow={lightCaptionShadow}
          $lightColor={lightColor?.label}
        >
          {label}
        </Label>
      )}
      {hint && (
        <Hint
          $lightText={lightText}
          $lightCaptionShadow={lightCaptionShadow}
          $lightColor={lightColor?.hint}
        >
          {hint}
        </Hint>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
  bottom: ${({ theme }) => theme.spacing[4]};
  display: grid;
  gap: 2px;
  z-index: 3;
`;

const Eyebrow = styled.span`
  color: ${({ theme, $lightText, $lightColor }) =>
    theme.mode === 'dark'
      ? 'rgba(255,255,255,0.52)'
      : ($lightColor ?? ($lightText ? theme.colors.textSecondary : 'rgba(255,255,255,0.7)'))};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-shadow: ${({ theme, $lightCaptionShadow }) =>
    theme.mode === 'dark' || !$lightCaptionShadow
      ? 'none'
      : '0 1px 10px rgba(8, 6, 20, 0.72), 0 0 18px rgba(8, 6, 20, 0.22)'};
`;

const Label = styled.span`
  margin-bottom: ${({ theme }) => theme.spacing[1]};
  color: ${({ theme, $lightText, $lightColor }) =>
    theme.mode === 'dark'
      ? 'rgba(255,255,255,0.92)'
      : ($lightColor ?? ($lightText ? theme.colors.text : 'rgba(255,255,255,0.92)'))};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  opacity: 0.8;
  letter-spacing: 0.05em;
  text-shadow: ${({ theme, $lightCaptionShadow }) =>
    theme.mode === 'dark' || !$lightCaptionShadow
      ? 'none'
      : '0 1px 12px rgba(8, 6, 20, 0.78), 0 0 22px rgba(8, 6, 20, 0.26)'};
`;

const Hint = styled.span`
  color: ${({ theme, $lightText, $lightColor }) =>
    theme.mode === 'dark'
      ? 'rgba(255,255,255,0.44)'
      : ($lightColor ?? ($lightText ? theme.colors.textSecondary : 'rgba(255,255,255,0.5)'))};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  text-shadow: ${({ theme, $lightCaptionShadow }) =>
    theme.mode === 'dark' || !$lightCaptionShadow
      ? 'none'
      : '0 1px 10px rgba(8, 6, 20, 0.2), 0 0 18px rgba(8, 6, 20, 0.02)'};
`;
