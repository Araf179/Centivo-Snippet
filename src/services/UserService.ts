import { MongoClient, ObjectId, BSON } from 'mongodb';
import User from '../models/User';

class UserService {
  private client: MongoClient;
  private db: any;
  private collection: any;

  constructor(client: MongoClient, db: any, collection: any) {
    this.client = client;
    this.db = db;
    this.collection = collection;
  }

  async createUser(user: User): Promise<User> {
    try {
      if (!user.name || !user.email || user.age === undefined) {
        throw new Error('Missing required fields: name, email, or age.');
      }
      if (typeof user.age !== 'number' || user.age < 0) {
        throw new Error('Age must be a non-negative number.');
      }
      const result = await this.collection.insertOne(user);
      return { ...user, _id: result.insertedId.toString() };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUser(id: string): Promise<User | null> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error('Invalid ObjectId');
      }
      const user = await this.collection.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
        console.error(error)
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.collection.find({ age: { $gt: 21 } }).toArray();
      return users;
    } catch (error) {
        console.error(error)
      throw error;
    }
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
          }
      const result = await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: user });
      if (result.modifiedCount === 0) {
        return null;
      }
      return { ...user, _id: id };
    } catch (error) {
        console.error(error)
      throw error;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid ObjectId');
          }
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
        console.error(error)
      throw error;
    }
  }
}

export default UserService;