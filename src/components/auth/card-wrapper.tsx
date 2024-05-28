'use client';

import { BackButton } from '@/components/auth/back-button';
import { FormHeader } from '@/components/auth/form-header';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';

type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
};

function CardWrapper({ children, headerLabel, backButtonLabel, backButtonHref }: CardWrapperProps) {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Card className='w-fit min-w-[360px] shadow-lg'>
        <CardHeader>
          <FormHeader label={headerLabel}></FormHeader>
        </CardHeader>
        <CardContent> {children}</CardContent>
        <CardFooter>
          <BackButton
            href={backButtonHref}
            label={backButtonLabel}></BackButton>
        </CardFooter>
      </Card>
    </div>
  );
}

export { CardWrapper };
