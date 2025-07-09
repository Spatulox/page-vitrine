import { JsonController, Param, Body, Get, Post, Put, Delete, HeaderParam, Authorized, CurrentUser, Patch, InternalServerError, ForbiddenError, HttpCode, BadRequestError } from 'routing-controllers';
import { FilledUser, User } from "../Models/UserModel"
import { getAllUsers } from '../Services/users/usersAdmin';
import { zObjectId } from '../Validators/utils';
import { deleteMyAccount, getUserById, updateMyAccount } from '../Services/users/usersPublic';
import { UserRole } from '../DB_Schema/UserSchema';
import { ObjectID } from '../DB_Schema/connexion';
import { zUpdateAccount } from '../Validators/users';

@JsonController("/admin/users")
export class AdminUserController {
  @Get('/')
  @Authorized(UserRole.admin)
  async getAll(): Promise<FilledUser[]> {
    return await getAllUsers()
  }

  @Get('/:id')
  @Authorized(UserRole.admin)
  async getUserByIdAdmin(@Param('id') user_id: ObjectID): Promise<FilledUser | null> {
    const validId = zObjectId.parse(user_id)
    return await getUserById(new ObjectID(validId));
  }
}

@JsonController("/users")
export class UserController {

  @Get('/@me')
  @Authorized()
  async getMe(@CurrentUser() user: User): Promise<FilledUser | null> {
    return await getUserById(user._id)
  }

  @Patch('/:id')
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
  async deleteUserById(@Param('id') user_id: ObjectID, @CurrentUser() user: User): Promise<boolean> {
    const validId = new ObjectID(zObjectId.parse(user_id))
    if(user._id != validId && user.role != UserRole.admin){
      throw new ForbiddenError("You can't do that")
    }

    if(user._id == user_id && user.role == UserRole.admin){
      throw new ForbiddenError("You can't delete your account, since your admin")
    }

    if(!await deleteMyAccount(user)){
      throw new BadRequestError("Bad Request")
    }
    return true
  }
}