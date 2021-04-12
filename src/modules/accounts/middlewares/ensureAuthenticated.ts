import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import AuthConfig from '../../../config/auth';
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticaded(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, AuthConfig.jwt.tokenSecret) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if(!user) {
      throw new AppError('User does not exists', 401);
    }

    request.user = {
      id: user_id
    }

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401)
  }
}