import { MongoDBClient } from "./mongodb-client";
import { environment } from "../environment/environment";

export class MongoDBConnector {
  constructor(){ }
  private options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  private connection = new MongoDBClient(environment.MONGODB_URI, this.options)

  public async connectDatabase() {
    try {
      await this.connection.connect();
      const db = this.connection.getConnection();
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}
