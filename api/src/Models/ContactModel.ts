import { ObjectID } from "../DB_Schema/connexion"

export type Contact = {
    _id: ObjectID,
    name: string,
    lastname: string,
    phone: string,
    email: string,
    subject: string,
    message: string,
    answered: boolean
}

export type FilledContact = Omit<Contact, "_id" | "answered"> & {_id: string}