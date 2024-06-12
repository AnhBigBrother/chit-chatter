import { UserModel } from '@/models/user-model';
import { AppError } from '@/utils/app-error';
import { ControllerWrapper } from '@/utils/controller-wrapper';
import bcrypt from 'bcrypt';

export const POST = ControllerWrapper(async (req: Request, res: Response) => {
  const body = await req.json();
  const data = UserModel.validate(body);

  const existingUser = await UserModel.findOne({ email: data.email });

  if (existingUser) {
    throw new AppError(400, 'Email is already in use');
  }
  const hashedPwd = await bcrypt.hash(data.password, 10);
  await UserModel.insertOne({ ...data, password: hashedPwd });

  return { success: true, result: { email: data.email, password: hashedPwd } };
});
