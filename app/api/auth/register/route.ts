import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { createUser, findUserByEmail } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;
    if (!email || !password || !name) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const existing = await findUserByEmail(email);
    if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: role || "Home User",
      createdAt: new Date().toISOString(),
    };

    await createUser(user);

    const token = signToken({ id: user.id, email: user.email });
    return NextResponse.json({ status: "ok", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Register failed" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import { User } from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { name, email, password, role } = body as { name?: string; email?: string; password?: string; role?: string };

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() }).exec();
    if (existingUser) {
      return NextResponse.json({ error: "User already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role || "Home User",
      profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D4E74&color=00F5FF&rounded=true&size=128`,
      dailyUsage: 125,
      weeklyUsage: 840,
      monthlyUsage: 3600,
      waterEfficiencyScore: 82,
      tankLevel: 78,
      waterQuality: "Safe",
      phValue: 7.2,
      flowRate: 12,
      lastSensorSync: new Date(),
      notificationsEnabled: true,
    });
    const token = signToken({ id: newUser._id.toString(), email: newUser.email });

    return NextResponse.json({
      status: "ok",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage,
        createdAt: newUser.createdAt,
        lastLogin: newUser.lastLogin,
        dailyUsage: newUser.dailyUsage,
        weeklyUsage: newUser.weeklyUsage,
        monthlyUsage: newUser.monthlyUsage,
        waterEfficiencyScore: newUser.waterEfficiencyScore,
        tankLevel: newUser.tankLevel,
        waterQuality: newUser.waterQuality,
        phValue: newUser.phValue,
        flowRate: newUser.flowRate,
        lastSensorSync: newUser.lastSensorSync,
        notificationsEnabled: newUser.notificationsEnabled,
      },
    });
  } catch (error) {
    console.error("[Auth:Register]", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Registration failed."
            : `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
