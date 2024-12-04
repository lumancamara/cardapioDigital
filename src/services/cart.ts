import { FormSchema } from '@/components/checkout-info-form';
import { CartItem } from '@/types/cart';

export function checkoutToWhatsapp(cart: CartItem[], formValues: FormSchema) {
  if (cart.length === 0) {
    throw new Error('O carrinho está vazio');
  }
  if (!formValues) {
    throw new Error('Dados inválidos');
  }
  const cartItems = cart
    .map((item) => {
      return `${item.title} Quantidade: (${item.quantity}) Preço: *R$ ${item.price}*`;
    })
    .join('*INSERT_NEW_LINE*');
  const encodedItems = cartItems;
  const phone = '5583999434000';
  let text = `${encodedItems}*INSERT_NEW_LINE*Nome: ${formValues.name}*INSERT_NEW_LINE*Telefone: ${formValues.phoneNumber}*INSERT_NEW_LINE*Endereço: ${formValues.address}, ${formValues.addressNumber}*INSERT_NEW_LINE*Obs: ${formValues.observation || ''}`;
  text = encodeURIComponent(text);
  text = text.replace('*INSERT_NEW_LINE*', '%0a');
  const url = `https://wa.me/${phone}?text=${text}`;
  window.location.href = url;
}
