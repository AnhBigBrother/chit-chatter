import { UserModel } from '@/models/user-model';
import { AppError } from '@/utils/app-error';
import { ControllerWrapper } from '@/utils/controller-wrapper';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export const GET = ControllerWrapper(async (req: NextRequest) => {
  const token = await getToken({ req });
  if (!token) {
    throw new AppError(401, 'Unauthorized!');
  }

  const search = req.nextUrl.searchParams.get('search') || '';
  const result = await UserModel.aggregate([
    {
      $match: {
        name: {
          $regex: search,
          $options: 'i',
        },
      },
    },
    { $unset: ['password', 'chats'] },
  ]).toArray();

  return { success: true, result };
});
