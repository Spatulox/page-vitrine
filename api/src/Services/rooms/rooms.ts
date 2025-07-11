import { ObjectID } from "../../DB_Schema/connexion";
import { RoomTable } from "../../DB_Schema/RoomSchema";
import { FilledRoom } from "../../Models/RoomModel";
import { CreateRoomParam, UpdateRoomParam } from "../../Validators/rooms";

export async function getAllRooms(): Promise<FilledRoom[]>{
    const rooms = await RoomTable.find()
    return rooms.map(toRoomObject)
}

export async function getRoomById(id: ObjectID): Promise<FilledRoom> {
    const room = await RoomTable.findById(id)
    return toRoomObject(room)
}



export async function createRoom(param: CreateRoomParam): Promise<FilledRoom>{
    const room = await RoomTable.create(param);
    return toRoomObject(room)
}

export async function updateRoom(ID: ObjectID, param: UpdateRoomParam): Promise<FilledRoom>{
    const updatedRoom = await RoomTable.findByIdAndUpdate(
        { $set: param },
        { new: true }
    );

    if (!updatedRoom) {
        throw new Error("Room not found");
    }
    return toRoomObject(updatedRoom)
}

export async function deleteRoom(id: ObjectID): Promise<boolean>{
    const deleted = await RoomTable.findByIdAndDelete(id);
    if (!deleted) {
        throw new Error("Room not found");
    }
    return true;
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
        max_participants: room.max_participants,
    }

    return data
}