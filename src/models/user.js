import { IUser } from '@/interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User Id is required"],
      unique: true,
      index: true,
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },

    first_name: {
      type: String,
    },

    last_name: {
      type: String,
    },

    registrationDate: {
      type: String,
    },
  },
);

export default mongoose.model<IUser & mongoose.Document>('User', User);