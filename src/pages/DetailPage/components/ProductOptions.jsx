import React from 'react';
import styled from '@emotion/styled';

export default function ProductOptions({ options = [], selectedOptions = {}, onSelectOption }) {
  if (!options.length) return null;

  const isColorOption = (label = '') => {
    const normalized = String(label).trim().toLowerCase();
    return ['색상', '컬러', 'color'].includes(normalized);
  };

  const getColorValue = (item) => {
    const colorMap = {
      블랙: '#000000',
      화이트: '#ffffff',
      레드: '#ef4444',
      블루: '#3b82f6',
      그린: '#22c55e',
      옐로우: '#eab308',
      퍼플: '#8b5cf6',
      핑크: '#ec4899',
      실버: '#9ca3af',
      그레이: '#6b7280',
      네이비: '#1e3a8a',
    };

    return colorMap[item] ?? '#ffffff';
  };

  return (
    <>
      {options.map((option) => {
        if (!option?.items?.length) return null;

        const currentValue = selectedOptions[option.label] ?? '';
        const colorType = isColorOption(option.label);
        return (
          <Section key={option.label}>
            <Label>
              {option.label} : <LabelValue>{currentValue}</LabelValue>
            </Label>
            {colorType ? (
              <ColorList>
                {option.items.map((item) => (
                  <ColorButton
                    key={item}
                    type="button"
                    $active={currentValue === item}
                    $color={getColorValue(item)}
                    onClick={() => onSelectOption(option.label, item)}
                    aria-label={item}
                    title={item}
                  >
                    {currentValue === item ? '✓' : ''}
                  </ColorButton>
                ))}
              </ColorList>
            ) : (
              <ButtonList>
                {option.items.map((item) => (
                  <OptionButton
                    key={item}
                    type="button"
                    $active={currentValue === item}
                    onClick={() => onSelectOption(option.label, item)}
                  >
                    {item}
                  </OptionButton>
                ))}
              </ButtonList>
            )}
          </Section>
        );
      })}
    </>
  );
}

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    gap: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    gap: 8px;
  }
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 400;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    line-height: 1.4;
  }
`;

const LabelValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  padding-left: ${({ theme }) => theme.spacing[2]};
`;

const ColorList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;
  }
`;

const ButtonList = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;
  }
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
  color: ${({ $color, theme }) =>
    String($color).toLowerCase() === '#ffffff' || String($color).toLowerCase() === 'white'
      ? theme.colors.background
      : theme.colors.wColor};
  font-size: 16px;
  font-weight: 700;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 36px;
    height: 36px;
    font-size: 15px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 8px 14px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 7px 12px;
    border-radius: 10px;
  }
`;
