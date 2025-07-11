import { BadRequestError, ForbiddenError, InternalServerError } from "routing-controllers";
import { ObjectID } from "../../DB_Schema/connexion";
import { SessionTable } from "../../DB_Schema/SessionsSchema";
import { UserRole } from "../../DB_Schema/UserSchema";
import { FilledSessions, RoomSessions } from "../../Models/SessionsModel";
import { User } from "../../Models/UserModel";
import { BookSessionsParam } from "../../Validators/sessions";
import { getRoomById, toRoomObject } from "../rooms/rooms";
import { generateTimeSlots, toSessionsObject } from "./room_sessions";


export async function getSessionsByUser(user: User, current?: boolean): Promise<RoomSessions[]> {
    const filter: any = { user_id: user._id };
    if (current) {
        filter.start_time = { $gte: new Date() };
    }

    const sessions = await SessionTable.find(filter)
        .populate('room_id')
        .populate('user_id')
        .exec();

    const roomMap: Map<string, FilledSessions[]> = new Map();

    sessions.forEach((session: any) => {
        const roomId = session.room_id._id.toString();
        if (!roomMap.has(roomId)) {
            roomMap.set(roomId, []);
        }
        roomMap.get(roomId)!.push(toSessionsObject(session));
    });

    const result: RoomSessions[] = [];
    for (const [roomId, filledSessions] of roomMap.entries()) {
        const room = toRoomObject(sessions.find(s => s.room_id._id.toString() === roomId)!.room_id);
        result.push({
            room,
            sessions: filledSessions
        });
    }

    return result;
}

export async function getSessionsByID(id: ObjectID, user: User): Promise<FilledSessions | null>{

    const filter: Record<string, any> = { _id: id };

    if (user.role === UserRole.client) {
        filter.user_id = user._id;
    }

    const session = await SessionTable.findOne(filter)
        .populate('room_id')
        .populate('user_id')
        .exec();

    if (!session) return null;
    return toSessionsObject(session);
}


export async function bookASessions(user: User, params: BookSessionsParam): Promise<boolean> {

    const room = await getRoomById(new ObjectID(params.room_id))

    if(params.participants > room.max_participants){
        throw new BadRequestError("Il n'y a pas assez de place dans cette salle")
    }

    const date = new Date(params.start_time);
    date.setHours(0, 0, 0, 0);
    const validSlots = generateTimeSlots(date, room.duration);
    const isValidSlot = validSlots.some(slot =>
        slot.getTime() === new Date(params.start_time).getTime()
    );

    if (!isValidSlot) {
        throw new BadRequestError(`L'heure demandée ne correspond à aucun créneau valide : ${validSlots.join(" | ")}`);
    }

    const existingSession = await SessionTable.findOne({
        room_id: params.room_id,
        start_time: params.start_time,
    });

    if (existingSession) {
        throw new ForbiddenError('Une session existe déjà à ce créneau dans cette salle.');
    }

    const alreadyBook = await SessionTable.findOne(
        {
            user_id: user._id,
            start_time: params.start_time
        }
    )
    
    if(alreadyBook){
        throw new ForbiddenError("Vous avez déjà réservé une autre salle à cette date et heure")
    }

    await SessionTable.create({
        room_id: params.room_id,
        user_id: user._id,
        start_time: params.start_time,
        participants: params.participants,
    });

    return true;
}

export async function deleteASessions(user: User, session_id: ObjectID): Promise<boolean> {
  const session = await SessionTable.findById(session_id);

  if (!session) {
    throw new BadRequestError('Session introuvable.');
  }

  const isOwner = session.user_id.toString() === user._id.toString();
  const isAdmin = user.role !== UserRole.client;

  if (!isOwner && !isAdmin) {
    throw new InternalServerError("Vous n'êtes pas autorisé à supprimer cette session.");
  }

  await SessionTable.deleteOne({ _id: session_id });

  return true;
}
