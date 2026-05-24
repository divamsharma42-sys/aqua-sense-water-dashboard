import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, updateUser } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });

    const user = await findUserByEmail(email.toLowerCase().trim());
    if (!user) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

    await updateUser(user.id, { lastLogin: new Date().toISOString() });

    const token = signToken({ id: user.id, email: user.email });
    return NextResponse.json({ status: "ok", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    console.error("[Auth:Login]", error);
    return NextResponse.json({ error: process.env.NODE_ENV === "production" ? "Login failed." : `Login failed: ${error.message}` }, { status: 500 });
  }
}
