import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {}
}

async function readUsers() {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(raw) as any[];
  } catch (e) {
    return [];
  }
}

async function writeUsers(users: any[]) {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function findUserById(id: string) {
  const users = await readUsers();
  return users.find((u) => u.id === id) || null;
}

export async function createUser(user: any) {
  const users = await readUsers();
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function updateUser(id: string, updates: any) {
  const users = await readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  await writeUsers(users);
  return users[idx];
}

export async function listUsers() {
  return await readUsers();
}
