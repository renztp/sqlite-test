import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.sendStatus(401).json({ message: 'Unauthorized.' });
  }

  const decoded = jwt.verify(token, process.env.JSON_SECRET as string);
  console.log(decoded);
}
