import { ObjectID } from "../../DB_Schema/connexion";
import { RoomTable } from "../../DB_Schema/RoomSchema";
import { SessionTable } from "../../DB_Schema/SessionsSchema";
import { FilledRoom } from "../../Models/RoomModel";
import { FilledSessions, RoomSessions, RoomSessionsEmpty, Sessions } from "../../Models/SessionsModel";
import { GetRoomParam } from "../../Validators/rooms";
import { toRoomObject } from "../rooms/rooms";
import { toUserObject } from "../users/usersPublic";


// Génère tous les créneaux horaires possibles pour une journée
function generateTimeSlots(date: Date): Date[] {
    const slots: Date[] = [];
    let current = new Date(date);
    current.setHours(9, 0, 0, 0); // 9h00

    const end = new Date(date);
    end.setHours(23, 0, 0, 0); // 23h00

    while (current <= end) {
        slots.push(new Date(current));
        current = new Date(current.getTime() + 75 * 60 * 1000); // +1h15
    }
    return slots;
}

export async function getEmptySessionsRoomById(room_id: ObjectID, param: GetRoomParam): Promise<RoomSessionsEmpty> {
    const dayStart = new Date(param.date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(param.date);
    dayEnd.setHours(23, 59, 59, 999);

    const room = await RoomTable.findById(room_id).exec();
    if (!room) {
        throw new Error("Room not found");
    }

    // 1. Récupérer toutes les sessions existantes pour la salle et la date
    const sessions = await SessionTable.find({
        room_id: room_id,
        start_time: {
            $gte: dayStart,
            $lt: dayEnd,
        },
    }).exec();

    // 2. Générer tous les créneaux horaires possibles
    const slots = generateTimeSlots(param.date);

    // 3. Trouver les créneaux où aucune session n’existe
    const emptySlots: string[] = [];
    for (const slot of slots) {
        const exists = sessions.some(s =>
            Math.abs(new Date(s.start_time).getTime() - slot.getTime()) < 1000 // tolérance 1 seconde
        );
        if (!exists) {
            emptySlots.push(slot.toISOString());
        }
    }

    return {
        room: room.name,
        free_sessions: emptySlots,
    };
}



/* FOR ADMIN PART */
export async function getSessionsRoomById(room_id: ObjectID, param: GetRoomParam): Promise<RoomSessions> {
    const dayStart = new Date(param.date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(param.date);
    dayEnd.setHours(23, 59, 59, 999);

    const sessions = await SessionTable.find({
        room_id: room_id,
        start_time: {
            $gte: dayStart,
            $lt: dayEnd,
        },
    })
    .populate("room_id")
    .populate("user_id")
    .exec();

    return sessionsToRoomObject(room_id, sessions);
}

function sessionsToRoomObject(room_id: ObjectID, sessions: Sessions[]): RoomSessions {
    return {
        room_id: room_id.toString(),
        sessions: sessions.map(toSessionsObject),
    };
}



export function toSessionsObject(obj: any): FilledSessions{
    return {
        _id: obj._id.toString(),
        room: toRoomObject(obj.room_id),
        user: obj.user_id ? toUserObject(obj.user_id) : null,
        start_time: obj.start_time.toString(),
        participants: obj.participants,
    }
}