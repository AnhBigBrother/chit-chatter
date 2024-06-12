'use client';

import { Spinner } from '@/components/loader';
import { ContactItem } from '@/components/sections/contact-list/contact-item';
import { UserType } from '@/models/user-model';
import { FetchWrapper } from '@/utils/fetch-wrapper';
import { ObjectId } from 'mongodb';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { HiMiniXMark } from 'react-icons/hi2';

type ContactDataType = UserType & {
  _id: ObjectId;
};

const Contacts = () => {
  const currenUser = useSession().data?.user;
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const contactSearch = searchParams.get('contact') || '';
  const [loading, setLoading] = useState<boolean>(false);
  const [contact, setContact] = useState<ContactDataType[]>([]);
  const [selected, setSelected] = useState<ContactDataType[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const inp = useRef<HTMLInputElement>(null);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('contact', value);
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleCreateNewChat = (selected: ContactDataType[]) => {
    const members = selected.map(m => m._id);
    const payload: { [key: string]: any } = { members };
    if (selected.length > 1) {
      payload['isGroup'] = true;
      if (!groupName) {
        toast.error('Group name is required!');
        return;
      }
      payload['name'] = groupName;
    } else {
      payload['isGroup'] = false;
      payload['name'] = '';
    }
    FetchWrapper(async () => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
    });
  };

  useEffect(() => {
    inp.current!.value = contactSearch;
    setLoading(true);
    const timmer = setTimeout(() => {
      FetchWrapper(async () => {
        const res = await fetch(`/api/user?search=${contactSearch || ''}`);

        const result = await res.json();
        if (result.error) {
          toast.error(result.error.message || 'Something went wrong, try later!');
        }
        const contact = result.result.filter((x: ContactDataType) => x.email !== currenUser!.email);
        console.log(currenUser);
        setContact(contact);
        setLoading(false);
      });
    }, 500);

    return () => clearTimeout(timmer);
  }, [contactSearch]);

  return (
    <section className='flex flex-col gap-3 col-span-1 sm:col-span-2 w-full h-full '>
      <div className='relative w-full'>
        <input
          ref={inp}
          onChange={e => handleSearch(e.target.value.trim())}
          className='w-full rounded-2xl px-[1rem] h-12 bg-white outline-none'
          placeholder='Find contact...'></input>
        {contactSearch && (
          <button
            className='rounded-full w-6 h-6 absolute right-3 top-3 bg-rose-100 hover:bg-rose-200 flex items-center justify-center'
            onClick={() => handleSearch('')}>
            <HiMiniXMark className='text-rose-500 w-4 h-4' />
          </button>
        )}
      </div>
      <div className='flex flex-row gap-3'>
        {loading ? (
          <div className='w-1/2 py-10 flex justify-center'>
            <Spinner
              color='black'
              size='lg'
            />
          </div>
        ) : (
          <div className='px-[1rem] py-[0.75rem] w-1/2 h-fit rounded-2xl bg-white flex flex-col gap-3'>
            {contact.length > 0 ? (
              contact.map((c, i) => (
                <ContactItem
                  data={c}
                  selected={selected}
                  setSelected={setSelected}
                  key={i}
                />
              ))
            ) : (
              <p>Couldn't found anyone :&#40;</p>
            )}
          </div>
        )}
        <div className='w-1/2 flex flex-col gap-y-2'>
          {selected.length > 1 && (
            <div className='flex flex-col gap-1'>
              <p className='text-xl font-medium'>Group Chat Name</p>
              <input
                className='outline-none bg-white rounded-xl h-12 w-full px-3'
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder='Enter group chat name...'></input>
            </div>
          )}
          {selected.length > 0 && (
            <div className='flex flex-wrap items-center gap-2'>
              {selected.map(selected => (
                <p
                  key={selected._id.toString()}
                  className='py-2 px-3 rounded-lg bg-rose-300/60'>
                  {selected.name}
                </p>
              ))}
            </div>
          )}
          <button
            className='h-12 w-full px-5 rounded-xl text-nowrap text-white font-medium bg-rose-800 hover:bg-rose-500'
            onClick={() => handleCreateNewChat(selected)}>
            Start a new chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
