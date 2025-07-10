import type { Room } from "./Room";
import type { User } from "./User";

export type Sessions = {
    _id: string,
    room: Room,
    user: User,
    start_time: Date,
    participants: number,
}