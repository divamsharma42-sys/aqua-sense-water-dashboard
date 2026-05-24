import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await findUserById(payload.id as string);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");
    const payload = verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const updates = body;
    const user = await updateUser(payload.id as string, updates);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { User } from "@/models/User";
import { verifyToken } from "@/lib/auth";

const getBearerToken = (request: Request) => {
  const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ");
  return token[0] === "Bearer" ? token[1] : null;
};

const sanitizeUser = (user: Partial<Record<string, unknown>>) => {
  const sanitized = { ...user };
  delete (sanitized as any).password;
  delete (sanitized as any).resetToken;
  delete (sanitized as any).resetTokenExpiry;
  delete (sanitized as any).__v;
  return sanitized;
};

export async function GET(request: Request) {
  try {
    await connect();

    const token = getBearerToken(request);
    if (!token) {
      return NextResponse.json({ error: "Missing auth token." }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id?: string };
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid auth token." }, { status: 401 });
    }

    const user = await User.findById(decoded.id).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error("[Auth:Profile:GET]", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Unable to load profile."
            : `Profile load failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await connect();

    const token = getBearerToken(request);
    if (!token) {
      return NextResponse.json({ error: "Missing auth token." }, { status: 401 });
    }

    const decoded = verifyToken(token) as { id?: string };
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid auth token." }, { status: 401 });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (typeof body.name === "string" && body.name.trim().length > 0) {
      updates.name = body.name.trim();
    }

    if (typeof body.email === "string" && body.email.trim().length > 0) {
      const normalizedEmail = body.email.toLowerCase().trim();
      if (normalizedEmail !== user.email) {
        const existing = await User.findOne({ email: normalizedEmail }).lean();
        if (existing) {
          return NextResponse.json({ error: "That email is already in use." }, { status: 409 });
        }
      }
      updates.email = normalizedEmail;
    }

    if (typeof body.password === "string" && body.password.trim().length >= 8) {
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

    Object.assign(user, updates);
    await user.save();

    return NextResponse.json({ user: sanitizeUser(user.toObject()) });
  } catch (error) {
    console.error("[Auth:Profile:PATCH]", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Unable to update profile."
            : `Profile update failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
