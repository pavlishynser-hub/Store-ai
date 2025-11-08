import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getProducts } from "@/lib/products";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-10-29.clover",
    })
  : null;

type CheckoutItem = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe secret key not configured. Set STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }

  try {
    const { items, email } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty. Add items before checking out." },
        { status: 400 },
      );
    }

    const products = getProducts();

    const lineItems = (items as CheckoutItem[]).map((item) => {
      const product = products.find((product) => product.id === item.id);
      if (!product) {
        throw new Error(`Unknown product ID: ${item.id}`);
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: product.currency.toLowerCase(),
          product_data: {
            name: product.name,
            description: product.shortDescription,
            metadata: {
              brand: product.brand,
              size: product.size,
            },
            images: product.images.slice(0, 1),
          },
          unit_amount: Math.round(product.price * 100),
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${siteUrl}/checkout?status=success`,
      cancel_url: `${siteUrl}/checkout?status=cancelled`,
      line_items: lineItems,
      customer_email: typeof email === "string" ? email : undefined,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "IE", "AU"],
      },
      metadata: {
        origin: "aurora-cosmetics",
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("[checkout]", error);
    const message =
      error instanceof Error ? error.message : "Unexpected checkout error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
