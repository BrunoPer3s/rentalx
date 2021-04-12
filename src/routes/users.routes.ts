import { Router } from "express";
import multer from 'multer';
import uploadConfig from '../config/upload';
import { ensureAuthenticaded } from "../modules/accounts/middlewares/ensureAuthenticated";

import { CreateUserController } from "../modules/accounts/useCase/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";

export const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.create);

userRoutes.patch("/avatar", ensureAuthenticaded ,uploadAvatar.single('avatar') ,updateUserAvatarController.create);