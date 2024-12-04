export enum MenuItemCategory {
  FOOD = 'food',
  DRINK = 'drink',
}

export interface MenuItem {
  img: string;
  slug: string;
  price: number;
  category: MenuItemCategory;
  title: string;
  ingredients: string[];
}

export type Menu = MenuItem[];
