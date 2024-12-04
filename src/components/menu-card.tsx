import { toReal } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { MenuItem } from '@/types/menu';
import { PlusIcon, ShoppingCartIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  menuItem: MenuItem;
}

export default function MenuCard({ menuItem }: Props) {
  const { addToCart } = useCartStore();

  function handleAddToCart() {
    addToCart(menuItem);
    toast.success(`${menuItem.title} adicionado ao carrinho!`, {
      classNames: { toast: '!bg-white' },
    });
  }

  return (
    <div className="flex gap-2">
      <img
        src={menuItem.img}
        alt={menuItem.title}
        className="size-28 rounded-md duration-300 hover:rotate-2 hover:scale-110"
      />
      <div>
        <p className="font-bold">{menuItem.title}</p>
        <p className="text-sm">{menuItem.ingredients.join(' · ')}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-lg font-bold">{toReal(menuItem.price)}</p>
          <button
            className="rounded bg-gray-900 px-4 py-1 flex-center"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="text-white" />
            <PlusIcon className="size-5 text-white" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
