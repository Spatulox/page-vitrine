import { JsonController, Param, Body, Get, Post, Put, Delete, HeaderParam, Authorized, CurrentUser, Patch, InternalServerError, ForbiddenError, HttpCode, BadRequestError, QueryParams } from 'routing-controllers';
import { FilledUser, User } from "../Models/UserModel"
import { createEmployee, deleteUserById, getAllAdmin, getAllClients, getAllEmployee, getAllUsers, updateAccountAdmin } from '../Services/users/usersAdmin';
import { zObjectId } from '../Validators/utils';
import { deleteMyAccount, getUserById, updateMyAccount } from '../Services/users/usersPublic';
import { UserRole } from '../DB_Schema/UserSchema';
import { ObjectID } from '../DB_Schema/connexion';
import { zCreateEmployee, zUpdateAccount, zUpdateAccountAdmin } from '../Validators/users';

@JsonController("/admin/users")
export class AdminUserController {
  
  @Get('/')
  @Authorized([UserRole.admin, UserRole.employee])
  async getAll(@QueryParams() query: { client?: string; employee?: string; admin?: string }): Promise<{client: FilledUser[], employee: FilledUser[], admin: FilledUser[]}> {
    const roles = Object.keys(query).length === 0
      ? ["client", "employee", "admin"]
      : Object.entries(query)
          .filter(([role, value]) => value !== undefined && value !== "false" && value !== "0")
          .map(([role]) => role);

    // Prépare les promesses
    const promises: Record<string, Promise<FilledUser[]>> = {};
    if (roles.includes("client")) promises.client = getAllClients();
    if (roles.includes("employee")) promises.employee = getAllEmployee();
    if (roles.includes("admin")) promises.admin = getAllAdmin();

    // Lance les requêtes en parallèle
    const results = await Promise.all([
      promises.client ?? Promise.resolve([]),
      promises.employee ?? Promise.resolve([]),
      promises.admin ?? Promise.resolve([]),
    ]);

    // Retourne l'objet structuré
    return {
      client: results[0],
      employee: results[1],
      admin: results[2],
    };
  }

  @Get('/:id')
  @Authorized([UserRole.admin, UserRole.employee])
  async getUserByIdAdmin(@Param('id') user_id: ObjectID): Promise<FilledUser | null> {
    const validId = zObjectId.parse(user_id)
    return await getUserById(new ObjectID(validId));
  }


  @Post('/')
  @Authorized([UserRole.admin])
  @HttpCode(204)
  async createEmployeeAccount(@Body() body: any): Promise<boolean> {
      const validBody = zCreateEmployee.parse(body)
      return createEmployee(validBody)
  }

  @Put('/:id')
  @Authorized([UserRole.admin, UserRole.employee])
  @HttpCode(204)
  async updateUser(@Param('id') user_id: ObjectID, @CurrentUser() user: User, @Body() body: any): Promise<boolean> {
    const validId = new ObjectID(zObjectId.parse(user_id))
    const validBody = zUpdateAccountAdmin.parse(body)


    const theUser = await getUserById(new ObjectID(user_id))
    if(!theUser){
      throw new BadRequestError("Wrong user id")
    }

    if(user.role == UserRole.employee && theUser.role != UserRole.client){
      throw new BadRequestError("Unable to update a non client account")
    }

    if(user.role == UserRole.admin && theUser.role == UserRole.admin){
      throw new ForbiddenError("You can't update an admin Account")
    }

    if(!await updateAccountAdmin(validId, validBody)){
      throw new BadRequestError()
    };
    return true
  }

  @Delete('/:id')
  @HttpCode(204)
  @Authorized([UserRole.admin, UserRole.employee])
  async deleteUserById(@Param('id') user_id: ObjectID, @CurrentUser() user: User): Promise<boolean> {
    const validId = new ObjectID(zObjectId.parse(user_id))
    
    const theUser = await getUserById(new ObjectID(user_id))
    if(!theUser){
      throw new BadRequestError("Wrong user id")
    }
    
    if(user.role == UserRole.employee && theUser.role != UserRole.client){
      throw new ForbiddenError("You can't delete an admin/employee Account")
    }

    if(user.role == UserRole.admin && theUser.role == UserRole.admin){
      throw new ForbiddenError("You can't delete an admin Account")
    }

    if(!await deleteUserById(validId)){
      throw new BadRequestError("Bad Request")
    }
    return true
  }

}

@JsonController("/users")
export class UserController {

  @Get('/@me')
  @Authorized()
  async getMe(@CurrentUser() user: User): Promise<FilledUser | null> {
    return await getUserById(user._id)
  }

  @Put('/:id')
  @Authorized()
  @HttpCode(204)
  async updateUser(@Param('id') user_id: ObjectID, @CurrentUser() user: User, @Body() body: any): Promise<boolean> {
    const validId = zObjectId.parse(user_id)
    const validBody = zUpdateAccount.parse(body)
    if(validId == user._id.toString()){
      if(!await updateMyAccount(user, validBody)){
        throw new BadRequestError()
      };
    } else {
      throw new BadRequestError("You can't do that")
    }
    return true
  }

  @Delete('/:id')
  @HttpCode(204)
  @Authorized()
  async deleteUserById(@CurrentUser() user: User): Promise<boolean> {

    if(user.role == UserRole.admin){
      throw new ForbiddenError("You can't delete your account, since your admin")
    }

    if(!await deleteMyAccount(user)){
      throw new BadRequestError("Bad Request")
    }
    return true
  }
}