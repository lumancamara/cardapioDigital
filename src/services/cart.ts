import { FormSchema } from '@/components/checkout-info-form';
import { toReal } from '@/lib/utils';
import { CartItem } from '@/types/cart';

export function checkoutToWhatsapp(
  cart: CartItem[],
  totalPrice: number,
  formValues: FormSchema
) {
  if (cart.length === 0) {
    throw new Error('O carrinho está vazio');
  }
  if (!formValues) {
    throw new Error('Dados inválidos');
  }
  const cartItems = cart
    .map((item) => {
      return `${item.title} Quantidade: (${item.quantity}) Preço: *${toReal(item.price)}*`;
    })
    .join('INSERT_NEW_LINE');
  const encodedItems = cartItems;
  const phone = '5583999434000';
  let text = `${encodedItems}INSERT_NEW_LINETotal: *${toReal(totalPrice)}*INSERT_NEW_LINENome: ${formValues.name}INSERT_NEW_LINETelefone: ${formValues.phoneNumber}INSERT_NEW_LINEEndereço: ${formValues.address}, ${formValues.addressNumber}INSERT_NEW_LINEObs: ${formValues.observation || ''}`;
  text = encodeURIComponent(text);
  text = text.replaceAll('INSERT_NEW_LINE', '%0a');
  const url = `https://wa.me/${phone}?text=${text}`;
  console.log(url);
  // window.location.href = url;
}
