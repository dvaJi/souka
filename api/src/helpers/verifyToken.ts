import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Request, Response, NextFunction } from 'express';

export interface JWTPayload {
  email: string;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // check header or url parameters or post parameters for token
  const token: string = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  try {
    // verifies secret and checks exp
    const decoded = jwt.verify(token, config.JWT_ENCRYPTION) as JWTPayload;
    (req as any).email = decoded.email;
    next();
  } catch (err) {
    res.status(500).send({ auth: false, message: err });
  }
};

export default verifyToken;
