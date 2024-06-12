import { Avatar } from '@/components/avatar';
import { ChatType } from '@/models/chat-model';
import { ObjectId } from 'mongodb';

type ChatListItemType = ChatType & {
  _id: ObjectId;
};

export const ChatListItem = ({ data }: { data: ChatListItemType }) => {
  const chatName = data.name || data.members![0].toString();
  return (
    <li className='flex flex-row justify-between'>
      <div className='flex flex-row gap-1'>
        <Avatar
          src={data.groupPhoto}
          type={data.isGroup ? 'group' : 'user'}
        />
        <div className='flex flex-col overflow-ellipsis'>
          <p className='text-sm font-semibold'>{chatName}</p>
          <p className='text-xs text-muted-foreground'>{data.message!.length === 0 ? 'Start a new chat' : data.message![data.message!.length - 1].toString()}</p>
        </div>
      </div>
    </li>
  );
};
