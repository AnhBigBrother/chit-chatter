export const ChatListLoader = () => {
  return (
    <div className='col-span-1 flex justify-center items-center px-[1rem] py-[0.75rem] w-full aspect-square rounded-2xl bg-white'>
      <Spinner
        color='black'
        size='lg'
      />
    </div>
  );
};

export const ContactsLoader = () => {
  return (
    <div className='w-full aspect-square flex justify-center items-center px-[1rem] py-[0.75rem] rounded-2xl bg-white'>
      <Spinner
        color='black'
        size='lg'
      />
    </div>
  );
};

export const Spinner = ({ color, size }: { color: 'black' | 'white'; size: 'sm' | 'md' | 'lg' }) => {
  return <div className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-8 w-8' : 'h-12 w-12'} animate-spin rounded-full border-b-2 ${color === 'black' ? 'border-black' : 'border-white'}`}></div>;
};
