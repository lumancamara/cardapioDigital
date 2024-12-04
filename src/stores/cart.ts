import { CartItem } from '@/types/cart';
import { MenuItem } from '@/types/menu';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const CART_KEY = 'dogao-cart';

interface CartStore {
  cart: CartItem[];
  addToCart: (product: MenuItem) => void;
  removeFromCart: (product: MenuItem) => void;
  clearCart: () => void;
  cartTotalItems: () => number;
  cartTotalPrice: () => number;
}

function isProductOnCart(cart: CartItem[], product: MenuItem) {
  return cart.some((x) => x.slug === product?.slug);
}

function increaseProductQuantity(
  cart: CartItem[],
  productSlug: string
): CartItem[] {
  if (!productSlug) return cart;
  return cart.map((product) => {
    if (product.slug !== productSlug) return product;
    return { ...product, quantity: product.quantity + 1 };
  });
}

function decreaseProductQuantity(
  cart: CartItem[],
  productSlug: string
): CartItem[] {
  if (!productSlug) return cart;
  return cart
    .map((product) => {
      if (product.slug !== productSlug) return product;
      return { ...product, quantity: product.quantity - 1 };
    })
    .filter((product) => product.quantity > 0);
}

const initialState = {
  cart: [],
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addToCart: (product) =>
        set((state) => ({
          cart: isProductOnCart(state.cart, product)
            ? increaseProductQuantity(state.cart, product?.slug)
            : [...state.cart, { ...product, quantity: 1 }],
        })),

      removeFromCart: (product) =>
        set((state) => ({
          cart: decreaseProductQuantity(state.cart, product?.slug),
        })),

      clearCart: () => set((_) => ({ cart: [] })),

      cartTotalItems: () =>
        get().cart.reduce((acc, product) => acc + product.quantity, 0),

      cartTotalPrice: () =>
        get().cart.reduce(
          (acc, product) => acc + product.quantity * Number(product.price),
          0
        ),
    }),
    {
      name: CART_KEY,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
