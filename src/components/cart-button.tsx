import CheckoutInfoForm from '@/components/checkout-info-form';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { toReal } from '@/lib/utils';
import { checkoutToWhatsapp } from '@/services/cart';
import { useCartStore } from '@/stores/cart';
import { MenuItem } from '@/types/menu';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import { useState } from 'react';

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
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

  function handleAddItem(menuItem: MenuItem) {
    addToCart(menuItem);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="flex items-center gap-2 font-bold text-white">
          (<span>{cartTotalItems()}</span>) Ver o Carrinho
          <ShoppingCartIcon />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Meu Carrinho</AlertDialogTitle>
          <AlertDialogDescription>
            Confira os itens antes de finalizar a compra
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-[400px] flex-auto space-y-5">
          <div className="mb-2 flex flex-col justify-between">
            {cart.map((cartItem) => (
              <div
                className="flex items-center justify-between gap-5 border-b py-2"
                key={cartItem.slug}
              >
                <div>
                  <p className="font-medium">{cartItem.title}</p>
                  <p>Qtd: {cartItem.quantity}</p>
                  <p className="mt-2 font-medium">
                    Preço: {toReal(cartItem.price)}
                  </p>
                  <p className="mt-2 font-medium">
                    Total: {toReal(cartItem.price)}
                  </p>
                </div>

                <div className="gap-2 flex-center">
                  <Button
                    variant={'secondary'}
                    size={'icon'}
                    className="rounded-full"
                    onClick={() => handleRemoveItem(cartItem)}
                  >
                    <MinusIcon className="size-5" strokeWidth={4} />
                  </Button>
                  <Button
                    variant={'secondary'}
                    size={'icon'}
                    className="rounded-full"
                    onClick={() => handleAddItem(cartItem)}
                  >
                    <PlusIcon className="size-5" strokeWidth={4} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Preencha seus dados</h3>
            <CheckoutInfoForm setCanSubmit={setCanSubmit} />
          </div>
        </ScrollArea>
        <p className="font-bold">
          Total: <span id="cart-total">{toReal(cartTotalPrice())}</span>
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            onClick={handleSubmit}
            className="bg-green-500"
            disabled={!canSubmit}
          >
            Finalizar Pedido
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
