import { Schema, model, Types } from 'mongoose';
import { ObjectID } from './connexion';
import { Sessions } from '../Models/SessionsModel';

const SessionSchema = new Schema<Sessions>({
  room_id: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  start_time: { type: Date, required: true },
});

export const SessionTable = model<Sessions>('Session', SessionSchema);
