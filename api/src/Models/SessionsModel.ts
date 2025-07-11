import { ObjectID } from "../DB_Schema/connexion"
import { FilledRoom, Room } from "./RoomModel";
import { FilledUser } from "./UserModel";

export type Sessions = {
    _id: ObjectID,
    room_id: ObjectID,
    user_id: ObjectID,
    start_time: Date,
    participants: number,
}

export type FilledSessions = Omit<Sessions, "_id" | "room_id" | "user_id"> & {_id: string, room: FilledRoom, user: FilledUser | null};

export type RoomSessions = {
    room: FilledRoom,
    sessions: FilledSessions[]
}

export type RoomSessionsEmpty = {
    room: FilledRoom,
    free_sessions: string[]
}