import ChatList from '@/components/sections/chat-list/chats-list';
import Contacts from '@/components/sections/contact-list/contacts';

export default async function Home() {
  return (
    <main className='w-full h-full p-5 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6'>
      <ChatList />
      <Contacts />
    </main>
  );
}
