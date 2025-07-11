import { z } from "zod"

export const zGetRoomParams = z.object({
    date: z.coerce.date()
})


export const zCreateRoomParams = z.object({
    name: z.string().min(3),
    description: z.string(),
    long_description: z.string(),
    price: z.coerce.number().positive().min(0),
    estimated_duration: z.coerce.number().min(1),
    duration: z.coerce.number().min(1),
    max_participants: z.coerce.number().min(1),
})

export const zUpdateRoomParams = z.object({
    name: z.string().min(3).optional(),
    description: z.string().optional(),
    long_description: z.string().optional(),
    price: z.coerce.number().positive().min(0).optional(),
    estimated_duration: z.coerce.number().min(1).optional(),
    duration: z.coerce.number().min(1).optional(),
    max_participants: z.coerce.number().min(1).optional(),
})

export type GetRoomParam = z.infer<typeof zGetRoomParams>
export type CreateRoomParam = z.infer<typeof zCreateRoomParams>
export type UpdateRoomParam = z.infer<typeof zUpdateRoomParams>