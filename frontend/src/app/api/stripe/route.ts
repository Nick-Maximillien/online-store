import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY");

export async function POST(req) {
  const { amount } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price_data: { currency: "usd", product_data: { name: "Order" }, unit_amount: amount * 100 }, quantity: 1 }],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return NextResponse.json({ sessionUrl: session.url });
}
