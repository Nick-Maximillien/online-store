import { NextResponse } from "next/server";

export async function POST(req) {
  const { phone, amount } = await req.json();

  // Simulate Mpesa API call
  return NextResponse.json({ message: `Payment request sent to ${phone} for ${amount}` });
}
