import { ObjectID } from "../../DB_Schema/connexion";
import { RoomTable } from "../../DB_Schema/RoomSchema";
import { FilledRoom } from "../../Models/RoomModel";

export async function getAllRooms(): Promise<FilledRoom[]>{
    const rooms = await RoomTable.find()
    return rooms.map(toRoomObject)
}

export async function getRoomById(id: ObjectID): Promise<FilledRoom> {
    const room = await RoomTable.findById(id)
    return toRoomObject(room)
}

export function toRoomObject(room: any): FilledRoom{
    const data: FilledRoom = {
        _id: room._id.toString(),
        name: room.name,
        description: room.description,
        long_description: room.long_description,
        price: room.price,
        estimated_duration: room.estimated_duration,
        duration: room.duration,
        participants: room.participants,
        max_participants: room.max_participants,
    }

    return data
}