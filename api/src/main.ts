import 'reflect-metadata';
import express from 'express';
import { RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { AdminUserController, UserController } from './Controllers/UserController';
import { connectDB } from './DB_Schema/connexion';
import { ErrorHandler } from './Middleware/error-handling';
import { authMiddleware, getCurrentUser } from './Middleware/auth';
import { parse } from 'url';
import { AuthController } from './Controllers/AuthController';
import { AdminRoomController, RoomController } from './Controllers/RoomController';
import { SessionsController } from './Controllers/SessionsController';
import { ContactController } from './Controllers/ContactController';

async function main(){
  await connectDB()

  const port = 8080
  const app = express()

  const routingControllerOptions: RoutingControllersOptions = {
    authorizationChecker: authMiddleware,
    currentUserChecker: getCurrentUser,
    middlewares: [ErrorHandler],
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true
    },
    controllers: [
      AdminUserController,
      AdminRoomController,

      AuthController,
      ContactController,
      RoomController,
      SessionsController,
      UserController],
    defaultErrorHandler: false
  }

  useExpressServer(app, routingControllerOptions);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
main()