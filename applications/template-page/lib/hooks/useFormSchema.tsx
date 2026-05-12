import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useFormSchema = <T,>(schema: T, initialData?: Record<string, any>) => {
  // @ts-expect-error - typeError
  const resolver = zodResolver(schema);
  const { formState, register, handleSubmit, ...form } = useForm({
    resolver,
    shouldFocusError: true,
    defaultValues: initialData,
  });

  return {
    errors: formState.errors,
    setValue: form.setValue,
    watchValue: form.watch,
    register,
    handleSubmit,
  };
};
