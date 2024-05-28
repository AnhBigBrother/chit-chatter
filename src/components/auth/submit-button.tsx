import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ children, isPending }: { children: any; isPending: boolean }) => {
  return (
    <button
      type='submit'
      disabled={isPending}
      className='bg-slate-900 hover:bg-opacity-80 text-white rounded-full h-12 w-full duration-200 disabled:bg-opacity-80 flex items-center justify-center'>
      {isPending ? <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-white'></div> : children}
    </button>
  );
};
