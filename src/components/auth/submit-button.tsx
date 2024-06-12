import { Spinner } from '@/components/loader';

export const SubmitButton = ({ children, isPending }: { children: any; isPending: boolean }) => {
  return (
    <button
      type='submit'
      disabled={isPending}
      className='bg-rose-800 hover:bg-rose-500 text-white font-medium rounded-md h-11 w-full duration-200 disabled:bg-rose-500 disabled:bg-opacity-70 flex items-center justify-center'>
      {isPending ? (
        <Spinner
          color='white'
          size='sm'
        />
      ) : (
        children
      )}
    </button>
  );
};
