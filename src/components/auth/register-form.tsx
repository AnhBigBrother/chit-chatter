'use client';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { SubmitButton } from '@/components/auth/submit-button';
import FormError from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/schemas/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function RegisterForm() {
  const session = useSession();
  useEffect(() => {
    if (session.status === 'authenticated') {
      redirect('/');
    }
  }, [session]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setSuccess('');
    setError('');
    startTransition(async () => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error.message);
        setSuccess('');
        return;
      }
      const res2 = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (!res2 || !res2.ok) {
        setSuccess('');
        setError(res2?.error || 'Something went wrong!');
        return;
      }
      setError('');
      setSuccess('Success!');
    });
  };
  return (
    <CardWrapper
      headerLabel='Register'
      backButtonLabel='Already have an account? Login here!'
      backButtonHref='/login'>
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Name'
                    type='text'></Input>
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
          <SubmitButton isPending={isPending}>Register</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}
