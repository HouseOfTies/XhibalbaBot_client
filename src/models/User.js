//import { IUser } from '@/interfaces/IUser';
import {Schema, model} from 'mongoose';

const userSchema = new Schema(
  {
    userId: {
      type: Number,
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

module.exports = model('User', userSchema);