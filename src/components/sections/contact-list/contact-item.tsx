'use client';

import { Avatar } from '@/components/avatar';
import { UserType } from '@/models/user-model';
import { ObjectId } from 'mongodb';
import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

type ContactDataType = UserType & {
  _id: ObjectId;
};

export function ContactItem({ data, selected, setSelected }: { data: ContactDataType; selected: ContactDataType[]; setSelected: React.Dispatch<React.SetStateAction<ContactDataType[]>> }) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleSelect = () => {
    if (!isSelected) {
      setSelected(prev => [...prev, data]);
    } else {
      setSelected(prev => prev.filter(user => user._id !== data._id));
    }
  };

  useEffect(() => {
    for (let x of selected) {
      if (x._id === data._id) {
        setIsSelected(true);
        return;
      }
    }
    setIsSelected(false);
  }, [selected]);

  return (
    <button
      className='flex flex-row gap-3 items-center'
      onClick={() => handleSelect()}>
      <div className={`rounded-full w-5 h-5 flex items-center justify-center border-2 ${isSelected ? 'border-rose-500 bg-rose-500' : ''}`}>{isSelected && <FaCheck className='w-3 h-3 fill-white' />}</div>
      <Avatar
        src={data.picture}
        type='user'
      />
      <p>{data.name}</p>
    </button>
  );
}
