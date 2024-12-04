import Loader from '@/components/loader';
import MenuGrid from '@/components/menu-grid';
import { getMenu } from '@/services/menu';
import { MenuItemCategory } from '@/types/menu';
import { useQuery } from 'react-query';

export default function HomePage() {
  const qMenu = useQuery({
    queryKey: 'menu',
    queryFn: () => getMenu(),
    staleTime: 120000,
  });

  const foodItems = qMenu.data?.filter(
    (x) => x.category === MenuItemCategory.FOOD
  );

  const drinkItems = qMenu.data?.filter(
    (x) => x.category === MenuItemCategory.DRINK
  );

  return (
    <div className="min-h-screen flex-col flex-center">
      <h2 className="my-9 text-center text-2xl font-bold md:text-4xl">
        Veja nosso cardápio
      </h2>

      <h3 className="text-3xl font-bold">Lanches</h3>
      {qMenu.isLoading ? (
        <Loader />
      ) : (
        foodItems && (
          <>
            {foodItems.length === 0 && <p>Nenhum lanche encontrado</p>}
            {foodItems.length > 0 && <MenuGrid menu={foodItems} />}
          </>
        )
      )}

      <h3 className="text-3xl font-bold">Bebidas</h3>
      {qMenu.isLoading ? (
        <Loader />
      ) : (
        drinkItems && (
          <>
            {drinkItems.length === 0 && <p>Nenhuma bebida encontrada</p>}
            {drinkItems.length > 0 && <MenuGrid menu={drinkItems} />}
          </>
        )
      )}
    </div>
  );
}
