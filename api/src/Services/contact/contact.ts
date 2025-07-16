import { InternalServerError } from "routing-controllers";
import { ObjectID } from "../../DB_Schema/connexion";
import { ContactTable } from "../../DB_Schema/ContactSchema";
import { FilledContact } from "../../Models/ContactModel";
import { CreateContactParam } from "../../Validators/contact";

export async function getAllcontact(): Promise<FilledContact[]>{
    const res = await ContactTable.find(
        {answered: false}
    )
    return res.map(toContactObject)
}

export async function getContactById(id: ObjectID): Promise<FilledContact>{
    const res = await ContactTable.findById(id)
    return toContactObject(res)
}

export async function createContact(param: CreateContactParam): Promise<boolean>{
    const res = await ContactTable.create(param)
    if(res){
        return true
    }
    throw new InternalServerError("Impossible d'envoyer le message")
}

export async function validContact(id: ObjectID): Promise<boolean>{
    const res = await ContactTable.updateOne(
        {_id: id},
        {answered: true}
    )
    
    if(res.modifiedCount){
        return true
    }
    return false
}


export function toContactObject(obj: any): FilledContact{
    return {
        _id: obj._id.toString(),
        name: obj.name,
        lastname: obj.lastname,
        phone: obj.phone,
        email: obj.email,
        subject: obj.subject,
        message: obj.message
    }
}