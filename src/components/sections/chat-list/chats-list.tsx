'use client';
import { Spinner } from '@/components/loader';
import { ChatListItem } from '@/components/sections/chat-list/chat-item';
import { ChatType } from '@/models/chat-model';
import { FetchWrapper } from '@/utils/fetch-wrapper';
import { ObjectId } from 'mongodb';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { HiMiniXMark } from 'react-icons/hi2';

type ChatListItemType = ChatType & {
  _id: ObjectId;
};

const ChatList = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const chatSearch = searchParams.get('chat') || '';
  const [chatList, setChatList] = useState<ChatListItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const inp = useRef<HTMLInputElement>(null);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('chat', value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  useEffect(() => {
    inp.current!.value = chatSearch;
    setLoading(true);
    const timmer = setTimeout(
      () =>
        FetchWrapper(async () => {
          const res = await fetch(`/api/chat?search=${chatSearch}`);
          const result = await res.json();

          if (result.error) {
            toast.error(result.error.message || 'Something went wrong, try later!');
          }

          console.log('chats', result.result);
          setChatList(result.result);
          setLoading(false);
        }),
      500
    );

    return () => clearTimeout(timmer);
  }, [chatSearch]);

  return (
    <section className='flex flex-col gap-3 col-span-1 w-full h-full'>
      <div className='relative w-full'>
        <input
          ref={inp}
          onChange={e => handleSearch(e.target.value.trim())}
          className='w-full rounded-2xl px-[1rem] h-12 bg-white outline-none'
          placeholder='Find chat'></input>
        {chatSearch && (
          <button
            className='rounded-full w-6 h-6 absolute right-3 top-3 bg-rose-100 hover:bg-rose-200 flex items-center justify-center'
            onClick={() => handleSearch('')}>
            <HiMiniXMark className='text-rose-500 w-4 h-4' />
          </button>
        )}
      </div>
      {loading ? (
        <div className='w-full py-10 flex justify-center'>
          <Spinner
            color='black'
            size='lg'
          />
        </div>
      ) : (
        <div className='px-[1rem] py-[0.75rem] w-full h-full rounded-2xl bg-white flex flex-col gap-3'>
          {chatList.map((item, idx) => (
            <ChatListItem
              data={item}
              key={idx}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ChatList;
