import { MenuItem } from '@/types/menu';

export interface CartItem extends MenuItem {
  quantity: number;
}
