
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import mongoose from 'mongoose';

// Type predicate to check if object has MongoDB _id
function hasMongoId(obj: any): obj is { _id: mongoose.Types.ObjectId } {
  return obj && obj._id && typeof obj._id.toString === 'function';
}

const generateToken = (id: string): string => {
  const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};


export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      // Use type predicate to ensure _id exists and can be converted to string
      if (hasMongoId(user)) {
        const token = generateToken(user._id.toString());
        res.status(201).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Use type predicate to ensure _id exists and can be converted to string
    if (hasMongoId(user)) {
      const token = generateToken(user._id.toString());
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      res.status(500).json({ message: 'Error generating token' });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};
