import { CartItem } from '@/types/cart';
import { redirect } from 'react-router-dom';

export function checkoutToWhatsapp(cart: CartItem[], address: string) {
  if (cart.length === 0) return;
  const cartItems = cart
    .map((item) => {
      return ` ${item.title} Quantidade: (${item.quantity}) Preço: R$ ${item.price} |`;
    })
    .join('');

  const message = encodeURIComponent(cartItems);
  const phone = '83999696969';

  redirect(`https://wa.me/${phone}?text=${message} Endereço: ${address}`);
}
