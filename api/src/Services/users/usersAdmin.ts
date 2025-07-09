import { ObjectID } from "../../DB_Schema/connexion";
import { UserRole, UserTable } from "../../DB_Schema/UserSchema";
import { FilledUser, User } from "../../Models/UserModel";
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