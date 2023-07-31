import mongoose, { ConnectOptions, Connection } from "mongoose";

export class MongoDBClient {
  private uri: string;
  private options: ConnectOptions;
  private connection: Connection | null = null;

  constructor(uri: string, options?: ConnectOptions) {
    this.uri = uri;
    this.options = options || {};
  }

  async connect(): Promise<void> {
    if (!this.connection) {
      try {
        await mongoose.connect(this.uri, this.options);
        this.connection = mongoose.connection;
        console.log('Connected to MongoDB using Mongoose successfully! ✅');
      } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
      }
    }
  }

  getConnection(): Connection {
    if (!this.connection) {
      throw new Error('MongoDB not connected! ❌');
    }
    return this.connection;
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      console.log('Disconnected from MongoDB using Mongoose.');
    }
  }
}
