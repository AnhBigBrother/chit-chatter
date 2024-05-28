import Image from 'next/image';
import React from 'react';

function FormHeader({ label }: { label: string }) {
  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-3xl font-semibold flex gap-3 items-end text-slate-900'>
        <Image
          priority
          src='./hello-chat.svg'
          alt='favicon'
          height={32}
          width={32}></Image>
        ChitChatter
      </h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}

export { FormHeader };
