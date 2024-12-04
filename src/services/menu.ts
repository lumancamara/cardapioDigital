import { Menu } from '@/types/menu';
import axios from 'axios';

export async function getMenu(): Promise<Menu> {
  const res = await axios.get('https://api.npoint.io/278c4e80ed2698b38fba');
  return res.data;
}
