import React from 'react';
import styled from '@emotion/styled';

export default function ProductOptions({
  product,
  selectedColor,
  selectedPlatform,
  selectedConnection,
  onSelectColor,
  onSelectPlatform,
  onSelectConnection,
}) {
  return (
    <>
      <Section>
        <Label>
          색상 : <LabelValue>{selectedColor}</LabelValue>
        </Label>

        <ColorList>
          {product.colors?.map((color) => (
            <ColorButton
              key={color.name}
              type="button"
              $active={selectedColor === color.name}
              $color={color.value}
              onClick={() => onSelectColor(color.name)}
              aria-label={color.name}
              title={color.name}
            >
              {selectedColor === color.name ? '✓' : ''}
            </ColorButton>
          ))}
        </ColorList>
      </Section>

      <Section>
        <Label>플랫폼</Label>

        <ButtonList>
          {product.platforms?.map((platform) => (
            <OptionButton
              key={platform}
              type="button"
              $active={selectedPlatform === platform}
              onClick={() => onSelectPlatform(platform)}
            >
              {platform}
            </OptionButton>
          ))}
        </ButtonList>
      </Section>

      <Section>
        <Label>연결</Label>

        <ButtonList>
          {product.connections?.map((connection) => (
            <ConnectionButton
              key={connection.id}
              type="button"
              disabled={connection.soldOut}
              $active={selectedConnection === connection.id}
              $soldOut={connection.soldOut}
              onClick={() => onSelectConnection(connection.id)}
            >
              <ConnectionText $soldOut={connection.soldOut}>{connection.label}</ConnectionText>
              {connection.soldOut && <SoldOutText>품절</SoldOutText>}
            </ConnectionButton>
          ))}
        </ButtonList>
      </Section>
    </>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LabelValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const ColorList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ButtonList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${({ $active, $color }) => ($active ? `2px solid ${$color}` : '2px solid transparent')};
  background-color: ${({ $color }) => $color};
  box-shadow: ${({ theme, $active, $color }) =>
    $active
      ? `
        0 0 0 3px ${theme.colors.textSecondary},
        0 0 0 6px ${$color}22,
        inset 0 2px 4px rgba(255,255,255,0.14),
        inset 0 -6px 10px rgba(0,0,0,0.2)
      `
      : `
        0 0 0 1px ${theme.colors.border},
        inset 0 2px 4px rgba(255,255,255,0.1),
        inset 0 -6px 10px rgba(0,0,0,0.18)
      `};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.wColor};
  font-size: 16px;
  font-weight: 700;
`;

const OptionButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  border: ${({ $active, theme }) =>
    $active
      ? `1px solid ${theme.colors.electricViolet ?? theme.colors.primary}`
      : `1px solid ${theme.colors.border}`};
  background: ${({ $active, theme }) => ($active ? `${theme.colors.primary}1F` : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    background-color ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ConnectionButton = styled(OptionButton)`
  opacity: ${({ $soldOut }) => ($soldOut ? 0.45 : 1)};
  cursor: ${({ $soldOut }) => ($soldOut ? 'not-allowed' : 'pointer')};
  position: relative;
`;

const ConnectionText = styled.span`
  display: inline-block;
  text-decoration: ${({ $soldOut }) => ($soldOut ? 'line-through' : 'none')};
  text-decoration-thickness: 1.5px;
  text-decoration-color: currentColor;
`;

const SoldOutText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  padding: 4px 10px;
  border-radius: 12px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-50%) translateX(50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: #000000;
`;
