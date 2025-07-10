import type { Sessions } from "./Sessions"

export type Room = {
    _id: string,
    name: string,
    description: string,
    long_description: string,
    price: number,
    estimated_duration: number,
    duration: number,
    max_participants: number,
}

export type RoomSessions = {
    room: Room,
    sessions: Sessions
}

export type RoomSessionsEmpty = {
    room: string,
    free_sessions: string[]
}