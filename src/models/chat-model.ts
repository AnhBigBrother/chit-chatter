import { AppError } from '@/utils/app-error';
import { MongoClient, ObjectId } from 'mongodb';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_Name;
const chatCollection = new MongoClient(dbUri!).db(dbName).collection('chats');

const ChatSchema = z
  .object({
    members: z.array(z.instanceof(ObjectId)).min(2),
    message: z.array(z.instanceof(ObjectId)).default([]),
    isGroup: z.boolean().default(false),
    name: z.string().default(''),
    groupPhoto: z.string().default(''),
    createAt: z.date().default(new Date()),
    lastMessageAt: z.date().default(new Date()),
  })
  .strict();

const chatSchemaPartial = ChatSchema.partial();
type ChatType = z.infer<typeof chatSchemaPartial>;

const ChatModel = Object.create(chatCollection);

ChatModel.validate = (data: ChatType) => {
  if (data.members) {
    const objectIdMembers: ObjectId[] = [];
    for (let c of data.members) {
      objectIdMembers.push(new ObjectId(c));
    }
    data.members = objectIdMembers;
  }
  if (data.message) {
    const objectIdMessage: ObjectId[] = [];
    for (let c of data.message) {
      objectIdMessage.push(new ObjectId(c));
    }
    data.message = objectIdMessage;
  }

  const result = ChatSchema.required().safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

ChatModel.partialValidate = (data: ChatType) => {
  if (data.members) {
    const objectIdMembers: ObjectId[] = [];
    for (let c of data.members) {
      objectIdMembers.push(new ObjectId(c));
    }
    data.members = objectIdMembers;
  }
  if (data.message) {
    const objectIdMessage: ObjectId[] = [];
    for (let c of data.message) {
      objectIdMessage.push(new ObjectId(c));
    }
    data.message = objectIdMessage;
  }

  const result = chatSchemaPartial.safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

export { ChatModel, type ChatType };
