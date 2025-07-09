import { z } from "zod";

export const zUpdateAccount = z.object({
    lastname: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
})

export const zUpdateAccountAdmin = z.object({
    lastname: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(["admin", "client", "employee"]).optional()
})

export type UpdateAccountType = z.infer<typeof zUpdateAccount>