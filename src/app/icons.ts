import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';

export const icons = {
  logo,
  menu,
} as const;

export type Icons = keyof typeof icons;
