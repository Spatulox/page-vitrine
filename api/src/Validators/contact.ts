import { z } from "zod"

export const zCreateContactParams = z.object({
    name: z.string().min(3),
    lastname: z.string().min(3),
    phone: z.string().min(3),
    email: z.string().min(3),
    subject: z.string().min(3),
    message: z.string().min(3),
})


export type CreateContactParam = z.infer<typeof zCreateContactParams>