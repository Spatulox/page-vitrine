import { ObjectID } from "../DB_Schema/connexion";

export type User ={
    _id: ObjectID,
    name: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    phone: string,
}

export type FilledUser = Omit<User, "_id" | "password"> & {_id: string};

