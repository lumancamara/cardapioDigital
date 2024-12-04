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
    .join('%0a');
  const encodedItems = cartItems; //encodeURIComponent(cartItems);
  const phone = '55' + formValues.phoneNumber;
  const url = `https://wa.me/${phone}?text=${encodedItems}%0aEndereço: ${formValues.address}, ${formValues.addressNumber}%0aObs: ${formValues.observation || ''}`;
  console.log(url);
  window.location.href = url;
}
