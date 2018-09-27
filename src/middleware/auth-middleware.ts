import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken'
import * as env from '../environment/environment-handler'

export const tokenValidationCheck = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  // @ts-ignore
  jwt.verify(token, env.jwt.secret, function (err, decoded) {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.body.accountId = decoded.id;
    next();
  });
};