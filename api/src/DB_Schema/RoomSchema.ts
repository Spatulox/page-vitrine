import { Schema, model } from 'mongoose';
import { Room } from '../Models/RoomModel';

const RoomSchema = new Schema<Room>({
    name: {type: String, required: true},
    description: {type: String, required: true},
    long_description: {type: String, required: true},
    price: {type: Number, required: true},
    estimated_duration: {type: Number, required: true},
    duration: {type: Number, required: true},
    max_participants: {type: Number, required: true},
})

export const RoomTable = model('Room', RoomSchema);