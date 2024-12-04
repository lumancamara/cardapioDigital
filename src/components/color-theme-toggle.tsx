import { CheckIcon, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Theme, useTheme } from '@/context/color-theme';
import { cn } from '@/lib/utils';

export function ColorThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: Theme[] = ['light', 'dark', 'system'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit min-w-28">
        {themes.map((t) => (
          <DropdownMenuItem
            onClick={() => setTheme(t)}
            key={t}
            className="items-center gap-2 capitalize"
          >
            <span className={cn('flex-1', { 'font-semibold': theme === t })}>
              {t}
            </span>
            {theme === t && <CheckIcon className="size-3.5" strokeWidth={3} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
