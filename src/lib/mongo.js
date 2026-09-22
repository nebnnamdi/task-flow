import mongoose from "mongoose";

// export async function dbConnect() {
//   try {
//     const conn = await mongoose.connect(
//       String(process.env.MONGODB_CONNECTION_STRING),
//     );

//     return conn;
//   } catch (error) {
//     throw new Error("Error connecting to db");
//   }
// }

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_CONNECTION_STRING environment variable",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  //check if a connection exists
  if (cached.conn) {
    return cached.conn;
  }

  //if a connection already exists wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    return { error };
  }

  return cached.conn;
}
