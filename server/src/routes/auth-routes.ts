import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try{
    const {username,password} = req.body;
    const user = await User.findOne({where: {username}});
    if(!user){
      return res.status(401).json({message: 'Authentican has failed'});
  }
  
  const passwordvalid = await bcrypt.compare(password,user.password);
  if(!passwordvalid){
    return res.status(401).json({message:'Authentication has failed'});
  };

  const SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';
  const token = jwt.sign({username}, SECRET_KEY, {expiresIn: '1h'});
  return res.json({token});
}catch(err){
  console.error('Error during authentication: ', err);
  return res.status(500).json({message:err});
}
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
