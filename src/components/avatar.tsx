import Image from 'next/image';
import React from 'react';

export function Avatar({ src, type }: { src: string | null | undefined; type: 'group' | 'user' }) {
  return (
    <Image
      priority
      src={src || (type === 'group' ? '/group.png' : '/person.jpg')}
      alt='favicon'
      height={36}
      width={36}
      className='rounded-full cursor-pointer object-contain'></Image>
  );
}
