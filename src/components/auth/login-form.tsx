'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { SubmitButton } from '@/components/auth/submit-button';
import FormError from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/schemas/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm() {
  const session = useSession();
  useEffect(() => {
    if (session.status === 'authenticated') {
      redirect('/');
    }
  }, [session]);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setSuccess('');
    setError('');
    startTransition(async () => {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      if (!res || !res.ok) {
        setSuccess('');
        setError(res?.error || 'Something went wrong!');
        return;
      }
      setError('');
      setSuccess('Success!');
    });
  };

  return (
    <CardWrapper
      headerLabel='Login'
      backButtonLabel="Don't have an account? Register here!"
      backButtonHref='/register'
      showSocial={true}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Email'
                    type='email'></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}></FormField>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Password'
                    type='password'></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}></FormField>
          <FormSuccess message={success} />
          <FormError message={error} />
          <SubmitButton isPending={isPending}>Login</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}
