import logo from '../assets/logo.svg';
import menu from '../assets/menu.svg';
import heart from '../assets/heart.svg';
import heartOutline from '../assets/heart-outline.svg';

export const icons = {
  logo,
  menu,
  heart,
  heartOutline,
} as const;

export type Icons = keyof typeof icons;
