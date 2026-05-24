import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { findUserByEmail, findUserById, updateUser } from "@/lib/db";

const getBearerToken = (request: Request) => {
  const authHeader = request.headers.get("authorization") || "";
  return authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
};

const sanitizeUser = (user: any) => {
  const { password, ...sanitized } = user || {};
  return sanitized;
};

export async function GET(req: Request) {
  try {
    const token = getBearerToken(req);
    const payload = verifyToken(token);
    if (!payload?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await findUserById(payload.id as string);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ user: sanitizeUser(user) });
  } catch (e: any) {
    console.error("[Auth:Profile:GET]", e);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Unable to load profile." : `Profile load failed: ${e.message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const token = getBearerToken(req);
    const payload = verifyToken(token);
    if (!payload?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await findUserById(payload.id as string);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const updates: Record<string, unknown> = {};

    if (typeof body.name === "string" && body.name.trim().length > 0) {
      updates.name = body.name.trim();
    }

    if (typeof body.email === "string" && body.email.trim().length > 0) {
      const normalizedEmail = body.email.toLowerCase().trim();
      if (normalizedEmail !== user.email) {
        const existing = await findUserByEmail(normalizedEmail);
        if (existing) {
          return NextResponse.json({ error: "Email already in use." }, { status: 409 });
        }
      }
      updates.email = normalizedEmail;
    }

    if (typeof body.password === "string" && body.password.trim().length > 0) {
      if (body.password.length < 8) {
        return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
      }
      updates.password = await bcrypt.hash(body.password, 12);
    }

    if (typeof body.profileImage === "string") {
      updates.profileImage = body.profileImage.trim();
    }

    if (typeof body.notificationsEnabled === "boolean") {
      updates.notificationsEnabled = body.notificationsEnabled;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
    }

    const updatedUser = await updateUser(payload.id as string, updates);
    if (!updatedUser) return NextResponse.json({ error: "Unable to update profile." }, { status: 500 });

    return NextResponse.json({ user: sanitizeUser(updatedUser) });
  } catch (e: any) {
    console.error("[Auth:Profile:PATCH]", e);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Unable to update profile." : `Profile update failed: ${e.message}` },
      { status: 500 }
    );
  }
}

