import { z } from "zod"

export const zGetRoomParams = z.object({
    date: z.coerce.date()
})



export type GetRoomParam = z.infer<typeof zGetRoomParams>