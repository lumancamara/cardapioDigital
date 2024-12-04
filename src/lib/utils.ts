import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toReal(
  value: number | string | undefined | null,
  style: 'decimal' | 'currency' | 'percent' | undefined = 'currency'
): string {
  value = Number(value);
  if (!value || isNaN(value)) return '';
  return value.toLocaleString('pt-BR', {
    style,
    currency: 'BRL',
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    // day: "2-digit",
    // month: "short",
    // year: "numeric",
    dateStyle: 'short',
  });
}
