import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "La registrazione è disabilitata." },
    { status: 403 }
  );
}
