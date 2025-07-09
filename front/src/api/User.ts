export enum UserRole {
  client= "client",
  admin = "admin",
  employee = "employee"
}

export type User = {
  _id: string,
  name: string,
  lastname: string,
  email: string,
  role: "client" | "admin" | "employee",
  phone: string,
}