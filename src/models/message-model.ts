import { AppError } from '@/utils/app-error';
import { MongoClient, ObjectId } from 'mongodb';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const dbUri = process.env.DB_URI;
const dbName = process.env.DB_Name;
const messageCollection = new MongoClient(dbUri!).db(dbName).collection('chats');

const MessageSchema = z
  .object({
    chat: z.instanceof(ObjectId),
    sender: z.instanceof(ObjectId),
    text: z.string().default(''),
    photo: z.string().default(''),
    cretaeAt: z.date().default(new Date()),
    seenBy: z.array(z.instanceof(ObjectId)).default([]),
  })
  .strict();

const MessageSchemaPartial = MessageSchema.partial();
type MessageType = z.infer<typeof MessageSchemaPartial>;

const MessageModel = Object.create(messageCollection);

MessageModel.validate = (data: MessageType) => {
  if (data.seenBy) {
    const objectIdseenBy: ObjectId[] = [];
    for (let c of data.seenBy) {
      objectIdseenBy.push(new ObjectId(c));
    }
    data.seenBy = objectIdseenBy;
  }
  if (data.chat) {
    data.chat = new ObjectId(data.chat);
  }
  if (data.sender) {
    data.sender = new ObjectId(data.sender);
  }

  const result = MessageSchema.required().safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

MessageModel.partialValidate = (data: MessageType) => {
  if (data.seenBy) {
    const objectIdseenBy: ObjectId[] = [];
    for (let c of data.seenBy) {
      objectIdseenBy.push(new ObjectId(c));
    }
    data.seenBy = objectIdseenBy;
  }
  if (data.chat) {
    data.chat = new ObjectId(data.chat);
  }
  if (data.sender) {
    data.sender = new ObjectId(data.sender);
  }

  const result = MessageSchemaPartial.safeParse(data);
  if (!result.success) {
    throw new AppError(400, fromZodError(result.error).toString(), result.error.issues);
  }
  return result.data;
};

export { MessageModel, type MessageType };
