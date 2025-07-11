import { ObjectID } from "../DB_Schema/connexion";

export type Room = {
    _id: ObjectID,
    name: string,
    description: string,
    long_description: string,
    price: number,
    estimated_duration: number,
    duration: number, /* In Minutes */
    max_participants: number,
    visible: boolean,
    admin_visible: boolean
}



export type FilledRoom = Omit<Room, "_id" | "admin_visible"> & {_id: string};