import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Global is used here to maintain a cached connection across hot reloads in development. 
// This prevents connections from growing exponentially during API Route usage.

// here global is a Node.js global object that allows us to store variables that persist across the entire application.
// it is a empty object that we can use to store our cached connection.
let cached = global.mongoose; 

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {

    // here we define the options for the mongoose connection.
    // bufferCommands: true means that if you try to use the connection before it's ready, it will buffer the commands and execute them once the connection is established.
    // maxPoolSize: 10 means that at most 10 connections will be open at any given time. If all connections are in use, additional connection requests will be queued until a connection is available. Setting a max pool size can help manage resources and prevent your application from opening too many connections to the database, which can lead to performance issues.

    // here we made a opts cuz mongoose.connect takes a second argument which is an options object that allows us to configure the connection.
    const opts = {
      bufferCommands: true, // Disable mongoose buffering until the connection is established (so that it doesn't throw an error if you try to use the connection before it's ready) 
      // buffercommands mean that if you try to use the connection before it's ready, it will buffer the commands and execute them once the connection is established. 
      // This can be useful in development when you might be restarting your server frequently and want to avoid errors related to the connection not being ready.


      maxPoolSize: 10,  // here we set the maximum number of connections in the pool to 10. 
      // This means that at most 10 connections will be open at any given time. 
      // If all connections are in use, additional connection requests will be queued until a connection is available. 
      // Setting a max pool size can help manage resources and prevent your application from opening too many connections to the database, which can lead to performance issues.
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}




