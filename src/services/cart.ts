import { FormSchema } from '@/components/checkout-info-form';
import { CartItem } from '@/types/cart';
import { redirect } from 'react-router-dom';

export function checkoutToWhatsapp(cart: CartItem[], formValues: FormSchema) {
  if (cart.length === 0) return;
  if (!formValues) return;
  const cartItems = cart
    .map((item) => {
      return ` ${item.title} Quantidade: (${item.quantity}) Preço: R$ ${item.price} |`;
    })
    .join('');
  const items = encodeURIComponent(cartItems);
  const phone = formValues.phoneNumber;
  redirect(
    `https://wa.me/${phone}?text=${items}%0aEndereço: ${formValues.address}, ${formValues.addressNumber}%0aObs: ${formValues.observation || ''}`
  );
}
