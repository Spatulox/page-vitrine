import { InternalServerError } from "routing-controllers";
import { ObjectID } from "../../DB_Schema/connexion";
import { UserRole, UserTable } from "../../DB_Schema/UserSchema";
import { FilledUser, User } from "../../Models/UserModel";
import { CreateEmployeetype, UpdateAccountAdminType } from "../../Validators/users";
import { toUserObject } from "./usersPublic";
import { NewsletterSender } from "../../Utils/mailer";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../auth/password";

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


export async function createEmployee(values: CreateEmployeetype): Promise<boolean> {
  try {
    const option = {length: 12, memorable: true}
    const generatedPassword = faker.internet.password(option);
    const val: Omit<User, "_id"> = {
        ...values,
        role: UserRole.employee,
        password: await hashPassword(generatedPassword)
    }
    await UserTable.insertOne(val);


    const newsletterSender = new NewsletterSender();
    newsletterSender.sendNewsletter(
        "Création de votre compte Employé",
        `Votre mot de passe a été généré automatiquement.\nVotre mot de passe : ${generatedPassword}`,
        [values.email]
    ).then(console.log);


    return true
  } catch (error) {
    console.error(error);
    throw new InternalServerError("Impossible de créer le compte");
  }
}
