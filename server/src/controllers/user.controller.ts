
import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

// Type predicate function to check if object has _id
function hasMongoId(obj: any): obj is { _id: mongoose.Types.ObjectId } {
  return obj && obj._id && typeof obj._id.toString === 'function';
}

export const getProfile = async (req: Request, res: Response) => {
  try {
   
    const user = req.user as IUser;
    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message || 'Server error getting profile' });
  }
};


export const updateProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user._id) as IUser;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }
    
    if (req.body.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      
      // Using type predicate for type narrowing
      if (emailExists && hasMongoId(emailExists) && hasMongoId(user) && 
          emailExists._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = req.body.email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message || 'Server error updating profile' });
  }
};
