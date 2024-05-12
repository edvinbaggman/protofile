import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI as string;
if (!process.env.MONGODB_URI) throw new Error('Add Mongo URI to .env.local');

let clientPromise: Promise<MongoClient>;

const mongoOptions = {};
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, mongoOptions).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, mongoOptions).connect();
}

export default clientPromise;
