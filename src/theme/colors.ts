// Luna App Color Palette
// Based on design tokens from Figma

export const colors = {
  // Primary colors
  primary: '#E3A9B7',
  secondary: '#CF7979',
  tertiary: '#7B5469',
  
  // Category colors
  sleep: '#B1D8DB',
  mood: '#C7E6DB',
  workout: '#E9B79D',
  cycle: '#F5D5DC',
  
  // Background colors
  background: '#FAFAFA',
  cardBackground: '#FFFFFF',
  
  // Text colors
  textPrimary: '#373637',
  textSecondary: '#6E6E6E',
  textMuted: '#999999',
  
  // UI colors
  border: '#F0F0F0',
  divider: '#EEEEEE',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  
  // Tab bar
  tabActive: '#373637',
  tabInactive: '#CCCCCC',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
};

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
  label: {
    fontSize: 14,
    fontWeight: '500' as const,
  },
};
