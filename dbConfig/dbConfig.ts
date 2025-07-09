
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

declare global {
 
  var mongooseCached: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongooseCached) {
  global.mongooseCached = { conn: null, promise: null };
}

export async function connect() {
  if (global.mongooseCached.conn) {
    return global.mongooseCached.conn;
  }
  if (!global.mongooseCached.promise) {
    global.mongooseCached.promise = mongoose
      .connect(MONGO_URI)
      .then((m) => (global.mongooseCached.conn = m));
  }
  await global.mongooseCached.promise;
  return global.mongooseCached.conn;
}
