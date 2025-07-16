import { Authorized, Body, Get, HttpCode, JsonController, Param, Post } from "routing-controllers";
import { UserRole } from "../DB_Schema/UserSchema";
import { FilledContact } from "../Models/ContactModel";
import { createContact, getAllcontact, getContactById, validContact } from "../Services/contact/contact";
import { zObjectId } from "../Validators/utils";
import { ObjectID } from "../DB_Schema/connexion";
import { zCreateContactParams } from "../Validators/contact";



@JsonController("/contacts")
export class ContactController {

    @Get('/')
    @Authorized([UserRole.employee, UserRole.admin])
    async getAllContact(): Promise<FilledContact[]>{
        return await getAllcontact()
    }

    @Get('/:id')
    @Authorized([UserRole.employee, UserRole.admin])
    async getContactByID(@Param("id") id: string): Promise<FilledContact>{
        const validId = new ObjectID(zObjectId.parse(id))
        return await getContactById(validId)
    }

    @Post('/')
    @HttpCode(204)
    async createContact(@Body() body: any): Promise<boolean> {
        const validParam = zCreateContactParams.parse(body)
        return await createContact(validParam)
    }

    @Post('/:id')
    @HttpCode(204)
    async answeredContact(@Param("id") id: string): Promise<boolean> {
        const validID = new ObjectID(zObjectId.parse(id))
        return await validContact(validID)
    }
}