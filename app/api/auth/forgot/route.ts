import { NextResponse } from "next/server";
import { findUserByEmail, updateUser } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });
    const user = await findUserByEmail(email);
    if (!user) return NextResponse.json({ ok: true });

    const token = uuidv4();
    const expiry = Date.now() + 1000 * 60 * 60; // 1 hour
    await updateUser(user.id, { resetToken: token, resetExpiry: expiry });

    // In a real app you'd email the token link. For demo, return token.
    return NextResponse.json({ ok: true, resetToken: token });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
