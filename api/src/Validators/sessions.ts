import { z } from "zod"
import { zObjectId } from "./utils"

export const zBookSessions = z.object({
    start_time: z.coerce.date(),
    room_id: zObjectId,

})



export type BookSessionsParam = z.infer<typeof zBookSessions>