import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toReal } from '@/lib/utils';
import { checkoutToWhatsapp } from '@/services/cart';
import { useCartStore } from '@/stores/cart';
import { MenuItem } from '@/types/menu';
import { ShoppingCartIcon } from 'lucide-react';
import { useState } from 'react';

export default function Cart() {
  const [open, setOpen] = useState(false);
  const { cart, addToCart, cartTotalItems, cartTotalPrice, removeFromCart } =
    useCartStore();

  function handleSubmit() {
    alert('Itens enviados');
    checkoutToWhatsapp(cart, 'Rua das Amarguras');
    setOpen(false);
  }

  function handleRemoveItem(menuItem: MenuItem) {
    removeFromCart(menuItem);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 font-bold text-white">
          (<span>{cartTotalItems()}</span>) Ver o Carrinho
          <ShoppingCartIcon />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Meu Carrinho</AlertDialogTitle>
          <AlertDialogDescription>
            Descrição do carrinho caso precise
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <div className="mb-2 flex flex-col justify-between">
            {cart.map((cartItem) => (
              <div
                className="flex items-center justify-between"
                key={cartItem.slug}
              >
                <div>
                  <p className="font-medium">{cartItem.title}</p>
                  <p>Qtd: {cartItem.quantity}</p>
                  <p className="mt-2 font-medium">{toReal(cartItem.price)}</p>
                </div>

                <button
                  className="remove-from_cart-btn"
                  onClick={() => handleRemoveItem(cartItem)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <p className="font-bold">
            Total: <span id="cart-total">{toReal(cartTotalPrice())}</span>
          </p>

          <p className="mt-3 font-bold">Endereço de entrega: </p>
          <input
            type="text"
            placeholder="Digite seu endereço completo ..."
            id="address"
            className="my-1 w-full rounded border-2 p-1"
          />
          <p className="hidden text-red-500" id="address-warn">
            Digite seu endereço completo
          </p>

          <div className="mt-5 flex w-full items-center justify-between">
            <button>Fechar</button>
            <button className="rounded bg-green-500 px-4 py-1 text-white">
              Finalizar Pedido
            </button>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={handleSubmit}>Enviar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
