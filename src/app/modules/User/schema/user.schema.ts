import { IUser } from "@/app/shared/interfaces/IUser";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    id: { type: Number, required: true, unique: true },
    is_bot: { type: Boolean, required: true, unique: false },
    first_name: { type: String, required: true, unique: false },
    last_name: { type: String, required: false, unique: false },
    language_code: { type: String, required: true, unique: false },
    permission: { type: Number, required: false, unique: false },
    token: { type: Number, required: false, unique: true },
    createdAt: { type: Date, required: true, unique: false, default: Date.now},
    updatedAt: { type: Date, required: true, unique: false, default: Date.now },
  }
);

export const UserModel = model<IUser>('User', userSchema);
