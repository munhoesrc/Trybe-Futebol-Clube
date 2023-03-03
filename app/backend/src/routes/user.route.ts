import { IRouter, Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyLogin from '../middlewares/login.middleware';

const userController = new UserController();

const userRoutes: IRouter = Router();

userRoutes.post('/login', verifyLogin, userController.login.bind(userController));

export default userRoutes;
