import { Authorized, Body, Delete, Get, HttpCode, JsonController, Param, Post, Put, QueryParams } from "routing-controllers";
import { FilledRoom } from "../Models/RoomModel";
import { ObjectID } from "../DB_Schema/connexion";
import { zObjectId } from "../Validators/utils";
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from "../Services/rooms/rooms";
import { zCreateRoomParams, zGetRoomParams, zUpdateRoomParams } from "../Validators/rooms";
import { getAllFreeSessionsByDate, getAllSessionsByDate, getEmptySessionsRoomById } from "../Services/sessions/room_sessions";
import { RoomSessions, RoomSessionsEmpty } from "../Models/SessionsModel";
import { UserRole } from "../DB_Schema/UserSchema";
import { id_ID } from "@faker-js/faker/.";


@JsonController("/admin/rooms")
export class AdminRoomController {
  @Get('/')
  @Authorized([UserRole.admin, UserRole.employee])
  async getAllRoom(): Promise<FilledRoom[]> {
    return await getAllRooms()
  }

  @Get('/sessions')
  @Authorized([UserRole.admin, UserRole.employee])
  async getAllRoomSessions(@QueryParams() param: any): Promise<RoomSessions[]> {
    const validParam = zGetRoomParams.parse(param)
    return await getAllSessionsByDate(validParam)
  }

  @Post('/')
  @Authorized([UserRole.admin, UserRole.employee])
  async createRoom(@Body() body: any): Promise<FilledRoom>{
    const validParam =zCreateRoomParams.parse(body)
    return createRoom(validParam)
  }

  @Put('/:id')
  @Authorized([UserRole.admin, UserRole.employee])
  async updateRoom(@Param('id') id: string, @Body() body: any): Promise<FilledRoom>{
    const validID = new ObjectID(zObjectId.parse(id))
    const validParam = zUpdateRoomParams.parse(body)
    return updateRoom(validID, validParam)
  }

  @Delete('/:id')
  @Authorized([UserRole.admin, UserRole.employee])
  @HttpCode(204)
  async deleteRoom(@Param('id') id: string): Promise<boolean>{
    const validID = new ObjectID(zObjectId.parse(id))
    return deleteRoom(validID)
  }
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
    return await getAllFreeSessionsByDate(validParam)
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
