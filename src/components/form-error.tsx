import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function FormError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
}
