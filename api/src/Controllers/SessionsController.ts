import { Authorized, Body, CurrentUser, Delete, Get, HttpCode, JsonController, Param, Post, Put } from "routing-controllers";
import { User } from "../Models/UserModel";
import { bookASessions, deleteASessions, getSessionsByID, getFilledSessionsByUser } from "../Services/sessions/sessions";
import { FilledSessions, RoomSessions } from "../Models/SessionsModel";
import { ObjectID } from "../DB_Schema/connexion";
import { zObjectId } from "../Validators/utils";
import { zBookSessions } from "../Validators/sessions";

@JsonController("/sessions")
export class SessionsController {
  @Get('/')
  @Authorized()
  async getMyCurrentBook(@CurrentUser() user: User): Promise<FilledSessions[]> {
    return await getFilledSessionsByUser(user, true)
  }

  @Get('/historic')
  @Authorized()
  async getMyOldBook(@CurrentUser() user: User): Promise<FilledSessions[]> {
    return await getFilledSessionsByUser(user, false)
  }

  @Get('/:id')
  @Authorized()
  async getSessionsByID(@CurrentUser() user: User, @Param('id') user_id: ObjectID): Promise<FilledSessions | null> {
    const validId = zObjectId.parse(user_id)
    return await getSessionsByID(new ObjectID(validId), user);
  }

  @Post('/')
  @Authorized()
  @HttpCode(204)
  async bookASessions(@CurrentUser() user: User, @Body() body: any): Promise<boolean> {
    const validParam = zBookSessions.parse(body)
    return await bookASessions(user, validParam)
  }

  @Delete('/:id')
  @Authorized()
  @HttpCode(204)
  async deleteASessions(@CurrentUser() user: User, @Param("id") id: string): Promise<boolean> {
    const validID = new ObjectID(zObjectId.parse(id))
    return await deleteASessions(user, validID)
  }
}