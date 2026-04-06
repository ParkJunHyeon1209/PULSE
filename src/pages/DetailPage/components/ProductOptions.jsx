import React from 'react';
import styled from '@emotion/styled';

export default function ProductOptions({ options = [], selectedOptions = {}, onSelectOption }) {
  if (!options.length) return null;

  const isColorOption = (label = '') => {
    const normalized = String(label).trim().toLowerCase();
    return [
      '색상',
      '컬러',
      '케이블 컬러',
      '컬러테마',
       '투명도',
      '마감',
    ].includes(normalized);
  };

  const getColorValue = (item) => {
    const colorMap = {
      블랙: '#111111',
      화이트: '#f8fafc',
      네온블루: '#3b82f6',
      일렉트릭블루: '#2563eb',
      네온옐로우: '#eab308',
      옐로우: '#eab308',
      '매트 옐로우': '#ca8a04',
      차콜: '#374151',
      '스모크 그레이': '#6b7280',
      클리어: '#dbeafe',
      네온: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
      파스텔: 'linear-gradient(135deg, #fbcfe8 0%, #bfdbfe 50%, #bbf7d0 100%)',
      '올 화이트': '#ffffff',
    };

    return colorMap[item] ?? '#9ca3af';
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
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
  gap: 10px; 
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing[5]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    gap: 8px;
  }
`;

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    line-height: 1.4;
  }
`;

const LabelValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  padding-left: ${({ theme }) => theme.spacing[2]};
  font-weight: 700;
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
    gap: 10px;
  flex-wrap: wrap;

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
  border-radius: 10px;
  border: ${({ $active, theme }) =>
    $active
      ? `1px solid ${theme.colors.electricViolet ?? theme.colors.primary}`
      : `1px solid ${theme.colors.border}`};
  background: ${({ $active, theme }) => ($active ? `${theme.colors.primary}1F` : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  box-shadow: ${({ $active, theme }) =>
    $active
      ? `
        0 0 0 1px ${theme.colors.textSecondary},
        0 0 0 3px ${(theme.colors.electricViolet ?? theme.colors.primary)}33,
        inset 0 1px 3px rgba(255,255,255,0.08)
      `
      : `none`};
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    background-color ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

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
