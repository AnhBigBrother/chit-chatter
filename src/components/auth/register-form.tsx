'use client';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { SubmitButton } from '@/components/auth/submit-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterSchema } from '@/schemas/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function RegisterForm() {
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
    startTransition(async () => {
      // const res = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // if (res.ok) {
      // }
      console.log(data);
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

          <SubmitButton isPending={isPending}>Register</SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
}
