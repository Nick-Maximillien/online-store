// app/mock-payments/mpesa/initiate/route.ts
import { NextRequest, NextResponse } from "next/server";

// Simulate delay helper
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, provider, amount } = body;

    if (!orderId || !provider || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: orderId, provider, amount" },
        { status: 400 }
      );
    }

    console.log(`💰 Initiating ${provider} payment of KES ${amount} for Order #${orderId}`);

    // Step 1: Simulate processing delay (e.g., 2 seconds)
    await sleep(2000);

    // Step 2: Simulate calling the backend (Django) callback endpoint
    const callbackRes = await fetch("http://127.0.0.1:8000/payments/callback/mpesa/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId, // camelCase to match your Django view fix
        status: "PAID", // Simulate success
      }),
    });

    const callbackData = await callbackRes.json();

    console.log(`✅ Callback response for Order #${orderId}:`, callbackData);

    return NextResponse.json({
      message: `Mock M-Pesa payment processed and callback triggered.`,
      callbackStatus: callbackRes.status,
      callbackResponse: callbackData,
    });
  } catch (error) {
    console.error("❌ Payment initiation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
