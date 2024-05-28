import { AppError } from '@/utils/app-error';
import { MongoClient } from 'mongodb';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_Name;
const userCollection = new MongoClient(dbUri!).db(dbName).collection('users');

const UserSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(6),
    email: z.string().email(),
    chats: z.array(z.string()).default([]),
  })
  .strict();

const UserSchemaPartial = UserSchema.partial();
type UserType = z.infer<typeof UserSchemaPartial>;

const UserModel = Object.create(userCollection);

UserModel.validate = (data: UserType) => {
  const result = UserSchema.required().safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};
UserModel.validateData = (data: UserType) => {
  const result = UserSchemaPartial.safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

export { UserModel, type UserType };
