import { ObjectID } from "../DB_Schema/connexion"

export type Sessions = {
    _id: ObjectID,
    room_id: ObjectID,
    user_id: ObjectID,
    start_time: Date,
}