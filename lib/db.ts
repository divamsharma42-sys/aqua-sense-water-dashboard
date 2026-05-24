import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/aqua_sense_dev";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);
const clientPromise = global._mongoClientPromise || (global._mongoClientPromise = client.connect());

async function getUsersCollection() {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("users");
}

export async function findUserByEmail(email: string) {
  const col = await getUsersCollection();
  return (await col.findOne({ email: email.toLowerCase() })) || null;
}

export async function findUserById(id: string) {
  const col = await getUsersCollection();
  return (await col.findOne({ id })) || null;
}

export async function createUser(user: any) {
  const col = await getUsersCollection();
  await col.insertOne(user);
  return user;
}

export async function updateUser(id: string, updates: any) {
  const col = await getUsersCollection();
  const result = await col.findOneAndUpdate({ id }, { $set: updates }, { returnDocument: "after" as any });
  return result.value || null;
}

export async function listUsers() {
  const col = await getUsersCollection();
  return await col.find().toArray();
}
