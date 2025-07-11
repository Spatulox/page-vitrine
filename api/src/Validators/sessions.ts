import { z } from "zod"
import { zObjectId } from "./utils"

export const zBookSessions = z.object({
    start_time: z.coerce.date(),
    room_id: zObjectId,
    user_id: zObjectId,
    participants: z.coerce.number().positive().min(1)
})



export type BookSessionsParam = z.infer<typeof zBookSessions>