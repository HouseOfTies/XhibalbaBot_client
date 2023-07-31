import { Model } from "mongoose";

export class UserEntity<T> {
  private model: Model<T>

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  /* async findById(id: number): Promise<T | null> {
    return this.model.findById(id).exec();
  } */

  async findOne(userId: number): Promise<T | null> {
    return this.model.findOne({id: userId}).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
