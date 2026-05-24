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
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import { User } from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await connect();
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).exec();
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    // update lastLogin
    user.lastLogin = new Date();
    await user.save();

    const token = signToken({ id: user._id.toString(), email: user.email });
    return NextResponse.json({
      status: "ok",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        dailyUsage: user.dailyUsage,
        weeklyUsage: user.weeklyUsage,
        monthlyUsage: user.monthlyUsage,
        waterEfficiencyScore: user.waterEfficiencyScore,
        tankLevel: user.tankLevel,
        waterQuality: user.waterQuality,
        phValue: user.phValue,
        flowRate: user.flowRate,
        lastSensorSync: user.lastSensorSync,
        notificationsEnabled: user.notificationsEnabled ?? true,
      },
    });
  } catch (error) {
    console.error("[Auth:Login]", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Login failed."
            : `Login failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
