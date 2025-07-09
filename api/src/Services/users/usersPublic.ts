import { UserTable } from "../../DB_Schema/UserSchema";
import { User, FilledUser } from "../../Models/UserModel";
import { UpdateAccountType } from "../../Validators/users";
import { ObjectID } from "../../DB_Schema/connexion";

export async function getUserById(userId: ObjectID): Promise<FilledUser | null> {
    const obj = await UserTable.findById(userId)
        .populate("group_chat_list_ids")
        .exec();
    return toUserObject(obj)
}

export async function updateMyAccount(user: User, option: UpdateAccountType): Promise<boolean>{
    try{
        const result = await UserTable.updateOne(
            { _id: user._id },
            { $set: option }
        );
        return result.modifiedCount === 1 || result.matchedCount === 1
    } catch(e: any){
        console.error(e)
        return false
    }
}

export async function deleteMyAccount(user: User): Promise<boolean>{
    const result = await UserTable.deleteOne({_id: user._id}).exec()
    return result.deletedCount > 0;
}



export function toUserObject(doc: User | null, depth: number = 0): FilledUser | null {
    if(doc == null){return null}

    return {
        _id: doc._id.toString(),
        name: doc.name,
        lastname: doc.lastname,
        email: doc.email,
        role: doc.role,
        phone: doc.phone,
    };
}