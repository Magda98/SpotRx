import logo from '../assets/logo.svg';

export const icons = {
  logo,
} as const;

export type Icons = keyof typeof icons;
