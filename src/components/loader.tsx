import { LoaderCircleIcon } from 'lucide-react';

export default function Loader() {
  return (
    <div className="size-full flex-1 gap-2 flex-center">
      <LoaderCircleIcon className="size-20 animate-spin text-muted-foreground" />
    </div>
  );
}
