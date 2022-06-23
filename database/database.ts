import { connect, connection, disconnect } from "mongoose";
import { TweetCollection } from "../models/Tweet";
import { tweets } from "./tweets";

export const createDB = async () => {
  try {
    const uridb = process.env.URIDB || "mongodb://localhost:27017/test";
    await connect(uridb);
    await TweetCollection.create(tweets);
  } catch (error) {
    console.log("Error al crear la base de datos");
    await disconnect();
  }
};

export const destroyDB = async () => {
  try {
    await TweetCollection.deleteMany();
    await connection.db.dropDatabase();
  } catch (error) {
    console.log("Error al eliminar la base de datos");
  } finally {
    await disconnect();
  }
};
