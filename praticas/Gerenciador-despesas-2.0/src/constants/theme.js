import { Platform } from 'react-native';

export const lightTheme = {
  background: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  primary: '#1f3a5f',
  onPrimary: '#ffffff',
  border: '#cbd5e1',
  input: '#ffffff',
  error: '#dc2626',
  tagBackground: '#e5e7eb',
  tagText: '#374151',
  summary: '#e0e7ff',
  overlay: 'rgba(0,0,0,0.4)',
};

export const darkTheme = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#f1f5f9',
  textSecondary: '#94a3b8',
  primary: '#60a5fa',
  onPrimary: '#0f172a',
  border: '#334155',
  input: '#1e293b',
  error: '#f87171',
  tagBackground: '#334155',
  tagText: '#e2e8f0',
  summary: '#1e3a5f',
  overlay: 'rgba(0,0,0,0.6)',
};

export function getTheme(colorScheme) {
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  android: { elevation: 4 },
  default: {},
});
