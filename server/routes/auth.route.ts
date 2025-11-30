import express from 'express';
import { AuthController } from '../controllers';

const authRouter = express.Router();

authRouter.post('/login', AuthController.login)
// authRouter.post('/refresh-token', AuthController.)

export default authRouter;
