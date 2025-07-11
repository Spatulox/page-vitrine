import { ObjectID } from "../../DB_Schema/connexion";
import { RoomTable } from "../../DB_Schema/RoomSchema";
import { SessionTable } from "../../DB_Schema/SessionsSchema";
import { FilledRoom, Room } from "../../Models/RoomModel";
import { FilledSessions, RoomSessions, RoomSessionsEmpty, Sessions } from "../../Models/SessionsModel";
import { GetRoomParam } from "../../Validators/rooms";
import { toRoomObject } from "../rooms/rooms";
import { toUserObject } from "../users/usersPublic";

/**
 * Génère les créneaux horaires disponibles pour une salle à une date donnée,
 * en fonction de la durée dynamique du créneau et d'un intervalle de 15 minutes entre chaque créneau.
 *
 * @param date - La date pour laquelle générer les créneaux (l'heure n'est pas prise en compte).
 * @param duration - Durée d'un créneau en minutes (ex: 75).
 * @returns Un tableau de dates représentant les heures de début des créneaux.
 */
export function generateTimeSlots(date: Date, duration: number): Date[] {
    const slots: Date[] = [];
    let current = new Date(date);
    current.setHours(9, 0, 0, 0); // Début à 9h00

    const end = new Date(date);
    end.setHours(23, 0, 0, 0); // Fin à 23h00

    const durationMs = duration * 60 * 1000;
    const intervalMs = 15 * 60 * 1000; // 15 minutes en ms

    while (current.getTime() + durationMs <= end.getTime() + 1) {
        slots.push(new Date(current));
        // On ajoute la durée du créneau + 15 minutes d'intervalle
        current = new Date(current.getTime() + durationMs + intervalMs);
    }
    return slots;
}


export async function getAllFreeSessionsByDate(param: GetRoomParam): Promise<FilledRoom[]> {
    const rooms = await RoomTable.find().exec();

    const allRoomsWithEmptySessions = await Promise.all(
        rooms.map(async room => {
            const empty = await getEmptySessionsRoomById(room._id, param);
            return { room, hasFree: empty.free_sessions.length > 0 };
        })
    );

    const roomsWithFreeSessions = allRoomsWithEmptySessions
        .filter(data => data.hasFree)
        .map(data => {
            const r = data.room.toObject ? data.room.toObject() : data.room;
            return {
                ...r,
                _id: r._id.toString(),
            };
        });

    return roomsWithFreeSessions;
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

    const sessions = await SessionTable.find({
        room_id: room_id,
        start_time: {
            $gte: dayStart,
            $lt: dayEnd,
        },
    }).exec();

    const slots = generateTimeSlots(param.date, room.duration);

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
        room: toRoomObject(room),
        free_sessions: emptySlots,
    };
}



export async function getAllSessionsByDate(param: GetRoomParam): Promise<RoomSessions[]> {
    const dayStart = new Date(param.date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(param.date);
    dayEnd.setHours(23, 59, 59, 999);

    const sessions = await SessionTable.find({
        start_time: { $gte: dayStart, $lt: dayEnd }
    })
    .sort({ start_time: 1 })
    .populate("user_id")
    .populate("room_id")
    .exec();

    const roomMap = new Map<string, { room: any, sessions: any[] }>();
    for (const session of sessions) {
        const roomId = session.room_id._id.toString();
        if (!roomMap.has(roomId)) {
            roomMap.set(roomId, {
                room: toRoomObject(session.room_id),
                sessions: []
            });
        }
        roomMap.get(roomId)!.sessions.push(toSessionsObject(session));
    }

    return Array.from(roomMap.values());
}

export function sessionsToRoomObject(room: Room, sessions: Sessions[]): RoomSessions {
    return {
        room: toRoomObject(room),
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