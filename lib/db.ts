import mongoose from "mongoose";
import { log } from "@/lib/logger";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    log.db.info("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI).then((conn) => {
      log.db.info("MongoDB connected successfully");
      return conn;
    }).catch((err) => {
      log.db.error("MongoDB connection failed", err.message);
      cached.promise = null;
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
