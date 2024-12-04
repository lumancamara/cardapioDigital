export default function Header() {
  return (
    <header className="bg-header h-[420px] w-full bg-cover bg-center">
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
          <span className="font-medium text-white">
            Sex á Dom - 18:40 ás 22:30
          </span>
        </div>
      </div>
    </header>
  );
}
