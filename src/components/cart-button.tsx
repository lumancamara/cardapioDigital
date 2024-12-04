import CheckoutInfoForm, { FormSchema } from '@/components/checkout-info-form';
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
import { toast } from 'sonner';

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [formValues, setFormValues] = useState<FormSchema>();
  const {
    cart,
    addToCart,
    cartTotalItems,
    cartTotalPrice,
    removeFromCart,
    clearCart,
  } = useCartStore();

  function handleSubmit() {
    try {
      checkoutToWhatsapp(cart, formValues);
      toast.success('Pedido enviado');
      clearCart();
      setOpen(false);
    } catch (e) {
      toast.error('Erro ao enviar o pedido');
    }
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
      <AlertDialogContent className="max-w-4xl bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Meu Carrinho</AlertDialogTitle>
          <AlertDialogDescription>
            Confira os itens antes de finalizar a compra
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="-mr-3 h-[400px] flex-auto space-y-5 pb-6 pr-3">
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
            <CheckoutInfoForm
              setCanSubmit={setCanSubmit}
              setFormValues={setFormValues}
            />
          </div>
        </ScrollArea>

        <AlertDialogFooter className="flex w-full items-center !justify-between">
          <p className="font-bold">
            Total: <span id="cart-total">{toReal(cartTotalPrice())}</span>
          </p>

          <div className="gap-2 flex-center">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              onClick={handleSubmit}
              className="bg-green-500"
              disabled={!canSubmit}
            >
              Finalizar Pedido
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
