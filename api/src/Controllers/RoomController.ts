import { Authorized, Get, JsonController, Param, QueryParams } from "routing-controllers";
import { FilledRoom } from "../Models/RoomModel";
import { ObjectID } from "../DB_Schema/connexion";
import { zObjectId } from "../Validators/utils";
import { getAllRooms, getRoomById } from "../Services/rooms/rooms";
import { zGetRoomParams } from "../Validators/rooms";
import { getAllSessionsByDate, getEmptySessionsRoomById } from "../Services/sessions/sessions";
import { RoomSessions, RoomSessionsEmpty } from "../Models/SessionsModel";
import { UserRole } from "../DB_Schema/UserSchema";


@JsonController("/admin/rooms")
export class AdminRoomController {
  @Get('/')
  @Authorized([UserRole.admin, UserRole.employee])
  async getAllRoom(): Promise<FilledRoom[]> {
    return await getAllRooms()
  }

  /*@Get('/sessions')
  @Authorized([UserRole.admin, UserRole.employee])
  async getAllRoomAvailaible(@QueryParams() param: any): Promise<FilledRoom[]> {

  }*/
}


@JsonController("/rooms")
export class RoomController {
  @Get('/')
  async getAllRoom(): Promise<FilledRoom[]> {
    return await getAllRooms()
  }

  @Get('/sessions')
  async getAllRoomAvailaible(@QueryParams() param: any): Promise<FilledRoom[]> {
    const validParam = zGetRoomParams.parse(param)
    return await getAllSessionsByDate(validParam)
  }

  @Get('/:id')
  async getRoomById(@Param('id') user_id: ObjectID): Promise<FilledRoom | null> {
    const validId = zObjectId.parse(user_id)
    return await getRoomById(new ObjectID(validId));
  }

  @Get('/:id/sessions')
  async getEmptySessionsRoomById(@Param('id') user_id: ObjectID, @QueryParams() param: any): Promise<RoomSessionsEmpty> {
    const validId = zObjectId.parse(user_id)
    const validParam = zGetRoomParams.parse(param)
    return await getEmptySessionsRoomById(new ObjectID(validId), validParam);
  }
}
