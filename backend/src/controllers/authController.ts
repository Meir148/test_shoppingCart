import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { users } from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // if user exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
     res.status(400).json({ message: "User already exists" });
     return
  }
  users.push({ username, password: hashedPassword });

  // const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });

  // res.json({ token });
  res.json({ message: 'User registered successfully' });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
     res.status(400).json({ message: 'User not found' });
     return
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: 'Invalid credentials' });
    return
  }
  
  const token = jwt.sign({ username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
  res.json({ token });
};
