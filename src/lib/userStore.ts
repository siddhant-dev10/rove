import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';
import { getSafeDb } from '@/lib/mongodb';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  storageProvider?: 'mongodb' | 'persistent_local';
}

// Memory cache for sub-millisecond local reads
const inMemoryUsers: Map<string, UserRecord> = new Map();
let isInitialized = false;

function getStoreFilePath(): string {
  // Support serverless environments where only /tmp is writable
  const isVercel = process.env.VERCEL === '1';
  if (isVercel) {
    return path.join('/tmp', 'rove_users_store.json');
  }

  const baseDir = path.join(process.cwd(), '.data');
  try {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    return path.join(baseDir, 'users_store.json');
  } catch {
    return path.join('/tmp', 'rove_users_store.json');
  }
}

function loadUsersFromDisk(): void {
  if (isInitialized) return;
  try {
    const filePath = getStoreFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const list: UserRecord[] = JSON.parse(raw);
      inMemoryUsers.clear();
      for (const u of list) {
        inMemoryUsers.set(u.email.toLowerCase().trim(), u);
      }
    }
  } catch (err) {
    console.warn('Could not read user store from disk, starting with clean store:', err);
  } finally {
    isInitialized = true;
  }
}

function persistUsersToDisk(): void {
  try {
    const filePath = getStoreFilePath();
    const list = Array.from(inMemoryUsers.values());
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write user store to disk:', err);
  }
}

/**
 * Find user by email in MongoDB with persistent local store fallback
 */
export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const normalized = email.toLowerCase().trim();
  loadUsersFromDisk();

  try {
    const db = await getSafeDb();
    if (db) {
      const doc = await db.collection('users').findOne({ email: normalized });
      if (doc) {
        const record: UserRecord = {
          id: doc._id.toString(),
          name: doc.name,
          email: doc.email,
          passwordHash: doc.passwordHash,
          createdAt: doc.createdAt || new Date().toISOString(),
          updatedAt: doc.updatedAt || new Date().toISOString(),
          storageProvider: 'mongodb',
        };
        // Update local cache
        inMemoryUsers.set(normalized, record);
        persistUsersToDisk();
        return record;
      }
    }
  } catch (mongoErr) {
    console.warn('MongoDB lookup failed, checking local persistent store:', (mongoErr as Error).message);
  }

  // Fallback to local store
  return inMemoryUsers.get(normalized) || null;
}

/**
 * Find user by ID in MongoDB with persistent local store fallback
 */
export async function findUserById(id: string): Promise<UserRecord | null> {
  loadUsersFromDisk();

  try {
    const db = await getSafeDb();
    if (db) {
      let query: Record<string, unknown> = { id };
      try {
        query = { _id: new ObjectId(id) };
      } catch {
        query = { id };
      }

      const doc = await db.collection('users').findOne(query);
      if (doc) {
        return {
          id: doc._id.toString(),
          name: doc.name,
          email: doc.email,
          passwordHash: doc.passwordHash,
          createdAt: doc.createdAt || new Date().toISOString(),
          updatedAt: doc.updatedAt || new Date().toISOString(),
          storageProvider: 'mongodb',
        };
      }
    }
  } catch (mongoErr) {
    console.warn('MongoDB findById failed, checking local store:', (mongoErr as Error).message);
  }

  // Fallback to local store search by ID
  for (const user of inMemoryUsers.values()) {
    if (user.id === id) {
      return user;
    }
  }

  return null;
}

/**
 * Register a new user in MongoDB and persistent local store
 */
export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<UserRecord> {
  const normalized = data.email.toLowerCase().trim();
  loadUsersFromDisk();

  // Check existence
  const existing = await findUserByEmail(normalized);
  if (existing) {
    throw new Error('An account with this email address already exists. Please log in.');
  }

  const now = new Date().toISOString();
  let assignedId = `usr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
  let storageProvider: 'mongodb' | 'persistent_local' = 'persistent_local';

  try {
    const db = await getSafeDb();
    if (db) {
      const result = await db.collection('users').insertOne({
        name: data.name.trim(),
        email: normalized,
        passwordHash: data.passwordHash,
        createdAt: now,
        updatedAt: now,
      });
      assignedId = result.insertedId.toString();
      storageProvider = 'mongodb';
    }
  } catch (mongoErr) {
    console.warn('MongoDB insert failed, persisting to local disk store:', (mongoErr as Error).message);
  }

  const newUser: UserRecord = {
    id: assignedId,
    name: data.name.trim(),
    email: normalized,
    passwordHash: data.passwordHash,
    createdAt: now,
    updatedAt: now,
    storageProvider,
  };

  // Always keep in local store for resilience
  inMemoryUsers.set(normalized, newUser);
  persistUsersToDisk();

  return newUser;
}

/**
 * Retrieve total number of registered users
 */
export async function countUsers(): Promise<number> {
  loadUsersFromDisk();
  try {
    const db = await getSafeDb();
    if (db) {
      const count = await db.collection('users').countDocuments();
      if (count > 0) return count;
    }
  } catch {
    // Ignore error and return local count
  }
  return inMemoryUsers.size;
}
