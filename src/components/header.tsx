import { getWorkingTime } from '@/services/time';
import { useQuery } from 'react-query';

export default function Header() {
  const qWorkingTime = useQuery({
    queryKey: ['working-time'],
    queryFn: () => getWorkingTime(),
    staleTime: Infinity,
  });

  return (
    <header className="h-[420px] w-full bg-header bg-cover bg-center">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <img
          src="logo.jpg"
          alt="Logo Dogão"
          className="size-32 rounded-full shadow-lg duration-200 hover:scale-110"
        />

        <h1 className="mb-2 mt-4 text-5xl font-bold">Dogão Delícia</h1>

        <span className="font-medium">
          Rua Francisco Lustosa Cabral, Cristo, João Pessoa-PB
        </span>

        <div className="mt-5 rounded-lg bg-green-500 px-4 py-1">
          {!!qWorkingTime.data && (
            <span className="font-medium text-white">
              {`Sex a Dom - ${qWorkingTime.data.opening_hour}:00 às ${qWorkingTime.data.closing_hour}:00`}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
