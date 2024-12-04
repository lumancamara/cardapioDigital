import Cart from '@/components/cart';
import { useCartStore } from '@/stores/cart';

export default function Footer() {
  const { cartTotalItems } = useCartStore();

  if (!cartTotalItems()) return;

  return (
    <footer className="fixed bottom-0 z-40 flex w-full items-center justify-center bg-red-500 py-3">
      <Cart />
    </footer>
  );
}
