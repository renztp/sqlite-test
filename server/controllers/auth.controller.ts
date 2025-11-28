import { NextFunction, Request, Response } from 'express';
import {prisma} from '../lib/prisma';
import { User } from '../generated/prisma/client';
import { UsersService } from '../services'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, phone } = req.body;

  try {
    const existingUser = await UsersService.findUser(email, phone);

    const accessToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JSON_SECRET as string,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any }
    )

    const refreshToken = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.JSON_SECRET as string,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any }
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, 
      sameSite: 'strict', 
      secure: true
    });
    res.header('Authorization', accessToken).send(existingUser);

    const createdToken = await prisma.tokens.create({
      data: {
        token: refreshToken
      }
    })

    if(!createdToken) {
      throw new Error('Something went wrong with authenticating user');
    }

    return res.status(200).json({
      data: { token: accessToken, ...existingUser }
    })
  } catch(err) {
    next(err);
  }
}
