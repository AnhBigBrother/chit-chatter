import { ChatModel } from '@/models/chat-model';
import { UserModel } from '@/models/user-model';
import { AppError } from '@/utils/app-error';
import { ControllerWrapper } from '@/utils/controller-wrapper';
import { ObjectId } from 'mongodb';
import { getToken } from 'next-auth/jwt';
import { type NextRequest } from 'next/server';

export const GET = ControllerWrapper(async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token) {
    throw new AppError(401, 'Unauthorized!');
  }

  const user_id = new ObjectId(String(token._id));
  console.log(user_id);
  const search = req.nextUrl.searchParams.get('search') || '';

  const pipeline = [
    {
      $match: {
        members: user_id,
        name: {
          $regex: search,
          $options: 'i',
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'members',
        foreignField: '_id',
        as: 'members_mapping',
      },
    },
    {
      $set: {
        members: '$members_mapping',
      },
    },
    { $unset: ['members_mapping', 'members.password', 'members.chats'] },
  ];

  const result = await ChatModel.aggregate(pipeline).toArray();

  return { success: true, result };
});

export const POST = ControllerWrapper(async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token) {
    throw new AppError(401, 'Unauthorized!');
  }

  const currrentUserId = token._id;

  const body = await req.json();
  console.log(body);
  console.log(body);
  const name = body.name;
  const members = Array.from(new Set([...body.members, currrentUserId]));
  const isGroup = body.isGroup || (members.length > 2 ? true : false);
  if (isGroup && !name) {
    throw new AppError(400, 'Group name is required');
  }

  const data = ChatModel.validate({ members, name, isGroup });

  const query = isGroup ? { isGroup, name, members } : { members: { $all: [members], $size: 2 } };
  const existedChat = await ChatModel.findOne(query);
  if (existedChat) {
    throw new AppError(400, 'You already have the same chat!');
  }

  const result = await ChatModel.insertOne(data);
  const chatId = result.insertedId.toString();
  const updateAllMembers = members.map(async mem => {
    await UserModel.updateOne({ _id: ObjectId.createFromHexString(mem) }, { $addToSet: { chats: chatId } });
  });

  await Promise.all(updateAllMembers);

  return { success: true, chatId };
});
