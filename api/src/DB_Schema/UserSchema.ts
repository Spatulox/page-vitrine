import { Schema, model } from 'mongoose';
import { User } from '../Models/UserModel';

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, value: ['admin', 'client', 'employee']},
    phone: {type: String, required: true},
});


export const UserTable = model('User', UserSchema);

export enum UserRole {
    admin = "admin",
    client = "client",
    employee = "employee",
}