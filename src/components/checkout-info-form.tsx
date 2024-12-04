import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const formSchema = z.object({
  name: z.string().trim().min(5, 'Nome inválido'),
  phoneNumber: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ''))
    .refine((value) => /^\d{10,11}$/.test(value), 'Telefone inválido'),
  address: z.string().trim().min(10, 'Endereço inválido'),
  addressNumber: z.string().trim().min(2, 'Número inválido'),
  observation: z.string().min(5, 'Campo inválido').optional().or(z.literal('')),
});

export type FormSchema = z.infer<typeof formSchema> | undefined;

interface Props {
  setCanSubmit: (value: boolean) => void;
  setFormValues: (values: FormSchema) => void;
}

export default function CheckoutInfoForm({
  setCanSubmit,
  setFormValues,
}: Props) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNumber: '',
      address: '',
      addressNumber: '',
      observation: '',
    },
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
    setFormValues(values);
  }

  useEffect(() => {
    setCanSubmit(form.formState.isValid);
  }, [form.formState.isValid]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu telefone"
                  {...field}
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 11);
                    let formattedValue = digits;
                    if (digits.length <= 2) {
                      formattedValue = `(${digits}`;
                    } else if (digits.length <= 7) {
                      formattedValue = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
                    } else {
                      formattedValue = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
                    }
                    field.onChange(formattedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu endereço" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="Digite o número" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observação (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Alguma observação sobre o pedido?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
