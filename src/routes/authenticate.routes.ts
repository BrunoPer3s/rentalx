import { Router } from 'express';
import { AuthenticateUserController } from '../modules/accounts/useCase/authenticateUser/AuthenticateUserController';

export const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/',  authenticateUserController.create);