export const colors = {
  bgTop: '#DFF3F0',
  bgMid: '#EAF6FF',
  bgBottom: '#FFF6E8',
  ink: '#1B2B33',
  inkMuted: '#5B6F78',
  accent: '#1F8A7A',
  accentSoft: '#B7E4DC',
  sunny: '#FFC857',
  coral: '#FF8A6B',
  sky: '#5BB8E8',
  cream: '#FFFbf5',
  line: '#C9E4DE',
  boss: '#E8744F',
  employee: '#2A9BB5',
  progressTrack: '#D5EBE6',
  progressFill: '#1F8A7A',
  white: '#FFFFFF',
  shadow: 'rgba(27, 43, 51, 0.14)',
  choiceA: '#1F8A7A',
  choiceB: '#5BB8E8',
  choiceC: '#FF8A6B',
  choiceD: '#9B7EDE',
} as const;

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 14,
  md: 20,
  lg: 28,
  xl: 36,
  pill: 999,
} as const;

export const choiceBadgeColors = [
  colors.choiceA,
  colors.choiceB,
  colors.choiceC,
  colors.choiceD,
] as const;
