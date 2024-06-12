import { AppError } from '@/utils/app-error';
import { MongoClient, ObjectId } from 'mongodb';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_Name;
const userCollection = new MongoClient(dbUri!).db(dbName).collection('users');

const UserSchema = z
  .object({
    name: z.string().min(3),
    password: z.string().min(6),
    email: z.string().email(),
    picture: z.string().default(''),
    socialAuthProvider: z.boolean().default(false),
    chats: z.array(z.instanceof(ObjectId)).default([]),
  })
  .strict();

const UserSchemaPartial = UserSchema.partial();
type UserType = z.infer<typeof UserSchemaPartial>;

const UserModel = Object.create(userCollection);

UserModel.validate = (data: UserType) => {
  if (data.chats) {
    const objectIdChats: ObjectId[] = [];
    for (let c of data.chats) {
      objectIdChats.push(new ObjectId(c));
    }
    data.chats = objectIdChats;
  }
  const result = UserSchema.required().safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

UserModel.partialValidate = (data: UserType) => {
  if (data.chats) {
    const objectIdChats: ObjectId[] = [];
    for (let c of data.chats) {
      objectIdChats.push(new ObjectId(c));
    }
    data.chats = objectIdChats;
  }
  const result = UserSchemaPartial.safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

export { UserModel, type UserType };
