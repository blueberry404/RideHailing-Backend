import * as express from 'express';
import * as users from '../controllers/users';

export const userRouter = express.Router();

userRouter.get('/users', users.getAll);

