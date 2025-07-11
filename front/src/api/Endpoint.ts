export enum EndpointRoute {
    /* AUTH */
    login = "/auth/login",
    register = "/auth/register",
    
    
    /* USERS */
    adminUser = "/admin/users",
    users = "/users",
    me = "/users/@me",

    /* ROOMS */
    adminRoom = "/admin/rooms",
    rooms = "/rooms",

    /* BOOK SESSION */
    book = "/sessions",
}