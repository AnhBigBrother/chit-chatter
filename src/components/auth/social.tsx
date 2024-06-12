'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function Social() {
  const handleSignInGoogle = async () => {
    await signIn('google');
  };
  const handleSignInGitHub = async () => {
    await signIn('github');
  };
  return (
    <div className='w-full flex flex-col gap-2 justify-center items-center'>
      <Button
        onClick={handleSignInGoogle}
        size={'lg'}
        className='w-full'
        variant={'outline'}>
        <div className='w-full h-full flex items-center justify-center gap-3'>
          <FcGoogle className='h-5 w-5' />
          <span>Login With Google</span>
        </div>
      </Button>
      <Button
        onClick={handleSignInGitHub}
        size={'lg'}
        className='w-full'
        variant={'outline'}>
        <div className='w-full h-full flex items-center justify-center gap-3'>
          <FaGithub className='h-5 w-5' />
          <span>Login With GitHub</span>
        </div>
      </Button>
    </div>
  );
}
