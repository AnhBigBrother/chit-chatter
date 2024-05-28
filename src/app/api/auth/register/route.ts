import { UserModel } from '@/models/user-model';
import { AppError } from '@/utils/app-error';
import { FunctionWrapper } from '@/utils/function-wrapper';

export const POST = FunctionWrapper(async (req: Request, res: Response) => {
  const body = await req.json();
  const data = UserModel.validate(body);

  const existingUser = await UserModel.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError(400, 'Email is already in use');
  }
  const newUser = await UserModel.insertOne(data);

  return { success: true, result: newUser };
});
