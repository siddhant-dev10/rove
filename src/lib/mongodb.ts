import { MongoClient, MongoClientOptions, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;

const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 2500,
  connectTimeoutMS: 2500,
  socketTimeoutMS: 5000,
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI is not set in environment variables');
}

// Function to safely obtain a connected MongoDB client without crashing the runtime
export async function getSafeMongoClient(): Promise<MongoClient | null> {
  if (!uri) return null;
  try {
    if (!client) {
      client = new MongoClient(uri, options);
    }
    await client.connect();
    return client;
  } catch (error) {
    // Gracefully handle connectivity errors (e.g. IP whitelist / SSL issues)
    console.warn('MongoDB Atlas connection check failed, using persistent fallback storage:', (error as Error).message);
    return null;
  }
}

// Function to safely obtain the database instance or null
export async function getSafeDb(): Promise<Db | null> {
  const safeClient = await getSafeMongoClient();
  if (!safeClient) return null;
  const dbName = process.env.MONGODB_DB || 'rove_db';
  return safeClient.db(dbName);
}

// Check if MongoDB Atlas is currently reachable
export async function checkMongoConnectivity(): Promise<{ connected: boolean; error?: string }> {
  try {
    const safeClient = await getSafeMongoClient();
    if (!safeClient) return { connected: false, error: 'Could not connect to MongoDB cluster' };
    await safeClient.db('admin').command({ ping: 1 });
    return { connected: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown connection error';
    return { connected: false, error: message };
  }
}

// Standard clientPromise export for backwards-compatibility
if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    if (uri) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
        console.warn('Dev MongoDB connection init caught:', err.message);
        return client as MongoClient;
      });
    } else {
      globalWithMongo._mongoClientPromise = Promise.reject(new Error('MONGODB_URI missing'));
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  if (uri) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch((err) => {
      console.warn('Prod MongoDB connection init caught:', err.message);
      return client as MongoClient;
    });
  } else {
    clientPromise = Promise.reject(new Error('MONGODB_URI missing'));
  }
}

export default clientPromise;
