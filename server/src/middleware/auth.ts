import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split('')[1];
  const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

  if(!token){
    return res.status(401).json({message: "No token"});
  }

  try{
    const decodedToken = jwt.verify(token,SECRET_KEY) as JwtPayload;
    req.user = decodedToken;
    return next();
  }catch(err){
    console.error('Error: ', err);
    return res.status(401).json({message:"Bad token"});
  }
};
