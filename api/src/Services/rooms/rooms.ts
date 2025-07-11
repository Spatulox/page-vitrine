import { ObjectID } from "../../DB_Schema/connexion";
import { RoomTable } from "../../DB_Schema/RoomSchema";
import { FilledRoom } from "../../Models/RoomModel";
import { CreateRoomParam, UpdateRoomParam } from "../../Validators/rooms";

export async function getAllRoomsClient(): Promise<FilledRoom[]>{
    const rooms = await RoomTable.find({visible: true})
    return rooms.map(toRoomObject)
}

export async function getAllRoomsAdmin(): Promise<FilledRoom[]>{
    const rooms = await RoomTable.find({admin_visible: true})
    return rooms.map(toRoomObject)
}

export async function getRoomById(id: ObjectID): Promise<FilledRoom> {
    const room = await RoomTable.find(
        {
            _id: id,
            visible: true,
        }
    )
    return toRoomObject(room)
}



export async function createRoom(param: CreateRoomParam): Promise<FilledRoom>{
    const room = await RoomTable.create(param);
    return toRoomObject(room)
}

export async function updateRoom(ID: ObjectID, param: UpdateRoomParam): Promise<FilledRoom>{
    const updatedRoom = await RoomTable.findByIdAndUpdate(
        ID,
        { $set: param },
        { new: true }
    );

    if (!updatedRoom) {
        throw new Error("Room not found");
    }
    return toRoomObject(updatedRoom)
}

export async function deleteRoom(id: ObjectID): Promise<boolean> {
    const room = await RoomTable.findById(id);

    if (!room) {
        throw new Error("Room not found");
    }

    if (room.visible === false) {
        const updated = await RoomTable.findByIdAndUpdate(
            id,
            { $set: { admin_visible: false } },
            { new: true }
        );
        return !!updated;
    }

    const updated = await RoomTable.findByIdAndUpdate(
        id,
        { $set: { visible: false } },
        { new: true }
    );
    return !!updated;
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
        visible: room.visible
    }

    return data
}