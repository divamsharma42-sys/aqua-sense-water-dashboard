import { NextResponse } from "next/server";
import { generateMockSensorData } from "@/lib/mock-data";

export async function GET() {
  try {
    // In a real setup this would pull from a database or sensor stream.
    const data = generateMockSensorData();
    return NextResponse.json({ status: "ok", data });
  } catch (e: any) {
    console.error("[API:Sensor]", e);
    return NextResponse.json({ error: "Failed to load sensor data" }, { status: 500 });
  }
}
