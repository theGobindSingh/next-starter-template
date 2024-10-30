import styled from '@emotion/styled';

type ColorType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'success'
  | 'caution'
  | 'info'
  | 'error'
  | 'gray'
  | 'black'
  | 'white';
type Weight = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}00`;

const fontSizes = {
  '4xs': 'var(--fs-4xs)',
  '3xs': 'var(--fs-3xs)',
  '2xs': 'var(--fs-2xs)',
  '1xs': 'var(--fs-1xs)',
  s: 'var(--fs-s)',
  m: 'var(--fs-m)',
  l: 'var(--fs-l)',
  '1xl': 'var(--fs-1xl)',
  '2xl': 'var(--fs-2xl)',
  '3xl': 'var(--fs-3xl)',
  '4xl': 'var(--fs-4xl)',
};

export interface CommonTextProps {
  $size?: keyof typeof fontSizes;
  $margin?: string;
  $weight?: Weight;
  $lineHeight?: string;
  $color?: ColorType;
  $colorWeight?: Weight;
  $letterSpacing?: string;
}

const getColor = ({
  $color,
  $colorWeight,
}: Pick<CommonTextProps, '$color' | '$colorWeight'>) => {
  if (!$color) return 'var(--color-gray-800)';
  if ($color === 'black' || $color === 'white') {
    return `var(--color-${$color})`;
  }
  return `var(--color-${$color}-${$colorWeight ?? '400'})`;
};

export const H1 = styled.h1<CommonTextProps>`
  font-size: ${({ $size }) => fontSizes[$size ?? '4xl']};
  margin: ${({ $margin }) => $margin ?? '0 0 0.75em 0'};
  font-weight: ${({ $weight }) => $weight ?? '700'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? 'normal'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  color: ${getColor};
`;

export const H2 = styled.h2<CommonTextProps>`
  font-size: ${({ $size }) => fontSizes[$size ?? '2xl']};
  margin: ${({ $margin }) => $margin ?? '0 0 0.5em 0'};
  font-weight: ${({ $weight }) => $weight ?? '700'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? 'normal'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  color: ${getColor};
`;

export const H3 = styled.h3<CommonTextProps>`
  font-size: ${({ $size }) => fontSizes[$size ?? 'm']};
  margin: ${({ $margin }) => $margin ?? '0 0 0.25em 0'};
  font-weight: ${({ $weight }) => $weight ?? '500'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? 'normal'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  color: ${getColor};
`;

export const P = styled.p<CommonTextProps>`
  font-size: ${({ $size }) => fontSizes[$size ?? '2xs']};
  margin: ${({ $margin }) => $margin ?? '0'};
  font-weight: ${({ $weight }) => $weight ?? '400'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? 'normal'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  color: ${getColor};
`;

export const Span = styled.span<CommonTextProps>`
  font-size: ${({ $size }) => fontSizes[$size ?? '1xs']};
  margin: ${({ $margin }) => $margin ?? '0'};
  font-weight: ${({ $weight }) => $weight ?? '400'};
  line-height: ${({ $lineHeight }) => $lineHeight ?? 'normal'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing ?? 'normal'};
  color: ${getColor};
`;

export const Hr = styled.hr<{ $margin?: string }>`
  border: 1px solid var(--color-gray-100);
  width: 100%;
  margin: ${({ $margin }) => $margin ?? '0'};
`;
