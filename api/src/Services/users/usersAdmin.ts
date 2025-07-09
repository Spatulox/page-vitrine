import { ObjectID } from "../../DB_Schema/connexion";
import { UserRole, UserTable } from "../../DB_Schema/UserSchema";
import { FilledUser, User } from "../../Models/UserModel";
import { UpdateAccountAdminType } from "../../Validators/users";
import { toUserObject } from "./usersPublic";

export async function getAllUsers(): Promise<FilledUser[]> {
    const users = await UserTable.find()
        .exec();
    return users.map(user => toUserObject(user)).filter(u => u !== null);
}

export async function getAllAdmin(): Promise<FilledUser[]> {
    const users = await UserTable.find(
        {role: UserRole.admin}
    )
        .exec();
    return users.map(user => toUserObject(user)).filter(u => u !== null);
}

export async function getAllClients(): Promise<FilledUser[]> {
    const users = await UserTable.find(
        {role: UserRole.client}
    )
        .exec();
    return users.map(user => toUserObject(user)).filter(u => u !== null);
}

export async function getAllEmployee(): Promise<FilledUser[]> {
    const users = await UserTable.find(
        {role: UserRole.employee}
    )
        .exec();
    return users.map(user => toUserObject(user)).filter(u => u !== null);
}

export async function deleteUserById(user_id: ObjectID): Promise<boolean>{
    const result = await UserTable.deleteOne({_id: user_id}).exec()
    return result.deletedCount > 0;
}

export async function updateAccountAdmin(user_id: ObjectID, option: UpdateAccountAdminType): Promise<boolean>{
    try{
        const result = await UserTable.updateOne(
            { _id: user_id },
            { $set: option }
        );
        return result.modifiedCount === 1 || result.matchedCount === 1
    } catch(e: any){
        console.error(e)
        return false
    }
}