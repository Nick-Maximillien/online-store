import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { amount } = await req.json();

  const paypalResponse = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_PAYPAL_ACCESS_TOKEN`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: amount } }],
    }),
  });

  const paypalData = await paypalResponse.json();
  return NextResponse.json({ url: paypalData.links[1].href });
}
