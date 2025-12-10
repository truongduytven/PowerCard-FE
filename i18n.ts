export const locales = ['en', 'vi'] as const;

export const localePrefix = 'always'; // URL luôn có locale: /en, /vi

export type Locale = (typeof locales)[number];
