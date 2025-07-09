import { Get, JsonController, Param } from "routing-controllers";
import { FilledRoom } from "../Models/RoomModel";
import { ObjectID } from "../DB_Schema/connexion";
import { zObjectId } from "../Validators/utils";
import { getAllRooms, getRoomById } from "../Services/rooms/rooms";

@JsonController("/rooms")
export class RoomController {
  @Get('/')
  async getAllRoom(): Promise<FilledRoom[]> {
    return await getAllRooms()
  }

  @Get('/:id')
  async getRoomById(@Param('id') user_id: ObjectID): Promise<FilledRoom | null> {
    const validId = zObjectId.parse(user_id)
    return await getRoomById(new ObjectID(validId));
  }
}
