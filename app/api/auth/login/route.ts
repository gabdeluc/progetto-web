import { NextResponse } from "next/server";
import { verifyUser, getUserId, createSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username e password sono obbligatori." }, { status: 400 });
  }

  const user = verifyUser(username, password);
  if (!user) {
    return NextResponse.json({ error: "Credenziali non valide." }, { status: 401 });
  }

  const token = createSession(user.username, user.id);
  await setSessionCookie(token);

  return NextResponse.json({ success: true });
}
