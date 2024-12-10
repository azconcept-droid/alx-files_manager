import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbConnected = null;

    this.client.connect().then(() => {
      this.dbConnected = this.client.db(this.database);
      this.userCollection = this.dbConnected.collection('users');
      this.fileCollection = this.dbConnected.collection('files');
    });
  }

  isAlive() {
    return !!this.dbConnected;
  }

  async nbUsers() {
    return this.userCollection.countDocuments();
  }

  async nbFiles() {
    return this.fileCollection.countDocuments();
  }
}

const dbClient = new DBClient()

export default dbClient;
