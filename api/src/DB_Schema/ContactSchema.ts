import { Schema, model } from 'mongoose';
import { Contact } from '../Models/ContactModel';


const ContactSchema = new Schema<Contact>({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    subject: {type: String, required: true},
    message: {type: String, required: true},
    answered: {type: Boolean, required: true, default: false},
});

export const ContactTable = model('Contact', ContactSchema);