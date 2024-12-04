import { Menu } from '@/types/menu';
import axios from 'axios';

export async function getMenu(): Promise<Menu> {
  const res = await axios.get('https://api.npoint.io/f8bddeb611b250f8dae3');
  return res.data;
}
