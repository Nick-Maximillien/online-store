import { NextResponse } from "next/server";

export async function POST(req) {
  const { wallet, amount } = await req.json();

  return NextResponse.json({ message: `Payment request sent to ${wallet} for ${amount}` });
}
