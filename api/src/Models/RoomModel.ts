import { ObjectID } from "../DB_Schema/connexion";

export type Room = {
    _id: ObjectID,
    name: string,
    description: string,
    long_description: string,
    price: number,
    estimated_duration: number,
    duration: number, /* In Minutes */
    participants: number,
    max_participants: number,
}



export type FilledRoom = Omit<Room, "_id"> & {_id: string};