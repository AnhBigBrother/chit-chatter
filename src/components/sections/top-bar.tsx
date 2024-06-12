'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar } from '@/components/avatar';

export const TopBar = () => {
  const pathname = usePathname();
  const user = useSession().data?.user;

  return (
    <header className='fixed z-10 top-0 w-full h-auto p-5 sm:px-8 shadow-md shadow-white/70 bg-white/70 backdrop-blur-[0.5rem]'>
      <nav className='flex flex-row justify-between items-center'>
        <Link href={'/'}>
          <h1 className='flex gap-3 items-center'>
            <Image
              priority
              src='./favicon.svg'
              alt='favicon'
              height={36}
              width={36}></Image>
            <span className='hidden sm:block text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-rose-400'>RocketChat</span>
          </h1>
        </Link>
        <div className='flex flex-row items-center gap-3 sm:gap-5'>
          <Link
            href='/'
            className={`font-semibold text-lg sm:text-xl ${pathname === '/' ? 'text-rose-400' : ''}`}>
            Chats
          </Link>
          <Link
            href='/contacts'
            className={`font-semibold text-lg sm:text-xl ${pathname === '/contacts' ? 'text-rose-400' : ''}`}>
            Contacts
          </Link>
          {user && (
            <Popover>
              <PopoverTrigger>
                <Avatar
                  src={user.image}
                  type='user'
                />
              </PopoverTrigger>
              <PopoverContent
                onClick={() => signOut()}
                className='flex flex-row gap-3 items-center w-fit py-2 cursor-pointer border-none bg-rose-100 hover:bg-rose-200'
                align='end'>
                <span className='text-nowrap font-medium text-lg'>Log out</span>
                <MdLogout className='w-5 h-5' />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>
    </header>
  );
};
