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

export const zCreateEmployee = z.object({
    lastname: z.string(),
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

export type UpdateAccountType = z.infer<typeof zUpdateAccount>
export type UpdateAccountAdminType = z.infer<typeof zUpdateAccountAdmin>
export type CreateEmployeetype = z.infer<typeof zCreateEmployee>