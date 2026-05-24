import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, updateUser } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, token, password } = await req.json();
    if (!email || !token || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const user = await findUserByEmail(email);
    if (!user || user.resetToken !== token || Date.now() > (user.resetExpiry || 0)) return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    await updateUser(user.id, { password: hashed, resetToken: null, resetExpiry: null });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
