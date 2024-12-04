import MenuCard from '@/components/menu-card';
import { Menu } from '@/types/menu';

interface Props {
  menu: Menu;
}

export default function MenuGrid({ menu }: Props) {
  return (
    <div className="mb-16 grid w-full max-w-7xl grid-cols-1 gap-7 px-2 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      {menu.map((menuItem) => (
        <MenuCard menuItem={menuItem} key={menuItem.slug} />
      ))}
    </div>
  );
}
