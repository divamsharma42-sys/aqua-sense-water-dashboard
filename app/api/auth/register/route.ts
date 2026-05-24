import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { createUser, findUserByEmail } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body as { name?: string; email?: string; password?: string; role?: string };

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role?.trim() || "Home User",
      createdAt: new Date().toISOString(),
      lastLogin: null,
      notificationsEnabled: true,
    };

    await createUser(user);

    const token = signToken({ id: user.id, email: user.email });
    return NextResponse.json({ status: "ok", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    console.error("[Auth:Register]", error);
    return NextResponse.json({ error: process.env.NODE_ENV === "production" ? "Registration failed." : `Registration failed: ${error.message}` }, { status: 500 });
  }
}
